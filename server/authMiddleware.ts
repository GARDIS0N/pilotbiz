import { Request, Response, NextFunction } from 'express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { cbeDb } from './cbeDb.js';
import { User, StudentProfile, ParentProfile, TeacherProfile, UserRole } from '../src/types/cbe.js';
import { isSupabaseConfigured } from '../src/services/supabaseClient.js';

// Extend Express Request to include user & profile
declare global {
  namespace Express {
    interface Request {
      user?: User;
      studentProfile?: StudentProfile;
      parentProfile?: ParentProfile;
      teacherProfile?: TeacherProfile;
      supabaseUser?: any;
    }
  }
}

export function toAppRole(role?: string): UserRole {
  if (!role) return 'STUDENT';
  const lower = role.toLowerCase().trim();
  if (lower === 'parent') return 'PARENT';
  if (lower === 'teacher') return 'TEACHER';
  if (lower === 'admin') return 'ADMIN';
  return 'STUDENT';
}

export function toDbRole(role: UserRole): 'learner' | 'parent' | 'teacher' | 'admin' {
  if (role === 'PARENT') return 'parent';
  if (role === 'TEACHER') return 'teacher';
  if (role === 'ADMIN') return 'admin';
  return 'learner';
}

const FALLBACK_SUPABASE_URL = 'https://gvddvgscydjzpqffwxrn.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZGR2Z3NjeWRqenBxZmZ3eHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NjA2NzksImV4cCI6MjEwNzAzNjY3OX0.jJysY4dY-NFj1Iq1iNdsCkKedns9bULt6R9A0zPTOOE';

function getSupabaseUrl(): string {
  return (
    (typeof process !== 'undefined' ? (process.env?.VITE_SUPABASE_URL || process.env?.SUPABASE_URL) : '') ||
    FALLBACK_SUPABASE_URL
  );
}

function getSupabaseAnonKey(): string {
  return (
    (typeof process !== 'undefined' ? (process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY) : '') ||
    FALLBACK_SUPABASE_ANON_KEY
  );
}

export function createScopedSupabaseClient(token?: string): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: token
      ? {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      : undefined
  });
}

/**
 * Authentication Middleware:
 * Inspects `req.headers.authorization`. If a Bearer token is present and valid,
 * resolves the Supabase Auth user and their `public.profiles` database record.
 * Attaches `req.user`, `req.studentProfile`, etc.
 * If no token or invalid, passes along without error, allowing route handlers
 * to fall back to the active demo/in-memory session.
 */
export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.substring(7).trim();
  if (!token || !isSupabaseConfigured()) {
    return next();
  }

  try {
    const client = createScopedSupabaseClient(token);
    if (!client) return next();

    const { data: userData, error: userError } = await client.auth.getUser(token);
    if (userError || !userData?.user) {
      // Invalid or expired token
      return next();
    }

    const sbUser = userData.user;
    const userId = sbUser.id;
    const meta = sbUser.user_metadata || {};

    // Query public.profiles using the user-scoped client (honors RLS: id = auth.uid())
    const { data: dbProfile } = await client
      .from('profiles')
      .select('id, role, display_name, grade_id, school_name, avatar, parent_user_id, consent_agreed_at, consent_version')
      .eq('id', userId)
      .maybeSingle();

    // Map profile/metadata into App types
    const appRole = toAppRole(dbProfile?.role || meta.role);
    const displayName = dbProfile?.display_name || meta.fullName || meta.name || sbUser.email?.split('@')[0] || 'Learner';
    const gradeId = dbProfile?.grade_id || meta.gradeId || 'grade-4';
    const schoolName = dbProfile?.school_name || meta.schoolName || 'Primary School';
    const county = meta.county || 'Nairobi';
    const avatar = dbProfile?.avatar || meta.avatar || 'cheetah';
    const consentAgreedAt = dbProfile?.consent_agreed_at || meta.consentAgreedAt;
    const consentVersion = dbProfile?.consent_version || meta.consentVersion;

    const studentProfileId = appRole === 'STUDENT' ? `student-${userId}` : undefined;
    const parentProfileId = appRole === 'PARENT' ? `parent-${userId}` : undefined;
    const teacherProfileId = appRole === 'TEACHER' ? `teacher-${userId}` : undefined;

    const user: User = {
      id: userId,
      name: displayName,
      email: sbUser.email || '',
      role: appRole,
      avatar,
      createdAt: sbUser.created_at || new Date().toISOString(),
      studentProfileId,
      parentProfileId,
      teacherProfileId,
      consentAgreedAt,
      consentVersion
    };

    let studentProfile: StudentProfile | undefined;
    if (appRole === 'STUDENT') {
      studentProfile = cbeDb.getStudentProfile(studentProfileId!);
      if (!studentProfile) {
        studentProfile = {
          id: studentProfileId!,
          userId,
          fullName: displayName,
          gradeId,
          schoolName,
          county,
          avatar,
          level: 1,
          xp: 50,
          coins: 50,
          hearts: 5,
          maxHearts: 5,
          streakDays: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          streakFrozen: false,
          unlockedWorldIds: ['world-math-kingdom', 'world-science-lab'],
          completedMissionIds: [],
          badges: [],
          equippedTitle: 'Safari Scout'
        };
        cbeDb.createStudent(studentProfile);
      }
    }

    // Sync with in-memory DB if not already present
    const existingCbeUser = cbeDb.findUserById(userId);
    if (!existingCbeUser) {
      cbeDb.createUser(user);
    }

    req.user = user;
    req.studentProfile = studentProfile;
    req.supabaseUser = sbUser;

    // If profile didn't exist in Supabase DB yet, create it under RLS
    if (!dbProfile) {
      try {
        await client.from('profiles').insert({
          id: userId,
          role: toDbRole(appRole),
          display_name: displayName,
          grade_id: gradeId,
          school_name: schoolName,
          avatar,
          consent_agreed_at: consentAgreedAt,
          consent_version: consentVersion
        });
      } catch (insertErr) {
        console.warn('[Profiles Auto-Sync Warning]:', insertErr);
      }
    }
  } catch (err) {
    console.warn('[authMiddleware] Token validation warning:', err);
  }

  next();
}
