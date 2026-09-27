import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Building2,
  Briefcase
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { ApplyModal } from './ApplyModal';

export const ProjectDetailsModal = ({ projectId, onBack }) => {
  const { projects, savedProjectIds, toggleSaveProject, applications, currentUser, userRole, navigateTo } = useApp();
  const { showToast } = useToast();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const project = projects.find((p) => p.id === projectId) || projects[0];

  if (!project) return null;

  const isSaved = savedProjectIds.includes(project.id);
  const alreadyApplied = applications.some(
    (a) => a.projectId === project.id && a.studentId === currentUser?.id
  );

  const handleSave = () => {
    toggleSaveProject(project.id);
    if (!isSaved) {
      showToast('Project bookmarked to your saved list!', 'success');
    } else {
      showToast('Project removed from bookmarks.', 'info');
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-brand-600 transition mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div className="flex items-start gap-5">
              <img
                src={project.businessLogo}
                alt={project.businessName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="purple" size="xs">
                    {project.category}
                  </Badge>
                  <Badge variant="primary" size="xs">
                    {project.difficulty}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">
                    Posted on {project.postedDate}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                  {project.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-brand-600" />
                    {project.businessName}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {project.location} ({project.workType})
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    Verified Startup
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition ${
                  isSaved
                    ? 'bg-brand-50 border-brand-200 text-brand-600'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-brand-600" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Project</span>
                  </>
                )}
              </button>

              {alreadyApplied ? (
                <button
                  onClick={() => navigateTo('student-dashboard', null, 'applications')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-emerald-700 bg-emerald-50 border border-emerald-200"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied (Under Review)</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-200/80">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block mb-1">Fixed Payment</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-600">
                ₹{project.payment.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block mb-1">Duration</span>
              <div className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-brand-600" />
                {project.duration}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block mb-1">Applicants</span>
              <div className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-1.5">
                <Users className="w-5 h-5 text-indigo-600" />
                {project.applicantsCount}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium block mb-1">Deadline</span>
              <div className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-600" />
                {project.deadline}
              </div>
            </div>
          </div>

          {/* Body Sections */}
          <div className="py-8 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Project Overview</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Required Skills */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Requirements Checklist */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Requirements & Expectations</h2>
              <ul className="space-y-2.5">
                {project.requirements?.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Deliverables */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Expected Deliverables</h2>
              <ul className="space-y-2.5">
                {project.deliverables?.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Sparkles className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Escrow & Credential Guarantee */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-50 to-indigo-50 border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">MicroIntern Protection Policy</h4>
                  <p className="text-xs text-slate-600">
                    The stipend of ₹{project.payment.toLocaleString('en-IN')} is already deposited in escrow and guaranteed upon deliverable sign-off.
                  </p>
                </div>
              </div>
              {!alreadyApplied && (
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 transition shrink-0"
                >
                  Apply for this Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        project={project}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};
