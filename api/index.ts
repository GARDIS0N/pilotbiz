import express from 'express';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json({ limit: '25mb' }));

// -------------------------------------------------------------
// Persistent Storage Helpers (Schedule & Accountability)
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const SCHEDULE_FILE = path.join(DATA_DIR, 'schedule.json');
const ACCOUNTABILITY_FILE = path.join(DATA_DIR, 'accountability.json');

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (_) {}
}

export function getScheduleData(): { items: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(SCHEDULE_FILE)) {
      return JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

export function saveScheduleData(data: { items: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write schedule.json:', err);
  }
}

export function getAccountabilityData(): any {
  try {
    ensureDataDir();
    if (fs.existsSync(ACCOUNTABILITY_FILE)) {
      return JSON.parse(fs.readFileSync(ACCOUNTABILITY_FILE, 'utf8'));
    }
  } catch (_) {}
  return {
    streak: 0,
    lastStreakDate: '',
    lastBriefedDate: '',
    checkIns: { morning: '08:30', midday: '13:00', evening: '20:00' },
    weeklyStats: { completed: 0, total: 0, rate: 0 },
    history: [],
  };
}

export function saveAccountabilityData(data: any) {
  try {
    ensureDataDir();
    fs.writeFileSync(ACCOUNTABILITY_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write accountability.json:', err);
  }
}

// -------------------------------------------------------------
// API Keys & Gemini Client
// -------------------------------------------------------------
let serverInMemoryApiKey = process.env.GEMINI_API_KEY || '';

function getApiKey(customKey?: string): string {
  return (customKey && customKey.trim()) || serverInMemoryApiKey || process.env.GEMINI_API_KEY || '';
}

function getGenAI(customKey?: string) {
  const key = getApiKey(customKey);
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// -------------------------------------------------------------
// Tool Declarations
// -------------------------------------------------------------
const searchWebTool: FunctionDeclaration = {
  name: 'search_web',
  description: 'Search Google and live web for breaking news, current facts, weather, real-time market data, or up-to-date events.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'The search query to look up on the live web',
      },
    },
    required: ['query'],
  },
};

const manageScheduleTool: FunctionDeclaration = {
  name: 'manage_schedule',
  description: 'Manage persistent monthly schedule: add, edit, delete, reschedule, list, or complete events and time blocks.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['add', 'update', 'delete', 'list', 'reschedule', 'complete'],
        description: 'Action to perform on schedule item',
      },
      title: { type: Type.STRING, description: 'Title or description of the scheduled event/task' },
      id: { type: Type.STRING, description: 'ID of schedule item when updating/deleting/rescheduling' },
      date: { type: Type.STRING, description: 'Date in YYYY-MM-DD format (or relative: today, tomorrow)' },
      time: { type: Type.STRING, description: 'Time in HH:MM format' },
      category: { type: Type.STRING, enum: ['work', 'personal', 'study', 'meeting', 'health', 'general'], description: 'Category' },
      newDate: { type: Type.STRING, description: 'New date when rescheduling' },
      newTime: { type: Type.STRING, description: 'New time when rescheduling' },
      reason: { type: Type.STRING, description: 'Reason for rescheduling if postponed' },
    },
    required: ['action'],
  },
};

const manageAccountabilityTool: FunctionDeclaration = {
  name: 'manage_accountability',
  description: 'Accountability tracker: morning check-in, midday check-in, evening review, slip count callouts, streaks, and weekly rate.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['get_stats', 'morning_checkin', 'midday_checkin', 'evening_review', 'mark_slip', 'record_streak'],
        description: 'Accountability action',
      },
      taskId: { type: Type.STRING, description: 'Task ID if reviewing specific item' },
      status: { type: Type.STRING, enum: ['completed', 'missed', 'postponed'], description: 'Task status' },
      rescheduledTime: { type: Type.STRING, description: 'Specific time to reschedule missed task to' },
    },
    required: ['action'],
  },
};

const toolsList = [searchWebTool, manageScheduleTool, manageAccountabilityTool];

