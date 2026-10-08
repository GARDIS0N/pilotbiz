/**
 * Audio processing utilities for Gemini Live API & HUD Audio Feedback
 * - Mic capture at 16kHz PCM
 * - Output playback at 24kHz gapless PCM
 * - Audio analysis for Arc Reactor reactivity
 */

export function float32To16BitPCM(input: Float32Array): ArrayBuffer {
  const output = new Int16Array(input.length);
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output.buffer;
}

export function pcmToBase64(channelData: Float32Array): string {
  const buffer = float32To16BitPCM(channelData);
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToFloat32(base64: string): Float32Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7fff);
  }
  return float32Array;
}

/**
 * High-precision gapless playback queue for 24kHz Gemini Live audio
 */
export class LiveAudioPlayer {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private nextStartTime: number = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  public isPlaying: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx({ sampleRate: 24000 });
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 1.0;

      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChunkBase64(base64PCM: string) {
    this.enqueueChunk(base64PCM);
  }

  public enqueueChunk(base64PCM: string) {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    try {
      const float32Data = base64ToFloat32(base64PCM);
      if (float32Data.length === 0) return;

      const audioBuffer = this.ctx.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data);

      const source = this.ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.gainNode);

      const currentTime = this.ctx.currentTime;
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime + 0.03; // slight lead to prevent jitter crackle
      }

      source.start(this.nextStartTime);
      this.isPlaying = true;

      this.activeSources.push(source);
      source.onended = () => {
        const index = this.activeSources.indexOf(source);
        if (index !== -1) {
          this.activeSources.splice(index, 1);
        }
        if (this.activeSources.length === 0) {
          this.isPlaying = false;
        }
      };

      this.nextStartTime += audioBuffer.duration;
    } catch (err) {
      console.error('Error enqueuing Live audio chunk:', err);
    }
  }

  public playWavBase64(base64Wav: string, onEnded?: () => void) {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;

    try {
      const binaryString = atob(base64Wav);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      this.ctx.decodeAudioData(
        bytes.buffer.slice(0),
        (buffer) => {
          if (!this.ctx || !this.gainNode) return;
          this.stop(); // Stop any previous playback

          const source = this.ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(this.gainNode);

          source.onended = () => {
            this.isPlaying = false;
            onEnded?.();
          };

          this.isPlaying = true;
          source.start();
          this.activeSources.push(source);
        },
        (err) => console.error('Error decoding WAV audio:', err)
      );
    } catch (err) {
      console.error('Wav decode error:', err);
    }
  }

  public getEnergyLevel(): number {
    if (!this.analyser || !this.isPlaying) return 0;
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    return Math.min(1, sum / (data.length * 160));
  }

  public stop() {
    for (const source of this.activeSources) {
      try {
        source.stop();
        source.disconnect();
      } catch (_) {}
    }
    this.activeSources = [];
    this.isPlaying = false;
    this.nextStartTime = 0;
  }
}

/**
 * High-performance Microphone capture at 16kHz with volume metering
 */
export class LiveMicCapture {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isCapturing: boolean = false;
  private volumeLevel: number = 0;

  constructor(private onAudioChunk: (base64PCM: string) => void) {}

  public async start(): Promise<{ success: boolean; isPermissionDenied?: boolean; error?: string }> {
    if (this.isCapturing) return { success: true };

    try {
      if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('[JARVIS Audio]: MediaDevices API not available in current environment.');
        return { success: false, isPermissionDenied: false, error: 'MediaDevices API not available' };
      }

      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      try {
        this.ctx = new AudioCtx({ sampleRate: 16000 });
      } catch (_) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.source = this.ctx.createMediaStreamSource(this.stream);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      // 4096 buffer size produces chunks for real-time streaming
      this.processor = this.ctx.createScriptProcessor(4096, 1, 1);

      this.source.connect(this.analyser);
      this.source.connect(this.processor);
      this.processor.connect(this.ctx.destination);

      this.processor.onaudioprocess = (e) => {
        if (!this.isCapturing) return;
        const channelData = e.inputBuffer.getChannelData(0);
        
        // Calculate RMS volume level
        let sumSquares = 0;
        for (let i = 0; i < channelData.length; i++) {
          sumSquares += channelData[i] * channelData[i];
        }
        const rms = Math.sqrt(sumSquares / channelData.length);
        this.volumeLevel = Math.min(1, rms * 5.0);

        // Convert to 16kHz PCM base64
        const base64Chunk = pcmToBase64(channelData);
        this.onAudioChunk(base64Chunk);
      };

      this.isCapturing = true;
      return { success: true };
    } catch (err: any) {
      this.stop();
      const isDenied =
        err?.name === 'NotAllowedError' ||
        err?.name === 'PermissionDeniedError' ||
        err?.name === 'SecurityError' ||
        (err?.message && /permission|denied|allowed/i.test(err.message));

      console.warn('[JARVIS Audio]: Microphone stream not available:', isDenied ? 'Permission denied by user/browser' : err?.message);

      return {
        success: false,
        isPermissionDenied: isDenied,
        error: isDenied ? 'Permission denied' : (err?.message || 'Device unavailable'),
      };
    }
  }

  public getVolumeLevel(): number {
    return this.isCapturing ? this.volumeLevel : 0;
  }

  public stop() {
    this.isCapturing = false;
    this.volumeLevel = 0;

    if (this.processor) {
      this.processor.disconnect();
      this.processor.onaudioprocess = null;
      this.processor = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

/**
 * Stark HUD synthesized audio feedback sound effects
 */
export function playHudSound(type: 'startup' | 'ping' | 'interrupted' | 'alarm' | 'click') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'startup') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'ping') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'interrupted') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'alarm') {
      // 3 rapid warning chirps
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now + i * 0.15);
        osc.frequency.setValueAtTime(1200, now + i * 0.15 + 0.07);
        gain.gain.setValueAtTime(0.12, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.13);
      }
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (_) {
    // Audio context may fail if user hasn't interacted with document
  }
}
