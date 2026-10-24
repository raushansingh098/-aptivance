import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  ExternalLink, 
  Plus, 
  Check, 
  Clock, 
  Star, 
  Sparkles, 
  Filter, 
  Search, 
  FolderGit2, 
  Award, 
  Flame,
  ArrowRight,
  Layers
} from 'lucide-react';
import { Recommendation, RecommendationType } from '../../types';

export const RecommendationsView: React.FC = () => {
  const { 
    recommendations, 
    gapAnalysis, 
    currentStudent, 
    addGoalFromRecommendation, 
    setActiveTab,
    activeRole 
  } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect gap skill IDs
  const gapSkillIds = new Set([
    ...gapAnalysis.priorityGaps.map(g => g.skill.id),
    ...gapAnalysis.partialMatches.map(g => g.skill.id)
  ]);

  // Goal IDs already in learning roadmap
  const addedRecIds = new Set(
    currentStudent.goals
      .map(g => g.recommendationId)
      .filter((id): id is string => Boolean(id))
  );

  const filteredRecs = recommendations.filter(rec => {
    const matchesType = selectedType === 'all' || rec.type === selectedType;
    const matchesSkill = selectedSkillFilter === 'all' || rec.skillId === selectedSkillFilter;
    const matchesSearch = 
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSkill && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Personalized Learning Recommendations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated high-impact courses, capstone projects, and industry certifications specifically aligned with your competency gaps for <strong>{activeRole.title}</strong>.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('progress')}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-xs flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <span>View Learning Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, project briefs, or providers (Coursera, Meta, etc.)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>Showing {filteredRecs.length} curated resources</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
              selectedType === 'all' ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Formats
          </button>
          <button
            onClick={() => setSelectedType('project')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedType === 'project' ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Capstone Projects</span>
          </button>
          <button
            onClick={() => setSelectedType('course')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedType === 'course' ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Courses</span>
          </button>
          <button
            onClick={() => setSelectedType('certification')}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedType === 'certification' ? 'bg-[#00875a] text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certifications</span>
          </button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecs.map(rec => {
          const isAdded = addedRecIds.has(rec.id);
          const isPriorityGap = gapSkillIds.has(rec.skillId);

          return (
            <div
              key={rec.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                isPriorityGap ? 'border-emerald-200' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {rec.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {rec.provider}
                      </span>
                      {isPriorityGap && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
                          Targets Your Gap
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                      {rec.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-xl shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{rec.rating}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {rec.description}
                </p>

                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{rec.duration}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-medium">
                    Level: {rec.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 font-bold">
                    Target Skill: {rec.skillName} (L{rec.targetLevel})
                  </span>
                </div>

                {/* Project Deliverables Checklist if project */}
                {rec.deliverables && rec.deliverables.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-4 text-xs space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Portfolio Deliverables:
                    </p>
                    {rec.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <a
                  href={rec.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <span>Resource Link</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                {isAdded ? (
                  <button
                    onClick={() => setActiveTab('progress')}
                    className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 transition"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>In Learning Plan</span>
                  </button>
                ) : (
                  <button
                    onClick={() => addGoalFromRecommendation(rec)}
                    className="px-4 py-2 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Learning Plan</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
