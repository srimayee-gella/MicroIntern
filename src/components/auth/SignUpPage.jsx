import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, Building2, User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const SignUpPage = () => {
  const { login, navigateTo } = useApp();
  const { showToast } = useToast();

  const [role, setRole] = useState('student'); // 'student' | 'business'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    course: '',
    companyName: '',
    industry: '',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'student') {
      const newStudent = {
        id: `student_${Date.now()}`,
        name: formData.name || 'New Student',
        title: 'College Micro-Intern',
        email: formData.email,
        college: formData.college || 'Top University',
        course: formData.course || 'Undergraduate',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        skills: ['Communication', 'Research', 'Canva', 'HTML'],
        bio: 'Aspiring student professional eager to tackle real-world project sprints.',
        availability: '10-15 hrs/week • Remote',
        rating: 5.0,
        reviewCount: 0,
        completedProjectsCount: 0,
        activeProjectsCount: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        upiId: `${formData.name?.toLowerCase().replace(/\s+/g, '') || 'student'}@okhdfcbank`
      };

      login('student', newStudent);
      showToast(`Welcome to MicroIntern, ${newStudent.name}! Your student profile is live.`, 'success');
    } else {
      const newBusiness = {
        id: `business_${Date.now()}`,
        name: formData.companyName || 'Emerging Startup',
        industry: formData.industry || 'Technology & Services',
        location: 'Bangalore, India',
        logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80',
        verified: true,
        rating: 5.0,
        reviewCount: 0,
        description: 'Innovating rapidly and hiring motivated college interns for micro-sprints.',
        website: formData.website || 'startup.io',
        email: formData.email
      };

      login('business', newBusiness);
      showToast(`Welcome, ${newBusiness.name}! Your employer dashboard is ready.`, 'success');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-slate-50 relative">
      <div className="max-w-lg w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Join MicroIntern
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Start building practical proof-of-work or hire skilled student talent.
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition ${
              role === 'student'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-brand-600" />
            <span>I am a Student</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('business')}
            className={`p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition ${
              role === 'business'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>I am a Business</span>
          </button>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {role === 'student' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tanvi Joshi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Degree / Branch
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Com 2nd Year"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. NextWave Labs"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. D2C Fashion / SaaS"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Website or Social Link
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. nextwavelabs.in"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Create Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition flex items-center justify-center gap-2 mt-4 ${
              role === 'student'
                ? 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
            }`}
          >
            <span>Create {role === 'student' ? 'Student' : 'Business'} Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-500">
          Already registered?{' '}
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-brand-600 hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
