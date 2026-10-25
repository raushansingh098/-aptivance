import { 
  Skill, 
  TargetRole, 
  StudentSkill, 
  GapAnalysisResult, 
  SkillGapItem, 
  ProficiencyLevel, 
  SkillImportance,
  GapSeverity 
} from '../types';
const IMPORTANCE_WEIGHT_MAP: Record<SkillImportance, number> = {
  'Critical': 5,
  'High': 4,
  'Medium': 3,
  'Optional': 2,
};

export async function triggerConfetti() {
  try {
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00875a', '#10b981', '#34d399', '#0d9488', '#2563eb']
    });
  } catch (e) {
    console.error('Confetti error', e);
  }
}

export function computeGapAnalysis(
  role: TargetRole,
  studentSkills: StudentSkill[],
  allSkills: Skill[]
): GapAnalysisResult {
  const skillMap = new Map<string, Skill>(allSkills.map(s => [s.id, s]));
  const studentSkillMap = new Map<string, StudentSkill>(studentSkills.map(s => [s.skillId, s]));

  const allItems: SkillGapItem[] = [];
  const strengths: SkillGapItem[] = [];
  const partialMatches: SkillGapItem[] = [];
  const priorityGaps: SkillGapItem[] = [];

  let totalWeightedGapScore = 0;
  let totalPossibleWeight = 0;
  let assessedCount = 0;

  const categoryAggregates: Record<string, { studentSum: number; targetSum: number; count: number; weightSum: number; weightedStudentSum: number }> = {};

  role.skills.forEach(req => {
    const skill = skillMap.get(req.skillId);
    if (!skill) return;

    const studentSkill = studentSkillMap.get(req.skillId);
    const isAssessed = Boolean(studentSkill);
    if (isAssessed) assessedCount++;

    const currentLevel: ProficiencyLevel | 0 = studentSkill ? studentSkill.proficiency : 0;
    const requiredLevel = req.requiredLevel;
    const gap = Math.max(0, requiredLevel - currentLevel);
    const weight = req.numericWeight || IMPORTANCE_WEIGHT_MAP[req.importance] || 3;

    // In the screenshots, Gap % is calculated relative to maximum scale 5: (gap / 5) * 100%
    const gapPercentage = Math.round((gap / 5) * 100);

    // Weighted gap contribution: (gap / 5) * weight
    totalWeightedGapScore += (gap / 5) * weight;
    totalPossibleWeight += weight;

    // Severity determination matching screenshot 5
    let severity: GapSeverity = 'No gap';
    if (gap >= 3 || (gap >= 2 && weight >= 5)) {
      severity = 'Large gap';
    } else if (gap === 2) {
      severity = 'Moderate gap';
    } else if (gap === 1) {
      severity = 'Small gap';
    }

    // Category aggregation
    const cat = skill.category;
    if (!categoryAggregates[cat]) {
      categoryAggregates[cat] = { studentSum: 0, targetSum: 0, count: 0, weightSum: 0, weightedStudentSum: 0 };
    }
    categoryAggregates[cat].studentSum += currentLevel;
    categoryAggregates[cat].targetSum += requiredLevel;
    categoryAggregates[cat].count += 1;
    categoryAggregates[cat].weightSum += weight;
    const matchFraction = Math.min(1.0, currentLevel / requiredLevel);
    categoryAggregates[cat].weightedStudentSum += matchFraction * weight;

    const priorityScore = gap > 0 ? gap * weight : 0;

    const gapItem: SkillGapItem = {
      skill,
      currentLevel,
      requiredLevel,
      gap,
      gapPercentage,
      status: gap <= 0 ? 'strength' : gap === 1 ? 'partial' : 'gap',
      severity,
      importance: req.importance,
      weight,
      priorityScore,
      importanceMultiplier: weight
    };

    allItems.push(gapItem);

    if (gap <= 0) {
      strengths.push(gapItem);
    } else if (gap === 1) {
      partialMatches.push(gapItem);
    } else {
      priorityGaps.push(gapItem);
    }
  });

  // Sort: Largest gap & highest weight first
  allItems.sort((a, b) => b.priorityScore - a.priorityScore);
  priorityGaps.sort((a, b) => b.priorityScore - a.priorityScore);
  partialMatches.sort((a, b) => b.priorityScore - a.priorityScore);
  strengths.sort((a, b) => (b.currentLevel - b.requiredLevel) - (a.currentLevel - a.requiredLevel));

  const weightedGapRaw = totalPossibleWeight > 0 
    ? (totalWeightedGapScore / totalPossibleWeight) * 100 
    : 0;

  // Round to 1 decimal place matching screenshot: 43.2%
  const weightedGapPercentage = Math.round(weightedGapRaw * 10) / 10;
  
  // Readiness = 100 - Weighted Gap, matching 56.8%
  const overallMatchPercentage = Math.round((100 - weightedGapPercentage) * 10) / 10;

  const totalRequiredCount = role.skills.length;
  const assessmentCoveragePercentage = totalRequiredCount > 0 
    ? Math.round((assessedCount / totalRequiredCount) * 100) 
    : 0;

  const categoryMatches: GapAnalysisResult['categoryMatches'] = {};
  Object.keys(categoryAggregates).forEach(cat => {
    const agg = categoryAggregates[cat];
    const matchPercentage = agg.weightSum > 0 
      ? Math.round((agg.weightedStudentSum / agg.weightSum) * 100)
      : 0;
    categoryMatches[cat] = {
      studentScore: Math.round((agg.studentSum / agg.count) * 10) / 10,
      targetScore: Math.round((agg.targetSum / agg.count) * 10) / 10,
      matchPercentage,
      skillsCount: agg.count
    };
  });

  const criticalGapsCount = priorityGaps.filter(g => g.weight >= 4).length;
  const estimatedTimeToReadyWeeks = Math.max(
    role.weeksOfLearning ? Math.round(role.weeksOfLearning * (weightedGapPercentage / 100)) : 12,
    4
  );

  return {
    roleId: role.id,
    roleTitle: role.title,
    overallMatchPercentage,
    assessmentCoveragePercentage,
    assessedCount,
    totalRequiredCount,
    weightedGapPercentage,
    categoryMatches,
    items: allItems,
    strengths,
    partialMatches,
    priorityGaps,
    criticalGapsCount,
    estimatedTimeToReadyWeeks
  };
}

