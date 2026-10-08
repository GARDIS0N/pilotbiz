/**
 * Jarvis Speech Recognition Engine
 * Provides dual-mode voice input with advanced conversation & push-to-talk support:
 * 1. Mode 1: Push-to-Talk (press & hold to speak continuously, release to execute)
 * 2. Mode 2: Conversation Mode (continuous loop: Listen -> Record -> Transcribe -> Execute -> Speak -> Listen again)
 * 3. Interruption support ("JARVIS, stop" or STOP button halts audio playback and resets to listening)
 * 4. Dual backend: Web Speech API (zero-latency streaming) + MediaRecorder fallback (/api/jarvis/transcribe)
 */

import { MicState } from '../types/jarvis';

export type VoiceMode = 'push_to_talk' | 'conversation' | 'single_command';

export interface VoiceInputOptions {
  lang?: string; // e.g. "en-US"
  autoSend?: boolean; // send automatically on finish
  mode?: VoiceMode;
  onStateChange: (state: MicState, message?: string) => void;
  onInterimTranscript: (text: string) => void;
  onFinalTranscript: (text: string) => void;
  onError: (errorMessage: string) => void;
  onStopAudioPlayback?: () => void; // Stops TTS so Jarvis doesn't hear itself
  onInterruption?: () => void;
}

export interface BrowserVoiceCapabilities {
  isSupported: boolean;
  isSecureContext: boolean;
  hasWebSpeech: boolean;
  isFirefox: boolean;
  isBrave: boolean;
  browserName: string;
}

export function detectBrowserCapabilities(): BrowserVoiceCapabilities {
  const isSecure =
    typeof window !== 'undefined'
      ? window.isSecureContext ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
      : true;
  const hasWebSpeech =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
  const isFirefox = userAgent.includes('firefox');
  const isBrave = typeof (navigator as any)?.brave?.isBrave === 'function';

  let browserName = 'Browser';
  if (isFirefox) browserName = 'Firefox';
  else if (userAgent.includes('edg/')) browserName = 'Edge';
  else if (userAgent.includes('chrome')) browserName = isBrave ? 'Brave' : 'Chrome';
  else if (userAgent.includes('safari')) browserName = 'Safari';

  return {
    isSupported: isSecure && (hasWebSpeech || typeof MediaRecorder !== 'undefined'),
    isSecureContext: isSecure,
    hasWebSpeech,
    isFirefox,
    isBrave,
    browserName,
  };
}

export class JarvisVoiceController {
  private recognition: any = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private mediaStream: MediaStream | null = null;
  private isListening: boolean = false;
  private isPushToTalk: boolean = false;
  private isConversationMode: boolean = false;
  private isAssistantSpeaking: boolean = false;
  private silenceTimer: any = null;
  private hasDetectedSpeech: boolean = false;
  private isProcessingFallback: boolean = false;
  private options: VoiceInputOptions;
  private activeTranscript: string = '';
  private finalAccumulatedTranscript: string = '';
  private restartTimeout: any = null;
  private intentionalStop: boolean = false;

  constructor(options: VoiceInputOptions) {
    this.options = options;
    if (options.mode === 'conversation') {
      this.isConversationMode = true;
    }
  }

