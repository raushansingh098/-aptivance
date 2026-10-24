export type SkillCategory = 
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Cloud & DevOps'
  | 'AI & Data Science'
  | 'Mobile'
  | 'System Design'
  | 'Soft Skills'
  | 'Programming'
  | 'Problem-solving'
  | 'AI/ML'
  | 'Web development';

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  tags: string[];
  levelRubrics: Record<ProficiencyLevel, string>;
  isCustom?: boolean;
}

export interface StudentSkill {
  skillId: string;
  proficiency: ProficiencyLevel | 0;
  confidence: 'Low' | 'Medium' | 'High';
  evidenceNotes?: string;
  yearsExperience: number;
  lastAssessed: string;
  method?: string; // 'Self-assessment' | 'Quiz' | 'Verified'
  verified?: boolean;
}

export type SkillImportance = 'Critical' | 'High' | 'Medium' | 'Optional';

export interface RoleSkillRequirement {
  skillId: string;
  requiredLevel: ProficiencyLevel;
  importance: SkillImportance;
  numericWeight?: number; // 1 to 5
  notes?: string;
}

export interface TargetRole {
  id: string;
  title: string;
  category: string;
  level: 'Entry level' | 'Intermediate' | 'Senior level' | 'Entry Level' | 'Mid Level' | 'Senior Level';
  description: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  salaryRange: string;
  topCompanies: string[];
  responsibilities: string[];
  skills: RoleSkillRequirement[];
  weeksOfLearning: number; // e.g. 20 weeks of learning
  iconName?: string;
  isCustom?: boolean;
}

export type GapStatus = 'strength' | 'partial' | 'gap';
export type GapSeverity = 'Large gap' | 'Moderate gap' | 'Small gap' | 'No gap';

export interface SkillGapItem {
  skill: Skill;
  currentLevel: ProficiencyLevel | 0;
  requiredLevel: ProficiencyLevel;
  gap: number; // required - current (<=0 is strength)
  gapPercentage: number; // e.g. 60%
  status: GapStatus;
  severity: GapSeverity;
  importance: SkillImportance;
  weight: number; // 1 to 5
  priorityScore: number;
  importanceMultiplier: number;
}

export interface GapAnalysisResult {
  roleId: string;
  roleTitle: string;
  overallMatchPercentage: number; // e.g. 56.8
  assessmentCoveragePercentage: number; // e.g. 100%
  assessedCount: number;
  totalRequiredCount: number;
  weightedGapPercentage: number; // e.g. 43.2%
  categoryMatches: Record<string, {
    studentScore: number;
    targetScore: number;
    matchPercentage: number;
    skillsCount: number;
  }>;
  items: SkillGapItem[];
  strengths: SkillGapItem[];
  partialMatches: SkillGapItem[];
  priorityGaps: SkillGapItem[];
  criticalGapsCount: number;
  estimatedTimeToReadyWeeks: number;
}

export type RecommendationType = 'course' | 'project' | 'certification' | 'lab';

export interface Recommendation {
  id: string;
  skillId: string;
  skillName: string;
  title: string;
  type: RecommendationType;
  provider: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  url: string;
  description: string;
  targetLevel: ProficiencyLevel;
  deliverables?: string[];
  impact: 'High Impact' | 'Medium Impact';
}

export type GoalStatus = 'todo' | 'in_progress' | 'completed';

export interface LearningGoal {
  id: string;
  recommendationId?: string;
  skillId: string;
  skillName: string;
  title: string;
  type: RecommendationType | 'general';
  targetDate: string;
  status: GoalStatus;
  progressPercent: number;
  notes?: string;
  hoursSpent: number;
  estimatedHours: number;
  completedAt?: string;
}

export interface ReadinessHistoryPoint {
  date: string;
  score: number;
  roleTitle: string;
  note?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  dateUnlocked: string;
  icon: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  headline: string;
  university: string;
  major: string;
  expectedGraduation: string;
  targetRoleId: string;
  secondaryTargetRoleIds: string[];
  weeklyStudyHours: number;
  institution?: string;
  course?: string;
  academicYear?: string;
  interests?: string;
  careerGoals?: string;
  grantedMentors: string[];
  skills: StudentSkill[];
  goals: LearningGoal[];
  historicalReadiness: ReadinessHistoryPoint[];
  unlockedBadges: Badge[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SkillQuiz {
  id: string;
  skillId: string;
  skillName: string;
  category: string;
  level: ProficiencyLevel;
  questionsCount: number;
  timeMinutes: number;
  questions: QuizQuestion[];
}

export interface MentorChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedAction?: {
    tab: ActiveTab;
    label: string;
  };
}

export type ActiveTab = 
  | 'dashboard'
  | 'profile'         // "My Skills"
  | 'roles'           // "Career Roles"
  | 'gap-analysis'    // "Gap Analysis"
  | 'recommendations' // "Recommendations"
  | 'assessment'      // "Assessment"
  | 'quizzes'         // "Quizzes"
  | 'roadmap'         // "Roadmap"
  | 'progress'        // "Progress"
  | 'reports'         // "Reports"
  | 'mentor'          // "Mentor"
  | 'taxonomy'        // "Admin"
  | 'settings';
