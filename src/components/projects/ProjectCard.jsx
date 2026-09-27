import React from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { 
  Clock, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ProjectCard = ({ project, onSelect, onApplyClick }) => {
  const { savedProjectIds, toggleSaveProject, userRole } = useApp();
  const { showToast } = useToast();

  const isSaved = savedProjectIds.includes(project.id);

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSaveProject(project.id);
    if (!isSaved) {
      showToast('Project saved to your bookmarks!', 'success');
    } else {
      showToast('Project removed from saved bookmarks.', 'info');
    }
  };

  const getDifficultyVariant = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'primary';
      case 'advanced': return 'purple';
      default: return 'default';
    }
  };

  const getCategoryVariant = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'web development': return 'primary';
      case 'marketing & content': return 'purple';
      case 'design & creative': return 'warning';
      case 'data & operations': return 'success';
      default: return 'default';
    }
  };

  return (
    <div 
      onClick={() => onSelect(project.id)}
      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
    >
      <div>
        {/* Top bar: Company info + bookmark */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={project.businessLogo}
              alt={project.businessName}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs group-hover:scale-105 transition-transform"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{project.businessName}</span>
                {project.verified && (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verified Business" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{project.location}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">{project.workType}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSave}
            title={isSaved ? "Remove from saved" : "Save project"}
            className={`p-2 rounded-xl border transition ${
              isSaved
                ? 'bg-brand-50 border-brand-200 text-brand-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={getCategoryVariant(project.category)} size="xs">
            {project.category}
          </Badge>
          <Badge variant={getDifficultyVariant(project.difficulty)} size="xs">
            {project.difficulty}
          </Badge>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100/80 text-slate-700 border border-slate-200/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Stipend & CTA */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block -mb-0.5">Fixed Stipend</span>
            <div className="text-xl font-black text-emerald-600">
              ₹{project.payment.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 justify-end">
              <Users className="w-3 h-3 text-slate-400" />
              <span>{project.applicantsCount} applicants</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project.id);
            }}
            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center"
          >
            View Project
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onApplyClick(project);
            }}
            className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 transition shadow-sm text-center flex items-center justify-center gap-1"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
