import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { ApplyModal } from '../components/projects/ApplyModal';
import { Sparkles, Search, Layers, RotateCcw } from 'lucide-react';

export const FindProjectsPage = () => {
  const { projects, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedDuration, setSelectedDuration] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPaymentRange, setSelectedPaymentRange] = useState('all');

  const [selectedProjectForApply, setSelectedProjectForApply] = useState(null);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSkill('All');
    setSelectedWorkType('All');
    setSelectedDuration('All');
    setSelectedDifficulty('All');
    setSelectedPaymentRange('all');
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search query (title, businessName, skills, description)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesBusiness = project.businessName.toLowerCase().includes(query);
        const matchesSkills = project.skills.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = project.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBusiness && !matchesSkills && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && project.category !== selectedCategory) {
        return false;
      }

      // Skill
      if (selectedSkill !== 'All') {
        const hasSkill = project.skills.some(
          (s) => s.toLowerCase() === selectedSkill.toLowerCase()
        );
        if (!hasSkill) return false;
      }

      // Work Type
      if (selectedWorkType !== 'All' && project.workType !== selectedWorkType) {
        return false;
      }

      // Duration
      if (selectedDuration !== 'All') {
        if (selectedDuration === '1-3 Days' && project.durationDays > 3) return false;
        if (selectedDuration === '4-7 Days' && (project.durationDays < 4 || project.durationDays > 7)) return false;
        if (selectedDuration === '1-2 Weeks' && project.durationDays < 8) return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'All' && project.difficulty !== selectedDifficulty) {
        return false;
      }

      // Payment range
      if (selectedPaymentRange !== 'all') {
        if (selectedPaymentRange === 'under-1500' && project.payment >= 1500) return false;
        if (selectedPaymentRange === '1500-2500' && (project.payment < 1500 || project.payment > 2500)) return false;
        if (selectedPaymentRange === 'above-2500' && project.payment <= 2500) return false;
      }

      return true;
    });
  }, [
    projects,
    searchQuery,
    selectedCategory,
    selectedSkill,
    selectedWorkType,
    selectedDuration,
    selectedDifficulty,
    selectedPaymentRange
  ]);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Short-Term Sprints
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Find Your Next Micro-Internship
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Browse high-impact, short-term tasks posted by genuine startups. Build verified experience and earn guaranteed stipends.
          </p>
        </div>

        {/* Filters */}
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          selectedWorkType={selectedWorkType}
          setSelectedWorkType={setSelectedWorkType}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedPaymentRange={selectedPaymentRange}
          setSelectedPaymentRange={setSelectedPaymentRange}
          onReset={resetFilters}
        />

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-500 font-medium">
          <div>
            Showing <strong className="text-slate-900">{filteredProjects.length}</strong> active micro-internship{filteredProjects.length === 1 ? '' : 's'}
          </div>
          {(selectedCategory !== 'All' || selectedSkill !== 'All' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear active filters</span>
            </button>
          )}
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No matching projects found</h3>
            <p className="text-xs text-slate-500 mb-6">
              Try adjusting your search criteria, selecting a different skill, or clearing filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-brand-600 hover:bg-brand-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(id) => navigateTo('project-details', id)}
                onApplyClick={(proj) => setSelectedProjectForApply(proj)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyModal
        project={selectedProjectForApply}
        isOpen={!!selectedProjectForApply}
        onClose={() => setSelectedProjectForApply(null)}
      />
    </div>
  );
};
