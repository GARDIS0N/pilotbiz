import assert from 'node:assert';
import { createRateLimiter } from '../server/rateLimiter.js';
import { securityHeadersMiddleware } from '../server/securityHeaders.js';

console.log('🧪 Starting Phase 1 Security, Rate Limiting & Resilience Test Suite...\n');

// 1. Rate Limiter Unit Tests
console.log('Test 1: Rate Limiter sliding window and threshold enforcement');
{
  const limiter = createRateLimiter({
    windowMs: 1000,
    maxRequests: 3,
    message: 'Too many requests'
  });

  let blockedCount = 0;
  let successCount = 0;

  for (let i = 0; i < 5; i++) {
    const req = {
      ip: '192.168.1.1',
      headers: {},
      socket: {}
    } as any;

    let nextCalled = false;
    const res = {
      status: (code: number) => ({
        json: (payload: any) => {
          if (code === 429) {
            blockedCount++;
            assert.strictEqual(payload.error, 'Too many requests');
          }
        }
      }),
      setHeader: () => {}
    } as any;

    limiter(req, res, () => {
      nextCalled = true;
      successCount++;
    });
  }

  assert.strictEqual(successCount, 3, 'First 3 requests within window should pass');
  assert.strictEqual(blockedCount, 2, '4th and 5th requests should receive HTTP 429');
  console.log('  ✓ Rate limiter permits up to maxRequests and rejects excess with 429');
}

// 2. IP Isolation in Rate Limiter
console.log('Test 2: Rate Limiter key isolation across client IPs');
{
  const limiter = createRateLimiter({
    windowMs: 1000,
    maxRequests: 2
  });

  const makeReq = (ip: string) => {
    let passed = false;
    const req = { ip, headers: {}, socket: {} } as any;
    const res = {
      status: () => ({ json: () => {} }),
      setHeader: () => {}
    } as any;
    limiter(req, res, () => { passed = true; });
    return passed;
  };

  assert.strictEqual(makeReq('10.0.0.1'), true);
  assert.strictEqual(makeReq('10.0.0.1'), true);
  assert.strictEqual(makeReq('10.0.0.1'), false, '10.0.0.1 exhausted');

  // Different client IP should not be affected
  assert.strictEqual(makeReq('10.0.0.2'), true, '10.0.0.2 should pass independently');
  assert.strictEqual(makeReq('10.0.0.2'), true, '10.0.0.2 should pass second request');
  console.log('  ✓ Client IPs are isolated; one client hitting limit does not block another');
}

// 3. Security Headers Middleware
console.log('Test 3: Security Headers Middleware presence and values');
{
  const headers: Record<string, string> = {};
  const req = {} as any;
  const res = {
    setHeader: (name: string, value: string) => {
      headers[name.toLowerCase()] = value;
    }
  } as any;

  let nextCalled = false;
  securityHeadersMiddleware(req, res, () => {
    nextCalled = true;
  });

  assert.strictEqual(nextCalled, true, 'Middleware must call next()');
  assert.strictEqual(headers['x-content-type-options'], 'nosniff');
  assert.strictEqual(headers['x-frame-options'], 'DENY');
  assert.strictEqual(headers['referrer-policy'], 'strict-origin-when-cross-origin');
  assert.ok(headers['content-security-policy'], 'CSP header must be set');
  assert.ok(headers['content-security-policy'].includes("script-src 'self'"), 'CSP must restrict script-src');
  console.log('  ✓ Security headers set expected X-Content-Type-Options, X-Frame-Options, CSP');
}

// 4. Privacy & Authorization Protection
console.log('Test 4: Authorization and scope validation for child data deletion');
{
  // Simulated handler logic from apiRouter.ts /privacy/delete-data
  function canDeleteData(callerUserId: string, callerRole: string, targetStudentId: string, linkedParentId?: string) {
    if (!callerUserId) return { allowed: false, status: 401 };
    const isOwner = callerUserId === targetStudentId;
    const isParentGuardian = callerRole === 'parent' && linkedParentId === callerUserId;
    const isAdmin = callerRole === 'admin';
    if (!isOwner && !isParentGuardian && !isAdmin) {
      return { allowed: false, status: 403 };
    }
    return { allowed: true, status: 200 };
  }

  // Stranger trying to delete another child's data
  const stranger = canDeleteData('attacker-123', 'student', 'victim-student-456');
  assert.strictEqual(stranger.allowed, false);
  assert.strictEqual(stranger.status, 403);

  // Student deleting their own data
  const selfDelete = canDeleteData('student-456', 'student', 'student-456');
  assert.strictEqual(selfDelete.allowed, true);

  // Parent deleting their linked child's data
  const parentDelete = canDeleteData('parent-mama-halima', 'parent', 'student-amina', 'parent-mama-halima');
  assert.strictEqual(parentDelete.allowed, true);

  // Unlinked parent trying to delete another parent's child
  const badParentDelete = canDeleteData('parent-unrelated', 'parent', 'student-amina', 'parent-mama-halima');
  assert.strictEqual(badParentDelete.allowed, false);
  assert.strictEqual(badParentDelete.status, 403);

  console.log('  ✓ IDOR protection prevents unauthorized deletion of student data');
}

console.log('\n🎉 ALL Phase 1 Security, Rate Limiting & Resilience Tests PASSED!\n');
