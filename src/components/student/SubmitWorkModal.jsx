import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, Send, Link, FileText, CheckCircle2 } from 'lucide-react';

export const SubmitWorkModal = ({ application, isOpen, onClose }) => {
  const { submitProjectWork } = useApp();
  const { showToast } = useToast();

  const [workNotes, setWorkNotes] = useState('');
  const [workLink, setWorkLink] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !application) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const res = submitProjectWork(application.id, workNotes, workLink);
      setSubmitting(false);
      if (res.success) {
        showToast(res.message, 'success');
        onClose();
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">Deliverable Handover</span>
            <h3 className="text-lg font-bold text-slate-900">{application.projectTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Deliverable URL (GitHub / Google Drive / Figma / Loom)
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={workLink}
                onChange={(e) => setWorkLink(e.target.value)}
                placeholder="https://github.com/... or https://drive.google.com/..."
                className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Handover Notes / Summary of Completed Tasks
            </label>
            <textarea
              rows={4}
              value={workNotes}
              onChange={(e) => setWorkNotes(e.target.value)}
              placeholder="Detail what was built, testing steps completed, and any notes for the founder to review..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Submitting marks progress to 100% and invites the business to sign off and release your ₹{application.payment.toLocaleString('en-IN')} stipend.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Submitting...' : 'Submit Deliverables'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
