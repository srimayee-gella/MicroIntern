import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  Menu, 
  X, 
  Search, 
  Briefcase, 
  User, 
  LogOut, 
  PlusCircle,
  LayoutDashboard,
  Layers
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, userRole, currentPage, navigateTo, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'landing' },
    { name: 'Find Projects', id: 'find-projects' },
    { name: 'For Businesses', id: 'for-businesses' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'About', id: 'about' },
  ];

  const handleNavClick = (id) => {
    navigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white stroke-[2.2]" />
                <div className="absolute -bottom-1 -right-1.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                Micro<span className="text-brand-600">Intern</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 -mt-1 hidden sm:block">
                Micro-Work • Real Experience
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-brand-600 bg-brand-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {userRole === 'student' ? (
                  <>
                    <button
                      onClick={() => handleNavClick('student-dashboard')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition ${
                        currentPage === 'student-dashboard'
                          ? 'bg-brand-50 border-brand-300 text-brand-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-600" />
                      Student Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('find-projects')}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition"
                    >
                      <Search className="w-4 h-4" />
                      Browse Projects
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('business-dashboard')}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition ${
                        currentPage === 'business-dashboard'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                      Business Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigateTo('business-dashboard', null, 'post-project');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Post a Project
                    </button>
                  </>
                )}

                {/* User Pill & Logout */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <img
                    src={currentUser.avatar || currentUser.logo}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-sm"
                  />
                  <button
                    onClick={logout}
                    title="Log Out"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('login')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavClick('signup')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 hover:border-slate-400 transition"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => handleNavClick('find-projects')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:opacity-95 shadow-md shadow-brand-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Find Your First Micro-Internship</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left ${
                  currentPage === link.id
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl mb-2">
                    <img
                      src={currentUser.avatar || currentUser.logo}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-xl object-cover border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</div>
                      <div className="text-xs text-slate-500 capitalize">{userRole} Account</div>
                    </div>
                  </div>

                  {userRole === 'student' ? (
                    <button
                      onClick={() => handleNavClick('student-dashboard')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-brand-600"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Student Dashboard
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavClick('business-dashboard')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Business Dashboard
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => handleNavClick('signup')}
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-800 border border-slate-300"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => handleNavClick('find-projects')}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-brand-600 shadow-md"
                  >
                    Find Your First Micro-Internship
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
