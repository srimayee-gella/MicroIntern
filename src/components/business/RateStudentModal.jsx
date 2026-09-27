import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, Send, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const RateStudentModal = ({ application, isOpen, onClose }) => {
  const { completeProjectAndPay } = useApp();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !application) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const res = completeProjectAndPay(application.id, rating, review);
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
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Project Completion & Sign-off</span>
            <h3 className="text-lg font-bold text-slate-900">Sign Off & Rate Student</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Escrow Release</span>
              <span className="text-xs text-emerald-700">Transferring to {application.studentName}</span>
            </div>
            <span className="text-xl font-black text-emerald-700">₹{application.payment.toLocaleString('en-IN')}</span>
          </div>

          <div className="text-center py-2">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Rate {application.studentName}'s Delivery
            </p>
            <div className="flex justify-center mb-1">
              <StarRating
                rating={rating}
                interactive={true}
                size={32}
                onRate={(r) => setRating(r)}
              />
            </div>
            <span className="text-sm font-bold text-amber-500">{rating} out of 5 Stars</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Employer Endorsement / Review Note
            </label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="e.g. Exceptional turnaround! High code quality, very polite communication, and delivered 1 day ahead of schedule."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-2 text-xs text-slate-600">
            <Award className="w-4 h-4 text-brand-600 shrink-0" />
            <span>This automatically stamps a verifiable <strong>MicroIntern Digital Certificate</strong> for the student.</span>
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
              <CheckCircle2 className="w-4 h-4" />
              <span>{submitting ? 'Releasing...' : 'Approve & Release Payment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
