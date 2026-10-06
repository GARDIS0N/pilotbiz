import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, X, Scan, Sparkles, RefreshCw } from 'lucide-react';

interface VisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeImage: (base64Image: string, promptText: string) => Promise<void>;
  isLoading: boolean;
}

export const VisionModal: React.FC<VisionModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeImage,
  isLoading,
}) => {
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('Analyze this image and provide tactical insights.');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen && mode === 'camera' && !capturedImage) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, mode, capturedImage]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Optical sensor unavailable: camera access denied or device missing.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
    setCapturedImage(base64);
    stopCamera();
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
      <div className="relative w-full max-w-xl bg-slate-950 border border-cyan-500/40 rounded-2xl hud-corner-box overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="font-orbitron font-semibold text-sm text-cyan-300 tracking-wider">
              OPTICAL INTELLIGENCE SCANNER
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-cyan-500/20 bg-black/40">
          <button
            onClick={() => {
              setCapturedImage(null);
              setMode('camera');
            }}
            className={`flex-1 py-2 text-xs font-orbitron tracking-wider flex items-center justify-center gap-2 transition-all ${
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
            className={`flex-1 py-2 text-xs font-orbitron tracking-wider flex items-center justify-center gap-2 transition-all ${
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
        <div className="p-4 space-y-4">
          <div className="relative aspect-video w-full rounded-xl bg-black border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {capturedImage ? (
              <img
                src={`data:image/jpeg;base64,${capturedImage}`}
                alt="Captured Target"
                className="w-full h-full object-contain"
              />
            ) : mode === 'camera' ? (
              cameraError ? (
                <div className="p-4 text-center font-mono-tech text-xs text-rose-400">
                  <p>{cameraError}</p>
                  <p className="mt-2 text-cyan-400">You may switch to "IMPORT IMAGE FILE" above.</p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Holographic targeting reticle */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-40 h-40 border border-cyan-400/40 rounded-full animate-pulse" />
                    <div className="absolute w-2 h-2 bg-cyan-400 rounded-full" />
                    <div className="absolute w-full h-[1px] bg-cyan-500/20" />
                    <div className="absolute h-full w-[1px] bg-cyan-500/20" />
                  </div>
                </>
              )
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer hover:bg-cyan-950/20 transition-colors p-4">
                <Upload className="w-10 h-10 text-cyan-400 mb-2 animate-bounce" />
                <span className="font-orbitron text-xs text-cyan-300">
                  CLICK TO SELECT IMAGE / INTEL PHOTO
                </span>
                <span className="text-[11px] font-mono-tech text-cyan-500/60 mt-1">
                  Supports JPEG, PNG, WebP
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none hud-scanlines" />
          </div>

          {/* Controls */}
          {mode === 'camera' && !capturedImage && !cameraError && (
            <button
              onClick={handleCaptureSnapshot}
              className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 text-cyan-200 font-orbitron text-xs tracking-wider flex items-center justify-center gap-2 glow-cyan-sm transition-all"
            >
              <Camera className="w-4 h-4" />
              LOCK TARGET SNAPSHOT
            </button>
          )}

          {capturedImage && (
            <div className="space-y-3">
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
                    <Scan className="w-4 h-4" />
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
