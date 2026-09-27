import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Award, 
  Edit3, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Globe, 
  Mail, 
  Phone,
  Briefcase
} from 'lucide-react';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';
import { EditProfileModal } from './EditProfileModal';
import { CertificateModal } from './CertificateModal';

export const StudentProfile = () => {
  const { currentUser, certificates, applications } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const completedApps = applications.filter(
    (a) => a.studentId === currentUser?.id && a.status === 'Completed'
  );

  return (
    <div className="space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Cover Banner */}
        <div className="h-44 sm:h-52 w-full bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-black/40 hover:bg-black/60 backdrop-blur-md transition border border-white/20"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Info Content */}
        <div className="px-6 sm:px-10 pb-8 relative pt-0">
          {/* Avatar row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={currentUser?.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Verified Talent">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {currentUser?.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Verified Student
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-600">
                  {currentUser?.title || 'Frontend Developer & UI Specialist'}
                </p>
                <p className="text-xs text-slate-500">
                  {currentUser?.course} • <strong>{currentUser?.college}</strong>
                </p>
              </div>
            </div>

            {/* Rating Box */}
            <div className="flex sm:flex-col items-center sm:items-end justify-center gap-2 p-3 sm:p-0 bg-slate-50 sm:bg-transparent rounded-2xl">
              <div className="flex items-center gap-1.5">
                <StarRating rating={currentUser?.rating || 4.9} size={18} />
                <span className="font-black text-slate-900 text-base">
                  {currentUser?.rating || 4.9}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {currentUser?.reviewCount || 8} verified client reviews
              </span>
            </div>
          </div>

          {/* Availability & Links bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-brand-600" />
                Availability: <strong className="text-slate-900">{currentUser?.availability || '12-15 hrs/week • Remote'}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                India
              </span>
            </div>

            {/* Social / Portfolio Links */}
            <div className="flex items-center gap-3">
              {currentUser?.github && (
                <a
                  href={`https://${currentUser.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-700 hover:text-brand-600 font-semibold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {currentUser?.linkedin && (
                <a
                  href={`https://${currentUser.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-700 hover:text-brand-600 font-semibold"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {currentUser?.portfolio && (
                <a
                  href={`https://${currentUser.portfolio}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-700 hover:text-brand-600 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              About Me
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {currentUser?.bio || "Passionate college student keen on practical problem solving and rapid turnaround micro-internships."}
            </p>
          </div>

          {/* Skills Badges */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentUser?.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Previous Projects & Reviews Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Verified Project History & Reviews
            </h3>
            <p className="text-xs text-slate-500">Completed sprints through the MicroIntern platform</p>
          </div>
        </div>

        {completedApps.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4">No completed projects yet.</p>
        ) : (
          <div className="space-y-4">
            {completedApps.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{app.projectTitle}</span>
                    <Badge variant="success" size="xs">Verified</Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    Client: <strong>{app.businessName}</strong> • Stipend: ₹{app.payment.toLocaleString('en-IN')}
                  </div>
                  {app.studentReviewText && (
                    <div className="pt-2 text-xs text-slate-700 italic">
                      "{app.studentReviewText}"
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <StarRating rating={app.businessRatingScore || 5} size={14} />
                  {app.certificateId && (
                    <button
                      onClick={() => {
                        const cert = certificates.find((c) => c.certificateNumber === app.certificateId) || certificates[0];
                        setSelectedCert(cert);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition"
                    >
                      Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
};
