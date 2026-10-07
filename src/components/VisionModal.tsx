import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  X,
  Scan,
  Sparkles,
  RefreshCw,
  CameraOff,
  SwitchCamera,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeImage: (base64Image: string, promptText: string) => Promise<void>;
  isLoading: boolean;
}

interface CameraErrorInfo {
  title: string;
  message: string;
  action?: 'permission' | 'device' | 'inuse' | 'security' | 'generic';
}

const PRESET_PROMPTS = [
  'Analyze this image and provide tactical insights.',
  'Read and transcribe any text, numbers, or code visible.',
  'Identify all objects, hardware, and components.',
  'Diagnose the technical problem or error displayed on screen.',
];

export const VisionModal: React.FC<VisionModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeImage,
  isLoading,
}) => {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [cameraError, setCameraError] = useState<CameraErrorInfo | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [resolution, setResolution] = useState<string>('');
  const [isFlashing, setIsFlashing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera tracks safely
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_) {}
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Enumerate video devices
  const updateDeviceList = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.enumerateDevices) return;
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');
      setDevices(videoInputs);
    } catch (e) {
      console.warn('[JARVIS Vision] Device enumeration notice:', e);
    }
  }, []);

  // Progressive resilient camera starter
  const startCamera = useCallback(async () => {
    if (!isOpen || mode !== 'camera' || capturedImage) return;

    // Check secure context
    if (typeof window !== 'undefined' && !window.isSecureContext && window.location.hostname !== 'localhost') {
      setCameraError({
        title: 'INSECURE ENVIRONMENT DETECTED',
        message:
          'Webcam access requires an encrypted context (HTTPS or http://localhost). Please access JARVIS via localhost or your secure Vercel URL.',
        action: 'security',
      });
      return;
    }

    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError({
        title: 'CAMERA HARDWARE API UNAVAILABLE',
        message: 'Your browser or environment does not support navigator.mediaDevices.getUserMedia.',
        action: 'device',
      });
      return;
    }

    setIsInitializing(true);
    setCameraError(null);
    stopCamera();

    // Constraint candidates ladder
    const constraintCandidates: MediaStreamConstraints[] = [];

    if (selectedDeviceId) {
      constraintCandidates.push({
        video: {
          deviceId: { exact: selectedDeviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
    }

    // High quality preferred
    constraintCandidates.push({
      video: {
        facingMode,
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });

    // Standard fallback
    constraintCandidates.push({
      video: {
        facingMode,
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    });

    // Universal fallback: bare minimum video
    constraintCandidates.push({ video: true });

    let activeStream: MediaStream | null = null;
    let lastError: any = null;

    for (const constraints of constraintCandidates) {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (activeStream) break;
      } catch (err: any) {
        lastError = err;
        // If permission explicitly denied, no need to retry with lower constraints
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          break;
        }
      }
    }

    if (!activeStream) {
      setIsInitializing(false);
      console.error('[JARVIS Vision] All camera constraint attempts failed:', lastError);

      if (lastError?.name === 'NotAllowedError' || lastError?.name === 'PermissionDeniedError') {
        setCameraError({
          title: 'OPTICAL SENSOR PERMISSION DENIED',
          message:
            'Camera permission was blocked. Please click the camera or lock icon in your browser address bar to grant permission, then click "RETRY SENSOR".',
          action: 'permission',
        });
      } else if (lastError?.name === 'NotFoundError' || lastError?.name === 'DevicesNotFoundError') {
        setCameraError({
          title: 'NO OPTICAL SENSOR DETECTED',
          message:
            'No webcam or optical sensor found on your machine. You can connect a webcam or switch to "IMPORT IMAGE FILE" to analyze images.',
          action: 'device',
        });
      } else if (lastError?.name === 'NotReadableError' || lastError?.name === 'TrackStartError') {
        setCameraError({
          title: 'OPTICAL SENSOR HARDWARE BUSY',
          message:
            'The camera is currently locked by another application (e.g. Zoom, Teams, Discord, or another browser window). Please close other camera apps and retry.',
          action: 'inuse',
        });
      } else {
        setCameraError({
          title: 'OPTICAL SENSOR INITIALIZATION FAILED',
          message:
            lastError?.message ||
            'Unable to initialize optical video feed. Please verify camera connections or import an image directly.',
          action: 'generic',
        });
      }
      return;
    }

    streamRef.current = activeStream;

    // Attach to video element
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.srcObject = activeStream;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsStreaming(true);
            setIsInitializing(false);
            if (video.videoWidth && video.videoHeight) {
              setResolution(`${video.videoWidth}x${video.videoHeight}`);
            }
          })
          .catch((playErr) => {
            console.warn('[JARVIS Vision] Autoplay error, attaching metadata listener:', playErr);
          });
      }

      video.onloadedmetadata = () => {
        video.play().catch(() => {});
        setIsStreaming(true);
        setIsInitializing(false);
        if (video.videoWidth && video.videoHeight) {
          setResolution(`${video.videoWidth}x${video.videoHeight}`);
        }
      };
    } else {
      setIsStreaming(true);
      setIsInitializing(false);
    }

    // Refresh devices list to populate device labels now that permission is granted
    updateDeviceList();
  }, [isOpen, mode, capturedImage, selectedDeviceId, facingMode, stopCamera, updateDeviceList]);

  // Lifecycle
  useEffect(() => {
    if (isOpen && mode === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, mode, capturedImage, selectedDeviceId, facingMode]);

  // Toggle front/back camera
  const handleToggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    setSelectedDeviceId('');
  };

  // Switch specific device
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };

  // High-precision Snapshot capture
  const handleCaptureSnapshot = () => {
    const video = videoRef.current;
    if (!video || !isStreaming) return;

    // Trigger visual flash feedback
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw frame
    ctx.drawImage(video, 0, 0, width, height);

    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const base64 = dataUrl.split(',')[1];
      setCapturedImage(base64);
      stopCamera();
    } catch (err) {
      console.error('[JARVIS Vision] Snapshot capture error:', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      setCapturedImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitAnalysis = async () => {
    if (!capturedImage) return;
    await onAnalyzeImage(capturedImage, prompt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-950 border border-cyan-500/40 rounded-2xl hud-corner-box overflow-hidden shadow-[0_0_60px_rgba(0,240,255,0.25)] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div>
              <h3 className="font-orbitron font-semibold text-sm text-cyan-300 tracking-wider">
                OPTICAL INTELLIGENCE SCANNER
              </h3>
              <p className="text-[10px] font-mono-tech text-cyan-500/70">
                MULTIMODAL NEURAL RECOGNITION &amp; TELEMETRY
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950/60 transition-colors"
            title="Close Optical Scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-cyan-500/20 bg-black/50">
          <button
            onClick={() => {
              setCapturedImage(null);
              setMode('camera');
            }}
            className={`flex-1 py-2.5 text-xs font-orbitron tracking-wider flex items-center justify-center gap-2 transition-all ${
              mode === 'camera'
                ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                : 'text-cyan-500/60 hover:text-cyan-400'
            }`}
          >
            <Camera className="w-4 h-4" />
            LIVE OPTICAL FEED
          </button>
          <button
            onClick={() => {
              stopCamera();
              setMode('upload');
            }}
            className={`flex-1 py-2.5 text-xs font-orbitron tracking-wider flex items-center justify-center gap-2 transition-all ${
              mode === 'upload'
                ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                : 'text-cyan-500/60 hover:text-cyan-400'
            }`}
          >
            <Upload className="w-4 h-4" />
            IMPORT IMAGE FILE
          </button>
        </div>

        {/* Viewport Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Video or Image Container */}
          <div className="relative aspect-video w-full rounded-xl bg-black border border-cyan-500/40 overflow-hidden flex items-center justify-center shadow-inner">
            {/* Flash Effect on capture */}
            {isFlashing && (
              <div className="absolute inset-0 z-30 bg-white/80 animate-fade-out pointer-events-none" />
            )}

            {capturedImage ? (
              <div className="relative w-full h-full">
                <img
                  src={`data:image/jpeg;base64,${capturedImage}`}
                  alt="Captured Target"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/50 text-[10px] font-mono-tech text-cyan-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  SNAPSHOT LOCKED
                </div>
              </div>
            ) : mode === 'camera' ? (
              <>
                {/* Always render video element so videoRef attaches cleanly */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isStreaming && !cameraError ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Loading State */}
                {isInitializing && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/90">
                    <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    <p className="text-xs font-orbitron text-cyan-300 tracking-wider animate-pulse">
                      ACQUIRING OPTICAL SENSOR FEED...
                    </p>
                  </div>
                )}

                {/* Error Banner */}
                {cameraError && (
                  <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-black/95 z-20">
                    <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-3">
                      {cameraError.action === 'permission' ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <CameraOff className="w-6 h-6" />
                      )}
                    </div>
                    <h4 className="font-orbitron font-semibold text-xs text-rose-300 tracking-wider mb-2">
                      {cameraError.title}
                    </h4>
                    <p className="font-rajdhani text-xs text-slate-300 max-w-sm mb-4 leading-relaxed">
                      {cameraError.message}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => startCamera()}
                        className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-orbitron text-[11px] tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        RETRY SENSOR
                      </button>
                      <button
                        onClick={() => {
                          stopCamera();
                          setMode('upload');
                        }}
                        className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-orbitron text-[11px] tracking-wider transition-all"
                      >
                        USE FILE INSTEAD
                      </button>
                    </div>
                  </div>
                )}

                {/* Holographic HUD Reticle & Telemetry */}
                {isStreaming && !cameraError && (
                  <>
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-44 h-44 border border-cyan-400/30 rounded-full animate-pulse" />
                      <div className="w-48 h-48 border border-cyan-500/20 border-dashed rounded-full" />
                      <div className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]" />
                      <div className="absolute w-full h-[1px] bg-cyan-500/25" />
                      <div className="absolute h-full w-[1px] bg-cyan-500/25" />
                      {/* Corner brackets */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60" />
                      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60" />
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60" />
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60" />
                    </div>

                    {/* Status Pill */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur border border-cyan-500/40 text-[10px] font-mono-tech text-cyan-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE FEED {resolution ? `• ${resolution}` : ''}
                    </div>

                    {/* Camera Switch / Facing Mode Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {devices.length > 1 && (
                        <select
                          value={selectedDeviceId}
                          onChange={handleDeviceChange}
                          className="bg-black/80 backdrop-blur border border-cyan-500/40 rounded-md px-2 py-0.5 text-[10px] font-mono-tech text-cyan-300 focus:outline-none"
                        >
                          <option value="">Auto Camera</option>
                          {devices.map((d, idx) => (
                            <option key={d.deviceId || idx} value={d.deviceId}>
                              {d.label || `Camera ${idx + 1}`}
                            </option>
                          ))}
                        </select>
                      )}
                      <button
                        onClick={handleToggleFacingMode}
                        title="Flip Front/Rear Camera"
                        className="p-1 rounded-md bg-black/80 backdrop-blur border border-cyan-500/40 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-950/60 transition-colors"
                      >
                        <SwitchCamera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              /* File Import Area */
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-cyan-950/20 transition-colors p-6">
                <Upload className="w-10 h-10 text-cyan-400 mb-2 animate-bounce" />
                <span className="font-orbitron text-xs text-cyan-300 tracking-wider">
                  CLICK TO SELECT IMAGE / INTEL PHOTO
                </span>
                <span className="text-[11px] font-mono-tech text-cyan-500/60 mt-1">
                  Supports JPEG, PNG, WebP, GIF
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none hud-scanlines opacity-50" />
          </div>

          {/* Capture Trigger */}
          {mode === 'camera' && !capturedImage && isStreaming && !cameraError && (
            <button
              onClick={handleCaptureSnapshot}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-500/40 border border-cyan-400 text-cyan-100 font-orbitron text-xs tracking-wider flex items-center justify-center gap-2 glow-cyan-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]"
            >
              <Camera className="w-4 h-4 text-cyan-300" />
              LOCK TARGET SNAPSHOT
            </button>
          )}

          {/* Image Analysis Controls */}
          {capturedImage && (
            <div className="space-y-3 animate-fade-in">
              {/* Preset Prompts Chips */}
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(p)}
                    className={`text-[11px] px-2.5 py-1 rounded-full font-mono-tech border transition-all ${
                      prompt === p
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-black/40 border-cyan-500/20 text-cyan-500/70 hover:text-cyan-300'
                    }`}
                  >
                    {p.slice(0, 36)}...
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Inquiry for JARVIS..."
                  className="flex-1 bg-black/70 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-cyan-100 placeholder-cyan-600/50 font-rajdhani focus:outline-none focus:border-cyan-300"
                />
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    if (mode === 'camera') startCamera();
                  }}
                  className="p-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-cyan-200"
                  title="Retake image"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleSubmitAnalysis}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-400 text-cyan-100 font-orbitron text-xs tracking-wider flex items-center justify-center gap-2 glow-cyan-md transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                    PROCESSING NEURAL ANALYSIS...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 text-cyan-300" />
                    TRANSMIT TO J.A.R.V.I.S.
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
