import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { 
  PlusCircle, 
  Eye, 
  Send, 
  Clock, 
  MapPin, 
  IndianRupee, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const PostProject = ({ onSuccess }) => {
  const { postProject, currentUser } = useApp();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    skills: '',
    duration: '4 Days',
    payment: '2000',
    workType: 'Remote',
    location: 'Remote (Pan India)',
    difficulty: 'Intermediate',
    positions: 1,
    deadline: '2026-10-15',
    description: '',
    requirements: 'Strong debugging skills, clear communication, timely updates',
    deliverables: 'Completed project code, testing verification, handover summary'
  });

  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    'Web Development',
    'Marketing & Content',
    'Design & Creative',
    'Data & Operations'
  ];

  const workTypes = ['Remote', 'Hybrid', 'In-Person'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.skills.trim()) {
      showToast('Please fill out all required fields before publishing.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const skillsArray = formData.skills.split(',').map((s) => s.trim()).filter(Boolean);
      const reqsArray = formData.requirements.split(',').map((r) => r.trim()).filter(Boolean);
      const delsArray = formData.deliverables.split(',').map((d) => d.trim()).filter(Boolean);

      const res = postProject({
        ...formData,
        skills: skillsArray,
        requirements: reqsArray,
        deliverables: delsArray
      });

      setSubmitting(false);
      if (res.success) {
        showToast(res.message, 'success');
        if (onSuccess) onSuccess();
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Post a Micro-Internship
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Publish a focused 2 to 7-day project sprint and receive qualified student applications in hours.
          </p>
        </div>

        {/* Edit / Preview Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-200 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'edit'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Form Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Build Responsive Pricing Component with Tailwind CSS"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              required
            />
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Difficulty Level
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Required Skills (comma separated) *
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="e.g. React, Tailwind CSS, JavaScript, Git"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Duration, Budget, Work Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g. 4 Days"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Budget / Stipend (₹) *
              </label>
              <input
                type="number"
                min={500}
                step={250}
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Work Type
              </label>
              <select
                value={formData.workType}
                onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {workTypes.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote (Bangalore)"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Application Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Students Needed
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.positions}
                onChange={(e) => setFormData({ ...formData, positions: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Project Description *
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the context, the exact problem to solve, tools provided, and expectations..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Requirements & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Requirements (comma separated)
              </label>
              <textarea
                rows={2}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Deliverables (comma separated)
              </label>
              <textarea
                rows={2}
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <Eye className="w-4 h-4" />
              <span>Preview First</span>
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Publishing...' : 'Publish Project'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Preview Card */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Project Card Preview (As students will see it)
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              Back to Editor
            </button>
          </div>

          <div className="max-w-lg mx-auto bg-slate-50/80 rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser?.logo || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80'}
                  alt={currentUser?.name || 'Company'}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{currentUser?.name || 'GreenLeaf Café'}</h4>
                  <div className="text-xs text-slate-500">{formData.location} • {formData.workType}</div>
                </div>
              </div>
              <Badge variant="purple" size="xs">{formData.category}</Badge>
            </div>

            <h3 className="font-bold text-base text-slate-900 mb-2">
              {formData.title || 'Untitled Micro-Internship Project'}
            </h3>

            <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
              {formData.description || 'Project description preview will appear here.'}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {(formData.skills || 'React, CSS').split(',').map((sk, idx) => (
                <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {sk.trim()}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Stipend</span>
                <span className="text-lg font-black text-emerald-600">₹{Number(formData.payment || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {formData.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition"
            >
              <Send className="w-4 h-4" />
              <span>Looks Great, Publish Now!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
