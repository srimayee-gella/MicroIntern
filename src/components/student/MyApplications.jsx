import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Clock, 
  IndianRupee, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Search
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const MyApplications = ({ onSelectProject, onNavigateTab }) => {
  const { currentUser, applications } = useApp();
  const [filter, setFilter] = useState('All');

  const userApps = applications.filter((a) => a.studentId === currentUser?.id);

  const filteredApps = userApps.filter((app) => {
    if (filter === 'All') return true;
    if (filter === 'Under Review') return app.status === 'Under Review' || app.status === 'Applied';
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <Badge variant="success">Accepted • Active</Badge>;
      case 'Completed':
        return <Badge variant="purple">Completed • Paid</Badge>;
      case 'Rejected':
        return <Badge variant="danger">Not Selected</Badge>;
      default:
        return <Badge variant="warning">Under Review</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track and monitor the status of your micro-internship submissions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-100 rounded-2xl">
          {['All', 'Under Review', 'Accepted', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filter === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1">No applications found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            You don't have any applications under "{filter}". Start applying to live micro-internships!
          </p>
          <button
            onClick={() => onNavigateTab('find-projects')}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 transition"
          >
            Browse Projects
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getStatusBadge(app.status)}
                  <span className="text-xs text-slate-400">
                    Applied on {app.appliedDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {app.projectTitle}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="text-slate-900 font-bold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-brand-600" />
                      {app.businessName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {app.duration}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">
                      ₹{app.payment.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Cover note snippet */}
                {app.coverNote && (
                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 italic border border-slate-100">
                    "{app.coverNote}"
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                {app.status === 'Accepted' ? (
                  <button
                    onClick={() => onNavigateTab('active-projects')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <span>Go to Active Sprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : app.status === 'Completed' ? (
                  <button
                    onClick={() => onNavigateTab('completed-projects')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition"
                  >
                    View Credential & Earnings
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectProject(app.projectId)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    View Project Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
