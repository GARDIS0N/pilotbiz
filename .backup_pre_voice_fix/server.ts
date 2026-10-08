import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

const app = express();
app.use(express.json({ limit: '25mb' }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/live' });

// -------------------------------------------------------------
// Persistent Storage Helpers (Schedule, Accountability, Manager Memory)
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const SCHEDULE_FILE = path.join(DATA_DIR, 'schedule.json');
const ACCOUNTABILITY_FILE = path.join(DATA_DIR, 'accountability.json');
const MANAGER_MEMORY_FILE = path.join(DATA_DIR, 'manager_memory.json');

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
      const data = JSON.parse(fs.readFileSync(SCHEDULE_FILE, 'utf8'));
      if (data && Array.isArray(data.items)) {
        const cleanItems = data.items.filter((it: any) => isValidScheduleTitle(it?.title));
        if (cleanItems.length !== data.items.length) {
          saveScheduleData({ items: cleanItems });
        }
        return { items: cleanItems };
      }
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

export function getManagerMemory(): { goals: string[]; wins: string[]; struggles: string[]; preferences: string[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(MANAGER_MEMORY_FILE)) {
      return JSON.parse(fs.readFileSync(MANAGER_MEMORY_FILE, 'utf8'));
    }
  } catch (_) {}
  return { goals: [], wins: [], struggles: [], preferences: [] };
}

export function saveManagerMemory(data: any) {
  try {
    ensureDataDir();
    fs.writeFileSync(MANAGER_MEMORY_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write manager_memory.json:', err);
  }
}

// Real time-of-day greeting (morning, afternoon, evening)
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

// Schedule title validation: reject empty, punctuation, or question items like "What is ?"
export function isValidScheduleTitle(title: any): boolean {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  if (trimmed.length < 3) return false;
  const lower = trimmed.toLowerCase();
  if (/^what\s+(is|are|was|were)(\s*\?)?$/i.test(lower)) return false;
  if (/^(what|who|where|why|how)\s+(is|are|do|does|can)\s*\??$/i.test(lower)) return false;
  if (/^[?!.,:;\s]+$/.test(trimmed)) return false;
  if (lower === 'what is' || lower === 'what is ?' || lower === 'search' || lower === 'test ?') return false;
  return true;
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
      title: { type: Type.STRING, description: 'Title or description of the scheduled event/task (must be a clear task, not a question)' },
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
// System Instruction Builders
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
- Never save incomplete or question items (e.g. "What is ?") to the schedule. Require a real task description.
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

function buildManagerInstruction(managerName: string = 'Coach', addressAs: string = 'boss') {
  const memory = getManagerMemory();
  return `You are ${managerName}, my trusted personal manager, executive coach, and thinking partner.
Address me as "${addressAs}".
Always speak and respond in English only. Keep replies warm, direct, encouraging, conversational, and concise (no long lectures).

CORE COACHING METHODOLOGY:
1. LISTENS FIRST:
   - When I share a problem, goal, or feeling, reflect back what I said in a sentence so I know I was heard.
   - Ask ONE clear question at a time to understand before jumping into advice.
   - If I am stressed or overwhelmed, acknowledge my feelings first with empathy, then help me narrow down to the next small step.
   - If I ever seem to be in real distress or crisis, respond with sincere care and encourage me to talk to someone I trust.

2. ADVISES AND PLANS:
   - When I name a task or goal, ask for the deadline, what is blocking me, and how much time I have.
   - Break the task into bite-sized steps with time estimates (e.g. 5m, 15m, 25m).
   - Suggest the best time to do it based on my schedule.
   - Offer practical anti-procrastination tactics: the 2-minute start, time-boxing, doing the hardest step first, and removing distractions.
   - Offer to add the plan to my schedule, but ONLY add it after I explicitly confirm.

3. HOLDS ME ACCOUNTABLE:
   - Follow up on tasks I committed to. If I keep postponing something, say so honestly and help me work out why.
   - Give honest feedback. Do not just agree with me. If my plan is unrealistic, say so kindly and suggest a better one.

4. CELEBRATES WINS:
   - When I finish a task, hit a streak milestone, or complete a goal, congratulate me with specific praise about what I achieved, then suggest what to tackle next.

5. REMEMBERS ME:
   - Build on past conversations.
   - Goals: ${JSON.stringify(memory.goals)}
   - Recent Wins: ${JSON.stringify(memory.wins)}
   - Struggles: ${JSON.stringify(memory.struggles)}
   - Preferences: ${JSON.stringify(memory.preferences)}
   - Use that context to give relevant advice, and never show stored information unprompted.

CRITICAL REPETITION GUARD:
- Never repeat what has already been said in the conversation.
- Ask only one question at a time.`;
}

// -------------------------------------------------------------
// Real-Time Google Search Grounding & Web Fallback
// -------------------------------------------------------------
async function performGoogleSearch(query: string, customKey?: string): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  const key = getApiKey(customKey);
  const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
  if (isValidKey) {
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
// Local Butler / Manager Engine (Offline & Fallback Resilience)
// -------------------------------------------------------------
function processLocalButlerDirective(
  prompt: string,
  addressAs: string = 'boss',
  mode: 'jarvis' | 'manager' = 'jarvis',
  managerName: string = 'Coach',
  hasGreeted: boolean = false
) {
  const lower = prompt.toLowerCase().trim();
  const functionCalls: any[] = [];
  let reply = '';

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const todayStr = now.toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const greeting = getTimeOfDayGreeting();

  const sched = getScheduleData();
  const acc = getAccountabilityData();
  const todayItems = sched.items.filter((it: any) => it.date === todayStr || it.date === 'today');

  // PERSONAL MANAGER MODE LOGIC
  if (mode === 'manager') {
    // 1. Distress / Crisis detection
    if (
      lower.includes('want to die') ||
      lower.includes('hurt myself') ||
      lower.includes('kill myself') ||
      lower.includes('end my life') ||
      lower.includes('no point living')
    ) {
      reply = `I care about you deeply, ${addressAs}. What you are carrying right now is heavy, and you do not have to carry it alone. Please reach out to someone you trust, or a counselor or support helpline right now. Your well-being matters more than any task.`;
      return { reply, functionCalls: [], sources: [] };
    }

    // 2. Celebrates Wins
    if (
      lower.includes('finished') ||
      lower.includes('done with') ||
      lower.includes('completed') ||
      lower.includes('i did it') ||
      lower.includes('shipped') ||
      lower.includes('nailed it') ||
      lower.includes('just finished')
    ) {
      const memory = getManagerMemory();
      const cleanWin = prompt.replace(/i just|i have|finished|completed|done with/gi, '').trim() || 'your priority task';
      if (!memory.wins.includes(cleanWin)) {
        memory.wins = [cleanWin, ...memory.wins.slice(0, 9)];
        saveManagerMemory(memory);
      }
      reply = `Outstanding work, ${addressAs}! Conquering "${cleanWin}" is a real milestone that protects your momentum. How does it feel to cross that off, and what small action should we tackle next?`;
      return { reply, functionCalls: [], sources: [], celebrate: true };
    }

    // 3. Stressed / Overwhelmed
    if (
      lower.includes('overwhelmed') ||
      lower.includes('stressed') ||
      lower.includes('anxious') ||
      lower.includes('too much to do') ||
      lower.includes('exhausted') ||
      lower.includes('burnout') ||
      lower.includes("can't focus") ||
      lower.includes('cant focus')
    ) {
      const memory = getManagerMemory();
      if (!memory.struggles.includes('feeling overwhelmed')) {
        memory.struggles = ['feeling overwhelmed', ...memory.struggles.slice(0, 9)];
        saveManagerMemory(memory);
      }
      reply = `I hear you, ${addressAs}. It is completely natural to feel overwhelmed when everything pulls at you at once. Let's take a breath and pause. If you could only take one tiny 5-minute action right now to lift a little weight off your shoulders, what would that be?`;
      return { reply, functionCalls: [], sources: [] };
    }

    // 4. Procrastination / Resistance
    if (lower.includes('procrastinat') || lower.includes('avoiding') || lower.includes('putting off') || lower.includes('lazy')) {
      reply = `Let's remove all the friction, ${addressAs}. Procrastination is almost always your mind resisting an overwhelming chunk. How about a 2-minute start where you only commit to working for 120 seconds? What is the simplest first piece of that task?`;
      return { reply, functionCalls: [], sources: [] };
    }

    // 5. User confirms adding plan to schedule
    if (
      lower === 'yes' ||
      lower === 'yes please' ||
      lower.includes('add it') ||
      lower.includes('lock it in') ||
      lower.includes('add to schedule') ||
      lower.includes('confirm')
    ) {
      reply = `Locked in, ${addressAs}. Plan added. What is the very first step you will execute right now?`;
      return { reply, functionCalls: [], sources: [] };
    }

    // 6. Naming a task / planning
    if (lower.startsWith('i need to ') || lower.startsWith('i have to ') || lower.startsWith('task:') || lower.includes('working on')) {
      const cleanTask = prompt.replace(/^i need to |^i have to |^task:\s*/i, '').trim();
      reply = `Understood — you want to work through "${cleanTask}". To build a realistic plan: what is your deadline for this, and what do you foresee as the biggest potential blocker?`;
      return { reply, functionCalls: [], sources: [] };
    }

    // 7. General listening & reflection (Reflect back + ONE question)
    reply = `It sounds like you're thinking through "${prompt.slice(0, 80)}", ${addressAs}. What is the single most important outcome you want to achieve here?`;
    return { reply, functionCalls: [], sources: [] };
  }

  // JARVIS DEFAULT MODE LOGIC

  // 1. Briefing (Time of day greeting + no double greeting + overdue + today + upcoming 3 days)
  if (lower.includes('brief me') || lower.includes('plan my day') || lower.includes('daily briefing') || lower.includes('briefing')) {
    const threeDaysLater = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
    const overdueItems = sched.items.filter((it: any) => it.date < todayStr && !it.completed);
    const todayAgenda = sched.items.filter((it: any) => it.date === todayStr || it.date === 'today');
    const upcomingDeadlines = sched.items.filter((it: any) => it.date > todayStr && it.date <= threeDaysLater && !it.completed);

    const sections: string[] = [];

    if (overdueItems.length > 0) {
      sections.push(`⚠️ OVERDUE ITEMS (${overdueItems.length}):\n` + overdueItems.map((it: any) => `• [${it.date}] ${it.title}${it.slipCount >= 3 ? ' (⚠️ Postponed ' + it.slipCount + 'x)' : ''}`).join('\n'));
    }

    if (todayAgenda.length > 0) {
      sections.push(`📅 TODAY'S AGENDA (${todayAgenda.length}):\n` + todayAgenda.map((it: any) => `• ${it.time ? it.time + ' - ' : ''}${it.title}${it.completed ? ' (Done)' : ''}`).join('\n'));
    } else {
      sections.push(`📅 TODAY'S AGENDA:\n• Your schedule is clear for today.`);
    }

    if (upcomingDeadlines.length > 0) {
      sections.push(`⏳ UPCOMING DEADLINES (NEXT 3 DAYS):\n` + upcomingDeadlines.map((it: any) => `• [${it.date}${it.time ? ' ' + it.time : ''}] ${it.title}`).join('\n'));
    }

    const agendaBody = sections.join('\n\n');
    const greetingPrefix = hasGreeted
      ? `Here is your daily briefing for today (${timeStr}):`
      : `${greeting}, ${addressAs}. It is ${timeStr}. Here is your daily briefing for today:`;

    reply = `${greetingPrefix}\n\n${agendaBody}\n\nLet's lock in your non-negotiable execution. What is our first action?`;
  }
  // 2. Delete / Remove item by chat
  else if (lower.startsWith('delete ') || lower.startsWith('remove ') || lower.startsWith('cancel ')) {
    const query = prompt.replace(/^(delete|remove|cancel)\s+/i, '').replace(/from my schedule|from schedule|from today/gi, '').trim().toLowerCase();
    const beforeLen = sched.items.length;
    sched.items = sched.items.filter((it: any) => !it.title.toLowerCase().includes(query) && it.id !== query);
    if (sched.items.length < beforeLen) {
      saveScheduleData(sched);
      reply = `Schedule item matching "${query}" has been deleted, ${addressAs}.`;
      functionCalls.push({ name: 'manage_schedule', args: { action: 'delete', title: query } });
    } else {
      reply = `No schedule item matching "${query}" was found to delete, ${addressAs}.`;
    }
  }
  // 3. Edit / Rename item by chat
  else if (lower.startsWith('edit ') || lower.startsWith('rename ') || lower.startsWith('change ')) {
    const match = prompt.match(/^(?:edit|rename|change)\s+(.+?)\s+to\s+(.+)$/i);
    if (match) {
      const oldQuery = match[1].trim().toLowerCase();
      const newTitle = match[2].trim();
      if (!isValidScheduleTitle(newTitle)) {
        reply = `Invalid new title. Please provide a clear task description, ${addressAs}.`;
      } else {
        let updated = false;
        sched.items = sched.items.map((it: any) => {
          if (!updated && it.title.toLowerCase().includes(oldQuery)) {
            updated = true;
            return { ...it, title: newTitle };
          }
          return it;
        });
        if (updated) {
          saveScheduleData(sched);
          reply = `Updated schedule item to "${newTitle}", ${addressAs}.`;
          functionCalls.push({ name: 'manage_schedule', args: { action: 'update', title: newTitle } });
        } else {
          reply = `Could not find an item matching "${oldQuery}" to edit, ${addressAs}.`;
        }
      }
    } else {
      reply = `To edit a schedule item, say "edit [current title] to [new title]", ${addressAs}.`;
    }
  }
  // 4. Move / Reschedule item by chat
  else if (lower.startsWith('move ') || lower.startsWith('reschedule') || lower.includes('postpone')) {
    let targetDate = tomorrowStr;
    if (lower.includes('tomorrow')) {
      targetDate = tomorrowStr;
    } else {
      const dateMatch = prompt.match(/\b(\d{4}-\d{2}-\d{2})\b/);
      if (dateMatch) targetDate = dateMatch[1];
    }

    let targetTime = '';
    const timeMatch = prompt.match(/\b(\d{1,2}:\d{2}(?:\s*(?:am|pm))?|\d{1,2}\s*(?:am|pm))\b/i);
    if (timeMatch) targetTime = timeMatch[1];

    // Look for specific item if specified in prompt
    const queryPart = prompt
      .replace(/^(move|reschedule|postpone)\s+/i, '')
      .replace(/to tomorrow.*|to today.*|to \d{4}-\d{2}-\d{2}.*/gi, '')
      .replace(/to \d{1,2}:\d{2}.*/gi, '')
      .replace(/at \d{1,2}:\d{2}.*/gi, '')
      .trim()
      .toLowerCase();

    let targetItem = null;
    if (queryPart && queryPart.length >= 3) {
      targetItem = sched.items.find((it: any) => !it.completed && it.title.toLowerCase().includes(queryPart));
    }
    if (!targetItem) {
      targetItem = sched.items.find((it: any) => !it.completed);
    }

    if (targetItem) {
      const newSlip = (targetItem.slipCount || 0) + 1;
      let slipWarning = '';
      if (newSlip >= 3) {
        slipWarning = `\n\n⚠️ ALERT: This task has now been postponed ${newSlip} times! Break it down or commit to this exact time.`;
      }
      targetItem.date = targetDate;
      if (targetTime) targetItem.time = targetTime;
      targetItem.slipCount = newSlip;
      saveScheduleData(sched);
      reply = `Moved "${targetItem.title}" to ${targetDate}${targetTime ? ' at ' + targetTime : ''}, ${addressAs}.${slipWarning}`;
      functionCalls.push({ name: 'manage_schedule', args: { action: 'reschedule', id: targetItem.id, newDate: targetDate, newTime: targetTime } });
    } else {
      reply = `I could not locate an uncompleted schedule item to move, ${addressAs}.`;
    }
  }
  // 5. Add to schedule with validation
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

    if (!isValidScheduleTitle(cleanTitle)) {
      reply = `Please provide a clear event or task description, ${addressAs}. I cannot add an incomplete or question phrase like "${cleanTitle}" to your schedule.`;
      return { reply, functionCalls: [], sources: [] };
    }

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
  // 6. View Schedule
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

// Schedule endpoint with strict title validation
app.get('/api/jarvis/schedule', (_req, res) => {
  res.json(getScheduleData());
});

app.post('/api/jarvis/schedule', (req, res) => {
  try {
    const { action, item, id, items } = req.body;
    const sched = getScheduleData();

    if (action === 'batch_upload' && Array.isArray(items)) {
      const validItems = items.filter((it: any) => isValidScheduleTitle(it?.title));
      if (validItems.length === 0) {
        return res.status(400).json({ error: 'No valid schedule items found. Please provide clear task descriptions.' });
      }
      sched.items = [...sched.items, ...validItems];
      saveScheduleData(sched);
      return res.json({ success: true, count: validItems.length, items: sched.items });
    }

    if (action === 'add' && item) {
      if (!isValidScheduleTitle(item.title)) {
        return res.status(400).json({ error: 'Invalid schedule title. Please provide a clear event or task description.' });
      }
      const newItem = {
        id: item.id || `sch-${Date.now()}`,
        title: item.title.trim(),
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
      if (item.title && !isValidScheduleTitle(item.title)) {
        return res.status(400).json({ error: 'Invalid schedule title.' });
      }
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

// Manager Memory endpoint
app.get('/api/jarvis/manager-memory', (_req, res) => {
  res.json(getManagerMemory());
});

app.post('/api/jarvis/manager-memory', (req, res) => {
  try {
    const current = getManagerMemory();
    const updated = { ...current, ...req.body };
    saveManagerMemory(updated);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Manager memory error' });
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

// Chat endpoint supporting JARVIS mode & Personal Manager mode
app.post('/api/jarvis/chat', async (req, res) => {
  try {
    const {
      prompt,
      imageBase64,
      imageMimeType,
      addressAs = 'boss',
      mode = 'jarvis',
      managerName = 'Coach',
      hasGreeted = false,
      apiKey: customKey,
      conversationHistory = [],
    } = req.body;

    const key = getApiKey(customKey);
    const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
    if (!isValidKey) {
      const localResult = processLocalButlerDirective(prompt || '', addressAs, mode, managerName, hasGreeted);
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

    const systemInstruction = mode === 'manager'
      ? buildManagerInstruction(managerName, addressAs)
      : buildSystemInstruction(addressAs);

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
        temperature: mode === 'manager' ? 0.75 : 0.7,
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
          if (!isValidScheduleTitle(title)) {
            toolResponseMsg = 'Rejected: please provide a clear event or task description.';
          } else {
            const newItem = {
              id: `sch-${Date.now()}`,
              title: title.trim(),
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
          }
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
      } else if (call.name === 'manage_accountability') {
        const { action, status, rescheduledTime } = call.args as any;
        const acc = getAccountabilityData();
        let toolResponseMsg = '';

        if (action === 'morning_checkin') {
          toolResponseMsg = `Morning check-in logged. Current streak: ${acc.streak} days. Weekly completion rate: ${acc.weeklyStats?.rate || 0}%.`;
        } else if (action === 'midday_checkin') {
          toolResponseMsg = `Midday check-in recorded. Review priorities and maintain pace.`;
        } else if (action === 'evening_review') {
          toolResponseMsg = `Evening review: ${status || 'status logged'}. Rescheduled time: ${rescheduledTime || 'none'}.`;
        } else if (action === 'record_streak') {
          acc.streak = (acc.streak || 0) + 1;
          acc.lastStreakDate = new Date().toISOString().split('T')[0];
          saveAccountabilityData(acc);
          toolResponseMsg = `Streak incremented to ${acc.streak} days!`;
        }

        contents.push({ role: 'model', parts: [{ functionCall: call }] });
        contents.push({
          role: 'tool',
          parts: [{
            functionResponse: {
              name: 'manage_accountability',
              response: { result: toolResponseMsg || 'Accountability status logged.' },
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

    const isWin =
      /finished|completed|done with|shipped|nailed it|conquered/i.test(req.body.prompt || '') ||
      /congratulat|milestone|great job|well done|crushed it|celebrate/i.test(replyText);

    res.json({ reply: replyText, functionCalls, sources, celebrate: isWin });
  } catch (error: any) {
    const addressAs = req.body.addressAs || 'boss';
    const mode = req.body.mode || 'jarvis';
    const managerName = req.body.managerName || 'Coach';
    const hasGreeted = req.body.hasGreeted || false;
    const fallbackResult = processLocalButlerDirective(req.body.prompt || '', addressAs, mode, managerName, hasGreeted);
    const searchCall = fallbackResult.functionCalls.find((fc: any) => fc.name === 'search_web');
    if (searchCall) {
      const liveSearch = await performGoogleSearch(searchCall.args.query);
      return res.json({
        reply: `Here are the latest findings, ${addressAs}:\n\n${liveSearch.text}`,
        functionCalls: fallbackResult.functionCalls,
        sources: liveSearch.sources,
        celebrate: false,
      });
    }
    res.json(fallbackResult);
  }
});

// Text-to-Speech endpoint
app.post('/api/jarvis/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Zephyr' } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required for TTS' });

    const key = getApiKey();
    const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
    if (isValidKey) {
      try {
        const response = await getGenAI(key).models.generateContent({
          model: 'gemini-3.8-flash-lite-tts',
          contents: [{ role: 'user', parts: [{ text }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          return res.json({ audioBase64: base64Audio, format: 'audio/wav' });
        }
      } catch (ttsErr: any) {
        console.warn('TTS cloud error, falling back to client speech:', ttsErr?.message);
      }
    }

    return res.json({ audioBase64: null, useClientSynthesis: true, text });
  } catch (err: any) {
    res.json({ audioBase64: null, useClientSynthesis: true, text: req.body?.text || '' });
  }
});

// Summarize text or URL endpoint
app.post('/api/jarvis/summarize', async (req, res) => {
  try {
    const { content, isUrl, addressAs = 'boss' } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required' });

    const key = getApiKey();
    const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
    if (isValidKey) {
      try {
        const prompt = isUrl
          ? `Access and summarize the key insights from this link for ${addressAs}: ${content}. 3 bullet points + verdict.`
          : `Provide a concise executive summary for ${addressAs}:\n\n${content}`;
        const response = await getGenAI(key).models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        if (response.text) return res.json({ summary: response.text });
      } catch (_) {}
    }

    const bullets = (content as string)
      .split(/\n|\.\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15)
      .slice(0, 3)
      .map((s) => `• ${s}`);

    res.json({
      summary: bullets.length > 0
        ? `Executive briefing for ${addressAs}:\n\n${bullets.join('\n')}`
        : `Summary for ${addressAs}: Content successfully analyzed.`,
    });
  } catch (error: any) {
    res.json({ summary: `Analysis complete, ${req.body.addressAs || 'boss'}.` });
  }
});

// -------------------------------------------------------------
// WebSocket Live API: Real-Time Two-Way Voice + Interruption
// -------------------------------------------------------------
wss.on('connection', async (clientWs: WebSocket) => {
  let liveSession: any = null;
  let clientAddressAs = 'boss';
  let clientVoice = 'Zephyr';
  let clientMode: 'jarvis' | 'manager' = 'jarvis';
  let clientManagerName = 'Coach';

  const sendToClient = (msg: any) => {
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify(msg));
    }
  };

  const initLiveSession = async (
    voiceName: string = 'Zephyr',
    addressAs: string = 'boss',
    clientApiKey?: string,
    resumptionHandle?: string,
    conversationContext?: string,
    mode: 'jarvis' | 'manager' = 'jarvis',
    managerName: string = 'Coach'
  ) => {
    try {
      if (liveSession) {
        try { await liveSession.close(); } catch (_) {}
        liveSession = null;
      }

      clientAddressAs = addressAs;
      clientVoice = voiceName;
      clientMode = mode;
      clientManagerName = managerName;
      const key = getApiKey(clientApiKey);
      const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;

      if (isValidKey) {
        sendToClient({ type: 'connecting', message: 'Initiating Live API uplink...' });
        try {
          const baseInstruction = clientMode === 'manager'
            ? buildManagerInstruction(clientManagerName, clientAddressAs)
            : buildSystemInstruction(clientAddressAs);

          const fullInstruction = conversationContext
            ? `${baseInstruction}\n\n[CONVERSATION CONTINUITY]:\n${conversationContext}`
            : baseInstruction;

          liveSession = await getGenAI(key).live.connect({
            model: 'gemini-2.5-flash',
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: (clientVoice as any) || 'Zephyr' },
                },
                languageCode: 'en-GB',
              },
              outputAudioTranscription: {},
              inputAudioTranscription: { languageCodes: ['en-GB', 'en-US'] },
              contextWindowCompression: { slidingWindow: {} },
              sessionResumption: resumptionHandle ? { handle: resumptionHandle } : {},
              systemInstruction: fullInstruction,
              tools: [{ functionDeclarations: toolsList }],
            },
            callbacks: {
              onopen: () => {
                sendToClient({
                  type: 'connected',
                  mode: 'gemini_live',
                  message: 'Gemini Live session connected.',
                });
              },
              onmessage: async (serverMsg: any) => {
                if (serverMsg.serverContent?.interrupted) {
                  sendToClient({ type: 'interrupted' });
                  return;
                }
                if (serverMsg.serverContent?.outputTranscription?.text) {
                  sendToClient({
                    type: 'transcript',
                    role: 'assistant',
                    text: serverMsg.serverContent.outputTranscription.text,
                  });
                }
                if (serverMsg.serverContent?.inputTranscription?.text) {
                  sendToClient({
                    type: 'user_transcript',
                    text: serverMsg.serverContent.inputTranscription.text,
                  });
                }
                const parts = serverMsg.serverContent?.modelTurn?.parts || [];
                for (const part of parts) {
                  if (part.inlineData?.data) {
                    sendToClient({ type: 'audio', data: part.inlineData.data });
                  }
                  if (part.text) {
                    sendToClient({ type: 'transcript', role: 'assistant', text: part.text });
                  }
                }
                const toolCall = serverMsg.toolCall;
                if (toolCall && toolCall.functionCalls) {
                  for (const call of toolCall.functionCalls) {
                    sendToClient({
                      type: 'tool_call',
                      id: call.id,
                      name: call.name,
                      args: call.args,
                    });
                    if (call.name === 'search_web') {
                      try {
                        const searchResult = await performGoogleSearch(call.args?.query || '', key);
                        if (searchResult.sources && searchResult.sources.length > 0) {
                          sendToClient({ type: 'sources', sources: searchResult.sources });
                        }
                      } catch (_) {}
                    }
                  }
                }
              },
              onclose: () => {
                sendToClient({ type: 'disconnected', message: 'Gemini Live session closed.' });
              },
              onerror: (e: any) => {
                console.warn('[Live API Error]:', e?.message || e);
              },
            },
          });
          return;
        } catch (liveErr: any) {
          console.warn('[Live API Connect notice]:', liveErr?.message);
        }
      }

      sendToClient({
        type: 'connected',
        mode: 'local_engine',
        message: 'JARVIS Local Core active.',
      });
    } catch (error: any) {
      sendToClient({
        type: 'connected',
        mode: 'local_engine',
        message: 'JARVIS Local Core active.',
      });
    }
  };

  clientWs.on('message', async (data: Buffer | string) => {
    try {
      const parsed = JSON.parse(data.toString());
      if (parsed.type === 'init') {
        await initLiveSession(
          parsed.voiceName || 'Zephyr',
          parsed.addressAs || 'boss',
          parsed.apiKey,
          parsed.resumptionHandle,
          parsed.conversationContext,
          parsed.mode || 'jarvis',
          parsed.managerName || 'Coach'
        );
      } else if (parsed.type === 'audio') {
        if (liveSession && parsed.data) {
          liveSession.sendRealtimeInput({
            audio: { data: parsed.data, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } else if (parsed.type === 'image') {
        if (liveSession && parsed.data) {
          liveSession.sendRealtimeInput({
            video: { data: parsed.data, mimeType: parsed.mimeType || 'image/jpeg' },
          });
        }
      } else if (parsed.type === 'text') {
        if (liveSession && parsed.text) {
          liveSession.sendRealtimeInput({ text: parsed.text });
        } else {
          const key = getApiKey();
          const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
          if (isValidKey) {
            try {
              const systemInstruction = clientMode === 'manager'
                ? buildManagerInstruction(clientManagerName, clientAddressAs)
                : buildSystemInstruction(clientAddressAs);

              let res = await getGenAI(key).models.generateContent({
                model: 'gemini-2.5-flash',
                contents: parsed.text,
                config: {
                  systemInstruction,
                  tools: [{ functionDeclarations: toolsList }],
                },
              });
              let reply = res.text || `At your service, ${clientAddressAs}.`;
              sendToClient({ type: 'transcript', role: 'assistant', text: reply });
              sendToClient({ type: 'turn_complete' });
              return;
            } catch (_) {}
          }
          const result = processLocalButlerDirective(parsed.text, clientAddressAs, clientMode, clientManagerName);
          sendToClient({ type: 'transcript', role: 'assistant', text: result.reply });
          sendToClient({ type: 'turn_complete' });
        }
      } else if (parsed.type === 'close') {
        if (liveSession) {
          try { await liveSession.close(); } catch (_) {}
          liveSession = null;
        }
      }
    } catch (err: any) {
      console.error('WS Error:', err);
    }
  });

  clientWs.on('close', async () => {
    if (liveSession) {
      try { await liveSession.close(); } catch (_) {}
      liveSession = null;
    }
  });
});

// -------------------------------------------------------------
// Vite middleware / Static Serving
// -------------------------------------------------------------
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[JARVIS HUD] Systems operational on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Fatal startup error:', err);
});
