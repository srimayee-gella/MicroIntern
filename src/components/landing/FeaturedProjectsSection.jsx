import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Clock, IndianRupee, MapPin, Sparkles, Star } from 'lucide-react';
import { Badge } from '../common/Badge';

export const FeaturedProjectsSection = () => {
  const { projects, navigateTo } = useApp();

  const featured = projects.slice(0, 3);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Live Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Micro-Internships
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Bite-sized projects looking for student talent right now.
            </p>
          </div>
          <button
            onClick={() => navigateTo('find-projects')}
            className="inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700 text-sm group"
          >
            <span>View all 50+ projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Company & Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={proj.businessLogo}
                      alt={proj.businessName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{proj.businessName}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{proj.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="purple" size="xs">
                    {proj.category}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-1">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.skills.slice(0, 3).map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {proj.skills.length > 3 && (
                    <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
                      +{proj.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Footer info & CTA */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-emerald-700 font-extrabold text-lg">
                    <span>₹{proj.payment.toLocaleString('en-IN')}</span>
                    <span className="text-[11px] font-semibold text-slate-500">fixed</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('project-details', proj.id)}
                  className="w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-slate-100 hover:bg-brand-600 hover:text-white transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
