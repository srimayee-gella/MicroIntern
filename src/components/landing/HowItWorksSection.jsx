import React from 'react';
import { UserCheck, Compass, Briefcase, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorksSection = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Students add their skills, interests and availability in under 2 minutes. Highlight GitHub, Behance or Canva work.",
      icon: UserCheck,
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-600"
    },
    {
      step: "02",
      title: "Discover Projects",
      description: "Browse curated short-term projects based on skills, duration (1-7 days) and budget. Real tasks from verified startups.",
      icon: Compass,
      color: "from-indigo-600 to-purple-600",
      accent: "text-indigo-600"
    },
    {
      step: "03",
      title: "Apply & Work",
      description: "Apply in 1-click with a brief pitch. Once accepted, collaborate directly with founders and execute the assigned deliverable.",
      icon: Briefcase,
      color: "from-purple-600 to-pink-600",
      accent: "text-purple-600"
    },
    {
      step: "04",
      title: "Earn & Build Experience",
      description: "Receive instant UPI payment release, 5-star employer ratings, and a cryptographically verifiable digital certificate.",
      icon: Award,
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
            Simple 4-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How MicroIntern Works
          </h2>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            From discovering a project to receiving your verified certificate and UPI payout in just a few days.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-emerald-300 -translate-y-8 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Step # and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 tracking-wider">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                    <span>Step {index + 1} of 4</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action below steps */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigateTo('find-projects')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-brand-600 transition shadow-md"
          >
            <span>Start Exploring Micro-Internships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
