import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  Building2, 
  CheckCircle2, 
  ExternalLink, 
  Upload, 
  Send, 
  Calendar,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { SubmitWorkModal } from './SubmitWorkModal';

export const StudentActiveProjects = ({ onNavigateTab }) => {
  const { currentUser, applications, projects } = useApp();
  const [selectedAppForSubmission, setSelectedAppForSubmission] = useState(null);

  const activeApps = applications.filter(
    (a) => a.studentId === currentUser?.id && a.status === 'Accepted'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Active Sprints & Projects
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Projects you have been hired for. Complete deliverables to release escrow payment.
        </p>
      </div>

      {activeApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
            <Clock className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">No active projects</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            When a business accepts your application, your project sprint will appear here.
          </p>
          <button
            onClick={() => onNavigateTab('find-projects')}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 transition"
          >
            Explore Live Projects
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {activeApps.map((app) => {
            const project = projects.find((p) => p.id === app.projectId);
            const progress = app.progress || 60;

            return (
              <div
                key={app.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">Active Sprint</Badge>
                      <span className="text-xs text-slate-400">Accepted on {app.acceptedDate || '2026-09-25'}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">{app.projectTitle}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-brand-600" />
                      {app.businessName} • Fixed Stipend: <strong className="text-emerald-600">₹{app.payment.toLocaleString('en-IN')}</strong> (in Escrow)
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedAppForSubmission(app)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition shrink-0"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Submit Completed Work</span>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-600">Milestone Progress</span>
                    <span className="text-brand-600 font-bold">{progress}% Completed</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Project Specs Snapshot */}
                {project && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2">Requirements</h4>
                      <ul className="space-y-1 text-slate-600">
                        {project.requirements?.slice(0, 2).map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 uppercase tracking-wider mb-2">Key Deliverables</h4>
                      <ul className="space-y-1 text-slate-600">
                        {project.deliverables?.slice(0, 2).map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Submission note if already updated */}
                {app.submissionNote && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900">
                    <span className="font-bold block mb-1">Your Latest Submission Note:</span>
                    <p className="italic">"{app.submissionNote}"</p>
                    {app.workLink && (
                      <a
                        href={app.workLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand-600 font-bold hover:underline mt-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>View Submitted Link</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submission Modal */}
      <SubmitWorkModal
        application={selectedAppForSubmission}
        isOpen={!!selectedAppForSubmission}
        onClose={() => setSelectedAppForSubmission(null)}
      />
    </div>
  );
};
