import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, Send, ShieldCheck, Clock, IndianRupee, CheckCircle2 } from 'lucide-react';

export const ApplyModal = ({ project, isOpen, onClose }) => {
  const { currentUser, userRole, applyToProject, navigateTo } = useApp();
  const { showToast } = useToast();

  const [coverNote, setCoverNote] = useState('');
  const [portfolioLink, setPortfolioLink] = useState(currentUser?.portfolio || currentUser?.github || '');
  const [agreedToTimeline, setAgreedToTimeline] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userRole !== 'student' || !currentUser) {
      showToast('Please sign in or switch to a Student account to apply.', 'error');
      navigateTo('login');
      onClose();
      return;
    }

    if (!agreedToTimeline) {
      showToast('Please confirm your availability to complete the project.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const result = applyToProject(project.id, coverNote, portfolioLink);
      setSubmitting(false);

      if (result.success) {
        showToast(result.message, 'success');
        onClose();
        navigateTo('student-dashboard', null, 'applications');
      } else {
        showToast(result.message, 'error');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={project.businessLogo}
              alt={project.businessName}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
            />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 block">
                Submit Application
              </span>
              <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {project.businessName} • ₹{project.payment.toLocaleString('en-IN')} • {project.duration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Applicant Persona pill */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900">
            <div className="flex items-center gap-2">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold">
                Applying as <span className="font-bold">{currentUser?.name || 'Student'}</span> ({currentUser?.college || 'College'})
              </span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              4.9 ★ Rating
            </span>
          </div>

          {/* Quick Pitch / Cover note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Quick Pitch / Why You're A Good Fit
            </label>
            <textarea
              rows={3}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="E.g., I have 1+ year building responsive React components and have fixed similar Safari alignment issues before. Ready to deliver in 48 hours!"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
              required
            />
          </div>

          {/* Portfolio or GitHub Link */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Portfolio / GitHub / Work Sample Link
            </label>
            <input
              type="text"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              placeholder="e.g. github.com/username or behance.net/design"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
            />
          </div>

          {/* Availability checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreedToTimeline}
                onChange={(e) => setAgreedToTimeline(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
              />
              <span className="text-xs text-slate-600 leading-snug">
                I commit to completing the deliverables within <strong>{project.duration}</strong> and following professional communication guidelines.
              </span>
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Confirm & Apply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
