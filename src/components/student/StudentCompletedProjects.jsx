import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Award, 
  Star, 
  IndianRupee, 
  Building2, 
  Calendar,
  FileCheck2,
  MessageSquareQuote
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { CertificateModal } from './CertificateModal';
import { RateBusinessModal } from './RateBusinessModal';

export const StudentCompletedProjects = () => {
  const { currentUser, applications, certificates } = useApp();

  const [selectedCert, setSelectedCert] = useState(null);
  const [rateApp, setRateApp] = useState(null);

  const completedApps = applications.filter(
    (a) => a.studentId === currentUser?.id && a.status === 'Completed'
  );

  const handleOpenCertificate = (certId) => {
    const cert = certificates.find((c) => c.certificateNumber === certId || c.id === certId) || certificates[0];
    setSelectedCert(cert);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Completed Micro-Internships
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Your track record of successfully delivered client projects, verified credentials, and client ratings.
        </p>
      </div>

      {completedApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">No completed projects yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Once a business signs off on your active project, your completion certificate and ratings will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {completedApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="success">Completed & Verified</Badge>
                    <Badge variant="purple">Stipend Paid</Badge>
                    <span className="text-xs text-slate-400">Finished on {app.completedDate || '2026-09-22'}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{app.projectTitle}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium mt-1">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Building2 className="w-4 h-4 text-brand-600" />
                      {app.businessName}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold text-sm">
                      ₹{app.payment.toLocaleString('en-IN')} Received
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* View Certificate */}
                  {app.certificateId && (
                    <button
                      onClick={() => handleOpenCertificate(app.certificateId)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition shadow-2xs"
                    >
                      <Award className="w-4 h-4 text-brand-600" />
                      <span>View Certificate</span>
                    </button>
                  )}

                  {/* Rate Business */}
                  {!app.studentRated ? (
                    <button
                      onClick={() => setRateApp(app)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
                    >
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      <span>Rate Business</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Rated {app.studentRatingScore} ★
                    </span>
                  )}
                </div>
              </div>

              {/* Feedback & Ratings Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {/* Business Review about Student */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Business Review for You
                    </span>
                    <StarRating rating={app.businessRatingScore || 5} size={14} />
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{app.studentReviewText || 'Outstanding work! Delivered 24 hours ahead of schedule with zero errors.'}"
                  </p>
                </div>

                {/* Student's Review about Business */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                      Your Feedback for {app.businessName}
                    </span>
                    {app.studentRated && (
                      <StarRating rating={app.studentRatingScore || 5} size={14} />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    {app.businessReviewText
                      ? `"${app.businessReviewText}"`
                      : 'You haven\'t left a review for this business yet.'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />

      {/* Rate Business Modal */}
      <RateBusinessModal
        application={rateApp}
        isOpen={!!rateApp}
        onClose={() => setRateApp(null)}
      />
    </div>
  );
};
