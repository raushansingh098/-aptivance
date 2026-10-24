import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Skill, 
  TargetRole, 
  StudentProfile, 
  Recommendation, 
  ActiveTab, 
  GapAnalysisResult, 
  ProficiencyLevel, 
  StudentSkill, 
  LearningGoal,
  SkillQuiz,
  MentorChatMessage 
} from '../types';
import { 
  initialSkills, 
  initialRoles, 
  initialStudents, 
  initialRecommendations,
  initialQuizzes,
  initialMentorMessages
} from '../data/initialData';
import { computeGapAnalysis, triggerConfetti } from '../utils/analysisUtils';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import {
  deleteCatalogItem,
  fetchCatalog,
  fetchProfile,
  saveProfile,
  seedCatalogIfEmpty,
  upsertCatalogItem
} from '../lib/backend';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning';
  message: string;
}

interface AppContextType {
  skills: Skill[];
  roles: TargetRole[];
  students: StudentProfile[];
  recommendations: Recommendation[];
  quizzes: SkillQuiz[];
  mentorMessages: MentorChatMessage[];
  currentStudentId: string;
  currentStudent: StudentProfile;
  activeRole: TargetRole;
  gapAnalysis: GapAnalysisResult;
  activeTab: ActiveTab;
  isAdminMode: boolean;
  isCommandPaletteOpen: boolean;
  isMobileSidebarOpen: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  sidebarTheme: 'dark-navy' | 'light';
  roleComparisonIds: string[];
  toasts: ToastNotification[];
  setActiveTab: (tab: ActiveTab) => void;
  setCurrentStudentId: (id: string) => void;
  setTargetRole: (roleId: string) => void;
  toggleRoleComparison: (roleId: string) => void;
  updateSkillProficiency: (
    skillId: string, 
    level: ProficiencyLevel | 0, 
    confidence?: 'Low' | 'Medium' | 'High', 
    notes?: string
  ) => void;
  removeStudentSkill: (skillId: string) => void;
  addGoalFromRecommendation: (rec: Recommendation) => void;
  createGoal: (goal: Omit<LearningGoal, 'id'>) => void;
  updateGoalStatus: (goalId: string, status: LearningGoal['status'], progress?: number) => void;
  deleteGoal: (goalId: string) => void;
  levelUpSkillFromGoal: (goalId: string, skillId: string) => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  addNewSkillToTaxonomy: (skill: Omit<Skill, 'id'>) => void;
  updateTaxonomySkill: (id: string, skill: Partial<Skill>) => void;
  deleteTaxonomySkill: (id: string) => void;
  addNewRoleToCatalog: (role: Omit<TargetRole, 'id'>) => void;
  updateRoleInCatalog: (id: string, role: Partial<TargetRole>) => void;
  deleteRoleFromCatalog: (id: string) => void;
  resetAllDataToDefaults: () => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  setIsAdminMode: (admin: boolean) => void;
  setIsCommandPaletteOpen: (open: boolean) => void;
  setIsMobileSidebarOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  setSidebarTheme: (theme: 'dark-navy' | 'light') => void;
  sendMentorMessage: (text: string) => void;
  submitQuizScore: (quizId: string, score: number, total: number) => void;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  isBackendConfigured: boolean;
  isAuthenticated: boolean;
  isSyncing: boolean;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  SKILLS: 'skillbridge_skills_v2',
  ROLES: 'skillbridge_roles_v2',
  STUDENTS: 'skillbridge_students_v2',
  RECOMMENDATIONS: 'skillbridge_recommendations_v2',
  CURRENT_STUDENT: 'skillbridge_current_student_v2',
  ACTIVE_TAB: 'skillbridge_active_tab_v2',
  THEME: 'skillbridge_sidebar_theme_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : initialSkills;
    } catch {
      return initialSkills;
    }
  });

  const [roles, setRoles] = useState<TargetRole[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLES);
      return saved ? JSON.parse(saved) : initialRoles;
    } catch {
      return initialRoles;
    }
  });

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return saved ? JSON.parse(saved) : initialRecommendations;
    } catch {
      return initialRecommendations;
    }
  });

  const [quizzes] = useState<SkillQuiz[]>(initialQuizzes);
  const [mentorMessages, setMentorMessages] = useState<MentorChatMessage[]>(initialMentorMessages);

  const [currentStudentId, setCurrentStudentIdState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT) || initialStudents[0].id;
    } catch {
      return initialStudents[0].id;
    }
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('dashboard');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [sidebarTheme, setSidebarTheme] = useState<'dark-navy' | 'light'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.THEME) as 'dark-navy' | 'light') || 'dark-navy';
    } catch {
      return 'dark-navy';
    }
  });
  const [roleComparisonIds, setRoleComparisonIds] = useState<string[]>(['role-data-analyst', 'role-data-scientist']);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [backendReady, setBackendReady] = useState(!isSupabaseConfigured);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    } catch (e) { console.error(e); }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(roles));
    } catch (e) { console.error(e); }
  }, [roles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) { console.error(e); }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECOMMENDATIONS, JSON.stringify(recommendations));
    } catch (e) { console.error(e); }
  }, [recommendations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, currentStudentId);
    } catch (e) { console.error(e); }
  }, [currentStudentId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, sidebarTheme);
    } catch (e) { console.error(e); }
  }, [sidebarTheme]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const applyRemoteProfile = (profile: StudentProfile) => {
    setStudents((prev) => {
      const index = prev.findIndex((student) => student.id === profile.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = profile;
        return copy;
      }
      return [profile, ...prev];
    });
    setCurrentStudentIdState(profile.id);
  };

  const syncSessionProfile = async (userId: string, email?: string) => {
    const profile = await fetchProfile(userId, email);
    applyRemoteProfile(profile);
    setIsAuthenticated(true);
    return profile;
  };

  useEffect(() => {
    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      setBackendReady(true);
      return;
    }

    let cancelled = false;

    const hydrateBackend = async () => {
      setIsSyncing(true);
      try {
        const catalog = await fetchCatalog();
        if (!cancelled && catalog.skills.length > 0) {
          setSkills(catalog.skills);
          setRoles(catalog.roles);
          setRecommendations(catalog.recommendations);
        }

        const { data: { session } } = await client.auth.getSession();
        if (cancelled) return;
        if (session?.user) {
          try {
            await seedCatalogIfEmpty({
              skills: catalog.skills.length ? catalog.skills : initialSkills,
              roles: catalog.roles.length ? catalog.roles : initialRoles,
              recommendations: catalog.recommendations.length ? catalog.recommendations : initialRecommendations,
              quizzes: catalog.quizzes.length ? catalog.quizzes : initialQuizzes
            });
          } catch (seedError) {
            console.warn(seedError);
          }
          await syncSessionProfile(session.user.id, session.user.email);
        }
      } catch (error) {
        console.error(error);
        showToast('Could not reach Supabase. Using local data for now.', 'warning');
      } finally {
        if (!cancelled) {
          setBackendReady(true);
          setIsSyncing(false);
        }
      }
    };

    hydrateBackend();

    const { data: { subscription } } = client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        return;
      }
      if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED')) {
        try {
          await syncSessionProfile(session.user.id, session.user.email);
        } catch (error) {
          console.error(error);
        }
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!backendReady || !isAuthenticated || !isSupabaseConfigured) return;
    const student = students.find((item) => item.id === currentStudentId);
    if (!student) return;
    const timer = window.setTimeout(() => {
      saveProfile(student).catch((error) => console.error(error));
    }, 700);
    return () => window.clearTimeout(timer);
  }, [backendReady, isAuthenticated, currentStudentId, students]);

  const currentStudent = useMemo(() => {
    return students.find(s => s.id === currentStudentId) || students[0] || initialStudents[0];
  }, [students, currentStudentId]);

  const activeRole = useMemo(() => {
    return roles.find(r => r.id === currentStudent.targetRoleId) || roles[0] || initialRoles[0];
  }, [roles, currentStudent.targetRoleId]);

  const gapAnalysis = useMemo(() => {
    return computeGapAnalysis(activeRole, currentStudent.skills, skills);
  }, [activeRole, currentStudent.skills, skills]);

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setCurrentStudentId = (id: string) => {
    setCurrentStudentIdState(id);
    const target = students.find(s => s.id === id);
    if (target) {
      showToast(`Switched active profile to ${target.name}`);
    }
  };

  const setTargetRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    setStudents(prev => prev.map(student => {
      if (student.id === currentStudentId) {
        return {
          ...student,
          targetRoleId: roleId
        };
      }
      return student;
    }));

    showToast(`Target role set to ${role.title}! Gap analysis updated.`);
  };

  const toggleRoleComparison = (roleId: string) => {
    setRoleComparisonIds(prev => {
      if (prev.includes(roleId)) {
        if (prev.length <= 1) {
          showToast('Keep at least one role selected for comparison', 'info');
          return prev;
        }
        return prev.filter(id => id !== roleId);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare up to 3 roles simultaneously', 'info');
          return [prev[1], prev[2], roleId];
        }
        return [...prev, roleId];
      }
    });
  };

  const updateSkillProficiency = (
    skillId: string, 
    level: ProficiencyLevel | 0, 
    confidence: 'Low' | 'Medium' | 'High' = 'High',
    notes?: string
  ) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;

      const existingIndex = student.skills.findIndex(s => s.skillId === skillId);
      const today = '24/10/2026';

      let updatedSkills: StudentSkill[];
      if (existingIndex >= 0) {
        updatedSkills = [...student.skills];
        updatedSkills[existingIndex] = {
          ...updatedSkills[existingIndex],
          proficiency: level,
          confidence,
          lastAssessed: today,
          evidenceNotes: notes !== undefined ? notes : updatedSkills[existingIndex].evidenceNotes
        };
      } else {
        const newSkill: StudentSkill = {
          skillId,
          proficiency: level,
          confidence,
          yearsExperience: 0.5,
          lastAssessed: today,
          method: 'Self-assessment',
          evidenceNotes: notes || ''
        };
        updatedSkills = [...student.skills, newSkill];
      }

      const newGap = computeGapAnalysis(activeRole, updatedSkills, skills);
      const updatedHistory = [...student.historicalReadiness, {
        date: today,
        score: newGap.overallMatchPercentage,
        roleTitle: activeRole.title,
        note: `Assessed skill: ${skills.find(s => s.id === skillId)?.name || 'skill'}`
      }];

      return {
        ...student,
        skills: updatedSkills,
        historicalReadiness: updatedHistory
      };
    }));

    const skillObj = skills.find(s => s.id === skillId);
    showToast(`Updated ${skillObj?.name || 'skill'} to Level ${level}`);
  };

  const removeStudentSkill = (skillId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        skills: student.skills.filter(s => s.skillId !== skillId)
      };
    }));
    showToast('Skill removed from student profile');
  };

  const addGoalFromRecommendation = (rec: Recommendation) => {
    const existing = currentStudent.goals.find(g => g.recommendationId === rec.id);
    if (existing) {
      showToast('This activity is already in your learning plan!', 'info');
      setActiveTab('progress');
      return;
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 21);

    const newGoal: LearningGoal = {
      id: 'goal-' + Date.now(),
      recommendationId: rec.id,
      skillId: rec.skillId,
      skillName: rec.skillName,
      title: rec.title,
      type: rec.type,
      targetDate: targetDate.toISOString().split('T')[0],
      status: 'todo',
      progressPercent: 0,
      notes: `Targeting Level ${rec.targetLevel} via ${rec.provider}.`,
      hoursSpent: 0,
      estimatedHours: parseInt(rec.duration) || 10
    };

    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        goals: [newGoal, ...student.goals]
      };
    }));

    showToast(`Added "${rec.title}" to your Learning Roadmap!`);
  };

  const createGoal = (goalData: Omit<LearningGoal, 'id'>) => {
    const newGoal: LearningGoal = {
      ...goalData,
      id: 'goal-' + Date.now()
    };

    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        goals: [newGoal, ...student.goals]
      };
    }));

    showToast('New learning goal created!');
  };

  const updateGoalStatus = (goalId: string, status: LearningGoal['status'], progress?: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        goals: student.goals.map(g => {
          if (g.id !== goalId) return g;
          const isComplete = status === 'completed';
          return {
            ...g,
            status,
            progressPercent: progress !== undefined ? progress : (isComplete ? 100 : g.progressPercent),
            completedAt: isComplete ? new Date().toISOString().split('T')[0] : g.completedAt
          };
        })
      };
    }));

    if (status === 'completed') {
      triggerConfetti();
      showToast('🎉 Goal completed! Great progress towards your target role.');
    } else {
      showToast('Goal status updated.');
    }
  };

  const deleteGoal = (goalId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        goals: student.goals.filter(g => g.id !== goalId)
      };
    }));
    showToast('Activity removed from roadmap.');
  };

  const levelUpSkillFromGoal = (goalId: string, skillId: string) => {
    triggerConfetti();
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;

      const studentSkill = student.skills.find(s => s.skillId === skillId);
      const currentLevel = studentSkill ? studentSkill.proficiency : 0;
      const nextLevel = Math.min(5, currentLevel + 1) as ProficiencyLevel;

      const existingIdx = student.skills.findIndex(s => s.skillId === skillId);
      const today = '24/10/2026';
      let updatedSkills: StudentSkill[];
      if (existingIdx >= 0) {
        updatedSkills = [...student.skills];
        updatedSkills[existingIdx] = {
          ...updatedSkills[existingIdx],
          proficiency: nextLevel,
          confidence: 'High',
          lastAssessed: today
        };
      } else {
        updatedSkills = [...student.skills, {
          skillId,
          proficiency: 1,
          confidence: 'Medium',
          yearsExperience: 0.5,
          lastAssessed: today,
          method: 'Self-assessment'
        }];
      }

      const updatedGoals = student.goals.map(g => {
        if (g.id === goalId) {
          return {
            ...g,
            status: 'completed' as const,
            progressPercent: 100,
            completedAt: today
          };
        }
        return g;
      });

      const newGap = computeGapAnalysis(activeRole, updatedSkills, skills);
      const updatedHistory = [...student.historicalReadiness, {
        date: today,
        score: newGap.overallMatchPercentage,
        roleTitle: activeRole.title,
        note: `Leveled up ${skills.find(s => s.id === skillId)?.name || 'skill'} to Level ${nextLevel}`
      }];

      return {
        ...student,
        skills: updatedSkills,
        goals: updatedGoals,
        historicalReadiness: updatedHistory
      };
    }));

    const skillObj = skills.find(s => s.id === skillId);
    showToast(`🚀 Leveled Up! ${skillObj?.name || 'Skill'} increased! Readiness recalculated.`);
  };

  const updateStudentProfile = (data: Partial<StudentProfile>) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== currentStudentId) return student;
      return {
        ...student,
        ...data
      };
    }));
    showToast('Student profile updated successfully.');
  };

  // Quizzes & Mentor Actions
  const submitQuizScore = (quizId: string, score: number, total: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const passRate = (score / total) * 100;
    if (passRate >= 75) {
      triggerConfetti();
      updateSkillProficiency(quiz.skillId, quiz.level, 'High', `Validated via Skill Quiz (${score}/${total})`);
      showToast(`🏆 Quiz Passed (${score}/${total})! ${quiz.skillName} verified at Level ${quiz.level}!`);
    } else {
      showToast(`Quiz completed: ${score}/${total}. Review resources and try again to level up!`, 'info');
    }
  };

  const sendMentorMessage = (text: string) => {
    const userMsg: MentorChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMentorMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let mentorReplyText = `Great question! Looking at your target role (${activeRole.title}), closing your Large Gap in Data Analysis (0/3) and SQL (1/4) should be your top priority.`;
      
      const lower = text.toLowerCase();
      if (lower.includes('interview') || lower.includes('job')) {
        mentorReplyText = `For ${activeRole.title} interviews, companies prioritize live SQL query execution and practical data manipulation. Make sure to complete the Portfolio Capstone in Recommendations!`;
      } else if (lower.includes('sql') || lower.includes('database')) {
        mentorReplyText = `To jump from Level 1 to Level 4 in SQL, focus on window functions (ROW_NUMBER, DENSE_RANK), CTEs, and analyzing query plans with EXPLAIN ANALYZE.`;
      } else if (lower.includes('project') || lower.includes('portfolio')) {
        mentorReplyText = `I strongly suggest adding the "E-Commerce Customer Cohort & Retention Analysis" project to your learning plan. It addresses your largest gap directly!`;
      }

      const mentorReply: MentorChatMessage = {
        id: 'm-' + (Date.now() + 1),
        sender: 'mentor',
        text: mentorReplyText,
        timestamp: 'Just now',
        suggestedAction: {
          tab: 'recommendations',
          label: 'View Capstone Projects'
        }
      };

      setMentorMessages(prev => [...prev, mentorReply]);
    }, 600);
  };

  const loginUser = async (email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        await syncSessionProfile(data.user.id, data.user.email);
      }
      setIsAuthModalOpen(false);
      showToast(`Logged in as ${data.user?.email || email}!`);
      return;
    }

    const existing = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentStudentIdState(existing.id);
      setIsAuthModalOpen(false);
      showToast(`Logged in as ${existing.name}!`);
    } else {
      setCurrentStudentIdState(initialStudents[0].id);
      setIsAuthModalOpen(false);
      showToast(`Logged in successfully!`);
    }
  };

  const registerUser = async (name: string, email: string, password: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      if (error) throw error;
      if (data.session?.user) {
        const profile = await syncSessionProfile(data.session.user.id, data.session.user.email);
        if (!profile.skills.length && initialStudents[0]?.skills) {
          const seeded = { ...profile, name, email, skills: initialStudents[0].skills };
          applyRemoteProfile(seeded);
          await saveProfile(seeded);
        }
        setIsAuthModalOpen(false);
        triggerConfetti();
        showToast(`Welcome to SkillBridge, ${name}! Account created.`);
        return;
      }
      setIsAuthModalOpen(false);
      showToast('Account created. Confirm your email, then log in.', 'info');
      return;
    }

    const newStudent: StudentProfile = {
      id: 'student-' + Date.now(),
      name: name || 'Raushan',
      email: email || 'user@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      headline: 'Aspiring Specialist | Continuous Learner',
      university: 'Tech University',
      major: 'Computer Science & Analytics',
      expectedGraduation: '2027',
      targetRoleId: 'role-data-analyst',
      secondaryTargetRoleIds: ['role-data-scientist'],
      weeklyStudyHours: 15,
      grantedMentors: [],
      skills: initialStudents[0].skills,
      goals: [],
      historicalReadiness: [
        { date: '24/10/2026', score: 56.8, roleTitle: 'Data Analyst' }
      ],
      unlockedBadges: [
        { id: 'b-new', title: 'New Member', description: 'Joined SkillBridge', dateUnlocked: '24/10/2026', icon: 'Sparkles' }
      ]
    };

    setStudents(prev => [newStudent, ...prev]);
    setCurrentStudentIdState(newStudent.id);
    setIsAuthModalOpen(false);
    triggerConfetti();
    showToast(`Welcome to SkillBridge, ${newStudent.name}! Account created.`);
  };

  const logoutUser = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setCurrentStudentIdState(initialStudents[0].id);
    showToast('Signed out.');
  };

  // Taxonomy Management
  const addNewSkillToTaxonomy = (skillData: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skillData,
      id: 'skill-custom-' + Date.now(),
      isCustom: true
    };
    setSkills(prev => [...prev, newSkill]);
    if (isSupabaseConfigured && isAuthenticated) {
      upsertCatalogItem('skills', newSkill).catch(console.error);
    }
    showToast(`Skill "${newSkill.name}" added to global taxonomy.`);
  };

  const updateTaxonomySkill = (id: string, skillData: Partial<Skill>) => {
    const updated = { ...skills.find(s => s.id === id), ...skillData, id } as Skill;
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...skillData } : s));
    if (isSupabaseConfigured && isAuthenticated) {
      upsertCatalogItem('skills', updated).catch(console.error);
    }
    showToast('Skill taxonomy updated.');
  };

  const deleteTaxonomySkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    if (isSupabaseConfigured && isAuthenticated) {
      deleteCatalogItem('skills', id).catch(console.error);
    }
    showToast('Skill removed from taxonomy.');
  };

  const addNewRoleToCatalog = (roleData: Omit<TargetRole, 'id'>) => {
    const newRole: TargetRole = {
      ...roleData,
      id: 'role-custom-' + Date.now(),
      isCustom: true
    };
    setRoles(prev => [...prev, newRole]);
    if (isSupabaseConfigured && isAuthenticated) {
      upsertCatalogItem('roles', newRole).catch(console.error);
    }
    showToast(`Role "${newRole.title}" added to role catalog.`);
  };

  const updateRoleInCatalog = (id: string, roleData: Partial<TargetRole>) => {
    const updated = { ...roles.find(r => r.id === id), ...roleData, id } as TargetRole;
    setRoles(prev => prev.map(r => r.id === id ? { ...r, ...roleData } : r));
    if (isSupabaseConfigured && isAuthenticated) {
      upsertCatalogItem('roles', updated).catch(console.error);
    }
    showToast('Role requirements updated.');
  };

  const deleteRoleFromCatalog = (id: string) => {
    setRoles(prev => prev.filter(r => r.id !== id));
    if (isSupabaseConfigured && isAuthenticated) {
      deleteCatalogItem('roles', id).catch(console.error);
    }
    showToast('Role removed from catalog.');
  };

  const resetAllDataToDefaults = () => {
    localStorage.clear();
    setSkills(initialSkills);
    setRoles(initialRoles);
    setStudents(initialStudents);
    setRecommendations(initialRecommendations);
    setCurrentStudentIdState(initialStudents[0].id);
    setActiveTabState('gap-analysis');
    showToast('All data reset to realistic default sample data.');
  };

  const exportData = () => {
    const payload = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      student: currentStudent,
      skills,
      roles,
      recommendations
    };
    return JSON.stringify(payload, null, 2);
  };

  const importData = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.student && Array.isArray(data.skills)) {
        setSkills(data.skills);
        if (data.roles) setRoles(data.roles);
        if (data.recommendations) setRecommendations(data.recommendations);
        setStudents(prev => {
          const index = prev.findIndex(s => s.id === data.student.id);
          if (index >= 0) {
            const copy = [...prev];
            copy[index] = data.student;
            return copy;
          }
          return [data.student, ...prev];
        });
        setCurrentStudentIdState(data.student.id);
        showToast('Successfully imported student data and taxonomy!');
        return true;
      }
      return false;
    } catch {
      showToast('Failed to import: Invalid JSON file', 'warning');
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        skills,
        roles,
        students,
        recommendations,
        quizzes,
        mentorMessages,
        currentStudentId,
        currentStudent,
        activeRole,
        gapAnalysis,
        activeTab,
        isAdminMode,
        isCommandPaletteOpen,
        isMobileSidebarOpen,
        isAuthModalOpen,
        authMode,
        sidebarTheme,
        roleComparisonIds,
        toasts,
        setActiveTab,
        setCurrentStudentId,
        setTargetRole,
        toggleRoleComparison,
        updateSkillProficiency,
        removeStudentSkill,
        addGoalFromRecommendation,
        createGoal,
        updateGoalStatus,
        deleteGoal,
        levelUpSkillFromGoal,
        updateStudentProfile,
        addNewSkillToTaxonomy,
        updateTaxonomySkill,
        deleteTaxonomySkill,
        addNewRoleToCatalog,
        updateRoleInCatalog,
        deleteRoleFromCatalog,
        resetAllDataToDefaults,
        exportData,
        importData,
        setIsAdminMode,
        setIsCommandPaletteOpen,
        setIsMobileSidebarOpen,
        setIsAuthModalOpen,
        setAuthMode,
        setSidebarTheme,
        sendMentorMessage,
        submitQuizScore,
        loginUser,
        registerUser,
        logoutUser,
        isBackendConfigured: isSupabaseConfigured,
        isAuthenticated,
        isSyncing,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
