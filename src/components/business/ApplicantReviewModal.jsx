import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, Check, Ban, ExternalLink, GraduationCap, Star, ShieldCheck, Mail } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const ApplicantReviewModal = ({ applicant, isOpen, onClose }) => {
  const { acceptApplication, rejectApplication, students } = useApp();
  const { showToast } = useToast();

  if (!isOpen || !applicant) return null;

  const studentProfile = students.find((s) => s.id === applicant.studentId);

  const handleAccept = () => {
    const res = acceptApplication(applicant.id);
    if (res.success) {
      showToast(res.message, 'success');
      onClose();
    }
  };

  const handleReject = () => {
    const res = rejectApplication(applicant.id);
    if (res.success) {
      showToast(res.message, 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Candidate Evaluation</span>
            <h3 className="text-lg font-bold text-slate-900">Application Review</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Profile Card */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <img
              src={applicant.studentAvatar || studentProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={applicant.studentName}
              className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
            />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-base">{applicant.studentName}</h4>
                <div className="flex items-center gap-1">
                  <StarRating rating={applicant.studentRating || 4.9} size={14} />
                  <span className="text-xs font-bold text-slate-800">{applicant.studentRating || 4.9}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                {applicant.studentCollege}
              </p>
              <p className="text-xs text-slate-600">
                Applied for: <strong>{applicant.projectTitle}</strong>
              </p>
            </div>
          </div>

          {/* Cover Note / Pitch */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Applicant's Pitch
            </label>
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{applicant.coverNote || 'Enthusiastic to deliver quality work on schedule!'}"
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Skills Verified
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(applicant.studentSkills || studentProfile?.skills || []).map((sk, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* External links */}
          {applicant.portfolioLink && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Portfolio / GitHub
              </label>
              <a
                href={applicant.portfolioLink.startsWith('http') ? applicant.portfolioLink : `https://${applicant.portfolioLink}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{applicant.portfolioLink}</span>
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handleReject}
              disabled={applicant.status === 'Rejected'}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition disabled:opacity-50"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Close
              </button>
              <button
                onClick={handleAccept}
                disabled={applicant.status === 'Accepted' || applicant.status === 'Completed'}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{applicant.status === 'Accepted' ? 'Already Accepted' : 'Accept & Hire Candidate'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
