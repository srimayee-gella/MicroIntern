import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, Building2, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginPage = () => {
  const { login, students, businesses, navigateTo } = useApp();
  const { showToast } = useToast();

  const [email, setEmail] = useState('ananya.sharma@college.edu');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('student'); // 'student' | 'business'

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'student') {
      const student = students.find((s) => s.email.toLowerCase() === email.toLowerCase()) || students[0];
      login('student', student);
      showToast(`Welcome back, ${student.name}! Logged in as Student.`, 'success');
    } else {
      const business = businesses[0];
      login('business', business);
      showToast(`Welcome back! Logged in as ${business.name}.`, 'success');
    }
  };

  const handleQuickStudentLogin = () => {
    login('student', students[0]);
    showToast('Logged in as Student (Ananya Sharma)!', 'success');
  };

  const handleQuickBusinessLogin = () => {
    login('business', businesses[0]);
    showToast('Logged in as Business (GreenLeaf Café)!', 'success');
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-slate-50 relative">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white mx-auto shadow-md mb-4">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign in to MicroIntern
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Access your applications, active tasks, or business listings.
          </p>
        </div>

        {/* Quick 1-Click Demo Buttons */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
            Instant Demo Logins
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleQuickStudentLogin}
              className="p-2.5 rounded-xl border border-brand-200 bg-brand-50 hover:bg-brand-100 text-brand-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4 text-brand-600" />
              <span>Login as Student</span>
            </button>

            <button
              type="button"
              onClick={handleQuickBusinessLogin}
              className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Login as Business</span>
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 uppercase">Or with credentials</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                role === 'student' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('business')}
              className={`py-2 text-xs font-bold rounded-lg transition ${
                role === 'business' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Business
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); showToast('Demo password is: password123', 'info'); }} className="text-xs text-brand-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer links */}
        <div className="text-center pt-2 text-xs text-slate-500">
          Don't have an account?{' '}
          <button
            onClick={() => navigateTo('signup')}
            className="font-bold text-brand-600 hover:underline"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
