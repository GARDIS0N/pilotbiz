import React from 'react';
import { FullBriefingReport } from '../types/jarvis';
import {
  FileText,
  X,
  Sparkles,
  Calendar,
  History,
  TrendingUp,
  Award,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ReportPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: FullBriefingReport | null;
}

export const ReportPanelModal: React.FC<ReportPanelModalProps> = ({
  isOpen,
  onClose,
  report,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !report) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(report.contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'daily_briefing':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
      case 'evening_review':
        return 'bg-purple-500/20 text-purple-300 border-purple-400/40';
      case 'weekly_scorecard':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/40';
      case 'audit':
        return 'bg-rose-500/20 text-rose-300 border-rose-400/40';
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in select-text">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-950 border border-cyan-500/40 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.25)] hud-grid">
        {/* Modal Header */}
        <div className="p-4 border-b border-cyan-500/25 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded border ${getBadgeColor(report.type)}`}>
                  {report.type.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono-tech text-cyan-500/60">
                  {report.createdAt}
                </span>
              </div>
              <h3 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wide mt-0.5">
                {report.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-colors text-xs flex items-center gap-1 font-mono-tech"
              title="Copy markdown text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-cyan-400 hover:text-cyan-200 hover:bg-cyan-900/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Spoken Summary Highlight Banner */}
        {report.summarySpoken && (
          <div className="px-4 py-2.5 bg-cyan-950/40 border-b border-cyan-500/20 flex items-start gap-2 text-xs font-rajdhani text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-orbitron font-bold text-cyan-400 text-[11px] uppercase mr-1">
                EXECUTIVE AUDIO SUMMARY:
              </span>
              <span>{report.summarySpoken}</span>
            </div>
          </div>
        )}

        {/* Markdown Content Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-rajdhani text-cyan-100 text-sm leading-relaxed scrollbar-thin">
          <div className="prose prose-invert prose-cyan max-w-none text-xs sm:text-sm whitespace-pre-wrap font-sans">
            {report.contentMarkdown}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-cyan-500/20 bg-slate-900/60 flex items-center justify-between text-xs font-mono-tech text-cyan-500/60">
          <span>JARVIS CHIEF OF STAFF // AMBITION TO EXECUTION</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-orbitron font-semibold tracking-wider transition-all"
          >
            DISMISS PANEL
          </button>
        </div>
      </div>
    </div>
  );
};
