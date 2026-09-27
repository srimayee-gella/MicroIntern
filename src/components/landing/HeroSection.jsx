import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Clock, 
  IndianRupee,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export const HeroSection = () => {
  const { navigateTo, userRole } = useApp();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
      {/* Background glowing blur orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-300/20 to-purple-400/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>The #1 Micro-Internship Marketplace for College Talent</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Real Projects.{' '}
            <span className="gradient-text">Real Experience.</span>{' '}
            <br className="hidden sm:inline" />
            Your Flexible Opportunity.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8">
            MicroIntern connects students with businesses for short-term projects that match their skills, interests and free time.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('find-projects')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Find Projects</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo('for-businesses')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-sm transition-all"
            >
              <Briefcase className="w-5 h-5 text-slate-500" />
              <span>Post a Project</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No Long-Term Commitments
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Guaranteed ₹ Escrow Payouts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Verified Digital Certificate
            </span>
          </div>
        </div>

        {/* Startup Illustration: Student → MicroIntern → Business */}
        <div className="relative max-w-4xl mx-auto mt-6 p-4 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/90 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-400">
              How Opportunity Flows
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left Node: Student */}
            <div className="bg-gradient-to-b from-brand-50/50 to-white p-5 rounded-2xl border border-brand-100/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4 shadow-md shadow-brand-500/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Student</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full">
                  Flexible
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Wants hands-on portfolio experience without 6-month rigid locks.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">React.js</span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">Canva</span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">Excel</span>
              </div>
            </div>

            {/* Middle Node: MicroIntern Platform */}
            <div className="relative bg-gradient-to-b from-indigo-900 to-slate-950 p-6 rounded-2xl text-white shadow-xl border border-indigo-700/50 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-500 flex items-center justify-center mb-3 shadow-lg shadow-brand-500/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-extrabold text-lg text-white mb-1">MicroIntern</h4>
              <p className="text-xs text-indigo-200 mb-4">
                Smart skill matching • 3-7 day sprints • Secure escrow
              </p>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Instant Connections
              </div>
            </div>

            {/* Right Node: Business */}
            <div className="bg-gradient-to-b from-emerald-50/50 to-white p-5 rounded-2xl border border-emerald-100/80 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-500/20">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-base">Small Business</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Fast Hiring
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Needs immediate help on focused tasks without agency markups.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">3-Day Tasks</span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">₹1k - ₹5k</span>
                <span className="text-[10px] font-medium bg-white px-2 py-0.5 rounded border text-slate-600">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
