import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetRole } from '../../types';
import { 
  Check, 
  X, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { computeGapAnalysis } from '../../utils/analysisUtils';

export const TargetRolesView: React.FC = () => {
  const { 
    roles, 
    skills, 
    currentStudent, 
    setTargetRole, 
    setActiveTab,
    roleComparisonIds,
    toggleRoleComparison,
    showToast 
  } = useApp();

  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<TargetRole | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const comparedRoles = roles.filter(r => roleComparisonIds.includes(r.id));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Career Roles
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Explore industry benchmark roles, required skills, and learning timeframes.
          </p>
        </div>

        {/* Compare Trigger Button */}
        {roleComparisonIds.length > 0 && (
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Compare Selected ({roleComparisonIds.length})</span>
          </button>
        )}
      </div>

      {/* Roles Grid matching Screenshot 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map(role => {
          const isTarget = role.id === currentStudent.targetRoleId;
          const isCompared = roleComparisonIds.includes(role.id);

          return (
            <div
              key={role.id}
              className={`bg-white rounded-2xl p-6 border transition flex flex-col justify-between shadow-xs hover:shadow-md relative ${
                isTarget ? 'border-teal-300' : 'border-slate-200/80'
              }`}
            >
              <div>
                {/* Header row with Title & Target Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-black text-slate-900">
                    {role.title}
                  </h3>

                  {/* Target Badge (Soft Teal Pill at top right matching screenshot 3) */}
                  {isTarget && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ccfbf1] text-[#0f766e]">
                      Target
                    </span>
                  )}
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[32px]">
                  {role.description}
                </p>

                {/* Pills Row: Seniority Level & Required Skills */}
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200">
                    {role.level}
                  </span>
                  <span className="text-slate-500 text-xs font-medium">
                    {role.skills.length} required skills
                  </span>
                </div>

                {/* Weeks of Learning */}
                <div className="text-xs text-slate-500 mb-6">
                  ~{role.weeksOfLearning} weeks of learning
                </div>
              </div>

              {/* Action Buttons Row matching Screenshot 3 */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {/* Select / Remove Button */}
                {isTarget ? (
                  <button
                    onClick={() => {
                      showToast('Cannot remove primary target role. Select another role to change.');
                    }}
                    className="py-1.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setTargetRole(role.id);
                      setActiveTab('gap-analysis');
                    }}
                    className="py-1.5 px-3 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Select</span>
                  </button>
                )}

                {/* Details Button */}
                <button
                  onClick={() => setSelectedRoleForDetail(role)}
                  className="py-1.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                >
                  Details
                </button>

                {/* Compare Button */}
                <button
                  onClick={() => toggleRoleComparison(role.id)}
                  className={`text-xs font-bold transition flex items-center gap-1 ${
                    isCompared ? 'text-teal-700' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Details Drawer / Modal */}
      {selectedRoleForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
                  {selectedRoleForDetail.level}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedRoleForDetail.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Est. Preparation: ~{selectedRoleForDetail.weeksOfLearning} weeks
                </p>
              </div>
              <button
                onClick={() => setSelectedRoleForDetail(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                <p className="text-slate-600 leading-relaxed">{selectedRoleForDetail.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Required Skills Profile</h4>
                <div className="space-y-1.5">
                  {selectedRoleForDetail.skills.map(req => {
                    const sMeta = skills.find(s => s.id === req.skillId);
                    return (
                      <div key={req.skillId} className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                        <span className="font-semibold text-slate-800">{sMeta?.name || 'Skill'}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Weight: {req.numericWeight || 4}</span>
                          <span className="font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                            Lvl {req.requiredLevel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedRoleForDetail(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setTargetRole(selectedRoleForDetail.id);
                    setSelectedRoleForDetail(null);
                    setActiveTab('gap-analysis');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                >
                  Set as Target Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Role Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-teal-600" />
                <span>Side-by-Side Career Role Comparison</span>
              </h3>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparedRoles.map(role => {
                const analysis = computeGapAnalysis(role, currentStudent.skills, skills);
                return (
                  <div key={role.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">{role.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {role.level}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Your Match</span>
                      <span className="text-2xl font-black text-teal-700">{analysis.overallMatchPercentage}%</span>
                      <p className="text-[10px] text-slate-500 mt-0.5">Weighted Gap: {analysis.weightedGapPercentage}%</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <p>• Estimated prep: <strong>~{role.weeksOfLearning} weeks</strong></p>
                      <p>• Required competencies: <strong>{role.skills.length} skills</strong></p>
                      <p>• Priority gaps: <strong className="text-rose-600">{analysis.priorityGaps.length} gaps</strong></p>
                    </div>

                    <button
                      onClick={() => {
                        setTargetRole(role.id);
                        setIsCompareModalOpen(false);
                        setActiveTab('gap-analysis');
                      }}
                      className="w-full py-2 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                    >
                      Set As Target Role
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
