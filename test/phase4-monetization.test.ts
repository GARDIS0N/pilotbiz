import assert from 'node:assert';
import { darajaService } from '../server/darajaService.js';
import { cbeDb } from '../server/cbeDb.js';
import { SUBSCRIPTION_PLANS, SubscriptionRecord } from '../src/types/subscription.js';
import { runAllScheduledJobs } from '../server/cronJobs.js';

console.log('🧪 Starting Phase 4 Monetization & M-Pesa Test Suite...\n');

// 1. Phone Number Normalization Tests
console.log('Test 1: Kenyan Phone Number Normalization for Daraja');
{
  assert.strictEqual(darajaService.normalizePhoneNumber('0712345678'), '254712345678');
  assert.strictEqual(darajaService.normalizePhoneNumber('+254712345678'), '254712345678');
  assert.strictEqual(darajaService.normalizePhoneNumber('254712345678'), '254712345678');
  assert.strictEqual(darajaService.normalizePhoneNumber('712345678'), '254712345678');
  assert.strictEqual(darajaService.normalizePhoneNumber('0112345678'), '254112345678'); // Safaricom 01XX series

  assert.throws(() => darajaService.normalizePhoneNumber('12345'), /Invalid Kenyan phone number/);
  assert.throws(() => darajaService.normalizePhoneNumber('0912345678'), /Invalid Kenyan phone number/);
  console.log('  ✓ Phone normalization handles 07XX, 01XX, +254, and rejects malformed numbers');
}

// 2. Daraja STK Push Password & Timestamp Generation
console.log('Test 2: Daraja STK Push Credentials & Password Generator');
{
  const ts = darajaService.getTimestamp();
  assert.strictEqual(ts.length, 14, 'Timestamp must be YYYYMMDDHHmmss (14 digits)');

  const password = darajaService.generatePassword(ts);
  assert.ok(password.length > 20, 'Password must be valid non-empty string');
  const decoded = Buffer.from(password, 'base64').toString('utf8');
  assert.ok(decoded.includes(ts), 'Decoded password must contain timestamp');
  console.log('  ✓ Timestamp and Base64 STK password generated accurately');
}

// 3. STK Push Dispatch & Mock Simulation
console.log('Test 3: STK Push Dispatch');
{
  const res = await darajaService.initiateStkPush({
    phoneNumber: '0712345678',
    amount: 450,
    planId: 'MONTHLY',
    userId: 'user-parent-test'
  });

  assert.strictEqual(res.success, true, 'STK Push initiation should succeed');
  assert.ok(res.checkoutRequestId.startsWith('ws_CO_'), 'Checkout ID should have valid prefix');
  assert.strictEqual(res.responseCode, '0');
  console.log('  ✓ STK push dispatches successfully with CheckoutRequestID');
}

// 4. Webhook Callback Parsing & Idempotency
console.log('Test 4: Callback Parsing & Webhook Idempotency');
{
  const testCheckoutId = `ws_CO_TEST_${Date.now()}`;
  const mockPayload = darajaService.generateMockSuccessCallback(testCheckoutId, 450, '254712345678');

  // First callback attempt
  const firstParse = darajaService.parseCallback(mockPayload);
  assert.strictEqual(firstParse.isSuccessful, true);
  assert.strictEqual(firstParse.checkoutRequestId, testCheckoutId);
  assert.strictEqual(firstParse.amount, 450);
  assert.ok(firstParse.mpesaReceiptNumber?.startsWith('SHK'));
  assert.strictEqual(firstParse.isDuplicate, false, 'First callback must not be marked duplicate');

  // Second callback attempt (duplicate delivery)
  const secondParse = darajaService.parseCallback(mockPayload);
  assert.strictEqual(secondParse.isDuplicate, true, 'Second callback must be flagged as duplicate for idempotency');
  console.log('  ✓ Webhook parses metadata and enforces idempotency against replay attacks');
}