// -------------------------------------------------------------
// System Instruction Builder with Repetition Guard
// -------------------------------------------------------------
function buildSystemInstruction(addressAs: string = 'boss') {
  return `You are JARVIS, my personal AI manager, executive strategist, and accountability partner.
Address me as "${addressAs}".
Always speak and respond in English only. Keep replies direct, concise, action-oriented, and spoken-friendly.

CRITICAL REPETITION GUARD:
- Never repeat information already stated in this conversation. Mention a topic only when it is relevant, scheduled, or the user asks.
- Never recite hardcoded or assumed schedules, companies, or tasks unprompted.

MONTHLY SCHEDULE & DAILY BRIEFING:
- The user's schedule is stored persistently. When asked to view, add, edit, reschedule, or delete schedule items, invoke manage_schedule.
- When delivering the daily briefing, summarize today's scheduled items and top priorities concisely.

ACCOUNTABILITY & DISCIPLINE:
- Be direct, firm, and encouraging. Never accept vague excuses.
- Conduct check-ins (morning, midday, evening).
- In evening reviews: ask what was finished, mark tasks as completed or missed, and firmly reschedule missed tasks to specific times.
- SLIP COUNT RULE: If a task has been postponed 3 or more times (slip count >= 3), firmly call the user out! Demand that they break it down into a 5-minute action or commit to an exact non-negotiable time right now.
- Track streaks and weekly completion rate.

LIVE INTERNET SEARCH:
- You have the search_web tool to look up latest info, news, weather, market data, and real-time facts.
- Decide autonomously when to search whenever a question requires current facts.
- Cite your sources with clear links.
- If live facts cannot be verified, say: "I was unable to verify this live data at the moment."`;
}

