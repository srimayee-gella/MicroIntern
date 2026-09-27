import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Building2, 
  Target, 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Heart
} from 'lucide-react';

export const AboutPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Mission Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200/90 shadow-sm text-center relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20 mb-6">
            <Target className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-3">
            Our Core Mission
          </span>

          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug max-w-3xl mx-auto">
            "MicroIntern aims to make practical experience accessible to students while helping small businesses find flexible and affordable support."
          </blockquote>

          <p className="text-sm sm:text-base text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            We believe traditional internship structures are broken for modern undergraduate lives. By unbundling lengthy internships into bite-sized, outcome-based micro-sprints, we unlock immense latent talent across colleges and empower early-stage startups to move faster.
          </p>
        </div>

        {/* Two Columns: How MicroIntern Helps Students & How MicroIntern Helps Businesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">How MicroIntern Helps Students</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Schedule Conflicts:</strong> Take up 2 to 5-day sprints that fit between exams, labs, and semester breaks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Real Portfolio Proof-of-Work:</strong> Replace theoretical mock assignments with shipped deliverables for real registered companies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Instant Guaranteed Earnings:</strong> Escrow-backed UPI disbursements for every successfully completed milestone.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Verifiable Credentials:</strong> Digital certificates stamped with employer sign-off and skill endorsements.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('find-projects')}
              className="inline-flex items-center gap-2 font-bold text-xs text-brand-600 hover:text-brand-700 pt-4"
            >
              <span>Explore Student Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* For Businesses */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">How MicroIntern Helps Businesses</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Affordable Sprints:</strong> Solve immediate roadblocks (Figma mockups, bug fixes, data sanitation) without agency overhead.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Speed & Velocity:</strong> Get deliverables in hand within days instead of waiting weeks for recruiting pipelines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Try-Before-You-Hire:</strong> Evaluate hungry, talented candidates on live tasks before extending long-term offers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Zero HR Administrative Burden:</strong> Automated escrow, milestone verification, and structured ratings.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('for-businesses')}
              className="inline-flex items-center gap-2 font-bold text-xs text-emerald-600 hover:text-emerald-700 pt-4"
            >
              <span>Learn About Startup Hiring</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Future Vision Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <Rocket className="w-3.5 h-3.5" />
            Roadmap & Vision
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Our Vision: The Talent Operating System for Higher Education
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            We envision an ecosystem where no college student graduates with an empty resume or relies solely on GPA. By partnering with university E-Cells, incubation centers, and SMB networks across Tier-1, Tier-2, and Tier-3 cities in India, MicroIntern is building the merit-first credential infrastructure for the new economy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs">
            <div>
              <span className="font-bold text-white block text-sm mb-1">Campus E-Cell Integrations</span>
              <p className="text-slate-400">Direct partnership pipelines with student entrepreneurship cells.</p>
            </div>
            <div>
              <span className="font-bold text-white block text-sm mb-1">AI-Assisted Skill Verification</span>
              <p className="text-slate-400">Automated portfolio code and design scoring for candidate matching.</p>
            </div>
            <div>
              <span className="font-bold text-white block text-sm mb-1">Pan-India Micro-Grants</span>
              <p className="text-slate-400">Sponsored micro-internships for student open-source impact work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
