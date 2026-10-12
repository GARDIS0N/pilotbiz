const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getPatToken() {
  if (process.env.GH_PAT && process.env.GH_PAT.trim()) {
    return process.env.GH_PAT.trim();
  }
  try {
    const clip = execSync('powershell -Command "(Get-Clipboard).Trim()"').toString().trim();
    if (clip && (clip.startsWith('ghp_') || clip.startsWith('github_pat_'))) {
      return clip;
    }
  } catch (e) {
    // ignore
  }
  throw new Error('GitHub Personal Access Token (starts with ghp_ or github_pat_) not found in GH_PAT or clipboard!');
}

async function status() {
  const matrix = await git.statusMatrix({ fs, dir: '.' });
  const changed = [];
  const blockedPatterns = [/\.env(\.|$)/i, /service-account/i, /credentials/i, /\.key$/i, /\.pem$/i, /\.pfx$/i];

  for (const [filepath, head, workdir, stage] of matrix) {
    // 0 = absent, 1 = unmodified, 2 = modified
    if (head === 1 && workdir === 1 && stage === 1) continue;

    for (const pat of blockedPatterns) {
      if (pat.test(path.basename(filepath)) && path.basename(filepath) !== '.env.example') {
        throw new Error(`SECURITY ALERT: Blocked sensitive file detected in status: ${filepath}`);
      }
    }

    let type = 'modified';
    if (head === 0 && workdir === 2) type = 'untracked';
    if (head === 1 && workdir === 0) type = 'deleted';
    changed.push({ filepath, type, head, workdir, stage });
  }

  return changed;
}

async function stageAll() {
  const matrix = await git.statusMatrix({ fs, dir: '.' });
  const staged = [];
  const blockedPatterns = [/\.env(\.|$)/i, /service-account/i, /credentials/i, /\.key$/i, /\.pem$/i, /\.pfx$/i];

  for (const [filepath, head, workdir, stage] of matrix) {
    if (head === 1 && workdir === 1 && stage === 1) continue;

    for (const pat of blockedPatterns) {
      if (pat.test(path.basename(filepath)) && path.basename(filepath) !== '.env.example') {
        throw new Error(`SECURITY ALERT: Attempting to stage sensitive file: ${filepath}`);
      }
    }

    if (workdir === 0) {
      await git.remove({ fs, dir: '.', filepath });
      staged.push(`deleted: ${filepath}`);
    } else {
      await git.add({ fs, dir: '.', filepath });
      staged.push(`staged: ${filepath}`);
    }
  }
  return staged;
}

async function commit(message) {
  const sha = await git.commit({
    fs,
    dir: '.',
    message,
    author: {
      name: 'GARDIS0N',
      email: 'kibetbriankemboi006@gmail.com'
    }
  });
  return sha;
}

const customHttp = {
  request: async (opts) => {
    return http.request({
      ...opts,
      fetchOptions: {
        ...opts.fetchOptions,
        timeout: 600000 // 10 minutes timeout
      }
    });
  }
};

async function push() {
  const token = getPatToken();
  const currentBranch = await git.currentBranch({ fs, dir: '.' }) || 'main';

  console.log(`Pushing branch '${currentBranch}' to origin...`);
  const response = await git.push({
    fs,
    http: customHttp,
    dir: '.',
    remote: 'origin',
    ref: currentBranch,
    force: false,
    onProgress: (evt) => {
      if (evt.total) {
        console.log(`Push progress: ${evt.phase} ${evt.loaded}/${evt.total} (${Math.round((evt.loaded / evt.total) * 100)}%)`);
      } else {
        console.log(`Push progress: ${evt.phase} ${evt.loaded}`);
      }
    },
    onAuth: () => ({
      username: 'GARDIS0N',
      password: token
    })
  });

  return response;
}

async function main() {
  const cmd = process.argv[2] || 'status';
  const commitMsg = process.argv[3];

  try {
    if (cmd === 'status') {
      const changes = await status();
      console.log(`Status: ${changes.length} changed/untracked items`);
      changes.forEach(c => console.log(`  ${c.type.padEnd(10)} ${c.filepath}`));
    } else if (cmd === 'stage') {
      const staged = await stageAll();
      console.log(`Successfully staged ${staged.length} items`);
    } else if (cmd === 'commit') {
      if (!commitMsg) throw new Error('Commit message required!');
      await stageAll();
      const sha = await commit(commitMsg);
      console.log(`Committed successfully: ${sha}`);
    } else if (cmd === 'push') {
      const res = await push();
      console.log('Push response:', JSON.stringify(res, null, 2));
    } else if (cmd === 'commit-push') {
      if (!commitMsg) throw new Error('Commit message required!');
      console.log(`1. Checking status & staging files...`);
      const staged = await stageAll();
      console.log(`Staged ${staged.length} items.`);
      if (staged.length === 0) {
        console.log('No changes to commit.');
        return;
      }
      console.log(`2. Committing with message: "${commitMsg}"...`);
      const sha = await commit(commitMsg);
      console.log(`Commit created: ${sha}`);
      console.log(`3. Pushing to origin...`);
      const res = await push();
      console.log('Push completed successfully!', JSON.stringify(res, null, 2));
    } else {
      console.log(`Unknown command: ${cmd}`);
    }
  } catch (err) {
    console.error('Error during git operation:', err.message || err);
    process.exit(1);
  }
}

main();