// -------------------------------------------------------------
// Real-Time Google Search Grounding & Web Fallback
// -------------------------------------------------------------
async function performGoogleSearch(query: string, customKey?: string): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  const key = getApiKey(customKey);
  if (key) {
    try {
      const response = await getGenAI(key).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Provide the latest comprehensive, up-to-date facts from Google Search for: "${query}". Include specific numbers, dates, and recent developments.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || `Search results retrieved for "${query}".`;
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = searchChunks
        .map((chunk: any) => ({
          title: chunk.web?.title || 'Google Search Source',
          url: chunk.web?.uri || '',
        }))
        .filter((s: any) => s.url);

      return { text, sources };
    } catch (genErr: any) {
      console.warn('[Google Search Notice]:', genErr?.message);
    }
  }

  // Fallback DuckDuckGo search
  try {
    const duckUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const res = await fetch(duckUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (res.ok) {
      const html = await res.text();
      const resultRegex = /<a class="result__url"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
      const sources: { title: string; url: string }[] = [];
      const snippets: string[] = [];
      let match;
      let count = 0;
      while ((match = resultRegex.exec(html)) !== null && count < 5) {
        let realUrl = match[1];
        const uddgMatch = realUrl.match(/uddg=([^&]+)/);
        if (uddgMatch) realUrl = decodeURIComponent(uddgMatch[1]);
        const title = match[2].replace(/<[^>]+>/g, '').trim();
        const snippet = match[3].replace(/<[^>]+>/g, '').trim();
        if (realUrl && title && snippet) {
          sources.push({ title, url: realUrl });
          snippets.push(`• **${title}**: ${snippet}`);
          count++;
        }
      }
      if (snippets.length > 0) {
        return {
          text: `Live web telemetry for "${query}":\n\n${snippets.join('\n\n')}`,
          sources,
        };
      }
    }
  } catch (_) {}

  return {
    text: `I was unable to verify live data for "${query}" at the moment.`,
    sources: [
      { title: `Google Search: ${query}`, url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
    ],
  };
}

// -------------------------------------------------------------
// Local Butler Engine (When API Key is Absent or Offline)
// -------------------------------------------------------------
function processLocalButlerDirective(prompt: string, addressAs: string = 'boss') {
  const lower = prompt.toLowerCase().trim();
  const functionCalls: any[] = [];
  let reply = '';

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const todayStr = now.toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const sched = getScheduleData();
  const acc = getAccountabilityData();
  const todayItems = sched.items.filter((it: any) => it.date === todayStr || it.date === 'today');

  // 1. Briefing
  if (lower.includes('brief me') || lower.includes('plan my day') || lower.includes('daily briefing')) {
    if (todayItems.length > 0) {
      const summaryList = todayItems.map((it: any) => `• ${it.time ? it.time + ' - ' : ''}${it.title} ${it.slipCount >= 3 ? '(⚠️ Postponed ' + it.slipCount + 'x)' : ''}`).join('\n');
      reply = `Good morning, ${addressAs}. It is ${timeStr}. You have ${todayItems.length} scheduled item(s) today:\n\n${summaryList}\n\nLet's lock in your non-negotiable Top 3.`;
    } else {
      reply = `Good morning, ${addressAs}. It is ${timeStr}. No events currently scheduled for today. What are your Top 3 priorities to conquer?`;
    }
  }
  // 2. Add to schedule
  else if (lower.startsWith('add ') || lower.includes('schedule ') || lower.startsWith('new event') || lower.includes('remind me to')) {
    let targetDate = todayStr;
    if (lower.includes('tomorrow')) {
      targetDate = tomorrowStr;
    } else {
      const dateMatch = prompt.match(/\b(\d{4}-\d{2}-\d{2})\b/);
      if (dateMatch) targetDate = dateMatch[1];
    }

    let targetTime = '';
    const timeMatch = prompt.match(/\b(\d{1,2}:\d{2}(?:\s*(?:am|pm))?|\d{1,2}\s*(?:am|pm))\b/i);
    if (timeMatch) targetTime = timeMatch[1];

    let cleanTitle = prompt
      .replace(/^add\s+/i, '')
      .replace(/to my schedule|on my schedule|to schedule/gi, '')
      .replace(/on \d{4}-\d{2}-\d{2}/gi, '')
      .replace(/tomorrow/gi, '')
      .replace(/today/gi, '')
      .replace(/at \d{1,2}:\d{2}(?:\s*(?:am|pm))?/gi, '')
      .replace(/at \d{1,2}\s*(?:am|pm)/gi, '')
      .replace(/schedule\s+/i, '')
      .trim();

    if (!cleanTitle) cleanTitle = 'Scheduled Event';

    const newItem = {
      id: `sch-${Date.now()}`,
      title: cleanTitle,
      date: targetDate,
      time: targetTime,
      category: 'work',
      completed: false,
      slipCount: 0,
      createdAt: new Date().toISOString(),
    };
    sched.items.push(newItem);
    saveScheduleData(sched);

    functionCalls.push({
      name: 'manage_schedule',
      args: { action: 'add', title: cleanTitle, date: targetDate, time: targetTime },
    });
    reply = `Event locked into your persistent schedule, ${addressAs}: "${cleanTitle}" on ${targetDate}${targetTime ? ' at ' + targetTime : ''}.`;
  }
  // 3. Reschedule
  else if (lower.startsWith('reschedule') || lower.includes('postpone')) {
    let targetDate = tomorrowStr;
    const dateMatch = prompt.match(/\b(\d{4}-\d{2}-\d{2})\b/);
    if (dateMatch) targetDate = dateMatch[1];

    let targetTime = '';
    const timeMatch = prompt.match(/\b(\d{1,2}:\d{2}(?:\s*(?:am|pm))?|\d{1,2}\s*(?:am|pm))\b/i);
    if (timeMatch) targetTime = timeMatch[1];

    let found = false;
    let slipWarning = '';
    sched.items = sched.items.map((it: any) => {
      if (!found && !it.completed) {
        found = true;
        const newSlip = (it.slipCount || 0) + 1;
        if (newSlip >= 3) {
          slipWarning = `\n\n⚠️ ALERT: This task has now been postponed ${newSlip} times! Break it down or commit to this exact time.`;
        }
        reply = `Rescheduled "${it.title}" to ${targetDate}${targetTime ? ' at ' + targetTime : ''}.${slipWarning}`;
        return { ...it, date: targetDate, time: targetTime || it.time, slipCount: newSlip };
      }
      return it;
    });

    if (found) {
      saveScheduleData(sched);
      functionCalls.push({ name: 'manage_schedule', args: { action: 'reschedule', newDate: targetDate, newTime: targetTime } });
    } else {
      reply = `I could not locate an uncompleted schedule item to reschedule, ${addressAs}.`;
    }
  }
  // 4. View Schedule
  else if (lower.includes('schedule') && (lower.includes('show') || lower.includes('view') || lower.includes('what') || lower.includes('list'))) {
    if (sched.items.length === 0) {
      reply = `Your schedule is currently empty, ${addressAs}. You can add items by chatting or uploading a schedule file (.json, .csv, .ics).`;
    } else {
      const listStr = sched.items.slice(0, 8).map((it: any) => `• [${it.date}${it.time ? ' ' + it.time : ''}] ${it.title} ${it.slipCount >= 3 ? '(⚠️ Postponed ' + it.slipCount + 'x)' : ''}`).join('\n');
      reply = `Here is your upcoming schedule, ${addressAs}:\n\n${listStr}`;
    }
  }
  // 5. Morning Check-In
  else if (lower.includes('morning check-in') || lower.includes('morning check in')) {
    reply = `Morning check-in initiated, ${addressAs}. Current streak: ${acc.streak || 0} days. Weekly completion rate: ${acc.weeklyStats?.rate || 0}%. Let's lock in your Top 3 non-negotiable priorities for today.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'morning_checkin' } });
  }
  // 6. Midday Check-In
  else if (lower.includes('midday check-in') || lower.includes('midday check in')) {
    reply = `Midday check-in, ${addressAs}. Review your morning priorities. Are any tasks slipping? No excuses — execute the next action.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'midday_checkin' } });
  }
  // 7. Evening Review
  else if (lower.includes('evening review') || lower.includes('review my day')) {
    reply = `Ready for your evening review, ${addressAs}. What tasks did you conquer today, and what needs to be rescheduled? Remember: no vague excuses.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'evening_review' } });
  }
  // 8. Streak & Score
  else if (lower.includes('streak') || lower.includes('score') || lower.includes('completion rate')) {
    reply = `Discipline Telemetry, ${addressAs}:\n• Current Streak: ${acc.streak || 0} days\n• Weekly Completion Rate: ${acc.weeklyStats?.rate || 0}%\n• Completed Tasks: ${acc.weeklyStats?.completed || 0}/${acc.weeklyStats?.total || 0}\n\nKeep pushing. Consistency compounds.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'get_stats' } });
  }
  // 9. Live Web Search
  else if (
    lower.startsWith('search') ||
    lower.startsWith('google') ||
    lower.includes('latest news') ||
    lower.includes('weather') ||
    lower.includes('who is') ||
    lower.includes('what is the latest') ||
    lower.includes('search web') ||
    lower.includes('search google')
  ) {
    const cleanQuery = prompt.replace(/^(search for|search the web for|search google for|search|google)\s*/i, '').trim() || prompt;
    functionCalls.push({ name: 'search_web', args: { query: cleanQuery } });
    reply = `Executing real-time search for "${cleanQuery}", ${addressAs}...`;
  } else {
    reply = `At your service, ${addressAs}. How can I assist you with your schedule, check-ins, or web research right now?`;
  }

  return { reply, functionCalls, sources: [] };
}

