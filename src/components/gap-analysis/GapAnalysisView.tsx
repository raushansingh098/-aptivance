import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronDown, 
  ExternalLink,
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import { SkillGapItem } from '../../types';

export const GapAnalysisView: React.FC = () => {
  const { 
    currentStudent, 
    activeRole, 
    gapAnalysis, 
    roles, 
    setTargetRole, 
    setActiveTab 
  } = useApp();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Title & Subtitle Row matching screenshot 5 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Gap Analysis
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gap = max(0, required - current). Readiness uses assessed skills only; coverage shows how much is assessed.
          </p>
        </div>

        {/* Role Switcher Pill */}
        <div className="relative self-start sm:self-auto">
          <select
            value={activeRole.id}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-800 shadow-xs focus:outline-hidden focus:border-teal-500 cursor-pointer"
          >
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 Metric Cards matching screenshot 2 & 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: ROLE READINESS */}
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

        {/* Card 2: ASSESSMENT COVERAGE */}
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

        {/* Card 3: WEIGHTED GAP */}
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

      {/* Current vs required Table matching Screenshot 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-extrabold text-slate-900 text-base">
            Current vs required
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {gapAnalysis.items.length} skills analyzed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                <th className="pb-3 w-1/4">Skill</th>
                <th className="pb-3 w-1/3">Level (▼ = required)</th>
                <th className="pb-3 text-center">Gap</th>
                <th className="pb-3 text-center">Weight</th>
                <th className="pb-3 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gapAnalysis.items.map((item: SkillGapItem) => (
                <tr key={item.skill.id} className="hover:bg-slate-50/70 transition">
                  {/* Skill Name */}
                  <td className="py-4 font-bold text-slate-900 pr-3">
                    <div className="flex items-center gap-2">
                      <span>{item.skill.name}</span>
                    </div>
                  </td>

                  {/* Level 5-Segment Bar with Pointer ▼ */}
                  <td className="py-4 pr-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-700 whitespace-nowrap text-xs w-10">
                        {item.currentLevel} / {item.requiredLevel}
                      </span>

                      {/* 5-Block Segmented Bar */}
                      <div className="relative flex items-center gap-1 flex-1 max-w-[200px]">
                        {[1, 2, 3, 4, 5].map(seg => {
                          const isFilled = item.currentLevel >= seg;
                          const isRequired = item.requiredLevel === seg;

                          return (
                            <div key={seg} className="relative flex-1">
                              {/* Pointer Triangle ▼ above required level block */}
                              {isRequired && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] text-slate-900 font-bold select-none leading-none">
                                  ▼
                                </div>
                              )}
                              {/* Bar Segment */}
                              <div
                                className={`h-2.5 rounded-xs transition-all ${
                                  isFilled 
                                    ? 'bg-[#0d9488]' 
                                    : 'bg-slate-200/80'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </td>

                  {/* Gap Amount & Percentage */}
                  <td className="py-4 text-center font-semibold text-slate-700">
                    {item.gap > 0 ? `${item.gap} (${item.gapPercentage}%)` : '0 (0%)'}
                  </td>

                  {/* Weight (1 to 5) */}
                  <td className="py-4 text-center font-semibold text-slate-700">
                    {item.weight}
                  </td>

                  {/* Severity Badge */}
                  <td className="py-4 text-right font-bold whitespace-nowrap">
                    <span
                      className={`text-xs ${
                        item.severity === 'Large gap'
                          ? 'text-[#dc2626]'
                          : item.severity === 'Moderate gap'
                          ? 'text-[#d97706]'
                          : item.severity === 'Small gap'
                          ? 'text-amber-500'
                          : 'text-[#0d9488]'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 text-xs">
        <span className="text-slate-600 font-medium">
          Ready to bridge priority gaps? Explore curated project briefs and courses.
        </span>
        <button
          onClick={() => setActiveTab('recommendations')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition flex items-center gap-1.5 shadow-xs"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>View Recommended Learning</span>
        </button>
      </div>
    </div>
  );
};
