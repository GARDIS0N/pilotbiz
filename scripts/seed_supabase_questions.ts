import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
dotenv.config({ path: '.env.local' });

const DB_PATH = path.join(process.cwd(), 'data', 'cbe_database.json');
const BATCH_SIZE = 250;

async function main() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error('Error: Supabase URL and Anon Key must be configured in .env.local');
    process.exit(1);
  }

  if (!fs.existsSync(DB_PATH)) {
    console.error(`Error: cbe_database.json not found at ${DB_PATH}`);
    process.exit(1);
  }

  console.log('===========================================================');
  console.log('🌱 JIFUNO CBC QUESTION BANK SUPABASE SEEDING');
  console.log(`Target: ${url}`);
  console.log('===========================================================\n');

  const supabase = createClient(url, anonKey);

  // Authenticate as Admin user
  const adminEmail = 'admin.seed.runner@jifuno.ke';
  const adminPass = 'JifunoSeedAdminKey2026!Sec';

  console.log('1. Authenticating admin session for RLS bypass...');
  let { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPass
  });

  if (authErr) {
    console.log('   Creating dedicated seeding admin account...');
    const signupRes = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPass,
      options: {
        data: { role: 'admin' }
      }
    });

    if (signupRes.error) {
      console.error('Failed to authenticate as admin:', signupRes.error.message);
      process.exit(1);
    }
    authData = signupRes.data;
  }

  console.log(`   ✅ Admin authenticated (UID: ${authData.user?.id})\n`);

  // Load and transform questions
  console.log('2. Loading local questions from data/cbe_database.json...');
  const raw = fs.readFileSync(DB_PATH, 'utf8');
  const db = JSON.parse(raw);
  const questions: any[] = db.questions || [];

  const subStrands = new Map((db.subStrands || []).map((s: any) => [s.id, s]));
  const strands = new Map((db.strands || []).map((s: any) => [s.id, s]));
  const learningAreas = new Map((db.learningAreas || []).map((l: any) => [l.id, l]));

  console.log(`   Found ${questions.length} total questions to seed.`);

  const mappedQuestions = questions.map((q: any) => {
    // Resolve gradeId
    let gradeId = q.gradeId;
    if (!gradeId && q.subStrandId) {
      const ss: any = subStrands.get(q.subStrandId);
      if (ss) {
        const st: any = strands.get(ss.strandId);
        if (st) {
          const la: any = learningAreas.get(st.learningAreaId);
          if (la) gradeId = la.gradeId;
        }
      }
    }
    if (!gradeId && q.id) {
      const match = q.id.match(/-g([3-6])-/);
      if (match) gradeId = `grade-${match[1]}`;
    }
    if (!gradeId) gradeId = 'grade-4';

    return {
      id: q.id,
      grade_id: gradeId,
      sub_strand_id: q.subStrandId || 'sub-general',
      type: q.type,
      prompt: q.prompt,
      swahili_prompt: q.swahiliPrompt || null,
      story_scenario: q.storyScenario || null,
      swahili_story_scenario: q.swahiliStoryScenario || null,
      difficulty: q.difficulty || 'BEGINNER',
      options: q.options || [],
      correct_option_id: q.correctOptionId || null,
      correct_boolean: typeof q.correctBoolean === 'boolean' ? q.correctBoolean : null,
      matching_pairs: q.matchingPairs || [],
      correct_order_ids: q.correctOrderIds || [],
      fill_blank_answers: q.fillBlankAnswers || [],
      blank_template: q.blankTemplate || null,
      explanation: q.explanation || null,
      swahili_explanation: q.swahiliExplanation || null,
      hint: q.socraticHint || q.hint || null,
      swahili_hint: q.swahiliSocraticHint || q.swahiliHint || null,
      points: q.points || 10,
      content_status: q.contentStatus || 'APPROVED',
      metadata: {
        culturalContext: q.kenyanCulturalContext || null,
        sourceType: q.sourceType || 'CURRICULUM_ALIGNED'
      }
    };
  });

  const totalBatches = Math.ceil(mappedQuestions.length / BATCH_SIZE);
  console.log(`\n3. Seeding ${mappedQuestions.length} questions in ${totalBatches} batches (batch size ${BATCH_SIZE})...`);

  let seededCount = 0;
  const startTime = Date.now();

  for (let b = 0; b < totalBatches; b++) {
    const startIdx = b * BATCH_SIZE;
    const endIdx = Math.min(startIdx + BATCH_SIZE, mappedQuestions.length);
    const chunk = mappedQuestions.slice(startIdx, endIdx);

    let retries = 3;
    let success = false;

    while (retries > 0 && !success) {
      const { error } = await supabase
        .from('questions')
        .upsert(chunk, { onConflict: 'id' });

      if (error) {
        retries--;
        console.warn(`   ⚠️ Batch ${b + 1}/${totalBatches} error: ${error.message}. Retrying (${retries} left)...`);
        if (retries === 0) {
          console.error(`   ❌ Failed batch ${b + 1} permanently:`, error);
          process.exit(1);
        }
        await new Promise(r => setTimeout(r, 1000));
      } else {
        success = true;
        seededCount += chunk.length;
        const pct = Math.round((seededCount / mappedQuestions.length) * 100);
        console.log(`   [Batch ${String(b + 1).padStart(2, '0')}/${totalBatches}] Upserted ${chunk.length} items (${seededCount}/${mappedQuestions.length} - ${pct}%)`);
      }
    }
  }

  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Seeding finished in ${elapsedSec}s! Total questions upserted: ${seededCount}`);

  // 4. Verify live database count and grade breakdown
  console.log('\n4. Verifying live cloud question count from Supabase...');
  const { count: totalLive, error: countErr } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true });

  if (countErr) {
    console.error('Count query error:', countErr.message);
  } else {
    console.log(`   🎉 Live Supabase question count: ${totalLive}`);
  }

  // Grade Breakdown Check
  for (const g of ['grade-3', 'grade-4', 'grade-5', 'grade-6']) {
    const { count: gCount } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('grade_id', g);
    console.log(`   - ${g}: ${gCount} questions`);
  }

  console.log('\n===========================================================');
  console.log('🚀 SUPABASE DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('===========================================================');
}

main().catch(err => {
  console.error('Unhandled seeding error:', err);
  process.exit(1);
});
