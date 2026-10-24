import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Award, 
  HelpCircle, 
  Zap, 
  Info,
  Check,
  Target,
  Flame
} from 'lucide-react';
import { ProficiencyLevel } from '../../types';
import { triggerConfetti, getProficiencyColor, getProficiencyLabel } from '../../utils/analysisUtils';

export const SelfAssessmentView: React.FC = () => {
  const { 
    currentStudent, 
    activeRole, 
    skills, 
    updateSkillProficiency, 
    setActiveTab, 
    showToast 
  } = useApp();

  // We assess the skills required by the active target role
  const roleSkills = activeRole.skills;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentReq = roleSkills[currentIndex];
  const skillMeta = skills.find(s => s.id === currentReq?.skillId);
  const studentSkill = currentStudent.skills.find(s => s.skillId === currentReq?.skillId);

  // Local state for current question
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel>(
    (studentSkill && studentSkill.proficiency > 0 ? studentSkill.proficiency : 2) as ProficiencyLevel
  );
  const [selectedConfidence, setSelectedConfidence] = useState<'Low' | 'Medium' | 'High'>(studentSkill ? studentSkill.confidence : 'Medium');
  const [notes, setNotes] = useState(studentSkill?.evidenceNotes || '');
  const [isCompletedState, setIsCompletedState] = useState(false);

  // Sync state when index changes
  const handleIndexChange = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= roleSkills.length) return;
    setCurrentIndex(newIndex);
    const req = roleSkills[newIndex];
    const sk = currentStudent.skills.find(s => s.skillId === req.skillId);
    setSelectedLevel((sk && sk.proficiency > 0 ? sk.proficiency : 2) as ProficiencyLevel);
    setSelectedConfidence(sk ? sk.confidence : 'Medium');
    setNotes(sk?.evidenceNotes || '');
  };

  const handleSaveAndNext = () => {
    if (!currentReq) return;

    // Save
    updateSkillProficiency(currentReq.skillId, selectedLevel, selectedConfidence, notes);

    if (currentIndex < roleSkills.length - 1) {
      handleIndexChange(currentIndex + 1);
    } else {
      triggerConfetti();
      setIsCompletedState(true);
      showToast('🎉 Self-Assessment Complete! Your skill gap analysis has been recalculated.');
    }
  };

  const assessedCount = roleSkills.filter(req => 
    currentStudent.skills.some(s => s.skillId === req.skillId)
  ).length;

  const progressPercent = Math.round((assessedCount / roleSkills.length) * 100);

  if (isCompletedState) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-[#00875a] flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
          <Award className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            Assessment Completed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Great Job, {currentStudent.name}!
          </h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
            You've audited all {roleSkills.length} core competencies for <strong>{activeRole.title}</strong>. Your updated gap analysis and personalized recommendations are ready.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Target Role</span>
            <p className="font-extrabold text-slate-900 text-xs sm:text-sm">{activeRole.title}</p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Skills Assessed</span>
            <p className="font-extrabold text-emerald-700 text-xs sm:text-sm">{roleSkills.length} of {roleSkills.length} (100%)</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('gap-analysis')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#00875a] text-white text-xs sm:text-sm font-bold hover:bg-[#00704a] shadow-xs flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>View Skill Gap Analysis</span>
          </button>
          <button
            onClick={() => {
              setIsCompletedState(false);
              setCurrentIndex(0);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50"
          >
            Review Answers
          </button>
        </div>
      </div>
    );
  }

  if (!skillMeta || !currentReq) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-slate-500">
        No skills specified for this role.
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Guided Self-Assessment</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audit your true competency level against <strong>{activeRole.title}</strong> benchmarks using clear behavioral rubrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700">
              {currentIndex + 1} of {roleSkills.length} Skills
            </span>
            <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="bg-[#00875a] h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentIndex + 1) / roleSkills.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Assessment Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-4xl mx-auto space-y-6">
        {/* Skill Title & Target Requirement */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {skillMeta.category}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Importance: <strong className="text-slate-800">{currentReq.importance}</strong>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5">
              {skillMeta.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {skillMeta.description}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-right shrink-0">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Role Requirement</span>
            <span className="text-base font-extrabold text-[#00875a]">
              Level {currentReq.requiredLevel} ({['', 'Novice', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][currentReq.requiredLevel]})
            </span>
          </div>
        </div>

        {/* Level 1-5 Rubric Picker */}
        <div>
          <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
            Select Your Demonstrated Proficiency (Click to Rate):
          </label>

          <div className="space-y-2.5">
            {([1, 2, 3, 4, 5] as ProficiencyLevel[]).map(lvl => {
              const isSelected = selectedLevel === lvl;
              const isTargetLvl = currentReq.requiredLevel === lvl;

              return (
                <div
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#00875a] bg-emerald-50/50 shadow-xs ring-1 ring-[#00875a]'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition ${
                      isSelected
                        ? 'bg-[#00875a] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lvl}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {getProficiencyLabel(lvl)}
                      </span>
                      {isTargetLvl && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          Role Benchmark
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {skillMeta.levelRubrics[lvl]}
                    </p>
                  </div>

                  {isSelected && (
                    <Check className="w-5 h-5 text-[#00875a] shrink-0 mt-0.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confidence and Evidence notes row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Confidence In This Rating
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Low', 'Medium', 'High'] as const).map(conf => (
                <button
                  type="button"
                  key={conf}
                  onClick={() => setSelectedConfidence(conf)}
                  className={`py-2 rounded-xl text-xs font-bold transition text-center ${
                    selectedConfidence === conf
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {conf}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Evidence / Practical Experience Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Completed React router project, implemented Redux Toolkit state"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={() => handleIndexChange(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Skill</span>
          </button>

          {/* Quick jump dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {roleSkills.map((req, idx) => {
              const isAssessed = currentStudent.skills.some(s => s.skillId === req.skillId);
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={req.skillId}
                  onClick={() => handleIndexChange(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-[#00875a] scale-125 ring-2 ring-emerald-300'
                      : isAssessed
                      ? 'bg-emerald-300 hover:bg-emerald-400'
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Skill ${idx + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={handleSaveAndNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs transition"
          >
            <span>{currentIndex === roleSkills.length - 1 ? 'Finish & Analyze' : 'Save & Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
