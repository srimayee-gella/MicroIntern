import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const HowItWorksPage = () => {
  const { navigateTo } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);

  const studentFaqs = [
    {
      q: "How does payment escrow work for students?",
      a: "When a business posts a project or accepts your application, the stipend (e.g. ₹2,000) is locked into MicroIntern Escrow. Once you submit the completed deliverables and the business signs off, the payment is instantly released to your UPI account with zero deduction."
    },
    {
      q: "Can I do micro-internships while attending full-time college classes?",
      a: "Yes! That is the core purpose of MicroIntern. Projects are designed as 2-day to 7-day modular sprints requiring 8-15 hours total. You work entirely on your own schedule."
    },
    {
      q: "Are the certificates verified and shareable on LinkedIn?",
      a: "Yes, every certificate has an immutable verification number, authorized business signer, and QR link that you can showcase on LinkedIn, your resume, or portfolio."
    }
  ];

  const businessFaqs = [
    {
      q: "What types of tasks are best suited for MicroIntern?",
      a: "Bite-sized, well-defined deliverables: React UI components, bug fixes, Canva or CapCut social media reels, blog articles, competitor research, and spreadsheet data entry."
    },
    {
      q: "What happens if a student doesn't deliver on time?",
      a: "Because funds remain in escrow, you are 100% protected. If deliverables are not provided according to the agreement, the project can be re-listed or refunded in full."
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-2">
            The MicroIntern Blueprint
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Step-by-step walkthrough of how students gain verified proof-of-work and businesses get tasks done seamlessly.
          </p>
        </div>

        {/* 4-Step Interactive Section */}
        <HowItWorksSection />

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20 space-y-10">
          <div className="text-center">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear answers for students and startup sponsors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">
                For Students
              </span>
              {studentFaqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-sm text-slate-900 mb-1.5">{faq.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Business FAQs */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                For Businesses
              </span>
              {businessFaqs.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-bold text-sm text-slate-900 mb-1.5">{faq.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigateTo('find-projects')}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition"
          >
            Browse Available Micro-Internships
          </button>
        </div>
      </div>
    </div>
  );
};
