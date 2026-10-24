import type { Recommendation, Skill, SkillQuiz, StudentProfile, TargetRole } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';

type PayloadRow<T> = { id: string; payload: T };

function requireClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return supabase;
}

async function loadTable<T>(table: 'skills' | 'roles' | 'recommendations' | 'quizzes'): Promise<T[]> {
  const client = requireClient();
  const { data, error } = await client.from(table).select('id, payload');
  if (error) throw error;
  return ((data ?? []) as PayloadRow<T>[]).map((row) => row.payload);
}

export async function fetchCatalog() {
  const [skills, roles, recommendations, quizzes] = await Promise.all([
    loadTable<Skill>('skills'),
    loadTable<TargetRole>('roles'),
    loadTable<Recommendation>('recommendations'),
    loadTable<SkillQuiz>('quizzes')
  ]);
  return { skills, roles, recommendations, quizzes };
}

export async function seedCatalogIfEmpty(input: {
  skills: Skill[];
  roles: TargetRole[];
  recommendations: Recommendation[];
  quizzes: SkillQuiz[];
}) {
  const client = requireClient();
  const { count, error } = await client.from('skills').select('id', { count: 'exact', head: true });
  if (error) throw error;
  if ((count ?? 0) > 0) return false;

  const writes = [
    client.from('skills').upsert(input.skills.map((item) => ({ id: item.id, payload: item }))),
    client.from('roles').upsert(input.roles.map((item) => ({ id: item.id, payload: item }))),
    client.from('recommendations').upsert(input.recommendations.map((item) => ({ id: item.id, payload: item }))),
    client.from('quizzes').upsert(input.quizzes.map((item) => ({ id: item.id, payload: item })))
  ];
  const results = await Promise.all(writes);
  const firstError = results.find((result) => result.error)?.error;
  if (firstError) throw firstError;
  return true;
}

export async function upsertCatalogItem(
  table: 'skills' | 'roles' | 'recommendations',
  item: Skill | TargetRole | Recommendation
) {
  const client = requireClient();
  const { error } = await client.from(table).upsert({ id: item.id, payload: item });
  if (error) throw error;
}

export async function deleteCatalogItem(table: 'skills' | 'roles' | 'recommendations', id: string) {
  const client = requireClient();
  const { error } = await client.from(table).delete().eq('id', id);
  if (error) throw error;
}

function asProfile(id: string, payload: Partial<StudentProfile> | null, email?: string): StudentProfile {
  return {
    id,
    name: payload?.name || 'Student',
    email: payload?.email || email || '',
    avatarUrl: payload?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
    headline: payload?.headline || 'Aspiring Specialist | Continuous Learner',
    university: payload?.university || '',
    major: payload?.major || '',
    expectedGraduation: payload?.expectedGraduation || '',
    targetRoleId: payload?.targetRoleId || 'role-data-analyst',
    secondaryTargetRoleIds: payload?.secondaryTargetRoleIds || [],
    weeklyStudyHours: payload?.weeklyStudyHours ?? 15,
    institution: payload?.institution,
    course: payload?.course,
    academicYear: payload?.academicYear,
    interests: payload?.interests,
    careerGoals: payload?.careerGoals,
    grantedMentors: payload?.grantedMentors || [],
    skills: payload?.skills || [],
    goals: payload?.goals || [],
    historicalReadiness: payload?.historicalReadiness || [],
    unlockedBadges: payload?.unlockedBadges || []
  };
}

export async function fetchProfile(userId: string, email?: string): Promise<StudentProfile> {
  const client = requireClient();
  const { data, error } = await client.from('profiles').select('payload').eq('id', userId).maybeSingle();
  if (error) throw error;
  return asProfile(userId, (data?.payload as Partial<StudentProfile> | null) ?? null, email);
}

export async function saveProfile(profile: StudentProfile) {
  const client = requireClient();
  const { error } = await client.from('profiles').upsert({
    id: profile.id,
    payload: profile,
    updated_at: new Date().toISOString()
  });
  if (error) throw error;
}
