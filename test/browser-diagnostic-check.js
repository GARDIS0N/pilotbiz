import { spawn } from 'child_process';
import WebSocket from 'ws';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

async function runBrowserTest() {
  console.log('🚀 Launching Headless Chrome on port', PORT);
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--window-size=390,850',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=C:\\Users\\Admin\\AppData\\Local\\Temp\\chrome_cdp_profile_final2'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const pages = await listRes.json();
    const target = pages.find(p => p.type === 'page') || pages[0];
    if (!target) throw new Error('No page target available in Chrome');

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let msgId = 1;
    const pendingCallbacks = new Map();

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pendingCallbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.on('message', data => {
      const msg = JSON.parse(data.toString());
      if (msg.id && pendingCallbacks.has(msg.id)) {
        const { resolve, reject } = pendingCallbacks.get(msg.id);
        pendingCallbacks.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    });

    await new Promise(r => ws.on('open', r));
    console.log('🔌 Connected to Chrome DevTools Protocol');

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 850,
      deviceScaleFactor: 2,
      mobile: true
    });

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res.result?.value;
    }

    console.log('📱 Navigating to http://localhost:3000 ...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 2500));

    // Reset local storage to guarantee clean Grade 3 onboarding start
    await evalJs(`localStorage.clear(); sessionStorage.clear(); location.reload();`);
    await new Promise(r => setTimeout(r, 2500));

    // ==============================================================
    // PART 1: ANSWER ALL 3 QUESTIONS CORRECTLY -> 3/3 CONFIRMED
    // ==============================================================
    console.log('\n==============================================================');
    console.log('TEST PART 1: ANSWER ALL 3 DIAGNOSTIC QUESTIONS CORRECTLY (3/3)');
    console.log('==============================================================');

    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("GET STARTED"))?.click();`);
    await new Promise(r => setTimeout(r, 1200));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("Grade 3"))?.click();`);
    await new Promise(r => setTimeout(r, 1200));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("10 min"))?.click();`);
    await new Promise(r => setTimeout(r, 2000));

    let correctAnswersCount = 0;

    for (let qNum = 1; qNum <= 3; qNum++) {
      const prompt = await evalJs(`document.querySelector('h4')?.innerText || ''`);
      console.log(`\n[Question ${qNum}/3] Prompt: "${prompt}"`);

      // Determine correct option
      let correctChoice = '460';
      if (prompt.includes('400 + 350 = 750') || prompt.includes('True or False')) {
        correctChoice = 'True';
      } else if (prompt.includes('320 + 140')) {
        correctChoice = '460';
      } else if (prompt.includes('mangoes') || prompt.includes('altogether')) {
        correctChoice = '375';
      }

      console.log(`Selecting correct option: "${correctChoice}"`);
      const clickStatus = await evalJs(`(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const btn = btns.find(b => b.innerText.trim() === "${correctChoice}" || b.innerText.trim().startsWith("${correctChoice}"));
        if (!btn) return 'NOT_FOUND. Buttons: ' + JSON.stringify(btns.map(b => b.innerText.trim()));
        btn.click();
        return 'CLICKED: ' + btn.innerText.trim();
      })()`);
      console.log('Click status:', clickStatus);
      await new Promise(r => setTimeout(r, 600));

      // Click CHECK ANSWER
      const checkStatus = await evalJs(`(() => {
        const checkBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CHECK ANSWER'));
        if (!checkBtn) return 'CHECK_BTN_NOT_FOUND';
        if (checkBtn.disabled) return 'CHECK_BTN_DISABLED';
        checkBtn.click();
        return 'CHECK_BTN_CLICKED';
      })()`);
      console.log('Check status:', checkStatus);
      await new Promise(r => setTimeout(r, 1000));

      const bodyText = await evalJs(`document.body.innerText`);
      const isCorrect = bodyText.includes('Hongera! Correct!');
      console.log(`Question ${qNum} evaluation: ${isCorrect ? '✅ CORRECT (Hongera! Correct!)' : '❌ WRONG'}`);
      if (!isCorrect) {
        console.log('DEBUG BODY TEXT:\n', bodyText);
        const btns = await evalJs(`Array.from(document.querySelectorAll('button')).map(b => ({ text: b.innerText, disabled: b.disabled }))`);
        console.log('DEBUG BUTTONS:\n', btns);
      }

      if (isCorrect) correctAnswersCount++;

      // Continue to next question or complete
      await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CONTINUE') || b.innerText.includes('START FIRST LESSON'))?.click();`);
      await new Promise(r => setTimeout(r, 1500));
    }

    console.log(`\n📊 Diagnostic Check Score: ${correctAnswersCount}/3`);
    if (correctAnswersCount !== 3) {
      throw new Error(`Expected 3/3 correct answers, got ${correctAnswersCount}/3`);
    }

    // ==============================================================
    // PART 2: ANSWER WRONGLY -> VERIFY "Not quite. Here's why:" & CORRECT ANSWER LABEL
    // ==============================================================
    console.log('\n==============================================================');
    console.log('TEST PART 2: ANSWER WRONGLY -> VERIFY FEEDBACK & CORRECT ANSWER LABEL');
    console.log('==============================================================');

    await evalJs(`localStorage.clear(); sessionStorage.clear(); location.reload();`);
    await new Promise(r => setTimeout(r, 2000));

    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("GET STARTED"))?.click();`);
    await new Promise(r => setTimeout(r, 1200));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("Grade 3"))?.click();`);
    await new Promise(r => setTimeout(r, 1200));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes("10 min"))?.click();`);
    await new Promise(r => setTimeout(r, 2000));

    // First answer Q1 correctly to reach Q2
    console.log('Answering Q1 correctly (460)...');
    await evalJs(`
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim().startsWith("460"));
      if (btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 500));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CHECK ANSWER'))?.click();`);
    await new Promise(r => setTimeout(r, 800));
    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CONTINUE'))?.click();`);
    await new Promise(r => setTimeout(r, 1500));

    // Now on Question 2: "True or False: 400 + 350 = 750."
    const q2Prompt = await evalJs(`document.querySelector('h4')?.innerText || ''`);
    console.log(`\nQuestion 2 Prompt: "${q2Prompt}"`);

    console.log('Intentionally clicking "False" (incorrect answer)...');
    await evalJs(`
      const falseBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'False');
      if (falseBtn) falseBtn.click();
    `);
    await new Promise(r => setTimeout(r, 500));

    await evalJs(`Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('CHECK ANSWER'))?.click();`);
    await new Promise(r => setTimeout(r, 800));

    const bodyTextAfterWrong = await evalJs(`document.body.innerText`);
    console.log('\nRendered Page Content on Wrong Answer:\n------------------------------------');
    console.log(bodyTextAfterWrong);
    console.log('------------------------------------');

    const hasNotQuite = bodyTextAfterWrong.includes("Not quite. Here's why:");
    const hasCorrectAnswerTrue = bodyTextAfterWrong.includes('Correct Answer: True');
    const hasExplanation = bodyTextAfterWrong.includes('4 hundreds + 3 hundreds');

    console.log(`Contains "Not quite. Here's why:": ${hasNotQuite ? '✅' : '❌'}`);
    console.log(`Contains "Correct Answer: True":   ${hasCorrectAnswerTrue ? '✅' : '❌'}`);
    console.log(`Contains Explanation text:        ${hasExplanation ? '✅' : '❌'}`);

    if (!hasNotQuite || !hasCorrectAnswerTrue) {
      throw new Error('Wrong answer feedback did not match expected labels!');
    }

    console.log('\n🎉 ALL REAL-BROWSER DIAGNOSTIC CHECK VERIFICATIONS COMPLETED SUCCESSFULLY (3/3 and Wrong Answer verified)!');
    ws.close();
  } finally {
    chrome.kill();
  }
}

runBrowserTest().catch(err => {
  console.error('Browser test failed:', err);
  process.exit(1);
});
