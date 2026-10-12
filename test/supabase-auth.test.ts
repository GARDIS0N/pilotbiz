import fs from 'fs';
import path from 'path';
import { toAppRole, toDbRole, authMiddleware } from '../server/authMiddleware.js';

console.log('===========================================================');
console.log('🧪 SUPABASE AUTHENTICATION TEST SUITE');
console.log('===========================================================');

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${msg}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${msg}`);
    failed++;
  }
}

// -------------------------------------------------------------
// 1. Role Bidirectional Mapping
// -------------------------------------------------------------
console.log('\n--- 1. Role Bidirectional Mapping (App <-> Postgres) ---');

assert(toAppRole('learner') === 'STUDENT', "toAppRole('learner') -> 'STUDENT'");
assert(toAppRole('parent') === 'PARENT', "toAppRole('parent') -> 'PARENT'");
assert(toAppRole('teacher') === 'TEACHER', "toAppRole('teacher') -> 'TEACHER'");
assert(toAppRole('admin') === 'ADMIN', "toAppRole('admin') -> 'ADMIN'");
assert(toAppRole('STUDENT') === 'STUDENT', "toAppRole('STUDENT') -> 'STUDENT'");
assert(toAppRole(undefined) === 'STUDENT', "toAppRole(undefined) -> 'STUDENT' (default)");

assert(toDbRole('STUDENT') === 'learner', "toDbRole('STUDENT') -> 'learner'");
assert(toDbRole('PARENT') === 'parent', "toDbRole('PARENT') -> 'parent'");
assert(toDbRole('TEACHER') === 'teacher', "toDbRole('TEACHER') -> 'teacher'");
assert(toDbRole('ADMIN') === 'admin', "toDbRole('ADMIN') -> 'admin'");

// -------------------------------------------------------------
// 2. Server Auth Middleware
// -------------------------------------------------------------
console.log('\n--- 2. Server Auth Middleware Behavior ---');

const dummyRes = {} as any;

// A. No token attached
let nextCalled1 = false;
const reqNoAuth = { headers: {} } as any;
await authMiddleware(reqNoAuth, dummyRes, () => {
  nextCalled1 = true;
});
assert(nextCalled1, 'authMiddleware calls next() when Authorization header is absent');

// B. Empty Bearer header
let nextCalled2 = false;
const reqEmptyBearer = { headers: { authorization: 'Bearer ' } } as any;
await authMiddleware(reqEmptyBearer, dummyRes, () => {
  nextCalled2 = true;
});
assert(nextCalled2, 'authMiddleware calls next() when Bearer token is empty');

// C. Malformed / invalid token
let nextCalled3 = false;
const reqInvalidToken = { headers: { authorization: 'Bearer invalid-token-12345' } } as any;
await authMiddleware(reqInvalidToken, dummyRes, () => {
  nextCalled3 = true;
});
assert(nextCalled3, 'authMiddleware gracefully calls next() when token fails validation');

// -------------------------------------------------------------
// 3. Client Service (cbeApi.ts) Bearer Header Injection
// -------------------------------------------------------------
console.log('\n--- 3. Client Service Bearer Header Injection ---');

const cbeApiSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/services/cbeApi.ts'), 'utf8');
assert(cbeApiSrc.includes("import { supabase, isSupabaseConfigured, getSession }"), 'cbeApi imports getSession');
assert(cbeApiSrc.includes("const session = await getSession();"), 'cbeApi requests retrieve session asynchronously');
assert(cbeApiSrc.includes("authHeader = { Authorization: `Bearer ${session.access_token}` };"), 'cbeApi injects Authorization: Bearer <access_token>');

// -------------------------------------------------------------
// 4. UI Components Supabase Auth Wire-Up
// -------------------------------------------------------------
console.log('\n--- 4. UI Components Supabase Auth Integration ---');

const loginPageSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/auth/LoginPage.tsx'), 'utf8');
assert(loginPageSrc.includes("signInWithEmail(email, loginPassword.trim())"), 'LoginPage calls signInWithEmail in handleCredentialsLogin');
assert(loginPageSrc.includes("signUpWithEmail("), 'LoginPage calls signUpWithEmail in handleSignUp');
assert(loginPageSrc.includes("signUpPassword"), 'LoginPage maintains dedicated signUpPassword state');
assert(loginPageSrc.includes("Password / PIN (min 6 characters)"), 'LoginPage renders password input in Sign Up tab');

const authModalSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/auth/AuthModal.tsx'), 'utf8');
assert(authModalSrc.includes("signInWithEmail(email.trim(), password.trim())"), 'AuthModal calls signInWithEmail in handleLogin');
assert(authModalSrc.includes("signUpWithEmail("), 'AuthModal calls signUpWithEmail in handleRegister');
assert(authModalSrc.includes("onLogout?: () => void;"), 'AuthModal interface declares onLogout');

const appSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/App.tsx'), 'utf8');
assert(appSrc.includes("supabase.auth.onAuthStateChange"), 'App subscribes to supabase.auth.onAuthStateChange');
assert(appSrc.includes("await signOut()"), 'App handleLogout calls Supabase signOut()');
assert(appSrc.includes("onLogout={handleLogout}"), 'App passes handleLogout to AuthModal and StudentDashboard');

// -------------------------------------------------------------
// 5. API Router Auth Middleware Mounting
// -------------------------------------------------------------
console.log('\n--- 5. API Router Middleware Mounting ---');

const apiRouterSrc = fs.readFileSync(path.resolve(process.cwd(), 'server/apiRouter.ts'), 'utf8');
assert(apiRouterSrc.includes("import { authMiddleware } from './authMiddleware.js';"), 'apiRouter imports authMiddleware');
assert(apiRouterSrc.includes("apiRouter.use(authMiddleware);"), 'apiRouter mounts authMiddleware on API routes');
assert(apiRouterSrc.includes("const user: User = req.user || cbeDb.findUserById(currentUserId)"), '/auth/me prefers authenticated req.user with fallback');

console.log('\n===========================================================');
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('===========================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 SUPABASE AUTHENTICATION TEST SUITE PASSED SUCCESSFULLY!\n');
}
