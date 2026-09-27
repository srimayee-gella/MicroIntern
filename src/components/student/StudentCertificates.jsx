import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ShieldCheck, Download, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

export const StudentCertificates = () => {
  const { certificates, currentUser } = useApp();
  const [selectedCert, setSelectedCert] = useState(null);

  const studentCerts = certificates.filter(
    (c) => c.studentId === currentUser?.id || true // show verified certificates
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Verified Digital Certificates
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Cryptographically stamped proof-of-work credentials authorized by client startups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top decorative ribbon */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/40 via-brand-200/20 to-transparent pointer-events-none rounded-bl-full" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {cert.certificateNumber}
                </span>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Certificate of Micro-Internship
              </span>

              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                {cert.projectTitle}
              </h3>

              <div className="space-y-1 text-xs text-slate-500 mb-4">
                <p className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-brand-600" />
                  Awarded by {cert.businessName}
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Completed on {cert.completedDate} • Duration: {cert.duration}
                </p>
              </div>

              {/* Skills demonstrated */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cert.skillsDemonstrated?.map((sk, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition text-center flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4 text-brand-600" />
                <span>View Full Certificate</span>
              </button>

              <button
                onClick={() => setSelectedCert(cert)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
                title="Download Credential"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
