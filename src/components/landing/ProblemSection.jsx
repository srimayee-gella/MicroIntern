import React from 'react';
import { GraduationCap, Building2, GitCompare, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProblemSection = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-3">
            Market Need
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why MicroIntern?
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            Traditional internships demand 3 to 6 months of 40-hour weeks. We bridge the disconnect with modular, high-impact sprint work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: For Students */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-2 block">
                The Student Challenge
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                For Students
              </h3>
              <blockquote className="text-base font-semibold text-slate-800 italic border-l-2 border-brand-500 pl-3 mb-4">
                "Long-term internships don't fit everyone's schedule."
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                Between college classes, exams, and campus life, committing to an inflexible 6-month corporate internship is near impossible. Students need bite-sized projects to build proof-of-work on their own terms.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore student perks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: For Businesses */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 block">
                The Startup Dilemma
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                For Businesses
              </h3>
              <blockquote className="text-base font-semibold text-slate-800 italic border-l-2 border-purple-500 pl-3 mb-4">
                "Small businesses often need help with short-term tasks without hiring full-time employees."
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                Startups need social media graphics, code fixes, inventory cleanup, or content right now. Agencies charge exorbitant minimum retainers, and full-time hiring takes months of recruiting overhead.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-purple-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>Why businesses win</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: The Gap */}
          <div className="bg-gradient-to-b from-white to-indigo-50/40 rounded-3xl p-8 border border-indigo-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md shadow-indigo-500/20">
                <GitCompare className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
                The Solution
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                The Gap
              </h3>
              <blockquote className="text-base font-semibold text-slate-800 italic border-l-2 border-indigo-600 pl-3 mb-4">
                "There is no simple platform connecting students with flexible short-term opportunities."
              </blockquote>
              <p className="text-sm text-slate-600 leading-relaxed">
                MicroIntern fills this exact gap: a structured, reliable platform offering verified projects, transparent milestone pricing in ₹, automated escrow, and instant digital credentialing.
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-indigo-600 gap-1 group-hover:translate-x-1 transition-transform">
              <span>How our platform works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
