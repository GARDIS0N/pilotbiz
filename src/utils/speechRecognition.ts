/**
 * Jarvis Speech Recognition Engine
 * Provides dual-mode voice input with advanced conversation & push-to-talk support:
 * 1. Mode 1: Push-to-Talk (press & hold to speak continuously, release to execute)
 * 2. Mode 2: Conversation Mode (continuous loop: Listen -> Record -> Transcribe -> Execute -> Speak -> Listen again)
 * 3. Interruption support ("JARVIS, stop" or STOP button halts audio playback and resets to listening)
 * 4. Dual backend: Web Speech API (zero-latency streaming) + MediaRecorder fallback (/api/jarvis/transcribe)
 */

import { MicState } from '../types/jarvis';

export type VoiceMode = 'push_to_talk' | 'conversation' | 'single_command' | 'wake_word';

export interface WakePhraseMatch {
  detected: boolean;
  phrase?: string;
  commandText: string;
  isWakeOnly: boolean;
}

/**
 * Detects whether a speech transcript triggers the configured wake phrase(s)
 * e.g. "Hey Jarvis, create a folder called TestProject" -> { detected: true, phrase: "hey jarvis", commandText: "create a folder called TestProject", isWakeOnly: false }
 * e.g. "Jarvis" -> { detected: true, phrase: "jarvis", commandText: "", isWakeOnly: true }
 * e.g. "Pass the water please" -> { detected: false, commandText: "Pass the water please", isWakeOnly: false }
 */
export function detectWakePhrase(
  rawTranscript: string,
  wakePhrases: string[] = ['hey jarvis', 'jarvis']
): WakePhraseMatch {
  const trimmed = (rawTranscript || '').trim();
  if (!trimmed) {
    return { detected: false, commandText: '', isWakeOnly: false };
  }

  // Sort phrases descending by length so "hey jarvis" matches before "jarvis"
  const sortedPhrases = [...wakePhrases]
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  for (const phrase of sortedPhrases) {
    // 1. Exact match (wake word only)
    if (trimmed.toLowerCase() === phrase) {
      return { detected: true, phrase, commandText: '', isWakeOnly: true };
    }

    // 2. Starts with phrase followed by punctuation or whitespace
    // e.g. "Hey Jarvis, do X", "Hey Jarvis! do X", "Jarvis: do X", "Jarvis do X"
    const prefixRegex = new RegExp(`^${phrase}[,!?:;\\s]+(.*)$`, 'i');
    const prefixMatch = trimmed.match(prefixRegex);
    if (prefixMatch) {
      const remainder = prefixMatch[1].trim();
      return {
        detected: true,
        phrase,
        commandText: remainder,
        isWakeOnly: remainder.length === 0,
      };
    }

    // 3. Embedded occurrence e.g. "Ok Jarvis, check my schedule"
    const embeddedRegex = new RegExp(`^(?:ok|okay|hi|hello)\\s+${phrase}[,!?:;\\s]*(.*)$`, 'i');
    const embeddedMatch = trimmed.match(embeddedRegex);
    if (embeddedMatch) {
      const remainder = embeddedMatch[1].trim();
      return {
        detected: true,
        phrase,
        commandText: remainder,
        isWakeOnly: remainder.length === 0,
      };
    }
  }

  return { detected: false, commandText: trimmed, isWakeOnly: false };
}

/**
 * Check for spoken interruption / barge-in commands:
 * e.g. "stop", "jarvis stop", "quiet", "cancel", "shut up", "hold on", "hey jarvis stop"
 */
export function isInterruptionPhrase(text: string): boolean {
  const trimmed = (text || '').toLowerCase().trim();
  if (!trimmed) return false;

  const stopPatterns = [
    /^stop$/i,
    /^(?:hey\s+)?jarvis[,\s]+stop$/i,
    /^stop[,\s]+(?:hey\s+)?jarvis$/i,
    /^(?:stop|quiet|cancel|shut up|pause|hold on|silence)$/i,
    /^(?:hey\s+)?jarvis[,\s]+(?:quiet|cancel|shut up|pause|hold on|silence)$/i,
    /^(?:please\s+)?stop\s+(?:talking|speaking|reading)$/i,
  ];

  return stopPatterns.some((pattern) => pattern.test(trimmed));
}