// -------------------------------------------------------------
// REST Endpoints
// -------------------------------------------------------------

// Schedule endpoint
app.get('/api/jarvis/schedule', (_req, res) => {
  res.json(getScheduleData());
});

app.post('/api/jarvis/schedule', (req, res) => {
  try {
    const { action, item, id, items } = req.body;
    const sched = getScheduleData();

    if (action === 'batch_upload' && Array.isArray(items)) {
      sched.items = [...sched.items, ...items];
      saveScheduleData(sched);
      return res.json({ success: true, count: items.length, items: sched.items });
    }

    if (action === 'add' && item) {
      const newItem = {
        id: item.id || `sch-${Date.now()}`,
        title: item.title,
        date: item.date || new Date().toISOString().split('T')[0],
        time: item.time || '',
        category: item.category || 'general',
        completed: false,
        slipCount: 0,
        createdAt: new Date().toISOString(),
      };
      sched.items.push(newItem);
      saveScheduleData(sched);
      return res.json({ success: true, item: newItem });
    }

    if (action === 'update' && item && item.id) {
      sched.items = sched.items.map((it: any) => (it.id === item.id ? { ...it, ...item } : it));
      saveScheduleData(sched);
      return res.json({ success: true, items: sched.items });
    }

    if (action === 'delete' && id) {
      sched.items = sched.items.filter((it: any) => it.id !== id);
      saveScheduleData(sched);
      return res.json({ success: true, items: sched.items });
    }

    if (action === 'reschedule' && id) {
      const { newDate, newTime } = req.body;
      sched.items = sched.items.map((it: any) => {
        if (it.id === id) {
          const updatedSlip = (it.slipCount || 0) + 1;
          return {
            ...it,
            date: newDate || it.date,
            time: newTime !== undefined ? newTime : it.time,
            slipCount: updatedSlip,
          };
        }
        return it;
      });
      saveScheduleData(sched);
      return res.json({ success: true, items: sched.items });
    }

    if (action === 'complete' && id) {
      sched.items = sched.items.map((it: any) => (it.id === id ? { ...it, completed: true } : it));
      saveScheduleData(sched);
      return res.json({ success: true, items: sched.items });
    }

    res.json(sched);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Schedule error' });
  }
});

