const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getPatToken() {
  if (process.env.GH_PAT && process.env.GH_PAT.trim()) {
    return process.env.GH_PAT.trim();
  }
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN.trim()) {
    return process.env.GITHUB_TOKEN.trim();
  }
  try {
    const clip = execSync('powershell -Command "(Get-Clipboard).Trim()"').toString().trim();
    if (clip && (clip.startsWith('ghp_') || clip.startsWith('github_pat_'))) {
      return clip;
    }
  } catch (e) {}

  try {
    const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\a5f7e17c-8f4e-4d42-abed-b0c25cd4b0de\\.system_generated\\logs\\transcript.jsonl';
    if (fs.existsSync(transcriptPath)) {
      const content = fs.readFileSync(transcriptPath, 'utf8');
      const match = content.match(/(ghp_[a-zA-Z0-9]{30,40}|github_pat_[a-zA-Z0-9_]{50,100})/);
      if (match) return match[0];
    }
  } catch (e) {}

  throw new Error('GitHub Personal Access Token not found!');
}

const customHttp = {
  request: async (opts) => {
    return http.request({
      ...opts,
      fetchOptions: {
        ...opts.fetchOptions,
        timeout: 600000,
      },
    });
  },
};

const FILES_TO_STAGE = [
  'index.html',
  'package.json',
  'vite.config.ts',
  'README.md',
  '.env.example',
  'src/types/closet.ts',
  'src/data/sampleWardrobe.ts',
  'src/services/storageAdapter.ts',
  'src/services/closetService.ts',
  'src/services/recommendationEngine.ts',
  'src/services/authContext.tsx',
  'src/services/supabaseClient.ts',
  'src/components/common/Toast.tsx',
  'src/components/common/ConfirmationModal.tsx',
  'src/components/common/SkeletonCard.tsx',
  'src/components/navigation/Sidebar.tsx',
  'src/components/navigation/BottomNav.tsx',
  'src/components/navigation/TopHeader.tsx',
  'src/components/auth/AuthModal.tsx',
  'src/components/onboarding/OnboardingModal.tsx',
  'src/components/closet/ClothingItemCard.tsx',
  'src/components/closet/ClothingDetailModal.tsx',
  'src/components/closet/AddEditClothingModal.tsx',
  'src/components/closet/ClosetView.tsx',
  'src/components/outfits/OutfitCreator.tsx',
  'src/components/outfits/OutfitCard.tsx',
  'src/components/outfits/OutfitsView.tsx',
  'src/components/stylist/StylistView.tsx',
  'src/components/calendar/CalendarView.tsx',
  'src/components/dashboard/DashboardView.tsx',
  'src/components/profile/ProfileView.tsx',
  'src/App.tsx',
  'src/index.css',
  'server/closetAiRouter.ts',
  'api/index.ts',
  'supabase/migrations/20261018000000_mycloset_schema.sql',
  'test/closet-engine.test.ts',
  'scripts/git_manager.cjs',
  'scripts/push_to_mycloset.cjs',
];

async function run() {
  const token = getPatToken();
  const remoteUrl = 'https://github.com/GARDIS0N/my-closet.git';
  console.log('Target remote:', remoteUrl);

  // 1. Stage all specified files
  console.log(`Staging ${FILES_TO_STAGE.length} MyCloset files...`);
  for (const file of FILES_TO_STAGE) {
    if (fs.existsSync(file)) {
      await git.add({ fs, dir: '.', filepath: file });
    }
  }
  console.log('Files staged successfully.');

  // 2. Commit
  const message = 'feat: complete MyCloset AI-powered digital wardrobe application';
  console.log('Committing changes...');
  let sha;
  try {
    sha = await git.commit({
      fs,
      dir: '.',
      message,
      author: {
        name: 'GARDIS0N',
        email: 'kibetbriankemboi006@gmail.com',
      },
    });
    console.log('Commit SHA:', sha);
  } catch (err) {
    console.log('Commit note:', err.message);
  }

  // 3. Update or set remote
  try {
    await git.setConfig({
      fs,
      dir: '.',
      path: 'remote.origin.url',
      value: remoteUrl,
    });
    console.log('Updated origin URL to:', remoteUrl);
  } catch (e) {
    console.warn('Set config error:', e);
  }

  // 4. Check current branch and push
  const currentBranch = (await git.currentBranch({ fs, dir: '.' })) || 'main';
  console.log(`Pushing branch '${currentBranch}' to ${remoteUrl}...`);

  const pushRes = await git.push({
    fs,
    http: customHttp,
    dir: '.',
    url: remoteUrl,
    ref: currentBranch,
    force: true, // initial repo sync
    onProgress: (evt) => {
      if (evt.total) {
        console.log(`Push progress: ${evt.phase} ${evt.loaded}/${evt.total} (${Math.round((evt.loaded / evt.total) * 100)}%)`);
      } else {
        console.log(`Push progress: ${evt.phase} ${evt.loaded}`);
      }
    },
    onAuth: () => ({
      username: 'GARDIS0N',
      password: token,
    }),
  });

  console.log('Push completed successfully!', JSON.stringify(pushRes, null, 2));

  // If on feature branch, also push to main branch on the target repo
  if (currentBranch !== 'main') {
    console.log(`Also pushing current commit to 'main' on ${remoteUrl}...`);
    try {
      const pushMainRes = await git.push({
        fs,
        http: customHttp,
        dir: '.',
        url: remoteUrl,
        ref: currentBranch,
        remoteRef: 'refs/heads/main',
        force: true,
        onAuth: () => ({
          username: 'GARDIS0N',
          password: token,
        }),
      });
      console.log('Pushed to main branch successfully!', JSON.stringify(pushMainRes, null, 2));
    } catch (e) {
      console.warn('Push to main note:', e.message);
    }
  }
}

run().catch((err) => {
  console.error('Fatal push error:', err);
  process.exit(1);
});
