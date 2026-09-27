import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, User, Briefcase, RefreshCw, Eye } from 'lucide-react';

export const DemoBanner = () => {
  const { currentUser, userRole, switchDemoUser, logout, navigateTo } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">
            <Sparkles className="w-3 h-3 text-brand-400" />
            MVP Interactive Demo
          </span>
          <span className="hidden sm:inline text-slate-400">
            Current Persona:
          </span>
          <span className="font-semibold text-white flex items-center gap-1">
            {userRole === 'student' ? (
              <>
                <User className="w-3 h-3 text-indigo-400" />
                {currentUser?.name} <span className="text-slate-400 font-normal">(Student)</span>
              </>
            ) : userRole === 'business' ? (
              <>
                <Briefcase className="w-3 h-3 text-emerald-400" />
                {currentUser?.name} <span className="text-slate-400 font-normal">(Business)</span>
              </>
            ) : (
              <>
                <Eye className="w-3 h-3 text-slate-400" />
                Guest Visitor
              </>
            )}
          </span>
        </div>

        {/* Quick Switch Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-slate-400 text-[11px] hidden md:inline mr-1">Switch:</span>
          <button
            onClick={() => switchDemoUser('student_1', 'student')}
            className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1 ${
              currentUser?.id === 'student_1'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            👩‍💻 Ananya (Dev)
          </button>
          <button
            onClick={() => switchDemoUser('student_2', 'student')}
            className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1 ${
              currentUser?.id === 'student_2'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            ✍️ Rahul (Content)
          </button>
          <button
            onClick={() => switchDemoUser('business_1', 'business')}
            className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1 ${
              currentUser?.id === 'business_1'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            ☕ GreenLeaf Café
          </button>
          <button
            onClick={() => switchDemoUser('business_2', 'business')}
            className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1 ${
              currentUser?.id === 'business_2'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            ⚡ TechStart
          </button>
          <button
            onClick={() => logout()}
            className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1 ${
              userRole === 'guest'
                ? 'bg-slate-700 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
            }`}
          >
            Guest
          </button>
        </div>
      </div>
    </div>
  );
};