// Accountability endpoint
app.get('/api/jarvis/accountability', (_req, res) => {
  res.json(getAccountabilityData());
});

app.post('/api/jarvis/accountability', (req, res) => {
  try {
    const current = getAccountabilityData();
    const updated = { ...current, ...req.body };
    saveAccountabilityData(updated);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Accountability error' });
  }
});

// Search endpoint
app.post('/api/jarvis/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });
    const result = await performGoogleSearch(query);
    res.json(result);
  } catch (error: any) {
    res.json({ text: `Search completed for "${req.body?.query || ''}".`, sources: [] });
  }
});

// Set key endpoint
app.post('/api/jarvis/set-key', (req, res) => {
  const { apiKey } = req.body;
  if (typeof apiKey === 'string') {
    serverInMemoryApiKey = apiKey.trim();
  }
  res.json({ success: true, hasKey: !!getApiKey() });
});

// Status endpoint
app.get('/api/jarvis/status', (_req, res) => {
  res.json({
    online: true,
    hasApiKey: !!getApiKey(),
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint with tools & grounding
app.post('/api/jarvis/chat', async (req, res) => {
  try {
    const {
      prompt,
      imageBase64,
      imageMimeType,
      addressAs = 'boss',
      apiKey: customKey,
      conversationHistory = [],
    } = req.body;

    const key = getApiKey(customKey);
    const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
    if (!isValidKey) {
      const localResult = processLocalButlerDirective(prompt || '', addressAs);
      const searchCall = localResult.functionCalls.find((fc: any) => fc.name === 'search_web');
      if (searchCall) {
        const liveSearch = await performGoogleSearch(searchCall.args.query, key);
        return res.json({
          reply: `Here are the latest findings, ${addressAs}:\n\n${liveSearch.text}`,
          functionCalls: localResult.functionCalls,
          sources: liveSearch.sources,
        });
      }
      return res.json(localResult);
    }

    const systemInstruction = buildSystemInstruction(addressAs);
    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType || 'image/jpeg',
          data: imageBase64,
        },
      });
    }
    parts.push({ text: prompt || 'Analyze this, please.' });

    // Format conversation history cleanly (avoid duplicating current prompt)
    const contents: any[] = [];
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      for (const msg of conversationHistory.slice(-6)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({ role: 'user', parts });

    let response = await getGenAI(key).models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        tools: [{ functionDeclarations: toolsList }],
      },
    });

    let replyText = response.text || '';
    const functionCalls = response.functionCalls || [];
    let sources: any[] = [];

    // Handle tool calls
    for (const call of functionCalls) {
      if (call.name === 'search_web') {
        const searchQuery = String((call.args as any)?.query || prompt);
        const searchResult = await performGoogleSearch(searchQuery, key);
        sources = searchResult.sources || [];

        contents.push({ role: 'model', parts: [{ functionCall: call }] });
        contents.push({
          role: 'tool',
          parts: [{
            functionResponse: {
              name: 'search_web',
              response: { result: searchResult.text, sources: searchResult.sources },
            },
          }],
        });

        try {
          const groundedResponse = await getGenAI(key).models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: { systemInstruction, temperature: 0.7 },
          });
          replyText = groundedResponse.text || searchResult.text;
        } catch (_) {
          replyText = searchResult.text;
        }
      } else if (call.name === 'manage_schedule') {
        const { action, title, date, time, category, id, newDate, newTime } = call.args as any;
        const sched = getScheduleData();
        let toolResponseMsg = '';

        if (action === 'add') {
          const newItem = {
            id: `sch-${Date.now()}`,
            title: title || 'Scheduled Event',
            date: date || new Date().toISOString().split('T')[0],
            time: time || '',
            category: category || 'work',
            completed: false,
            slipCount: 0,
            createdAt: new Date().toISOString(),
          };
          sched.items.push(newItem);
          saveScheduleData(sched);
          toolResponseMsg = `Event added: "${newItem.title}" on ${newItem.date}${newItem.time ? ' at ' + newItem.time : ''}.`;
        } else if (action === 'reschedule') {
          let found = false;
          sched.items = sched.items.map((it: any) => {
            if ((id && it.id === id) || (title && it.title.toLowerCase().includes(title.toLowerCase()))) {
              found = true;
              const newSlip = (it.slipCount || 0) + 1;
              const warning = newSlip >= 3 ? `ALERT: This task has now been postponed ${newSlip} times! Break it down or commit.` : '';
              toolResponseMsg = `Rescheduled "${it.title}" to ${newDate || it.date} ${newTime || it.time}. ${warning}`;
              return { ...it, date: newDate || it.date, time: newTime || it.time, slipCount: newSlip };
            }
            return it;
          });
          if (found) saveScheduleData(sched);
        } else if (action === 'complete') {
          sched.items = sched.items.map((it: any) => {
            if ((id && it.id === id) || (title && it.title.toLowerCase().includes(title.toLowerCase()))) {
              toolResponseMsg = `Marked "${it.title}" as completed.`;
              return { ...it, completed: true };
            }
            return it;
          });
          saveScheduleData(sched);
        } else if (action === 'delete') {
          sched.items = sched.items.filter((it: any) => !(id && it.id === id) && !(title && it.title.toLowerCase().includes(title.toLowerCase())));
          saveScheduleData(sched);
          toolResponseMsg = `Schedule item removed.`;
        } else if (action === 'list') {
          toolResponseMsg = `Current schedule contains ${sched.items.length} items: ${JSON.stringify(sched.items.slice(0, 8))}`;
        }

        contents.push({ role: 'model', parts: [{ functionCall: call }] });
        contents.push({
          role: 'tool',
          parts: [{
            functionResponse: {
              name: 'manage_schedule',
              response: { result: toolResponseMsg || 'Schedule updated.' },
            },
          }],
        });

        try {
          const postToolRes = await getGenAI(key).models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: { systemInstruction, temperature: 0.7 },
          });
          replyText = postToolRes.text || replyText;
        } catch (_) {}
      }
    }

    res.json({ reply: replyText, functionCalls, sources });
  } catch (error: any) {
    const addressAs = req.body.addressAs || 'boss';
    const fallbackResult = processLocalButlerDirective(req.body.prompt || '', addressAs);
    const searchCall = fallbackResult.functionCalls.find((fc: any) => fc.name === 'search_web');
    if (searchCall) {
      const liveSearch = await performGoogleSearch(searchCall.args.query);
      return res.json({
        reply: `Here are the latest findings, ${addressAs}:\n\n${liveSearch.text}`,
        functionCalls: fallbackResult.functionCalls,
        sources: liveSearch.sources,
      });
    }
    res.json(fallbackResult);
  }
});

// TTS endpoint
app.post('/api/jarvis/tts', async (req, res) => {
  res.json({
    audioBase64: null,
    useClientSynthesis: true,
    text: req.body?.text || '',
  });
});

export default app;
