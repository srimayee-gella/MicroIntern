import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CTASection = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold mb-6 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Join The Future of Work
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-6">
          Ready to Turn Your Skills Into <br className="hidden sm:inline" />
          <span className="gradient-text bg-gradient-to-r from-brand-400 via-indigo-300 to-purple-400">
            Real Experience & Earnings?
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Whether you're a student looking for a 3-day sprint or a startup founder seeking fast assistance, start right now with zero friction.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('find-projects')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigateTo('for-businesses')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
          >
            <span>Post a Business Project</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to join
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% verified startups
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct UPI bank transfers
          </span>
        </div>
      </div>
    </section>
  );
};
