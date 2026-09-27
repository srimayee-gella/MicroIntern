import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Clock, 
  IndianRupee, 
  Users, 
  Award,
  Layers,
  Check
} from 'lucide-react';

export const ForBusinessesPage = () => {
  const { navigateTo, userRole, login, businesses } = useApp();

  const handlePostProjectClick = () => {
    if (userRole === 'business') {
      navigateTo('business-dashboard', null, 'post-project');
    } else {
      // Log in as demo business or navigate to post-project
      login('business', businesses[0]);
      navigateTo('business-dashboard', null, 'post-project');
    }
  };

  const benefits = [
    {
      title: "Affordable",
      desc: "Fixed milestone pricing from ₹1,000 to ₹5,000. Zero agency retainer fees or full-time recruiter markups.",
      icon: IndianRupee,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Flexible",
      desc: "Hire strictly for the task at hand. 2-day to 7-day micro-sprints with zero continuous payroll obligations.",
      icon: Clock,
      color: "bg-brand-50 text-brand-600"
    },
    {
      title: "Quick Hiring",
      desc: "Post a task in 3 minutes and receive pre-screened pitches from qualified students within hours.",
      icon: Zap,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Skilled Students",
      desc: "Access eager college talent fluent in React, Figma, Python, Canva, Excel, SEO, and modern tooling.",
      icon: Users,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Short-Term Commitment",
      desc: "Zero compliance headaches, zero long-term locks. Test potential future hires through bite-sized trial tasks.",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-16 text-white shadow-2xl relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
              <Building2 className="w-3.5 h-3.5" />
              For Startups & Small Businesses
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Need Help With a <br className="hidden sm:inline" />
              <span className="text-emerald-400">Small Task?</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Post a short-term project and connect with skilled students. Fast turnaround, budget-friendly pricing, and zero hiring red tape.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button
                onClick={handlePostProjectClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>Post a Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  login('business', businesses[0]);
                  navigateTo('business-dashboard');
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition"
              >
                Explore Business Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-2">
              Why Founders Choose Us
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built for Startup Agility
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to get short-term work off your plate without hiring full-time staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table: Traditional vs Agency vs MicroIntern */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              The Smart Way to Get Work Done
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              How MicroIntern stacks up against legacy alternatives
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-4">Feature</th>
                  <th className="pb-4 text-slate-400">Traditional 6-Mo Internship</th>
                  <th className="pb-4 text-slate-400">Freelance Agencies</th>
                  <th className="pb-4 text-emerald-600 font-extrabold">MicroIntern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 font-bold text-slate-800">Project Duration</td>
                  <td className="py-4 text-slate-500">3 - 6 Months rigid</td>
                  <td className="py-4 text-slate-500">Months (Lengthy contracts)</td>
                  <td className="py-4 text-emerald-700 font-bold">2 - 7 Days sprint</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-800">Typical Cost</td>
                  <td className="py-4 text-slate-500">₹15,000 - ₹30,000/mo</td>
                  <td className="py-4 text-slate-500">₹25,000+ retainer minimums</td>
                  <td className="py-4 text-emerald-700 font-bold">₹1,000 - ₹5,000 per task</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-800">Hiring Turnaround</td>
                  <td className="py-4 text-slate-500">3 to 5 Weeks</td>
                  <td className="py-4 text-slate-500">1 to 2 Weeks negotiation</td>
                  <td className="py-4 text-emerald-700 font-bold">Under 6 Hours</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-800">Escrow Security</td>
                  <td className="py-4 text-slate-500">Payroll liabilities</td>
                  <td className="py-4 text-slate-500">Upfront 50% non-refundable</td>
                  <td className="py-4 text-emerald-700 font-bold">100% Escrow Protected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