export function getProficiencyLabel(level: ProficiencyLevel | 0): string {
  switch (level) {
    case 0: return '0/5 (Not Assessed)';
    case 1: return '1/5 (Novice)';
    case 2: return '2/5 (Elementary)';
    case 3: return '3/5 (Intermediate)';
    case 4: return '4/5 (Advanced)';
    case 5: return '5/5 (Expert)';
    default: return `${level}/5`;
  }
}

export function getProficiencyColor(level: ProficiencyLevel | 0): string {
  switch (level) {
    case 0: return 'bg-slate-100 text-slate-500 border-slate-200';
    case 1: return 'bg-slate-50 text-slate-700 border-slate-200';
    case 2: return 'bg-teal-50 text-teal-700 border-teal-200';
    case 3: return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 4: return 'bg-blue-50 text-blue-700 border-blue-200';
    case 5: return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    default: return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

export function getImportanceBadge(importance: SkillImportance): { text: string; bg: string; color: string } {
  switch (importance) {
    case 'Critical':
      return { text: 'Critical', bg: 'bg-rose-50', color: 'text-rose-700 ring-rose-200' };
    case 'High':
      return { text: 'High', bg: 'bg-amber-50', color: 'text-amber-700 ring-amber-200' };
    case 'Medium':
      return { text: 'Medium', bg: 'bg-blue-50', color: 'text-blue-700 ring-blue-200' };
    case 'Optional':
      return { text: 'Optional', bg: 'bg-slate-50', color: 'text-slate-600 ring-slate-200' };
  }
}
