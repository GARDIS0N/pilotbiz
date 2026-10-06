import React, { useState } from 'react';
import { X, FileText, Link, Sparkles, Copy, Check } from 'lucide-react';

interface SummarizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSummarize: (content: string, isUrl: boolean) => Promise<string>;
}

export const SummarizeModal: React.FC<SummarizeModalProps> = ({
  isOpen,
  onClose,
  onSummarize,
}) => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isUrl = inputText.trim().startsWith('http://') || inputText.trim().startsWith('https://');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult('');
    try {
      const summary = await onSummarize(inputText.trim(), isUrl);
      setResult(summary);
    } catch (err: any) {
      setResult('Error generating summary: ' + (err.message || 'Operation failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/40 rounded-2xl hud-corner-box overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-orbitron font-semibold text-sm text-cyan-300 tracking-wider">
              TACTICAL DOCUMENT / URL DIGEST
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-cyan-400 hover:text-cyan-200 hover:bg-cyan-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste article text, technical documentation, or URL (https://...) for J.A.R.V.I.S. to distill..."
                className="w-full bg-black/70 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-100 placeholder-cyan-600/50 font-rajdhani focus:outline-none focus:border-cyan-400"
              />
              {isUrl && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono-tech text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  <Link className="w-3 h-3" />
                  <span>URL DETECTED</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-full py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400 text-cyan-100 font-orbitron text-xs tracking-wider flex items-center justify-center gap-2 glow-cyan-sm transition-all disabled:opacity-40"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                  ANALYZING & DISTILLING CONTENT...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  GENERATE EXECUTIVE SUMMARY
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="space-y-2 pt-2 border-t border-cyan-500/20">
              <div className="flex items-center justify-between text-xs font-mono-tech text-cyan-400">
                <span>BRIEFING VERDICT:</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-200"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <div className="max-h-56 overflow-y-auto p-3 rounded-xl bg-black/60 border border-cyan-500/30 font-rajdhani text-xs text-cyan-100/90 leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
