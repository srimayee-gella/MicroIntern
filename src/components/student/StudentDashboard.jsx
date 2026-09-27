import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Search, 
  Send, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Award, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { StudentOverview } from './StudentOverview';
import { MyApplications } from './MyApplications';
import { StudentActiveProjects } from './StudentActiveProjects';
import { StudentCompletedProjects } from './StudentCompletedProjects';
import { StudentEarnings } from './StudentEarnings';
import { StudentCertificates } from './StudentCertificates';
import { StudentProfile } from './StudentProfile';

export const StudentDashboard = () => {
  const { 
    currentUser, 
    activeDashboardTab, 
    setActiveDashboardTab, 
    navigateTo, 
    logout 
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'find-projects', label: 'Find Projects', icon: Search, action: () => navigateTo('find-projects') },
    { id: 'applications', label: 'My Applications', icon: Send },
    { id: 'active-projects', label: 'Active Projects', icon: Clock },
    { id: 'completed-projects', label: 'Completed Projects', icon: CheckCircle2 },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveDashboardTab(item.id);
    }
    setMobileSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeDashboardTab) {
      case 'overview':
        return (
          <StudentOverview
            onNavigateTab={(tab) => {
              if (tab === 'find-projects') navigateTo('find-projects');
              else setActiveDashboardTab(tab);
            }}
            onSelectProject={(id) => navigateTo('project-details', id)}
          />
        );
      case 'applications':
        return (
          <MyApplications
            onSelectProject={(id) => navigateTo('project-details', id)}
            onNavigateTab={(tab) => {
              if (tab === 'find-projects') navigateTo('find-projects');
              else setActiveDashboardTab(tab);
            }}
          />
        );
      case 'active-projects':
        return (
          <StudentActiveProjects
            onNavigateTab={(tab) => {
              if (tab === 'find-projects') navigateTo('find-projects');
              else setActiveDashboardTab(tab);
            }}
          />
        );
      case 'completed-projects':
        return <StudentCompletedProjects />;
      case 'earnings':
        return <StudentEarnings />;
      case 'certificates':
        return <StudentCertificates />;
      case 'profile':
        return <StudentProfile />;
      case 'settings':
        return (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Account & Notifications</h3>
            <p className="text-xs text-slate-500">Manage email alerts, notifications, and security preferences</p>
            <div className="space-y-4 pt-2">
              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-sm text-slate-800">Email Alerts on New Projects</div>
                  <div className="text-xs text-slate-500">Receive instant pings when projects match your skills</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-sm text-slate-800">Application Updates</div>
                  <div className="text-xs text-slate-500">Get notified when a business reviews or accepts your pitch</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 rounded" />
              </label>

              <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 cursor-pointer">
                <div>
                  <div className="font-bold text-sm text-slate-800">Direct WhatsApp Alerts</div>
                  <div className="text-xs text-slate-500">Urgent milestone deadlines and verified certificate notifications</div>
                </div>
                <input type="checkbox" className="w-4 h-4 text-brand-600 rounded" />
              </label>
            </div>
          </div>
        );
      default:
        return (
          <StudentOverview
            onNavigateTab={setActiveDashboardTab}
            onSelectProject={(id) => navigateTo('project-details', id)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/90 shrink-0 select-none p-5 justify-between">
        <div className="space-y-6">
          {/* User mini badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-xl object-cover border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-slate-900 truncate">{currentUser?.name}</div>
              <div className="text-[11px] text-slate-500 truncate">{currentUser?.college}</div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeDashboardTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-600" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Logout */}
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

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Subheader Bar */}
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200"
          >
            <Menu className="w-4 h-4 text-brand-600" />
            <span>Dashboard Menu</span>
          </button>
          <span className="text-xs font-bold text-slate-800 capitalize">
            {activeDashboardTab.replace('-', ' ')}
          </span>
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white h-full p-5 flex flex-col justify-between z-10 shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <span className="font-extrabold text-slate-900 text-sm">Student Hub</span>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeDashboardTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? 'bg-brand-50 text-brand-700 font-bold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="p-4 sm:p-8 lg:p-10 flex-1">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
