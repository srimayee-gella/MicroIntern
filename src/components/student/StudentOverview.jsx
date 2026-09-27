import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderGit2, 
  Send, 
  CheckCircle2, 
  IndianRupee, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Building2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const StudentOverview = ({ onNavigateTab, onSelectProject }) => {
  const { currentUser, applications, projects } = useApp();

  const userApps = applications.filter((a) => a.studentId === currentUser?.id);
  const activeApps = userApps.filter((a) => a.status === 'Accepted');
  const completedApps = userApps.filter((a) => a.status === 'Completed');

  // Find recommended projects matching student skills
  const recommendedProjects = projects
    .filter((p) => {
      // Not already applied
      const applied = userApps.some((a) => a.projectId === p.id);
      if (applied) return false;
      // Has matching skill
      const studentSkills = currentUser?.skills || [];
      return p.skills.some((sk) => studentSkills.some((s) => s.toLowerCase() === sk.toLowerCase()));
    })
    .slice(0, 3);

  const stats = [
    {
      label: 'My Applications',
      value: userApps.length,
      icon: Send,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      tab: 'applications'
    },
    {
      label: 'Active Projects',
      value: activeApps.length,
      icon: Clock,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      tab: 'active-projects'
    },
    {
      label: 'Completed Projects',
      value: completedApps.length,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      tab: 'completed-projects'
    },
    {
      label: 'Total Earnings',
      value: `₹${(currentUser?.totalEarnings || 8500).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      tab: 'earnings'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Verified Student Talent
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name}!
            </h1>
            <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
              You have {activeApps.length} active sprint and {userApps.filter(a => a.status === 'Under Review').length} application under review. Keep up the high velocity!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('find-projects')}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-brand-900 bg-white hover:bg-slate-100 shadow-md transition flex items-center gap-2"
            >
              <span>Explore New Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(item.tab)}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-brand-200 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  {item.label}
                </span>
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Status Tracker Widget */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Application Status Tracker</h2>
            <p className="text-xs text-slate-500">Live stages for your submitted micro-internships</p>
          </div>
          <button
            onClick={() => onNavigateTab('applications')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {userApps.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            You haven't submitted any applications yet.
          </div>
        ) : (
          <div className="space-y-4">
            {userApps.slice(0, 3).map((app) => {
              const isAccepted = app.status === 'Accepted';
              const isCompleted = app.status === 'Completed';
              const isUnderReview = app.status === 'Under Review' || app.status === 'Applied';

              return (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm shadow-2xs">
                      <Building2 className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{app.projectTitle}</div>
                      <div className="text-xs text-slate-500">
                        {app.businessName} • ₹{app.payment.toLocaleString('en-IN')} • {app.duration}
                      </div>
                    </div>
                  </div>

                  {/* Flow Pills */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                      Applied
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isUnderReview
                        ? 'bg-amber-100 text-amber-800 animate-pulse font-bold'
                        : isAccepted || isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      Under Review
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isCompleted
                        ? 'bg-purple-100 text-purple-800 font-bold'
                        : isAccepted
                        ? 'bg-emerald-100 text-emerald-800 font-bold'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isCompleted ? 'Payment Received' : isAccepted ? 'Active Sprint' : 'Accepted'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Projects Based on Skills */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored For You
            </div>
            <h2 className="text-lg font-bold text-slate-900">Recommended Projects</h2>
            <p className="text-xs text-slate-500">Based on your skills: {currentUser?.skills?.slice(0, 4).join(', ')}</p>
          </div>
          <button
            onClick={() => onNavigateTab('find-projects')}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>See More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj.id)}
              className="p-5 rounded-2xl border border-slate-200/90 hover:border-brand-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group bg-slate-50/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-xs text-slate-700">{proj.businessName}</span>
                  <Badge variant="purple" size="xs">{proj.category}</Badge>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                  {proj.title}
                </h4>
                <div className="flex flex-wrap gap-1 mb-4">
                  {proj.skills.slice(0, 2).map((sk, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-sm font-extrabold text-emerald-600">
                  ₹{proj.payment.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {proj.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
