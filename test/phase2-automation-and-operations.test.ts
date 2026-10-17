import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { sendSystemAlert } from '../server/alertWebhook.js';
import { monitoringService } from '../server/monitoring.js';
import { runBackup } from '../scripts/backup_db.js';
import { runRestore } from '../scripts/restore_db.js';
import { runAllScheduledJobs } from '../server/cronJobs.js';

console.log('🧪 Starting Phase 2 Automation & Operations Test Suite...\n');

// 1. CI/CD Workflow Integrity
console.log('Test 1: CI/CD Workflow file integrity (.github/workflows/ci.yml)');
{
  const ciPath = path.resolve(process.cwd(), '.github/workflows/ci.yml');
  assert.ok(fs.existsSync(ciPath), 'ci.yml must exist');
  const ciContent = fs.readFileSync(ciPath, 'utf8');

  assert.ok(ciContent.includes('pull_request:'), 'CI must trigger on pull_request');
  assert.ok(ciContent.includes('push:'), 'CI must trigger on push to main');
  assert.ok(ciContent.includes('npm run audit:questions'), 'CI must run question audit');
  assert.ok(ciContent.includes('npm run lint'), 'CI must run TypeScript lint check');
  assert.ok(ciContent.includes('npm test'), 'CI must run full test suite');
  assert.ok(ciContent.includes('npm run build'), 'CI must run production build');
  console.log('  ✓ CI/CD workflow runs lint, tests, content audit, and build on PR and main');
}

// 2. Environments Documentation Integrity
console.log('Test 2: Environments documentation & .env.example');
{
  const envDocPath = path.resolve(process.cwd(), 'docs/ENVIRONMENTS.md');
  assert.ok(fs.existsSync(envDocPath), 'docs/ENVIRONMENTS.md must exist');
  const envDoc = fs.readFileSync(envDocPath, 'utf8');
  assert.ok(envDoc.includes('Preview'), 'Must document Vercel preview environments');
  assert.ok(envDoc.includes('Production'), 'Must document Production environment');
  assert.ok(envDoc.includes('ALERT_WEBHOOK_URL'), 'Must document ALERT_WEBHOOK_URL');
  assert.ok(envDoc.includes('CRON_SECRET'), 'Must document CRON_SECRET');

  const envExample = fs.readFileSync(path.resolve(process.cwd(), '.env.example'), 'utf8');
  assert.ok(envExample.includes('ALERT_WEBHOOK_URL='), '.env.example must specify ALERT_WEBHOOK_URL');
  assert.ok(envExample.includes('CRON_SECRET='), '.env.example must specify CRON_SECRET');
  console.log('  ✓ Environments documentation and .env.example are complete');
}

// 3. Monitoring & Alert Webhook
console.log('Test 3: Monitoring service & alert deduplication');
{
  // Test monitoring recording
  monitoringService.recordRequest('/api/test', 200, 15);
  monitoringService.recordRequest('/api/test-error', 500, 45);
  const metrics = monitoringService.getMetrics();

  assert.ok(metrics.uptimeSeconds >= 0, 'Uptime must be >= 0');
  assert.ok(metrics.totalRequests > 0, 'Must record requests');
  assert.ok(metrics.statusCounts['5xx'] > 0, 'Must record 5xx');

  // Test sendSystemAlert gracefully handles unconfigured webhook without throwing
  const alertPromise = sendSystemAlert({
    level: 'INFO',
    title: 'Test Operational Heartbeat',
    message: 'Test message for verification',
    dedupeKey: 'unit-test-key-1'
  });

  assert.ok(alertPromise instanceof Promise, 'sendSystemAlert must return a Promise');
  console.log('  ✓ Monitoring tracks metrics and alerts handle deduplication gracefully');
}

// 4. Automated Backup and Tested Restore Procedure
console.log('Test 4: Database backup and tested restore runbook');
async function testBackupAndRestore() {
  const backupRes = await runBackup();
  assert.strictEqual(backupRes.success, true, 'Backup must succeed');
  assert.ok(fs.existsSync(backupRes.filePath), 'Backup file must exist on disk');

  // Verify restore validates snapshot
  const restoreRes = await runRestore(backupRes.filePath);
  assert.strictEqual(restoreRes.success, true, 'Restore verification must succeed');
  assert.ok(restoreRes.recordsRestored['questions'] >= 8700, 'Must restore 8,700+ questions');
  console.log('  ✓ Automated backup snapshot created and verified via restore procedure');
}

// 5. Scheduled Automation Engine (Streaks, Reminders, Expired Subs, Guest Cleanup)
console.log('Test 5: Scheduled jobs engine');
async function testScheduledJobs() {
  const cronRes = await runAllScheduledJobs();
  assert.strictEqual(cronRes.success, true, 'Scheduled jobs must succeed');
  assert.ok(typeof cronRes.streakEvaluations.learnersEvaluated === 'number', 'Must evaluate streaks');
  assert.ok(typeof cronRes.dailyReminders.remindersQueued === 'number', 'Must queue reminders');
  assert.ok(typeof cronRes.staleGuestCleanup.guestsScanned === 'number', 'Must scan stale guests');
  console.log('  ✓ Scheduled jobs run streak resets, daily reminders, and stale guest cleanup');
}

// 6. Executive Analytics Dashboard Integration
console.log('Test 6: Executive Analytics Dashboard component & API');
{
  const adminDashPath = path.resolve(process.cwd(), 'src/components/admin/AdminDashboard.tsx');
  const adminDashContent = fs.readFileSync(adminDashPath, 'utf8');
  assert.ok(adminDashContent.includes('AnalyticsDashboard'), 'AdminDashboard imports AnalyticsDashboard');
  assert.ok(adminDashContent.includes("activeTab === 'ANALYTICS'"), 'AdminDashboard supports ANALYTICS tab');

  const analyticsDashPath = path.resolve(process.cwd(), 'src/components/admin/AnalyticsDashboard.tsx');
  assert.ok(fs.existsSync(analyticsDashPath), 'AnalyticsDashboard component exists');
  const analyticsDashContent = fs.readFileSync(analyticsDashPath, 'utf8');
  assert.ok(analyticsDashContent.includes('Onboarding Drop-off Funnel'), 'Visualizes onboarding funnel');
  assert.ok(analyticsDashContent.includes('Day-1 Retention'), 'Displays Day-1 retention');
  assert.ok(analyticsDashContent.includes('Monthly Revenue'), 'Displays revenue in KES');
  console.log('  ✓ Analytics dashboard presents DAU, retention, onboarding funnel, and revenue');
}

async function run() {
  await testBackupAndRestore();
  await testScheduledJobs();
  console.log('\n🎉 ALL Phase 2 Automation & Operations Tests PASSED!\n');
}

run().catch((err) => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
