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
          title: 'CAMERA SENSOR PERMISSION DENIED',
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
          title: 'CAMERA SENSOR HARDWARE BUSY',
          message:
            'The camera is currently locked by another application (e.g. Zoom, Teams, Discord, or another browser window). Please close other camera apps and retry.',
          action: 'inuse',
        });
      } else {
        setCameraError({
          title: 'CAMERA SENSOR INITIALIZATION FAILED',
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
  }, [isOpen, mode, capturedImage, selectedDeviceId, facingMode, startCamera, stopCamera]);

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

    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#06140F] border border-[#134E39] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-[#ECFDF5]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#134E39] bg-[#091F16]">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-[#10B981] animate-pulse" />
            <div>
              <h3 className="font-bold text-sm text-[#ECFDF5] tracking-wide">
                CAMERA & VISION
              </h3>
              <p className="text-[10px] text-emerald-400/80 font-mono">
                Multimodal Image Analysis & Scanning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors"
            title="Close Camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-[#134E39] bg-[#091F16]/50">
          <button
            onClick={() => {
              setCapturedImage(null);
              setMode('camera');
            }}
            className={`flex-1 py-2.5 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all ${
              mode === 'camera'
                ? 'bg-[#134E39] text-white border-b-2 border-[#10B981]'
                : 'text-emerald-300/70 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            LIVE CAMERA FEED
          </button>
          <button
            onClick={() => {
              stopCamera();
              setMode('upload');
            }}
            className={`flex-1 py-2.5 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all ${
              mode === 'upload'
                ? 'bg-[#134E39] text-white border-b-2 border-[#10B981]'
                : 'text-emerald-300/70 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            UPLOAD IMAGE FILE
          </button>
        </div>

        {/* Viewport Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Video or Image Container */}
          <div className="relative aspect-video w-full rounded-xl bg-black border border-[#134E39] overflow-hidden flex items-center justify-center shadow-inner">
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
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-[#091F16]/90 border border-[#10B981] text-[10px] font-mono text-[#ECFDF5] flex items-center gap-1.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  IMAGE CAPTURED
                </div>
              </div>
            ) : mode === 'camera' ? (
              <>
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
                    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-[#10B981] rounded-full animate-spin" />
                    <p className="text-xs text-emerald-300 tracking-wide animate-pulse">
                      Acquiring camera feed...
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
                    <h4 className="font-semibold text-xs text-rose-300 tracking-wide mb-2">
                      {cameraError.title}
                    </h4>
                    <p className="text-xs text-emerald-200/80 max-w-sm mb-4 leading-relaxed">
                      {cameraError.message}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => startCamera()}
                        className="px-4 py-1.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        RETRY SENSOR
                      </button>
                      <button
                        onClick={() => {
                          stopCamera();
                          setMode('upload');
                        }}
                        className="px-4 py-1.5 rounded-xl bg-[#091F16] hover:bg-[#134E39] border border-[#134E39] text-[#ECFDF5] text-xs transition-all"
                      >
                        USE FILE INSTEAD
                      </button>
                    </div>
                  </div>
                )}

                {/* Reticle & Live Telemetry */}
                {isStreaming && !cameraError && (
                  <>
                    {/* Status Pill */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur border border-[#134E39] text-[10px] font-mono text-[#10B981] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      LIVE FEED {resolution ? `• ${resolution}` : ''}
                    </div>

                    {/* Camera Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {devices.length > 1 && (
                        <select
                          value={selectedDeviceId}
                          onChange={handleDeviceChange}
                          className="bg-black/80 backdrop-blur border border-[#134E39] rounded-md px-2 py-0.5 text-[10px] font-mono text-[#ECFDF5] focus:outline-none"
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
                        className="p-1 rounded-md bg-black/80 backdrop-blur border border-[#134E39] text-emerald-300 hover:text-white transition-colors"
                      >
                        <SwitchCamera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              /* File Import Area */
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-[#134E39]/20 transition-colors p-6">
                <Upload className="w-10 h-10 text-[#10B981] mb-2 animate-bounce" />
                <span className="font-semibold text-xs text-[#ECFDF5] tracking-wide">
                  CLICK TO SELECT IMAGE FILE
                </span>
                <span className="text-[11px] font-mono text-emerald-400/70 mt-1">
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
          </div>

          {/* Capture Trigger */}
          {mode === 'camera' && !capturedImage && isStreaming && !cameraError && (
            <button
              onClick={handleCaptureSnapshot}
              className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all shadow"
            >
              <Camera className="w-4 h-4 text-white" />
              CAPTURE SNAPSHOT
            </button>
          )}

          {/* Image Analysis Controls */}
          {capturedImage && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex flex-wrap gap-1.5">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrompt(p)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                      prompt === p
                        ? 'bg-[#10B981] text-white border-[#10B981]'
                        : 'bg-[#091F16] border-[#134E39] text-emerald-300 hover:text-white'
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
                  placeholder="Ask Jarvis about this image..."
                  className="flex-1 bg-[#091F16] border border-[#134E39] rounded-xl px-3 py-2 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
                />
                <button
                  onClick={() => {
                    setCapturedImage(null);
                    if (mode === 'camera') startCamera();
                  }}
                  className="p-2 rounded-xl bg-[#091F16] border border-[#134E39] text-emerald-400 hover:text-white"
                  title="Retake image"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleSubmitAnalysis}
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Analyzing Image with Jarvis...</span>
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    <span>Send to Jarvis</span>
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
