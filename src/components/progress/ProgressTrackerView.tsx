import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Milestone, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Trash2, 
  Zap, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Flame, 
  Check, 
  X,
  Target,
  ArrowRight
} from 'lucide-react';
import { LearningGoal, RecommendationType } from '../../types';
import { triggerConfetti } from '../../utils/analysisUtils';

export const ProgressTrackerView: React.FC = () => {
  const { 
    currentStudent, 
    skills, 
    createGoal, 
    updateGoalStatus, 
    deleteGoal, 
    levelUpSkillFromGoal,
    gapAnalysis,
    activeRole 
  } = useApp();

  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSkillId, setNewSkillId] = useState(skills[0]?.id || '');
  const [newType, setNewType] = useState<RecommendationType | 'general'>('project');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newEstimatedHours, setNewEstimatedHours] = useState(10);

  const todoGoals = currentStudent.goals.filter(g => g.status === 'todo');
  const inProgressGoals = currentStudent.goals.filter(g => g.status === 'in_progress');
  const completedGoals = currentStudent.goals.filter(g => g.status === 'completed');

  const totalSpentHours = currentStudent.goals.reduce((sum, g) => sum + g.hoursSpent, 0);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const skillMeta = skills.find(s => s.id === newSkillId);
    createGoal({
      skillId: newSkillId,
      skillName: skillMeta?.name || 'Skill',
      title: newTitle,
      type: newType,
      targetDate: newTargetDate || new Date().toISOString().split('T')[0],
      status: 'todo',
      progressPercent: 0,
      hoursSpent: 0,
      estimatedHours: newEstimatedHours
    });
    setIsNewGoalModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Milestone className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Career Roadmap & Progress Tracker
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track milestones, complete hands-on activities, level up competencies, and watch your role match score surge.
          </p>
        </div>

        <button
          onClick={() => setIsNewGoalModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs flex items-center gap-1.5 self-start md:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Goal</span>
        </button>
      </div>

      {/* 4 Quick Stat Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Target Role</span>
          <p className="text-base font-extrabold text-slate-900 truncate mt-0.5">{activeRole.title}</p>
          <span className="text-xs font-bold text-emerald-700 mt-1 block">
            {gapAnalysis.overallMatchPercentage}% Prepared
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Milestones Done</span>
          <p className="text-2xl font-black text-slate-900 mt-0.5">
            {completedGoals.length}
            <span className="text-xs font-semibold text-slate-400 ml-1">/ {currentStudent.goals.length}</span>
          </p>
          <span className="text-xs text-slate-500 font-medium mt-1 block">
            {Math.round((completedGoals.length / (currentStudent.goals.length || 1)) * 100)}% roadmap finished
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Study Hours Logged</span>
          <p className="text-2xl font-black text-slate-900 mt-0.5">{totalSpentHours} hrs</p>
          <span className="text-xs text-emerald-700 font-medium mt-1 block">
            ⚡ {currentStudent.weeklyStudyHours} hrs/wk pace
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Achievements</span>
          <p className="text-2xl font-black text-emerald-700 mt-0.5">
            {currentStudent.unlockedBadges.length} Badges
          </p>
          <span className="text-xs text-slate-400 font-medium mt-1 block">
            Latest: {currentStudent.unlockedBadges[currentStudent.unlockedBadges.length - 1]?.title || 'Starter'}
          </span>
        </div>
      </div>

      {/* Historical Readiness Timeline Progress Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Readiness Improvement Over Time</h3>
              <p className="text-xs text-slate-400">Audit scores recorded as you completed milestones</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            +29% Overall Gain
          </span>
        </div>

        {/* Timeline Chart Visualization */}
        <div className="relative pt-6 pb-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-8 relative">
            {/* Connecting line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-gradient-to-r from-emerald-200 via-[#00875a] to-emerald-400 -z-0" />

            {currentStudent.historicalReadiness.map((pt, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                {/* Score Bubble */}
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#00875a] flex flex-col items-center justify-center shadow-md text-[#00875a] font-black text-xs">
                  <span>{pt.score}%</span>
                </div>
                {/* Date */}
                <span className="text-[11px] font-bold text-slate-800 mt-2">{pt.date}</span>
                <span className="text-[10px] text-slate-400 max-w-[120px] text-center line-clamp-1">
                  {pt.note || pt.roleTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Kanban Columns: To Do, In Progress, Completed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Column 1: To Do */}
        <div className="bg-slate-100/70 rounded-3xl p-4 sm:p-5 border border-slate-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                  To Do ({todoGoals.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {todoGoals.map(goal => (
                <div key={goal.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-slate-300 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {goal.skillName}
                    </span>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-slate-300 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 mb-2">
                    {goal.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{goal.targetDate}</span>
                    </span>
                    <span>~{goal.estimatedHours} hrs</span>
                  </div>

                  <button
                    onClick={() => updateGoalStatus(goal.id, 'in_progress', 25)}
                    className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>Start Activity</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {todoGoals.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No upcoming activities queued.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-emerald-50/40 rounded-3xl p-4 sm:p-5 border border-emerald-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                  In Progress ({inProgressGoals.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {inProgressGoals.map(goal => (
                <div key={goal.id} className="bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-xs hover:border-emerald-300 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {goal.skillName}
                    </span>
                    <span className="text-xs font-extrabold text-[#00875a]">
                      {goal.progressPercent}%
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 mb-2">
                    {goal.title}
                  </h4>

                  {/* Progress Slider / Bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
                    <div
                      className="bg-[#00875a] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                    <span>{goal.hoursSpent} of {goal.estimatedHours} hrs</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{goal.targetDate}</span>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateGoalStatus(goal.id, 'in_progress', Math.min(95, goal.progressPercent + 25))}
                      className="py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition text-center"
                    >
                      +25% Progress
                    </button>
                    <button
                      onClick={() => levelUpSkillFromGoal(goal.id, goal.skillId)}
                      className="py-1.5 px-2 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs"
                      title="Mark complete and level up this skill in your profile"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Level Up!</span>
                    </button>
                  </div>
                </div>
              ))}

              {inProgressGoals.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No active goals in progress. Move one from To Do!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Completed */}
        <div className="bg-slate-100/70 rounded-3xl p-4 sm:p-5 border border-slate-200/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">
                  Completed ({completedGoals.length})
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {completedGoals.map(goal => (
                <div key={goal.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs opacity-90 hover:opacity-100 transition">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {goal.skillName}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Done
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-1 line-through text-slate-400">
                    {goal.title}
                  </h4>

                  <p className="text-[11px] text-slate-500">
                    Finished on: {goal.completedAt || 'Recently'} • {goal.estimatedHours} hrs spent
                  </p>
                </div>
              ))}

              {completedGoals.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No completed milestones yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Achievement Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Earned Skill Badges</h3>
              <p className="text-xs text-slate-400">Milestones unlocked along your career pathway</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {currentStudent.unlockedBadges.map(badge => (
            <div key={badge.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{badge.title}</p>
                <p className="text-[10px] text-slate-500 line-clamp-1">{badge.description}</p>
                <span className="text-[9px] text-emerald-700 font-semibold mt-0.5 block">{badge.dateUnlocked}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Goal Modal */}
      {isNewGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Create Learning Goal</h3>
              <button
                onClick={() => setIsNewGoalModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Goal / Milestone Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Build multi-container Docker compose stack"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Competency
                </label>
                <select
                  value={newSkillId}
                  onChange={(e) => setNewSkillId(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-emerald-500"
                >
                  {skills.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newEstimatedHours}
                    onChange={(e) => setNewEstimatedHours(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewGoalModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-[#00704a] shadow-xs"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