export interface VoiceInputOptions {
  lang?: string; // e.g. "en-US"
  autoSend?: boolean; // send automatically on finish
  mode?: VoiceMode;
  wakeWordEnabled?: boolean;
  wakePhrases?: string[];
  silenceTimeoutMs?: number;
  onStateChange: (state: MicState, message?: string) => void;
  onInterimTranscript: (text: string) => void;
  onFinalTranscript: (text: string) => void;
  onError: (errorMessage: string) => void;
  onStopAudioPlayback?: () => void; // Stops TTS so Jarvis doesn't hear itself
  onInterruption?: () => void;
  onWakeWordDetected?: (match: WakePhraseMatch) => void;
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
   * Check for spoken interruption commands ("JARVIS, stop", "stop", "cancel", etc.)
   */
  private checkInterruption(text: string): boolean {
    if (isInterruptionPhrase(text)) {
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

    const rawText = (this.finalAccumulatedTranscript + ' ' + this.activeTranscript).trim();
    const wakeCheck = detectWakePhrase(rawText, this.options.wakePhrases);
    const textToSend = wakeCheck.detected && wakeCheck.commandText ? wakeCheck.commandText : rawText;

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

        // If Wake Word is active in continuous listening mode
        const isWakeWordActive = Boolean(
          this.options.wakeWordEnabled &&
            (this.options.mode === 'wake_word' || (!this.isConversationMode && !this.isPushToTalk))
        );

        if (isWakeWordActive) {
          const wakeMatch = detectWakePhrase(combinedText, this.options.wakePhrases);
          if (wakeMatch.detected) {
            if (wakeMatch.isWakeOnly) {
              this.options.onInterimTranscript('Listening...');
              this.options.onWakeWordDetected?.(wakeMatch);
            } else {
              this.options.onInterimTranscript(wakeMatch.commandText);
            }
          }
        } else {
          if (combinedText) {
            this.options.onInterimTranscript(combinedText);
          }
        }

        // Silence timeout management:
        // In Push-to-Talk mode: NEVER cut off! User controls start/stop by holding button.
        // In Conversation Mode / Single Command: wait for natural pause before completing.
        if (!this.isPushToTalk) {
          const pauseTimeout = this.options.silenceTimeoutMs || 2200;
          if (newlyFinalStr) {
            // User paused after a completed sentence
            this.startSilenceTimeout(pauseTimeout, true);
          } else {
            // User is actively in the middle of words
            this.startSilenceTimeout(Math.max(3500, pauseTimeout + 1300), true);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('[JARVIS Voice Error]:', event.error);
        this.clearSilenceTimeout();

        if (event.error === 'no-speech') {
          // In continuous or conversation mode, no-speech is normal during pauses; keep listening if not stopped
          const isContinuous =
            this.isConversationMode ||
            this.options.mode === 'wake_word' ||
            Boolean(this.options.wakeWordEnabled && !this.isPushToTalk);
          if (isContinuous && !this.intentionalStop && !this.isAssistantSpeaking) {
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

        // Auto-reconnect in Continuous / Conversation / Wake-Word Mode if browser closed session without intentional stop
        const isContinuous =
          this.isConversationMode ||
          this.options.mode === 'wake_word' ||
          Boolean(this.options.wakeWordEnabled && !this.isPushToTalk);

        if (isContinuous && !this.intentionalStop && !this.isAssistantSpeaking) {
          console.log('[JARVIS Voice]: Auto-restarting continuous recognition session...');
          this.restartTimeout = setTimeout(() => {
            if (isContinuous && !this.intentionalStop && !this.isAssistantSpeaking) {
              this.startInternal();
            }
          }, 300);
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
  private startSilenceTimeout(durationMs: number = 2200, isEndOfSpeech: boolean = false) {
    this.clearSilenceTimeout();
    this.silenceTimer = setTimeout(() => {
      if (!this.isListening) return;

      const fullText = (this.finalAccumulatedTranscript + ' ' + this.activeTranscript).trim();

      if (!this.hasDetectedSpeech && !isEndOfSpeech) {
        // No speech detected for entire duration
        const isContinuousMode =
          this.isConversationMode ||
          this.options.mode === 'wake_word' ||
          Boolean(this.options.wakeWordEnabled && !this.isPushToTalk);

        if (!isContinuousMode) {
          this.stop();
          this.options.onStateChange('idle');
          this.options.onError('No speech detected - try speaking a little louder.');
        }
      } else if (fullText) {
        // Handle Wake Word continuous listening filtering
        const isWakeWordActive = Boolean(
          this.options.wakeWordEnabled &&
            (this.options.mode === 'wake_word' || (!this.isConversationMode && !this.isPushToTalk))
        );

        if (isWakeWordActive) {
          const wakeMatch = detectWakePhrase(fullText, this.options.wakePhrases);
          if (!wakeMatch.detected) {
            // Ambient speech without wake phrase; ignore and stay in listening mode
            this.finalAccumulatedTranscript = '';
            this.activeTranscript = '';
            return;
          }
          if (wakeMatch.isWakeOnly) {
            // Wake phrase only (e.g. "Hey Jarvis" or "Jarvis")
            this.finalAccumulatedTranscript = '';
            this.activeTranscript = '';
            this.options.onWakeWordDetected?.(wakeMatch);
            return;
          }
          // Wake phrase with command: deliver clean stripped directive
          console.log('[JARVIS Voice]: Wake phrase detected with directive:', wakeMatch.commandText);
          this.finalAccumulatedTranscript = '';
          this.activeTranscript = '';
          this.pauseForAssistantSpeaking();
          this.options.onFinalTranscript(wakeMatch.commandText);
          return;
        }

        // Regular or Conversation Mode delivery:
        // Clean wake phrase prefix if present (e.g. "Jarvis, do X" -> "do X")
        const wakeCheck = detectWakePhrase(fullText, this.options.wakePhrases);
        const textToDeliver = wakeCheck.detected && wakeCheck.commandText ? wakeCheck.commandText : fullText;

        console.log('[JARVIS Voice]: Silence detected after speech. Delivering transcript:', textToDeliver);
        this.finalAccumulatedTranscript = '';
        this.activeTranscript = '';

        if (!this.isConversationMode) {
          this.stop();
        } else {
          // In conversation mode, pause listening while processing
          this.pauseForAssistantSpeaking();
        }

        this.options.onFinalTranscript(textToDeliver);
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
