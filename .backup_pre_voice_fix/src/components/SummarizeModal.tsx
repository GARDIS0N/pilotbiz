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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#06140F] border border-[#134E39] rounded-2xl overflow-hidden shadow-2xl text-[#ECFDF5]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#134E39] bg-[#091F16]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-bold text-sm tracking-wide text-[#ECFDF5]">
              DOCUMENT / URL SUMMARY
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-emerald-400 hover:text-white hover:bg-[#134E39] transition-colors"
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
                placeholder="Paste article text, notes, or URL (https://...) for Jarvis to summarize..."
                className="w-full bg-[#091F16] border border-[#134E39] rounded-xl p-3 text-xs text-[#ECFDF5] placeholder-emerald-600 focus:outline-none focus:border-[#10B981]"
              />
              {isUrl && (
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-mono text-emerald-300 bg-[#06140F] px-2 py-0.5 rounded border border-[#134E39]">
                  <Link className="w-3 h-3 text-[#10B981]" />
                  <span>URL DETECTED</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-full py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-40 shadow"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Analyzing & Distilling Content...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Summary</span>
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="space-y-2 pt-2 border-t border-[#134E39]">
              <div className="flex items-center justify-between text-xs font-mono text-[#10B981]">
                <span>SUMMARY:</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-emerald-400 hover:text-white"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="max-h-56 overflow-y-auto p-3 rounded-xl bg-[#091F16] border border-[#134E39] text-xs text-[#ECFDF5] leading-relaxed whitespace-pre-wrap">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
