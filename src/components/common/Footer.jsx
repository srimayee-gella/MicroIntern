import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Heart, ShieldCheck, Zap, Mail, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Micro<span className="text-brand-400">Intern</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting ambitious college students with high-growth startups and small businesses for bite-sized, skill-building micro-internships.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-emerald-400 font-medium border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Safe Escrow Payments
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-brand-300 font-medium border border-brand-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Certificates
              </span>
            </div>
          </div>

          {/* Column 1: For Students */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('find-projects')} className="hover:text-white transition">
                  Find Projects
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('student-dashboard', null, 'earnings')} className="hover:text-white transition">
                  Earnings & Payouts
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('student-dashboard', null, 'certificates')} className="hover:text-white transition">
                  Digital Certificates
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-white transition">
                  Student Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Businesses */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              For Businesses
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('for-businesses')} className="hover:text-white transition">
                  Why Hire Students
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('business-dashboard', null, 'post-project')} className="hover:text-white transition">
                  Post a Project
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('business-dashboard')} className="hover:text-white transition">
                  Manage Applications
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('for-businesses')} className="hover:text-white transition">
                  Startup Solutions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & About */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition">
                  Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('how-it-works')} className="hover:text-white transition">
                  How It Works
                </button>
              </li>
              <li>
                <a href="#demo" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }} className="hover:text-white transition">
                  Pitch & E-Cell Demo
                </a>
              </li>
              <li>
                <span className="text-slate-500 text-xs">Bangalore • Mumbai • Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border & copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MicroIntern Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with modern web standards for college innovation & startup velocity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
