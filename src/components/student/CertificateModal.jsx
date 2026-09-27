import React, { useRef } from 'react';
import { X, Download, Share2, Award, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CertificateModal = ({ certificate, isOpen, onClose }) => {
  const { showToast } = useToast();
  const certRef = useRef(null);

  if (!isOpen || !certificate) return null;

  const handlePrintDownload = () => {
    showToast('Preparing your verified high-resolution certificate...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(certificate.verificationUrl || window.location.href);
    showToast('Verification link copied to clipboard! Share on LinkedIn or your resume.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scaleUp">
        {/* Top Action Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold tracking-tight">Verified Digital Credential</span>
            <span className="text-xs text-slate-400 font-mono">#{certificate.certificateNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition"
              title="Share Certificate"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={handlePrintDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Container */}
        <div
          ref={certRef}
          className="p-8 sm:p-14 bg-gradient-to-b from-amber-50/20 via-white to-slate-50 text-slate-900 border-8 border-double border-amber-800/20 relative m-4 sm:m-6 rounded-2xl shadow-inner print:m-0 print:border-4"
        >
          {/* Subtle watermark background seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <Award className="w-96 h-96 text-slate-950" />
          </div>

          <div className="relative z-10 text-center space-y-6">
            {/* Header / Crest */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-700 via-indigo-700 to-purple-800 text-white flex items-center justify-center shadow-md mb-3">
                <Award className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-amber-700">
                Official Credential
              </span>
              <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight mt-1">
                Certificate of Micro-Internship
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mt-3"></div>
            </div>

            {/* Recipient */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-500 font-semibold">
                This certifies that
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-900 tracking-tight underline decoration-amber-400 decoration-2 underline-offset-8">
                {certificate.studentName}
              </h2>
            </div>

            {/* Completion body */}
            <div className="max-w-xl mx-auto space-y-2">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-serif">
                has successfully completed the practical skill-based sprint for
              </p>
              <div className="text-lg sm:text-xl font-bold text-slate-900">
                "{certificate.projectTitle}"
              </div>
              <p className="text-sm text-slate-600">
                awarded by <strong className="text-slate-900">{certificate.businessName}</strong>
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mt-1">
                <span>Duration: <strong>{certificate.duration}</strong></span>
                <span>•</span>
                <span>Completion Date: <strong>{certificate.completedDate}</strong></span>
              </div>
            </div>

            {/* Skills demonstrated */}
            {certificate.skillsDemonstrated && (
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Verified Skills Demonstrated
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {certificate.skillsDemonstrated.map((sk, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs text-slate-800"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Signatures & Seal */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 items-end border-t border-slate-200/80">
              {/* Left Signer: Business */}
              <div className="text-center">
                <div className="font-serif italic text-lg sm:text-xl text-slate-800 font-semibold border-b border-slate-400 pb-1 mx-4">
                  {certificate.businessSigner || `${certificate.businessName} Team`}
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Business Sponsor
                </p>
              </div>

              {/* Center Seal */}
              <div className="hidden sm:flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center bg-amber-50/50">
                  <ShieldCheck className="w-7 h-7 text-amber-600" />
                </div>
                <span className="text-[10px] font-bold text-amber-700 tracking-wider mt-1 uppercase">
                  Verified Secure
                </span>
              </div>

              {/* Right Signer: MicroIntern Verification */}
              <div className="text-center">
                <div className="font-serif italic text-lg sm:text-xl text-brand-800 font-semibold border-b border-slate-400 pb-1 mx-4">
                  Dr. Rajiv Sen, MicroIntern
                </div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Credential Authority
                </p>
              </div>
            </div>

            {/* Footer QR / ID */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
              <span>Certificate ID: <strong className="font-mono text-slate-600">{certificate.certificateNumber}</strong></span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Cryptographically Validated on MicroIntern Network
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
