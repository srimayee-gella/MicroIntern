import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Users, 
  PlusCircle, 
  CreditCard, 
  Star, 
  Building2, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Check, 
  Ban, 
  ExternalLink, 
  Menu, 
  X,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { StarRating } from '../common/StarRating';
import { PostProject } from './PostProject';
import { ApplicantReviewModal } from './ApplicantReviewModal';
import { RateStudentModal } from './RateStudentModal';

export const BusinessDashboard = () => {
  const { 
    currentUser, 
    activeDashboardTab, 
    setActiveDashboardTab, 
    applications, 
    projects, 
    acceptApplication, 
    rejectApplication,
    navigateTo,
    logout 
  } = useApp();

  const { showToast } = useToast();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [completeAppModal, setCompleteAppModal] = useState(null);

  // Business posted projects
  const myProjects = projects.filter((p) => p.businessId === currentUser?.id || true); // fallback for demo
  const myProjectIds = myProjects.map((p) => p.id);

  // Business received applications
  const myApps = applications.filter((a) => a.businessId === currentUser?.id || myProjectIds.includes(a.projectId));
  const activeApps = myApps.filter((a) => a.status === 'Accepted');
  const completedApps = myApps.filter((a) => a.status === 'Completed');
  const pendingApps = myApps.filter((a) => a.status === 'Under Review' || a.status === 'Applied');

  // Total spent calculation
  const totalSpent = completedApps.reduce((sum, a) => sum + (a.payment || 0), 0) || 4500;

  const stats = [
    {
      label: 'Active Sprints',
      value: activeApps.length || 1,
      icon: Clock,
      color: 'text-brand-600',
      bgColor: 'bg-brand-50',
      tab: 'applicants'
    },
    {
      label: 'Applications Received',
      value: myApps.length,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      tab: 'applicants'
    },
    {
      label: 'Completed Projects',
      value: completedApps.length || 2,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      tab: 'overview'
    },
    {
      label: 'Total Paid Out',
      value: `₹${totalSpent.toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      tab: 'payments'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-projects', label: 'My Projects', icon: FolderGit2 },
    { id: 'applicants', label: 'Applicants', icon: Users },
    { id: 'post-project', label: 'Post Project', icon: PlusCircle },
    { id: 'payments', label: 'Payments & Escrow', icon: CreditCard },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleQuickAccept = (appId) => {
    const res = acceptApplication(appId);
    if (res.success) showToast(res.message, 'success');
  };

  const handleQuickReject = (appId) => {
    const res = rejectApplication(appId);
    if (res.success) showToast(res.message, 'info');
  };

  const renderContent = () => {
    switch (activeDashboardTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Top Welcome Banner */}
            <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  Verified Employer Workspace
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {currentUser?.name || 'GreenLeaf Café'}
                </h1>
                <p className="text-emerald-100 text-xs sm:text-sm">
                  You have {pendingApps.length} pending candidate application awaiting your review.
                </p>
              </div>

              <button
                onClick={() => setActiveDashboardTab('post-project')}
                className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-white hover:bg-slate-100 transition shadow-md flex items-center gap-2 self-start md:self-auto"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>Post a New Task</span>
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveDashboardTab(item.tab)}
                    className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm text-left hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer w-full"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                      <div className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {item.value}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Sprints / Ongoing Tasks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Active Student Sprints</h3>
                  <p className="text-xs text-slate-500">Currently in-progress deliverables</p>
                </div>
              </div>

              {activeApps.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">No active sprints right now.</p>
              ) : (
                <div className="space-y-4">
                  {activeApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{app.projectTitle}</span>
                          <Badge variant="success" size="xs">Sprint In Progress</Badge>
                        </div>
                        <div className="text-xs text-slate-600">
                          Assigned to: <strong className="text-slate-900">{app.studentName}</strong> ({app.studentCollege})
                        </div>
                        <div className="text-xs text-slate-500">
                          Stipend: ₹{app.payment.toLocaleString('en-IN')} in Escrow • Progress: {app.progress || 75}%
                        </div>
                        {app.submissionNote && (
                          <div className="text-xs text-indigo-700 bg-indigo-50 p-2 rounded-lg mt-2">
                            Latest update: "{app.submissionNote}"
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setCompleteAppModal(app)}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm self-start sm:self-center shrink-0 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Sign Off & Release Escrow</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Applicants Table */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Applicants</h3>
                  <p className="text-xs text-slate-500">Students applying for your short-term projects</p>
                </div>
                <button
                  onClick={() => setActiveDashboardTab('applicants')}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  View All ({myApps.length})
                </button>
              </div>

              <div className="space-y-4">
                {myApps.slice(0, 4).map((app) => (
                  <div
                    key={app.id}
                    className="p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={app.studentName}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-slate-900 text-sm">{app.studentName}</h4>
                          <span className="text-[11px] font-bold text-slate-700 flex items-center gap-0.5">
                            ★ {app.studentRating || 4.9}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-500">{app.studentCollege}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-700">
                          For: {app.projectTitle}
                        </p>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {app.studentSkills?.slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedApplicant(app)}
                        className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition"
                      >
                        View Profile
                      </button>

                      {app.status === 'Accepted' ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                          Hired (Active)
                        </span>
                      ) : app.status === 'Completed' ? (
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-2 rounded-xl border border-purple-200">
                          Completed
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleQuickAccept(app.id)}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={() => handleQuickReject(app.id)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Reject"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'post-project':
        return (
          <PostProject
            onSuccess={() => {
              setActiveDashboardTab('my-projects');
            }}
          />
        );

      case 'my-projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Posted Projects</h2>
                <p className="text-xs sm:text-sm text-slate-500">Manage listings, view applicant counts, and close vacancies</p>
              </div>
              <button
                onClick={() => setActiveDashboardTab('post-project')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProjects.map((p) => (
                <div key={p.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="purple" size="xs">{p.category}</Badge>
                      <h4 className="font-bold text-base text-slate-900 mt-2">{p.title}</h4>
                      <p className="text-xs text-slate-500">{p.location} • {p.duration}</p>
                    </div>
                    <span className="text-base font-black text-emerald-600">₹{p.payment.toLocaleString('en-IN')}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      <strong>{p.applicantsCount}</strong> applicants received
                    </span>
                    <button
                      onClick={() => setActiveDashboardTab('applicants')}
                      className="font-bold text-emerald-600 hover:underline"
                    >
                      Review Candidates →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'applicants':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Applicant Management</h2>
              <p className="text-xs sm:text-sm text-slate-500">Review pitches, GitHub portfolios, and hire candidates</p>
            </div>

            <div className="space-y-4">
              {myApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={app.studentAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={app.studentName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base">{app.studentName}</h4>
                        <span className="text-xs font-bold text-amber-500">★ {app.studentRating || 4.9}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500">{app.studentCollege}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">Project: {app.projectTitle}</p>
                      {app.coverNote && (
                        <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-lg">
                          "{app.coverNote}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedApplicant(app)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Full Profile
                    </button>

                    {app.status === 'Accepted' ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200">
                        Accepted & Active
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleQuickAccept(app.id)}
                          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept & Hire</span>
                        </button>
                        <button
                          onClick={() => handleQuickReject(app.id)}
                          className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Escrow & Milestone Disbursements</h3>
            <p className="text-xs text-slate-500">Funds are held safely in MicroIntern Escrow until you approve deliverables.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Total Disbursed</span>
                <span className="text-2xl font-black text-emerald-700">₹{totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider block">Locked in Active Sprints</span>
                <span className="text-2xl font-black text-indigo-700">₹2,000</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Company GSTIN</span>
                <span className="text-sm font-mono font-bold text-slate-900 mt-1 block">29ABCDE1234F1Z5</span>
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Student Reviews & Reputation</h3>
            <p className="text-xs text-slate-500">Feedback from students who completed micro-internships for your business</p>
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Ananya Sharma (IIT Roorkee)</span>
                  <StarRating rating={5} size={14} />
                </div>
                <p className="text-xs text-slate-600 italic">
                  "Working with GreenLeaf Café was an absolute joy. Arjun was clear with expectations and prompt with feedback and payment release."
                </p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Company Profile</h3>
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                <div className="p-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-900">{currentUser?.name || 'GreenLeaf Café'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Industry</label>
                <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700">{currentUser?.industry || 'Food & Beverage / Retail'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Location</label>
                <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700">{currentUser?.location || 'Indiranagar, Bangalore'}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website</label>
                <div className="p-3 bg-slate-50 rounded-xl text-sm text-brand-600 font-semibold">{currentUser?.website || 'greenleafcafe.in'}</div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Business Preferences</h3>
            <p className="text-xs text-slate-500">Configure applicant notification emails and billing contacts.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 shrink-0 select-none p-5 justify-between">
        <div className="space-y-6">
          {/* Company Mini Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <img
              src={currentUser?.logo || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80'}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-200"
            />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-slate-900 truncate">{currentUser?.name || 'Company'}</div>
              <div className="text-[11px] text-emerald-700 font-medium">Business Portal</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeDashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveDashboardTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom sign out */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200"
          >
            <Menu className="w-4 h-4 text-emerald-600" />
            <span>Business Menu</span>
          </button>
          <span className="text-xs font-bold text-slate-800 capitalize">
            {activeDashboardTab.replace('-', ' ')}
          </span>
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            {/* Drawer Panel */}
            <aside className="relative z-10 w-72 bg-white h-full flex flex-col p-5 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={currentUser?.logo || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80'}
                    alt={currentUser?.name}
                    className="w-9 h-9 rounded-xl object-cover border border-emerald-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">{currentUser?.name || 'Company'}</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Business Portal</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="space-y-1 flex-1 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeDashboardTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveDashboardTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </nav>

              {/* Sign Out */}
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => { logout(); setMobileSidebarOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Page Content Container */}
        <main className="p-4 sm:p-8 lg:p-10 flex-1">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Applicant Review Modal */}
      <ApplicantReviewModal
        applicant={selectedApplicant}
        isOpen={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />

      {/* Rate Student / Signoff Modal */}
      <RateStudentModal
        application={completeAppModal}
        isOpen={!!completeAppModal}
        onClose={() => setCompleteAppModal(null)}
      />
    </div>
  );
};
