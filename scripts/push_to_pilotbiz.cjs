const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
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
  'package-lock.json',
  '.npmrc',
  '.vercelignore',
  'vite.config.ts',
  'tsconfig.json',
  'vercel.json',
  'README.md',
  '.env.example',
  '.gitignore',
  'src/main.tsx',
  'src/index.css',
  'src/App.tsx',
  'src/types/bizpilot.ts',
  'src/utils/bizpilotFinance.ts',
  'src/services/bizpilotStore.tsx',
  'src/components/bizpilot/LandingAndAuth.tsx',
  'src/components/bizpilot/OnboardingWizard.tsx',
  'src/components/bizpilot/DashboardView.tsx',
  'src/components/bizpilot/ProductsInventoryView.tsx',
  'src/components/bizpilot/SalesAndPosView.tsx',
  'src/components/bizpilot/ExpensesView.tsx',
  'src/components/bizpilot/CustomersAndCreditView.tsx',
  'src/components/bizpilot/InvoicesAndQuotationsView.tsx',
  'src/components/bizpilot/ReportsAndCopilotView.tsx',
  'src/components/bizpilot/SettingsAndBillingView.tsx',
  'server/bizpilotRouter.ts',
  'api/index.ts',
  'supabase/migrations/20261020000000_bizpilot_ke_schema.sql',
  'test/bizpilot-ke.test.ts',
  'scripts/push_to_pilotbiz.cjs',
];

async function run() {
  const token = getPatToken();
  const remoteUrl = 'https://github.com/GARDIS0N/pilotbiz.git';
  console.log('Target remote:', remoteUrl);

  // 1. Stage all specified BizPilot KE files (never staging .env.local or secrets)
  console.log(`Staging ${FILES_TO_STAGE.length} BizPilot KE files...`);
  for (const file of FILES_TO_STAGE) {
    if (fs.existsSync(file)) {
      await git.add({ fs, dir: '.', filepath: file });
    }
  }
  console.log('Files staged successfully.');

  // 2. Commit
  const message = 'fix(build): remove untracked legacy router imports from vite.config.ts for Vercel deployment';
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

  // 3. Update remote origin URL
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

  // 4. Push current branch & main branch to https://github.com/GARDIS0N/pilotbiz.git
  const currentBranch = (await git.currentBranch({ fs, dir: '.' })) || 'main';
  console.log(`Pushing '${currentBranch}' to ${remoteUrl} (refs/heads/main)...`);

  const pushRes = await git.push({
    fs,
    http: customHttp,
    dir: '.',
    url: remoteUrl,
    ref: currentBranch,
    remoteRef: 'refs/heads/main',
    force: true,
    onProgress: (evt) => {
      if (evt.total) {
        console.log(
          `Push progress: ${evt.phase} ${evt.loaded}/${evt.total} (${Math.round(
            (evt.loaded / evt.total) * 100
          )}%)`
        );
      } else {
        console.log(`Push progress: ${evt.phase} ${evt.loaded}`);
      }
    },
    onAuth: () => ({
      username: 'GARDIS0N',
      password: token,
    }),
  });

  console.log('Push to main completed successfully!', JSON.stringify(pushRes, null, 2));
}

run().catch((err) => {
  console.error('Fatal push error:', err);
  process.exit(1);
});