  public updateOptions(newOptions: Partial<VoiceInputOptions>) {
    this.options = { ...this.options, ...newOptions };
    if (newOptions.mode !== undefined) {
      this.isConversationMode = newOptions.mode === 'conversation';
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }

  public getIsConversationMode(): boolean {
    return this.isConversationMode;
  }

  public setConversationMode(enabled: boolean) {
    this.isConversationMode = enabled;
    if (!enabled && this.isListening && !this.isPushToTalk) {
      this.stop();
    }
  }

  /**
   * Request microphone permissions and handle browser permission errors
   */
  public async requestMicPermission(): Promise<{ granted: boolean; error?: string }> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        granted: false,
        error: 'Microphone access is not supported on this browser or connection.',
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return { granted: true };
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        return {
          granted: false,
          error:
            'Microphone blocked - click the camera or microphone icon in your browser address bar to allow access.',
        };
      }
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        return {
          granted: false,
          error: 'No microphone found - please connect a microphone to your device.',
        };
      }
      if (err.name === 'NotReadableError') {
        return {
          granted: false,
          error: 'Microphone is currently in use by another application.',
        };
      }
      return {
        granted: false,
        error: err.message || 'Unable to access microphone.',
      };
    }
  }

  /**
   * Check for spoken interruption commands ("JARVIS, stop", "stop")
   */
  private checkInterruption(text: string): boolean {
    const trimmed = text.toLowerCase().trim();
    if (
      trimmed === 'stop' ||
      trimmed === 'jarvis stop' ||
      trimmed === 'jarvis, stop' ||
      trimmed.startsWith('stop jarvis') ||
      trimmed.startsWith('jarvis stop') ||
      trimmed.startsWith('jarvis, stop')
    ) {
      console.log('[JARVIS Voice]: Spoken interruption detected:', text);
      if (this.options.onStopAudioPlayback) {
        this.options.onStopAudioPlayback();
      }
      if (this.options.onInterruption) {
        this.options.onInterruption();
      }
      this.finalAccumulatedTranscript = '';
      this.activeTranscript = '';
      this.options.onInterimTranscript('');
      return true;
    }
    return false;
  }

  /**
   * Start Push-to-Talk recording session (press and hold)
   * Disables all premature silence cutoffs while the user holds the button!
   */
  public async startPushToTalk(): Promise<void> {
    this.isPushToTalk = true;
    this.intentionalStop = false;
    await this.startInternal();
  }

  /**
   * Stop Push-to-Talk recording session (release button)
   * Finalizes transcript and immediately delivers for execution
   */
  public stopPushToTalk(): void {
    if (!this.isPushToTalk) return;
    this.isPushToTalk = false;
    this.intentionalStop = true;
    this.clearSilenceTimeout();

    const textToSend = (this.finalAccumulatedTranscript + ' ' + this.activeTranscript).trim();

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (_) {}
    }

    this.isListening = false;
    this.options.onStateChange('idle');

    if (textToSend) {
      this.options.onFinalTranscript(textToSend);
      this.finalAccumulatedTranscript = '';
      this.activeTranscript = '';
    }
  }

  /**
   * Start listening for standard or conversation mode
   */
  public async start(mode?: VoiceMode): Promise<void> {
    if (mode === 'conversation') {
      this.isConversationMode = true;
    } else if (mode === 'push_to_talk') {
      return this.startPushToTalk();
    }
    this.intentionalStop = false;
    await this.startInternal();
  }

  /**
   * Pause listening while assistant speaks or processes
   */
  public pauseForAssistantSpeaking() {
    this.isAssistantSpeaking = true;
    this.clearSilenceTimeout();
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
    }
    this.isListening = false;
  }

  /**
   * Resume conversation mode listening after assistant finishes speaking
   */
  public resumeAfterAssistantSpeaking() {
    this.isAssistantSpeaking = false;
    if (this.isConversationMode && !this.intentionalStop) {
      console.log('[JARVIS Voice]: Assistant finished speaking. Returning to LISTENING...');
      setTimeout(() => {
        if (!this.isAssistantSpeaking && this.isConversationMode) {
          this.startInternal();
        }
      }, 300);
    }
  }

  /**
   * Core start implementation
   */
  private async startInternal(): Promise<void> {
    if (this.isListening) {
      return;
    }

    const caps = detectBrowserCapabilities();
    if (!caps.isSecureContext) {
      this.options.onStateChange('error', 'Microphone requires a secure connection (HTTPS or localhost).');
      this.options.onError('Microphone requires a secure connection (HTTPS or localhost).');
      return;
    }

    // Stop ongoing audio so mic doesn't pick up Jarvis speech
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.options.onStopAudioPlayback?.();

    const perm = await this.requestMicPermission();
    if (!perm.granted) {
      const errorMsg = perm.error || 'Microphone access denied.';
      this.options.onStateChange('error', errorMsg);
      this.options.onError(errorMsg);
      return;
    }

    this.hasDetectedSpeech = false;
    this.activeTranscript = '';
    this.finalAccumulatedTranscript = '';

    if (caps.hasWebSpeech && !caps.isFirefox) {
      this.startWebSpeech();
    } else {
      console.log('[JARVIS Voice]: Using MediaRecorder fallback.');
      await this.startMediaRecorderFallback();
    }
  }

  /**
   * Native Web Speech API path
   * Uses continuous = true to prevent Chromium from dropping on brief speech pauses!
   */
  private startWebSpeech() {
    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechClass) {
      this.startMediaRecorderFallback();
      return;
    }

    try {
      if (this.recognition) {
        try {
          this.recognition.abort();
        } catch (_) {}
        this.recognition = null;
      }

      const recognition = new SpeechClass();
      this.recognition = recognition;

      recognition.lang = this.options.lang || 'en-US';
      recognition.interimResults = true;
      // KEY FIX: continuous = true keeps the microphone open across natural speech pauses!
      recognition.continuous = true;
      recognition.maxAlternatives = 1;

      this.isListening = true;
      this.options.onStateChange('listening');

      // In non-push-to-talk mode, start an initial 12s silence timeout for first word
      if (!this.isPushToTalk) {
        this.startSilenceTimeout(12000, false);
      }

      recognition.onstart = () => {
        this.isListening = true;
        this.options.onStateChange('listening');
      };

      recognition.onresult = (event: any) => {
        this.hasDetectedSpeech = true;
        this.clearSilenceTimeout();

        let interimStr = '';
        let newlyFinalStr = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            newlyFinalStr += res[0].transcript + ' ';
          } else {
            interimStr += res[0].transcript;
          }
        }

        if (newlyFinalStr) {
          this.finalAccumulatedTranscript += newlyFinalStr;
        }

        const combinedText = (this.finalAccumulatedTranscript + interimStr).trim();
        this.activeTranscript = interimStr.trim();

        // Check for interruption phrase
        if (this.checkInterruption(combinedText)) {
          return;
        }

        if (combinedText) {
          this.options.onInterimTranscript(combinedText);
        }

        // Silence timeout management:
        // In Push-to-Talk mode: NEVER cut off! User controls start/stop by holding button.
        // In Conversation Mode / Single Command: wait 2500ms after final speech chunk before completing.
        if (!this.isPushToTalk) {
          if (newlyFinalStr) {
            // User paused after a completed sentence
            this.startSilenceTimeout(2200, true);
          } else {
            // User is actively in the middle of words
            this.startSilenceTimeout(3500, true);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[JARVIS Voice Error]:', event.error);
        this.clearSilenceTimeout();

        if (event.error === 'no-speech') {
          // In conversation mode, no-speech is normal during pauses; keep listening if not stopped
          if (this.isConversationMode && !this.intentionalStop && !this.isAssistantSpeaking) {
            return;
          }
        }

        this.isListening = false;
        let friendlyError = 'Speech recognition issue.';
        if (event.error === 'not-allowed') {
          friendlyError = 'Microphone blocked - click address bar to allow.';
        } else if (event.error === 'audio-capture') {
          friendlyError = 'No microphone found.';
        } else if (event.error === 'network') {
          friendlyError = 'Network error. Switching to fallback...';
          this.startMediaRecorderFallback();
          return;
        }

        if (event.error !== 'no-speech') {
          this.options.onStateChange('error', friendlyError);
          this.options.onError(friendlyError);
        }
      };

      recognition.onend = () => {
        this.clearSilenceTimeout();
        this.isListening = false;

        // Auto-reconnect in Conversation Mode if browser closed session without intentional stop
        if (this.isConversationMode && !this.intentionalStop && !this.isAssistantSpeaking) {
          console.log('[JARVIS Voice]: Auto-restarting recognition session for Conversation Mode...');
          this.restartTimeout = setTimeout(() => {
            if (this.isConversationMode && !this.intentionalStop && !this.isAssistantSpeaking) {
              this.startInternal();
            }
          }, 350);
          return;
        }

        if (!this.isProcessingFallback && !this.isAssistantSpeaking) {
          this.options.onStateChange('idle');
        }
      };

      recognition.start();
    } catch (err: any) {
      console.error('[JARVIS Voice Start Error]:', err);
      this.isListening = false;
      this.startMediaRecorderFallback();
    }
  }

  /**
   * MediaRecorder STT Fallback path (Firefox, Brave, or unsupported browsers)
   */
  private async startMediaRecorderFallback() {
    try {
      this.clearSilenceTimeout();
      this.recordedChunks = [];

      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')
        ? 'audio/ogg;codecs=opus'
        : 'audio/webm';

      this.mediaRecorder = new MediaRecorder(this.mediaStream, { mimeType });

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstart = () => {
        this.isListening = true;
        this.options.onStateChange('listening');
        if (!this.isPushToTalk) {
          this.startSilenceTimeout(10000, false);
        }
      };

      this.mediaRecorder.onstop = async () => {
        this.clearSilenceTimeout();
        this.isListening = false;
        if (this.recordedChunks.length === 0) {
          this.options.onStateChange('idle');
          return;
        }

        this.isProcessingFallback = true;
        this.options.onStateChange('processing', 'Transcribing audio...');

        try {
          const audioBlob = new Blob(this.recordedChunks, { type: mimeType });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            try {
              const base64Data = (reader.result as string).split(',')[1];
              const res = await fetch('/api/jarvis/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  audioBase64: base64Data,
                  mimeType,
                }),
              });

              if (res.ok) {
                const data = await res.json();
                const transcript = (data.transcript || '').trim();
                if (transcript) {
                  if (this.checkInterruption(transcript)) {
                    return;
                  }
                  this.options.onInterimTranscript(transcript);
                  this.options.onFinalTranscript(transcript);
                } else {
                  this.options.onError('No speech detected - try speaking a little louder.');
                }
              } else {
                const errData = await res.json().catch(() => ({}));
                this.options.onError(errData.error || 'Speech transcription failed.');
              }
            } catch (_) {
              this.options.onError('Could not reach transcription server.');
            } finally {
              this.isProcessingFallback = false;
              if (!this.isAssistantSpeaking) {
                this.options.onStateChange('idle');
              }
            }
          };
        } catch (_) {
          this.isProcessingFallback = false;
          this.options.onStateChange('idle');
        }
      };

      this.mediaRecorder.start(250);
    } catch (err: any) {
      this.isListening = false;
      this.options.onStateChange('error', 'Microphone capture failed.');
      this.options.onError(err.message || 'Microphone capture failed.');
    }
  }

  /**
   * Stop listening cleanly
   */
  public stop() {
    this.intentionalStop = true;
    this.clearSilenceTimeout();
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
    }

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      try {
        this.mediaRecorder.stop();
      } catch (_) {}
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    this.isListening = false;
  }

  /**
   * Silence Timeout logic
   */
  private startSilenceTimeout(durationMs: number = 3000, isEndOfSpeech: boolean = false) {
    this.clearSilenceTimeout();
    this.silenceTimer = setTimeout(() => {
      if (!this.isListening) return;

      const fullText = (this.finalAccumulatedTranscript + ' ' + this.activeTranscript).trim();

      if (!this.hasDetectedSpeech && !isEndOfSpeech) {
        // No speech detected for entire duration
        if (!this.isConversationMode) {
          this.stop();
          this.options.onStateChange('idle');
          this.options.onError('No speech detected - try speaking a little louder.');
        }
      } else if (fullText) {
        // Speech finished! Trigger execution
        console.log('[JARVIS Voice]: Silence detected after speech. Delivering transcript:', fullText);
        this.finalAccumulatedTranscript = '';
        this.activeTranscript = '';

        if (!this.isConversationMode) {
          this.stop();
        } else {
          // In conversation mode, pause listening while processing
          this.pauseForAssistantSpeaking();
        }

        this.options.onFinalTranscript(fullText);
      }
    }, durationMs);
  }

  private clearSilenceTimeout() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
  }

  /**
   * Destroy and clean up resources
   */
  public destroy() {
    this.stop();
    this.recognition = null;
    this.mediaRecorder = null;
  }
}
