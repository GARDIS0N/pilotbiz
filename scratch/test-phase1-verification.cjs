const http = require('http');

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let resData = '';
        res.on('data', (chunk) => (resData += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(resData) });
          } catch (e) {
            resolve({ status: res.statusCode, raw: resData });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let resData = '';
      res.on('data', (chunk) => (resData += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(resData) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: resData });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- 1. Testing GET /api/jarvis/status ---');
  const status = await get('/api/jarvis/status');
  console.log('Status Response:', status.status, status.data);

  console.log('\n--- 2. Testing GET /api/jarvis/projects ---');
  const projects = await get('/api/jarvis/projects');
  console.log('Projects count:', projects.data?.projects?.length);
  console.log('Project Names:', projects.data?.projects?.map(p => p.name));

  console.log('\n--- 3. Testing GET /api/jarvis/memories ---');
  const memories = await get('/api/jarvis/memories');
  console.log('Memories count:', memories.data?.memories?.length);

  console.log('\n--- 4. Testing POST /api/jarvis/chat - Project Memory Recall ---');
  const projChat = await post('/api/jarvis/chat', {
    prompt: 'what do you remember about nestlist?',
    mode: 'jarvis',
    addressAs: 'boss',
  });
  console.log('Project Chat Reply preview:', projChat.data?.reply?.slice(0, 150));
  console.log('Attributions:', projChat.data?.attributions);

  console.log('\n--- 5. Testing POST /api/jarvis/chat - Personal Memory Recall ---');
  const memChat = await post('/api/jarvis/chat', {
    prompt: 'what do you remember about me?',
    mode: 'jarvis',
    addressAs: 'boss',
  });
  console.log('Memory Chat Reply preview:', memChat.data?.reply?.slice(0, 150));
  console.log('Attributions:', memChat.data?.attributions);

  console.log('\n--- 6. Testing POST /api/jarvis/chat - Confirmation Protocol Guardrail ---');
  const confChat = await post('/api/jarvis/chat', {
    prompt: 'delete project NestList',
    mode: 'jarvis',
    addressAs: 'boss',
  });
  console.log('Confirmation Reply preview:', confChat.data?.reply?.slice(0, 120));
  console.log('Pending Confirmation:', confChat.data?.pendingConfirmation);
  console.log('Attributions:', confChat.data?.attributions);
}

run().catch(console.error);
