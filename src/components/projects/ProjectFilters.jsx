import React, { useState } from 'react';
import { Search, Filter, X, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSkill,
  setSelectedSkill,
  selectedWorkType,
  setSelectedWorkType,
  selectedDuration,
  setSelectedDuration,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedPaymentRange,
  setSelectedPaymentRange,
  onReset
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const categories = [
    'All',
    'Web Development',
    'Marketing & Content',
    'Design & Creative',
    'Data & Operations'
  ];

  const popularSkills = [
    'All',
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Tailwind CSS',
    'Python',
    'Canva',
    'Content Writing',
    'Excel',
    'Figma',
    'Social Media',
    'Video Editing'
  ];

  const workTypes = ['All', 'Remote', 'Hybrid', 'In-Person'];
  const durations = ['All', '1-3 Days', '4-7 Days', '1-2 Weeks'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const paymentRanges = [
    { label: 'All Budgets', value: 'all' },
    { label: 'Under ₹1,500', value: 'under-1500' },
    { label: '₹1,500 - ₹2,500', value: '1500-2500' },
    { label: 'Above ₹2,500', value: 'above-2500' }
  ];

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedSkill !== 'All' ||
    selectedWorkType !== 'All' ||
    selectedDuration !== 'All' ||
    selectedDifficulty !== 'All' ||
    selectedPaymentRange !== 'all';

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm mb-8">
      {/* Search Input Bar */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, skills (e.g. Canva, React), or company name..."
          className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white text-sm transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills (Always Visible) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-between md:hidden pt-2 border-t border-slate-100">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 py-1"
        >
          <Filter className="w-3.5 h-3.5 text-brand-600" />
          <span>More Filters</span>
          {mobileExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Detailed Filters Grid (Always on Desktop, Collapsible on Mobile) */}
      <div className={`${mobileExpanded ? 'block' : 'hidden'} md:block pt-4 border-t border-slate-100 mt-2`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Skill Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Specific Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {popularSkills.map((sk) => (
                <option key={sk} value={sk}>{sk === 'All' ? 'All Skills' : sk}</option>
              ))}
            </select>
          </div>

          {/* Work Type Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Work Type
            </label>
            <select
              value={selectedWorkType}
              onChange={(e) => setSelectedWorkType(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {workTypes.map((wt) => (
                <option key={wt} value={wt}>{wt === 'All' ? 'All Work Types' : wt}</option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>{dur === 'All' ? 'Any Duration' : dur}</option>
              ))}
            </select>
          </div>

          {/* Payment Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Payment (₹)
            </label>
            <select
              value={selectedPaymentRange}
              onChange={(e) => setSelectedPaymentRange(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {paymentRanges.map((pr) => (
                <option key={pr.value} value={pr.value}>{pr.label}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>{diff === 'All' ? 'All Difficulties' : diff}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters on Desktop */}
        {hasActiveFilters && (
          <div className="hidden md:flex items-center justify-end mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