// 5. Subscription Activation & 48h Grace Period
console.log('Test 5: Subscriptions, Durations & 48-Hour Grace Period');
{
  const testRunId = Date.now();
  const userId = `user-test-parent-sub-${testRunId}`;
  const studentId = `student-test-${testRunId}`;
  const sub = cbeDb.activateSubscription({
    userId,
    planId: 'MONTHLY',
    studentIds: [studentId]
  });

  assert.strictEqual(sub.status, 'ACTIVE');
  assert.strictEqual(sub.planId, 'MONTHLY');

  const startDate = new Date(sub.startDate);
  const expiryDate = new Date(sub.expiryDate);
  const graceDate = new Date(sub.gracePeriodExpiryDate);

  // 30 days duration
  const daysDiff = Math.round((expiryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  assert.strictEqual(daysDiff, 30, 'Monthly plan must last exactly 30 days');

  // 48h grace period
  const graceHours = (graceDate.getTime() - expiryDate.getTime()) / (1000 * 60 * 60);
  assert.strictEqual(graceHours, 48, 'Grace period must be exactly 48 hours');

  // Test state transition: simulate expired subscription entering grace period
  const pastExpiry = new Date(Date.now() - 3600000 * 2); // 2 hours ago (within 48h grace)
  sub.expiryDate = pastExpiry.toISOString();
  sub.gracePeriodExpiryDate = new Date(pastExpiry.getTime() + 48 * 3600000).toISOString();
  cbeDb.upsertSubscription(sub);

  const cronRes = await runAllScheduledJobs();
  assert.ok(cronRes.expiredSubscriptions.evaluated > 0, 'Cron job should evaluate subscriptions');

  const reloaded = cbeDb.getSubscriptionForUser(userId);
  assert.strictEqual(reloaded?.status, 'GRACE_PERIOD', 'Subscription past expiry but within 48h must enter GRACE_PERIOD');

  // Freemium access during grace period should still be allowed
  const access = cbeDb.checkFreemiumAccess(studentId);
  assert.strictEqual(access.allowed, true, 'Learner in grace period must still have premium access');

  console.log('  ✓ Subscription plans, durations, and 48-hour grace period verified');
}

// 6. Freemium Daily Lesson Cap (3 lessons/day) & Subject Gating
console.log('Test 6: Freemium Daily Limit (3 Lessons/Day) & Subject Gating');
{
  const testRunId = Date.now();
  const freeStudentId = `student-free-learner-${testRunId}`;

  // Ensure no active subscription
  const initialAccess = cbeDb.checkFreemiumAccess(freeStudentId, 'math');
  assert.strictEqual(initialAccess.allowed, true, 'First lesson should be allowed');
  assert.strictEqual(initialAccess.dailyLessonsRemaining, 3);

  // Consume 3 lessons
  cbeDb.recordLessonAttemptForFreemium(freeStudentId);
  cbeDb.recordLessonAttemptForFreemium(freeStudentId);
  cbeDb.recordLessonAttemptForFreemium(freeStudentId);

  const after3Lessons = cbeDb.checkFreemiumAccess(freeStudentId, 'math');
  assert.strictEqual(after3Lessons.allowed, false, 'Lesson 4 should be rejected under free tier');
  assert.strictEqual(after3Lessons.reason, 'DAILY_LIMIT_EXCEEDED');
  assert.strictEqual(after3Lessons.dailyLessonsRemaining, 0);

  // Test subject gating for locked subject (e.g. agriculture / social studies)
  const otherStudentId = `student-free-fresh-${testRunId}`;
  const lockedSubjectAccess = cbeDb.checkFreemiumAccess(otherStudentId, 'la-agriculture-g4');
  assert.strictEqual(lockedSubjectAccess.allowed, false, 'Non-free subject must be locked for free tier');
  assert.strictEqual(lockedSubjectAccess.reason, 'SUBJECT_REQUIRES_PREMIUM');

  console.log('  ✓ Daily lesson cap (3/day) and subject gating strictly enforced on free accounts');
}

// 7. Growth Loops & Referral Program (+7 Days Bonus)
console.log('Test 7: Growth Loops & Referral Rewards');
{
  const testRunId = Date.now();
  const inviterId = `user-inviter-${testRunId}`;
  const inviteeId = `user-invitee-${testRunId}`;

  // Get or generate referral code for inviter
  const refRecord = cbeDb.getReferralRecord(inviterId);
  assert.ok(refRecord.code.startsWith('JIFUNO'), 'Referral code must have JIFUNO prefix');

  // Test self-redemption rejected
  const selfRes = cbeDb.applyReferralCode(inviterId, refRecord.code);
  assert.strictEqual(selfRes.success, false, 'Self-redemption must be rejected');

  // Test valid redemption by invitee
  const validRes = cbeDb.applyReferralCode(inviteeId, refRecord.code);
  assert.strictEqual(validRes.success, true, 'Valid referral code must succeed');
  assert.strictEqual(validRes.bonusDays, 7, 'Referral bonus must be 7 days');

  // Test duplicate redemption rejected
  const dupRes = cbeDb.applyReferralCode(inviteeId, refRecord.code);
  assert.strictEqual(dupRes.success, false, 'Duplicate referral redemption must be rejected');

  console.log('  ✓ Referral code generation, validation, and +7 day bonus award verified');
}

console.log('\n🎉 ALL PHASE 4 MONETIZATION & M-PESA TESTS PASSED SUCCESSFULLY!\n');
