import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Briefcase,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { SkillGapItem } from '../../types';

export const DashboardView: React.FC = () => {
  const { 
    currentStudent, 
    activeRole, 
    gapAnalysis, 
    setActiveTab, 
    roles, 
    setTargetRole 
  } = useApp();

  const alternativeRoles = roles.filter(r => r.id !== activeRole.id).slice(0, 3);
  const topGaps = gapAnalysis.priorityGaps.slice(0, 3);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* 3 Metric Stat Cards matching Screenshot 2 & 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* ROLE READINESS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Role Readiness
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            {gapAnalysis.overallMatchPercentage}%
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Assessed skills only
          </span>
        </div>

        {/* ASSESSMENT COVERAGE */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Assessment Coverage
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            {gapAnalysis.assessmentCoveragePercentage}%
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {gapAnalysis.assessedCount} of {gapAnalysis.totalRequiredCount} required skills assessed
          </span>
        </div>

        {/* WEIGHTED GAP */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Weighted Gap
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
            {gapAnalysis.weightedGapPercentage}%
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Weighted by importance (1-5)
          </span>
        </div>
      </div>

      {/* Top Skill Gaps Container matching Screenshot 2 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-base">
            Top skill gaps
          </h3>
          <button
            onClick={() => setActiveTab('gap-analysis')}
            className="text-xs font-bold text-slate-700 hover:text-teal-700 flex items-center gap-1 transition"
          >
            <span>Full analysis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Top Skill Gaps with 5-Segment Bar and Red Banner Card */}
        <div className="space-y-6">
          {topGaps.map((item: SkillGapItem) => (
            <div key={item.skill.id} className="space-y-2">
              {/* Header: Skill Name and Level Transition (e.g. Data analysis 0 -> 3) */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{item.skill.name}</span>
                <span className="font-semibold text-slate-500">
                  {item.currentLevel} → {item.requiredLevel}
                </span>
              </div>

              {/* 5-Block Segmented Bar with required pointer ▼ */}
              <div className="flex items-center gap-1.5 pt-2">
                {[1, 2, 3, 4, 5].map(seg => {
                  const isFilled = item.currentLevel >= seg;
                  const isRequired = item.requiredLevel === seg;

                  return (
                    <div key={seg} className="relative flex-1">
                      {isRequired && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-900 font-bold select-none leading-none">
                          ▼
                        </div>
                      )}
                      <div
                        className={`h-2.5 rounded-xs transition-all ${
                          isFilled ? 'bg-[#0d9488]' : 'bg-slate-200/80'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Red Banner Pill saying "Large gap" matching screenshot 2 */}
              <div className="w-full py-1.5 px-3 rounded-lg bg-[#fee2e2] text-[#991b1b] text-center text-xs font-bold shadow-xs">
                {item.severity}
              </div>
            </div>
          ))}

          {topGaps.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-400">
              No priority gaps detected for {activeRole.title}. You are role-ready!
            </div>
          )}
        </div>
      </div>

      {/* Alternative Career Pathways Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alternativeRoles.map(role => (
          <div
            key={role.id}
            onClick={() => setTargetRole(role.id)}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-teal-400 cursor-pointer transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-400 uppercase">{role.level}</span>
                <span className="font-bold text-teal-700">~{role.weeksOfLearning} wks</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-800 transition">
                {role.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                {role.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">{role.skills.length} skills</span>
              <span className="font-bold text-blue-600 group-hover:underline">Select Pathway →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
