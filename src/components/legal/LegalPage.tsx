import React, { useEffect } from 'react';
import { PRIVACY_POLICY } from '../../content/legal/privacyPolicy.js';
import { TERMS_OF_SERVICE } from '../../content/legal/termsOfService.js';
import { sound } from '../../utils/soundEffects.js';

interface LegalPageProps {
  documentType: 'privacy' | 'terms';
  onNavigate: (target: 'privacy' | 'terms' | 'app') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  documentType,
  onNavigate
}) => {
  const doc = documentType === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${doc.title} — Jifuno Kenya`;
  }, [documentType, doc.title]);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-emerald-900/60 bg-slate-950/95 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('app');
            }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Return to Jifuno"
          >
            🇰🇪
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white tracking-tight">Jifuno</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                CBC
              </span>
            </div>
            <p className="text-[10px] text-emerald-400 font-medium">Learn. Play. Level Up.</p>
          </div>
        </div>

        {/* Back / Navigation buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate(documentType === 'privacy' ? 'terms' : 'privacy');
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-700/60 hover:border-emerald-500 bg-emerald-950/40 text-emerald-300 hover:text-white transition-all cursor-pointer"
          >
            {documentType === 'privacy' ? 'View Terms of Service' : 'View Privacy Policy'}
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('app');
            }}
            className="text-xs font-bold px-3.5 py-1.5 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            ← Back to App
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Title & Metadata Banner */}
        <div className="space-y-3 border-b border-emerald-900/40 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <span>🛡️</span>
            <span>Kenyan CBC Learning Safeguards</span>
            <span className="text-gray-500">•</span>
            <span className="text-[11px] text-gray-400 font-mono">v{doc.version}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {doc.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
            {doc.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
            <span>Last updated: <strong className="text-gray-200">{doc.lastUpdated}</strong></span>
            <span>•</span>
            <span>Governing jurisdiction: <strong className="text-emerald-400">Republic of Kenya</strong></span>
          </div>
        </div>

        {/* "In Plain Words" Summary Box */}
        <section className="bg-gradient-to-br from-emerald-950/70 via-slate-900/90 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm uppercase tracking-wide">
            <span className="text-lg">✨</span>
            <span>In Plain Words (Summary for Parents & Guardians)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-200 leading-relaxed list-disc list-inside">
            {doc.summary.map((point, idx) => (
              <li key={idx} className="marker:text-emerald-400">
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Table of Contents */}
        <nav aria-label="Table of Contents" className="bg-slate-900/70 border border-emerald-900/50 rounded-2xl p-4 sm:p-5 space-y-2.5">
          <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {doc.sections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="text-left text-xs text-emerald-400 hover:text-emerald-200 hover:underline py-1 px-2 rounded-lg hover:bg-emerald-950/40 transition-colors cursor-pointer truncate"
              >
                {idx + 1}. {sec.title.replace(/^\d+\.\s*/, '')}
              </button>
            ))}
          </div>
        </nav>

        {/* Policy / Terms Sections */}
        <div className="space-y-8 pt-2">
          {doc.sections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-3 border-b border-slate-900 pb-6 last:border-b-0"
            >
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span className="text-emerald-400">#</span>
                <span>{section.title}</span>
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}

                {section.bullets && (
                  <ul className="space-y-2 pt-1 pl-4 list-disc marker:text-emerald-400 text-gray-200">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Contact Us Footer Section */}
        <section className="bg-slate-900/90 border border-emerald-800/50 rounded-2xl p-5 sm:p-6 text-center space-y-2">
          <h3 className="text-sm font-bold text-white">Contact Us</h3>
          <p className="text-xs text-gray-300 leading-relaxed max-w-lg mx-auto">
            {doc.contactLine}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate('app');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
            >
              Return to Jifuno Learning App ➔
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-950 bg-slate-950/90 px-4 py-4 text-center text-xs text-gray-500 space-y-1">
        <p>
          🇰🇪 <strong className="text-gray-400">Jifuno</strong> • Kenyan Competency-Based Education (CBE) Learning App
        </p>
        <p className="text-[11px] text-gray-600">
          Aligned with KICD curriculum competencies for Grades 3 to 6.
        </p>
      </footer>
    </div>
  );
};
