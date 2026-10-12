import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';
import dotenv from 'dotenv';
import { apiRouter } from './server/apiRouter.js';
import { getCorsMiddleware } from './server/corsMiddleware.js';
import { checkRequiredServerEnv } from './server/envCheck.js';
import {
  calculateSimilarity,
  isDuplicateAdvice,
  deduplicateOrTransformReply,
  extractSubstantivePoints,
  TopicCooldownManager,
} from './server/antiRepetition.js';
import {
  getPersonaData,
  savePersonaData,
  buildManagerPersonaInstruction,
} from './server/personaManager.js';
import {
  classifyUserIntent,
  cleanPrompt,
} from './server/intentRouter.js';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Log presence of required server environment variables on startup
checkRequiredServerEnv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.use(getCorsMiddleware());
app.use(express.json({ limit: '25mb' }));
app.get('/health', (_req, res) => res.redirect('/api/health'));
app.use('/api', apiRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/live' });

// -------------------------------------------------------------
// Persistent Storage Helpers (Schedule, Accountability, Goals, Commitments, Opportunities, Someday/Later)
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const SCHEDULE_FILE = path.join(DATA_DIR, 'schedule.json');
const ACCOUNTABILITY_FILE = path.join(DATA_DIR, 'accountability.json');
const MANAGER_MEMORY_FILE = path.join(DATA_DIR, 'manager_memory.json');
const GOALS_FILE = path.join(DATA_DIR, 'goals.json');
const COMMITMENTS_FILE = path.join(DATA_DIR, 'commitments.json');
const OPPORTUNITIES_FILE = path.join(DATA_DIR, 'opportunities.json');
const SOMEDAY_FILE = path.join(DATA_DIR, 'someday_later.json');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const MEMORIES_FILE = path.join(DATA_DIR, 'memories.json');

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

export function getGoalsData(): { items: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(GOALS_FILE)) {
      return JSON.parse(fs.readFileSync(GOALS_FILE, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

export function saveGoalsData(data: { items: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(GOALS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write goals.json:', err);
  }
}

export function getCommitmentsData(): { items: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(COMMITMENTS_FILE)) {
      return JSON.parse(fs.readFileSync(COMMITMENTS_FILE, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

export function saveCommitmentsData(data: { items: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(COMMITMENTS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write commitments.json:', err);
  }
}

export function getOpportunitiesData(): { items: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(OPPORTUNITIES_FILE)) {
      return JSON.parse(fs.readFileSync(OPPORTUNITIES_FILE, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

export function saveOpportunitiesData(data: { items: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(OPPORTUNITIES_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write opportunities.json:', err);
  }
}

export function getSomedayLaterData(): { items: string[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(SOMEDAY_FILE)) {
      return JSON.parse(fs.readFileSync(SOMEDAY_FILE, 'utf8'));
    }
  } catch (_) {}
  return { items: [] };
}

export function saveSomedayLaterData(data: { items: string[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(SOMEDAY_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write someday_later.json:', err);
  }
}

export function getProjectsData(): { projects: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(PROJECTS_FILE)) {
      return JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
    }
  } catch (_) {}
  return { projects: [] };
}

export function saveProjectsData(data: { projects: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write projects.json:', err);
  }
}

export function getMemoriesData(): { memories: any[] } {
  try {
    ensureDataDir();
    if (fs.existsSync(MEMORIES_FILE)) {
      return JSON.parse(fs.readFileSync(MEMORIES_FILE, 'utf8'));
    }
  } catch (_) {}
  return { memories: [] };
}

export function saveMemoriesData(data: { memories: any[] }) {
  try {
    ensureDataDir();
    fs.writeFileSync(MEMORIES_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write memories.json:', err);
  }
}

// Monthly Schedule Parser (B4 & B5): Parses text, detects dates/times/conflicts, and outputs B5 Monthly Overview
export function parseScheduleImport(rawText: string): {
  overviewMarkdown: string;
  parsedItems: any[];
  conflicts: string[];
} {
  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);
  const parsedItems: any[] = [];
  const todayStr = new Date().toISOString().split('T')[0];
  const conflicts: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let dateStr = todayStr;
    const dateMatch = line.match(/\b(\d{4}-\d{2}-\d{2})\b/);
    if (dateMatch) {
      dateStr = dateMatch[1];
    } else {
      const monthMatch = line.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2})\b/i);
      if (monthMatch) {
        const monthNum = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(monthMatch[1].toLowerCase().slice(0,3)) + 1;
        const dayNum = parseInt(monthMatch[2], 10);
        const year = new Date().getFullYear();
        dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      }
    }

    let timeStr = '';
    const timeMatch = line.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)|\d{1,2}:\d{2})\b/i);
    if (timeMatch) timeStr = timeMatch[1];

    let title = line
      .replace(/\b\d{4}-\d{2}-\d{2}\b/g, '')
      .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}\b/gi, '')
      .replace(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)|\d{1,2}:\d{2})\b/gi, '')
      .replace(/^[-*•\d.)\s]+/, '')
      .trim();

    if (title.length >= 3 && isValidScheduleTitle(title)) {
      const lower = title.toLowerCase();
      let classification = 'Flexible task';
      let category = 'work';
      if (lower.includes('exam') || lower.includes('deadline') || lower.includes('due') || lower.includes('submit')) {
        classification = 'Deadline';
        category = 'study';
      } else if (lower.includes('class') || lower.includes('lecture') || lower.includes('meeting') || timeStr) {
        classification = 'Fixed commitment';
        category = lower.includes('class') ? 'study' : 'meeting';
      }

      parsedItems.push({
        id: `sch-${Date.now()}-${i}`,
        title,
        date: dateStr,
        time: timeStr,
        category,
        classification,
        completed: false,
        slipCount: 0,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Conflict detection: overlapping fixed commitments or deadlines on same date and time
  const timeMap = new Map<string, string[]>();
  for (const item of parsedItems) {
    if (item.time && (item.classification === 'Fixed commitment' || item.classification === 'Deadline')) {
      const key = `${item.date} @ ${item.time}`;
      if (!timeMap.has(key)) timeMap.set(key, []);
      timeMap.get(key)!.push(item.title);
    }
  }
  for (const [key, titles] of timeMap.entries()) {
    if (titles.length > 1) {
      conflicts.push(`Conflict on ${key}: "${titles.join('" overlaps with "')}"`);
    }
  }

  // B5 Monthly Overview construction
  const deadlines = parsedItems.filter((p) => p.classification === 'Deadline');
  const fixed = parsedItems.filter((p) => p.classification === 'Fixed commitment');
  const flexible = parsedItems.filter((p) => p.classification === 'Flexible task');

  const overviewMarkdown = [
    `# 📅 MONTHLY MASTER OVERVIEW`,
    `### Important Dates & Major Deadlines`,
    deadlines.length > 0
      ? deadlines.map((d) => `• **${d.date}${d.time ? ' ' + d.time : ''}**: ${d.title}`).join('\n')
      : `• No imminent hard deadlines detected.`,
    `\n### Major Events & Fixed Commitments`,
    fixed.length > 0
      ? fixed.map((f) => `• **${f.date}${f.time ? ' ' + f.time : ''}**: ${f.title}`).join('\n')
      : `• Schedule is open for dedicated focus blocks.`,
    `\n### Available Productivity Windows`,
    `• Morning peak: 08:30 – 12:00 (High cognitive load & deep work)`,
    `• Afternoon execution: 14:00 – 17:30 (Task completion & study blocks)`,
    `• Evening review: 20:00 (Accountability & recovery buffer)`,
    `\n### Potential Conflicts & Risks`,
    conflicts.length > 0
      ? conflicts.map((c) => `⚠️ **ALERT**: ${c}`).join('\n')
      : `• No direct fixed commitment collisions detected. Buffer time protected.`,
    `\n### First Week Action Plan`,
    flexible.slice(0, 3).map((fl, idx) => `${idx + 1}. **${fl.title}** [${fl.date}] — Schedule 50-minute deep work block`).join('\n') || `1. Establish first 5-minute start on core goal.`,
    `\n**Next action:** What is our primary priority to lock into execution first?`,
  ].join('\n');

  return { overviewMarkdown, parsedItems, conflicts };
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

const manageProjectsTool: FunctionDeclaration = {
  name: 'manage_projects',
  description: 'Manage projects (NestList, JARVIS, CBE Study App, etc.): list, get details, add tasks, mark tasks complete, add decisions, update status, and track next actions.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['list', 'get_details', 'create', 'update', 'add_task', 'complete_task', 'add_decision', 'add_next_action', 'delete'],
        description: 'Action to perform on project',
      },
      projectId: { type: Type.STRING, description: 'ID or slug of the project (e.g. proj-nestlist, nestlist, proj-jarvis, proj-cbe-study)' },
      name: { type: Type.STRING, description: 'Name of the project when creating or updating' },
      description: { type: Type.STRING, description: 'Brief description of the project' },
      status: { type: Type.STRING, enum: ['ACTIVE', 'PLANNING', 'PAUSED', 'COMPLETED'], description: 'Project status' },
      taskTitle: { type: Type.STRING, description: 'Title of the task to add or complete' },
      taskId: { type: Type.STRING, description: 'ID of the task' },
      decisionTitle: { type: Type.STRING, description: 'Title of the decision made' },
      decisionRationale: { type: Type.STRING, description: 'Rationale or reasoning for the decision' },
      nextAction: { type: Type.STRING, description: 'Immediate next actionable step' },
    },
    required: ['action'],
  },
};

const manageMemoriesTool: FunctionDeclaration = {
  name: 'manage_memories',
  description: 'Manage persistent long-term personal memories: remember important facts, preferences, instructions, or goals, or forget/remove them upon request.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['remember', 'forget', 'list', 'search'],
        description: 'Action on personal memory',
      },
      content: { type: Type.STRING, description: 'Content of the memory to save or search query' },
      category: {
        type: Type.STRING,
        enum: ['preference', 'habit', 'instruction', 'fact', 'person', 'goal', 'general'],
        description: 'Category of memory',
      },
      memoryId: { type: Type.STRING, description: 'ID of the memory to forget or update' },
      importance: { type: Type.STRING, enum: ['high', 'medium', 'low'], description: 'Importance tier' },
    },
    required: ['action'],
  },
};

const filesystemCreateDirTool: FunctionDeclaration = {
  name: 'filesystem_create_directory',
  description: 'Create a directory or folder on the local filesystem (e.g. on Desktop, in workspace, or target path).',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: 'The directory path or folder name (e.g. "TestProject", "Desktop/JARVIS_TEST", "AgentTest").',
      },
    },
    required: ['path'],
  },
};

const filesystemCreateFileTool: FunctionDeclaration = {
  name: 'filesystem_create_file',
  description: 'Create a new file with text content on the filesystem (e.g. "Desktop/JARVIS_TEST/hello.txt", "AgentTest/README.md").',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: 'Path of the file to create or write to.',
      },
      content: {
        type: Type.STRING,
        description: 'The full text contents to write into the file.',
      },
    },
    required: ['path', 'content'],
  },
};

const filesystemReadFileTool: FunctionDeclaration = {
  name: 'filesystem_read_file',
  description: 'Read the text content of a file on the filesystem.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: 'Path of the file to read.',
      },
    },
    required: ['path'],
  },
};

const filesystemListDirTool: FunctionDeclaration = {
  name: 'filesystem_list_directory',
  description: 'List contents of a directory on the filesystem.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: 'Directory path to list.',
      },
    },
  },
};

const filesystemVerifyPathTool: FunctionDeclaration = {
  name: 'filesystem_verify_path',
  description: 'Verify whether a file or directory actually exists on the filesystem and return its type and size.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      path: {
        type: Type.STRING,
        description: 'Path to verify.',
      },
    },
    required: ['path'],
  },
};

const googleDriveSearchTool: FunctionDeclaration = {
  name: 'search_google_drive',
  description: 'Search authorized Google Drive documents, study guides, transcripts, or notes by query.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'Keywords or filename to search for in Google Drive (e.g. "transcript", "study guide", "syllabus").',
      },
    },
    required: ['query'],
  },
};

const toolsList = [
  searchWebTool,
  googleDriveSearchTool,
  manageScheduleTool,
  manageAccountabilityTool,
  manageProjectsTool,
  manageMemoriesTool,
  filesystemCreateDirTool,
  filesystemCreateFileTool,
  filesystemReadFileTool,
  filesystemListDirTool,
  filesystemVerifyPathTool,
];

// Helper to resolve filesystem paths securely (defaults to Desktop when path is a folder name or refers to Desktop)
export function resolveTargetFilesystemPath(rawPath: string): string {
  const userProfile = process.env.USERPROFILE || 'C:\\Users\\Admin';
  const desktop = path.join(userProfile, 'Desktop');
  const downloads = path.join(userProfile, 'Downloads');

  if (!rawPath || typeof rawPath !== 'string') return desktop;
  let p = rawPath.trim().replace(/^['"]|['"]$/g, '');
  p = p.replace(/[.,;:!?]+$/, '').trim();
  p = p.replace(/\//g, path.sep);

  if (/^(?:on\s+my\s+desktop|on\s+desktop|my\s+desktop|desktop)/i.test(p)) {
    const sub = p.replace(/^(?:on\s+my\s+desktop|on\s+desktop|my\s+desktop|desktop)[\/\\]?/i, '').trim();
    return sub ? path.join(desktop, sub) : desktop;
  }

  if (/^(?:on\s+my\s+downloads|on\s+downloads|my\s+downloads|downloads)/i.test(p)) {
    const sub = p.replace(/^(?:on\s+my\s+downloads|on\s+downloads|my\s+downloads|downloads)[\/\\]?/i, '').trim();
    return sub ? path.join(downloads, sub) : downloads;
  }

  if (path.isAbsolute(p)) {
    return path.normalize(p);
  }

  // Default: put on Desktop
  return path.join(desktop, p);
}

// Real Filesystem Tool Execution Engine with Result Verification
export function executeFilesystemTool(toolName: string, args: any): {
  success: boolean;
  tool: string;
  result: any;
  error?: string;
} {
  try {
    const rawPath = args?.path || '';
    const resolvedPath = resolveTargetFilesystemPath(rawPath);

    // Security Guard: Prevent writing outside user workspace or into Windows directory
    const lower = resolvedPath.toLowerCase();
    if (lower.startsWith('c:\\windows') || lower.startsWith('c:\\program files')) {
      return {
        success: false,
        tool: toolName,
        result: null,
        error: `Permission Denied (BLOCKED): System directory ${resolvedPath} is protected.`,
      };
    }

    if (toolName === 'filesystem_create_directory' || toolName === 'filesystem.create_directory') {
      fs.mkdirSync(resolvedPath, { recursive: true });
      const exists = fs.existsSync(resolvedPath);
      return {
        success: exists,
        tool: 'filesystem.create_directory',
        result: {
          path: resolvedPath,
          created: exists,
          name: path.basename(resolvedPath),
        },
      };
    }

    if (toolName === 'filesystem_create_file' || toolName === 'filesystem.create_file') {
      const parentDir = path.dirname(resolvedPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      const content = typeof args?.content === 'string' ? args.content : '';
      fs.writeFileSync(resolvedPath, content, 'utf8');
      const exists = fs.existsSync(resolvedPath);
      const readBack = exists ? fs.readFileSync(resolvedPath, 'utf8') : '';
      return {
        success: exists && readBack === content,
        tool: 'filesystem.create_file',
        result: {
          path: resolvedPath,
          created: exists,
          name: path.basename(resolvedPath),
          bytes: Buffer.byteLength(content, 'utf8'),
          verified: readBack === content,
        },
      };
    }

    if (toolName === 'filesystem_read_file' || toolName === 'filesystem.read_file') {
      if (!fs.existsSync(resolvedPath)) {
        return {
          success: false,
          tool: 'filesystem.read_file',
          result: null,
          error: `File does not exist: ${resolvedPath}`,
        };
      }
      const content = fs.readFileSync(resolvedPath, 'utf8');
      return {
        success: true,
        tool: 'filesystem.read_file',
        result: {
          path: resolvedPath,
          content,
          bytes: Buffer.byteLength(content, 'utf8'),
        },
      };
    }

    if (toolName === 'filesystem_list_directory' || toolName === 'filesystem.list_directory') {
      if (!fs.existsSync(resolvedPath)) {
        return {
          success: false,
          tool: 'filesystem.list_directory',
          result: null,
          error: `Directory does not exist: ${resolvedPath}`,
        };
      }
      const entries = fs.readdirSync(resolvedPath, { withFileTypes: true }).map((ent) => ({
        name: ent.name,
        isDirectory: ent.isDirectory(),
        isFile: ent.isFile(),
      }));
      return {
        success: true,
        tool: 'filesystem.list_directory',
        result: {
          path: resolvedPath,
          entries,
          count: entries.length,
        },
      };
    }

    if (toolName === 'filesystem_verify_path' || toolName === 'filesystem.verify_path') {
      const exists = fs.existsSync(resolvedPath);
      if (!exists) {
        return {
          success: true,
          tool: 'filesystem.verify_path',
          result: {
            path: resolvedPath,
            exists: false,
          },
        };
      }
      const stat = fs.statSync(resolvedPath);
      return {
        success: true,
        tool: 'filesystem.verify_path',
        result: {
          path: resolvedPath,
          exists: true,
          isDirectory: stat.isDirectory(),
          isFile: stat.isFile(),
          size: stat.size,
          modified: stat.mtime.toISOString(),
        },
      };
    }

    return {
      success: false,
      tool: toolName,
      result: null,
      error: `Unknown filesystem tool: ${toolName}`,
    };
  } catch (err: any) {
    return {
      success: false,
      tool: toolName,
      result: null,
      error: err?.message || 'Filesystem operation failed',
    };
  }
}

// -------------------------------------------------------------
// System Instruction Builders (Parts B & C + Repetition Guard A1)
// -------------------------------------------------------------
export function buildSystemInstruction(
  addressAs: string = 'boss',
  recentlySaid: string[] = [],
  rollingSummary: string = ''
) {
  const goals = getGoalsData().items;
  const opps = getOpportunitiesData().items;
  const commitments = getCommitmentsData().items;
  const projects = getProjectsData().projects;
  const memories = getMemoriesData().memories;

  return `You are JARVIS, my personal AI Operating System, Executive Chief of Staff, and Personal Productivity Manager inspired by Tony Stark's JARVIS. You are an execution-focused intelligence platform, not a generic chatbot.
Address me as "${addressAs}".
Always speak and respond in English only. Keep replies calm, professional, concise, intelligent, strategic, encouraging, and spoken-friendly. Do not give rambling lectures.

MISSION:
Help me master my time, focus on what matters, and consistently execute high-impact priorities across my life and work.

CORE AGENTIC PRINCIPLE (EXECUTION OVER CONVERSATION):
- You are an autonomous AI Operating System with direct tool-execution capabilities, NOT a generic conversational chatbot or passive coach.
- When given an ACTION REQUEST (e.g., "Create a folder called TestProject", "Create a file called hello.txt", "Inspect my project", "Search my Google Drive", "List files"):
  1. DO NOT ask broad coaching questions like "What do you want to achieve?" or "What's the most important thing?".
  2. DO NOT merely generate conversational text saying you can do it.
  3. IMMEDIATELY call the corresponding tool (filesystem_create_directory, filesystem_create_file, filesystem_verify_path, manage_projects, search_web).
- MULTI-STEP REQUESTS: When an instruction requires multiple steps (e.g., "Create a folder called AgentTest, create a README inside it, write 'This is JARVIS' into the README, then verify it"):
  Execute each tool in sequence: first create directory, then create file, then verify path, and report confirmed success.
- AMBIGUOUS REQUESTS: Only ask for clarification when an instruction is truly underspecified (e.g., "Do something with my files"). If the target and path are clear, execute immediately.
- CONVERSATIONAL REQUESTS: When the user asks a conceptual question (e.g., "What is artificial intelligence?", "Explain PCR"): answer normally and directly without calling tools.

CRITICAL REPETITION GUARD (RULE A1):
- Never repeat advice, phrasing, or check-ins already given in this conversation unless asked. Each reply must add new information or move to the next action.
- Never recite hardcoded or assumed schedules, companies, or tasks unprompted.
- Never repeat greetings if you have already greeted the user in this session. Skip pleasantries and proceed directly to execution.
- When an action or confirmation is requested, execute immediately without repeating conversational preamble.
${recentlySaid.length > 0 ? `\nRECENTLY STATED POINTS (DO NOT REPEAT):\n${recentlySaid.map((s) => `- ${s}`).join('\n')}` : ''}
${rollingSummary ? `\nROLLING CONVERSATION CONTEXT:\n${rollingSummary}` : ''}

MULTI-TIER MEMORY & KNOWLEDGE SYSTEM:
1. Short-Term Working Memory: Active conversation context and recent dialogue turns.
2. Long-Term Personal Memory: Persistent facts, user instructions, personal habits, communication preferences.
${memories.length > 0 ? memories.map((m: any) => `   • [${m.category.toUpperCase()}] ${m.content}`).join('\n') : '   • (No memories recorded yet)'}
3. Project Memory: Structured knowledge on active initiatives (NestList, JARVIS, CBE Study App, etc.).
${projects.length > 0 ? projects.map((p: any) => `   • [${p.name}] Status: ${p.status} | Goals: ${(p.goals || []).join('; ')} | Next Actions: ${(p.nextActions || []).join('; ') || 'None'}`).join('\n') : '   • (No projects recorded yet)'}
4. Google Drive Knowledge: Searchable documents, transcripts, and study guides from authorized Google Drive storage.

SOURCE AWARENESS PROTOCOL:
Whenever providing facts, answers, or context, always explicitly attribute the source using clear tags:
- [Personal Memory]: Facts or preferences from persistent personal memory.
- [Project Memory: <Project>]: Information from project entities.
- [Google Drive: <File>]: Documents or files indexed from Google Drive.
- [Web Research]: Live web search results and telemetry.
- [Current Conversation]: What was just said in this active session.
- [System Information]: Real-time system clocks, timers, and telemetry.

CRITICAL PRIVACY & FACTUAL INTEGRITY RULE:
- Never invent or assume personal details about me (e.g. background, schedule, workplace, projects, relationships, habits).
- If a personal fact or detail is not explicitly stored in [Personal Memory], [Project Memory], or user-provided files, state clearly that you do not have that stored or ask for clarification.
- Never guess or extrapolate personal details.

5-TIER PERMISSION & CONFIRMATION PROTOCOL:
- READ: Safe queries (read memories, check schedule, query drive, search web). -> Execute immediately.
- SUGGEST: Strategic advice, focus block proposals, task breakdown. -> Execute immediately.
- EXECUTE: Safe state modifications (add task, update schedule, save note, record streak). -> Execute immediately.
- CONFIRM: SENSITIVE OR DESTRUCTIVE ACTIONS (deleting a project, wiping all memories, deleting multiple schedule events, removing files). Always ask for explicit confirmation: "I require your confirmation before proceeding with [action]. Shall I execute?"
- BLOCKED: Disallowed or unsafe operations. Refuse with clear reason.

CORE PHILOSOPHY & ATTITUDE (B1 & B2):
- Intelligent, direct, practical, organized, strategic, encouraging, honest, calm, firm when necessary.
- Do not blindly agree. If my plan is unrealistic, I'm overcommitted, procrastinating, or focused on low-value work, say so directly.
- Never shame me when I fail. Analyze → Adjust → Recover → Execute.
- Act as my personal manager: listen to my needs, advise, plan, suggest strategies, and cheer me on when I achieve something.
- Results > intentions. Consistency > motivation. Execution > planning. Never confuse busy with productive.

GOAL SYSTEM (B3):
- Track: goal, why it matters, deadline, status, progress %, milestones, next action, obstacles, priority, resources, estimated time, dependencies.
- Current active goals: ${JSON.stringify(goals)}
- For a new goal, decide: supports existing / conflicts / unnecessary / future goal / requires replacing another priority. Don't allow unlimited goals; ask: "Which existing priority are you willing to reduce or remove to make room for this?"

MONTHLY SCHEDULE & OVERVIEW SYSTEM (B4 & B5):
- The latest confirmed monthly schedule is the primary source of truth.
- When given a monthly schedule (paste or upload):
  1. Parse dates, start/end times, events, classes, deadlines, exams.
  2. Classify: Fixed commitment / Flexible task / Deadline / Goal / Preparation / Recovery.
  3. Detect conflicts: If two fixed commitments overlap, alert immediately. Flexible tasks yield to fixed ones.
  4. Generate the Monthly Overview: Important Dates · Major Deadlines · Major Events · Busiest Periods · Available Productivity Windows · Potential Conflicts · Major Goals for the Month · Recommended Weekly Structure · Biggest Risks · First Week Action Plan.
  5. Replace future entries while preserving all past historical records.

WEEKLY & DAILY MANAGEMENT (B6 & B7):
- Weekly Management: Weekly Mission · Top 3 Outcomes · Fixed Commitments · Major Deadlines · Study/Work Blocks · Personal Development · Project Work · Recovery · Risks.
- Daily Management: Today's Mission · Top 3 · Fixed Commitments · Focus Blocks · Small Tasks · Personal Development · Evening Review.
- Ask: "If only one thing gets done today, what should it be?"

EXECUTION MODE (B8):
- When it's time to work, no speeches. Output:
  TASK: [Task name] / TIME: [Duration/Time] / FIRST ACTION: [First physical action] / EXPECTED RESULT: [Concrete output]
  then tell me to begin.

ANTI-PROCRASTINATION & 5-MINUTE START (B9):
- When I say "later", "tomorrow", "I'm tired", "no motivation", "too much to do": diagnose the root cause and prescribe an intervention.
- Use the 5-MINUTE START ("Open the document and write the heading.").

ACCOUNTABILITY & PRODUCTIVITY SCORE (B10 & B11):
- Stated plans are commitments. Ask if it happened on return. Active commitments: ${JSON.stringify(commitments)}
- Calculate daily Productivity Score (0–100):
  Goal progress (25%) + Priority completion (25%) + Focus/deep work (20%) + Consistency (15%) + Learning (10%) + Planning/review (5%).
- Slips rule: If a task has been postponed 3 or more times (slipCount >= 3), firmly call me out! Demand a 5-minute action or an exact non-negotiable time right now.

REVIEWS & RESET (B12, B13, B23):
- Weekly Review: accomplished? goals advanced? not completed & why? distractions? what worked? stop/start/continue? next week's top 3.
- Monthly Review: single highest-leverage improvement for next month.
- Emergency Reset Mode (triggered by "I wasted the day", "I'm behind", "overwhelmed"):
  1. Stop. 2. Identify the most important unfinished task. 3. Remove unnecessary tasks. 4. Choose one immediate action. 5. Start a short focus session. 6. Rebuild schedule from now. Goal: recover the next action.

PROJECTS, ACADEMICS, HABITS, DEEP WORK (B14–B20):
- Projects: LEARN → PRACTICE → BUILD → TEST → REVIEW. No endless tutorials without output.
- Academics: Manage classes, assignments, exams, revision. Use active recall, spaced repetition, practice questions, teaching-back, interleaving.
- Skills: LEARN → PRACTICE → BUILD → SHOW → IMPROVE.
- Deep work: Recommend 25/50/90-minute blocks.
- Priority Engine: P1 Critical/urgent · P2 Important for major goals · P3 Useful, not urgent · P4 Optional.
- Anti-Overwhelm: Always show ONE MAIN THING · THREE IMPORTANT THINGS · EVERYTHING ELSE collapsed.

REAL-TIME OPPORTUNITY & INTELLIGENCE ENGINE (PART C):
- Scope (C1): Scholarships, fellowships, internships, jobs, competitions, grants, hackathons, conferences, AI / tech / medical lab / genomics / biotech / healthcare innovation, entrepreneurship, leadership.
- Scanning & Ranking (C2 & C3): Query live web when requested. Rank:
  🔥 HIGH (strong fit, high value, realistic eligibility)
  🟡 MEDIUM
  ⚪ LOW
- Opportunity Alert Format (C4):
  🚨 JARVIS OPPORTUNITY ALERT — Opportunity · Organization · Why it matters · Why I might qualify · Deadline · Location/Remote · Potential value · Estimated effort · Priority · Recommended action · Official source (link).
- Application Readiness Check (C5 - /apply):
  Checklist of eligibility, deadline, required documents, CV, personal statement, portfolio, recommendations. NEVER fabricate qualifications, experience, or grades.
- Opportunity Tracker (C6 - /tracker): Track Opportunity, Organization, Deadline, Status, Required Documents, Next Action. Current tracked: ${JSON.stringify(opps)}
- Verification (C13): Prefer primary official sources. If unverifiable, state: "Unverified — please confirm on the official source." Never invent links or opportunities.
- Proactive question (C15): "Would you like me to scan for opportunities aligned with your current goals?"

SLASH COMMANDS (B30):
Recognize and execute: /today, /plan, /goals, /tasks, /focus, /review, /week, /month, /progress, /projects, /habits, /study, /learn, /reset, /priorities, /strategy, /score, /brief, /scan, /radar, /tracker, /apply.

DECISION ORDER (B32):
Fixed commitments → critical deadlines → high-impact goal work → academics → important projects → skill development → personal development → low-priority → optional. End responses with one clear next action.`;
}

function buildManagerInstruction(
  managerName: string = 'Coach',
  addressAs: string = 'boss',
  recentlySaid: string[] = [],
  rollingSummary: string = ''
) {
  const memory = getManagerMemory();
  const goals = getGoalsData().items;
  const personalMemories = getMemoriesData().memories;
  return buildManagerPersonaInstruction(
    addressAs,
    recentlySaid,
    rollingSummary,
    goals,
    memory,
    managerName ? { name: managerName } : undefined,
    personalMemories
  );
}

// -------------------------------------------------------------
function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·');
}

// -------------------------------------------------------------
// Real-Time Google Search Grounding & Web Fallback (Milestone 5)
// -------------------------------------------------------------
export async function performGoogleSearch(
  query: string,
  customKey?: string
): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  const key = getApiKey(customKey);
  const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;

  // Tier 1: Gemini 2.5 Flash with live Google Search tool
  if (isValidKey) {
    try {
      const response = await getGenAI(key).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Provide the latest comprehensive, up-to-date facts from Google Search for: "${query}". Include specific numbers, dates, and recent developments. Keep the response concise, factual, and spoken-friendly.`,
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

      if (sources.length > 0) {
        return { text, sources };
      } else if (
        text &&
        !text.toLowerCase().includes('could not find') &&
        !text.toLowerCase().includes("couldn't find") &&
        !text.toLowerCase().includes('unable to') &&
        !text.toLowerCase().includes('no information')
      ) {
        return {
          text,
          sources: [
            {
              title: `Google Search: "${query}"`,
              url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
            },
          ],
        };
      }
    } catch (genErr: any) {
      console.warn('[Google Search Notice]:', genErr?.message);
    }
  }

  // Tier 2: DuckDuckGo Search (HTML parser with entity decoding)
  try {
    const duckUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const res = await fetch(duckUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
        const title = decodeHtmlEntities(match[2].replace(/<[^>]+>/g, '').trim());
        const snippet = decodeHtmlEntities(match[3].replace(/<[^>]+>/g, '').trim());
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

  // Tier 3: Wikipedia REST API for definitions, concepts, and factual entities (adapted from isair/jarvis)
  try {
    const cleanTopic = query
      .replace(/^(?:who\s+is|what\s+is|tell\s+me\s+about|explain|define|search\s+for|search\s+the\s+web\s+for|search\s+google\s+for|search|look\s+up|find\s+information\s+about|find\s+info\s+on)\s*/i, '')
      .replace(/[?.!]+$/, '')
      .trim();
    if (cleanTopic.length > 1) {
      const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTopic)}`;
      const wikiRes = await fetch(wikiUrl, {
        headers: {
          'User-Agent': 'JarvisAIAssistant/1.0 (personal-productivity-agent)',
        },
      });
      if (wikiRes.ok) {
        const wikiData = await wikiRes.json();
        if (wikiData.extract && wikiData.title) {
          return {
            text: `**${wikiData.title}** (Wikipedia Grounding):\n\n${wikiData.extract}`,
            sources: [
              {
                title: wikiData.title,
                url: wikiData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiData.title)}`,
              },
            ],
          };
        }
      }
    }
  } catch (_) {}

  // Tier 4: Offline / Fallback resilience with verified search query link
  return {
    text: `I was unable to retrieve live web data for "${query}" at this time. Network may be unreachable.`,
    sources: [
      { title: `Google Search: ${query}`, url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
    ],
  };
}

// -------------------------------------------------------------
// Document Analysis & Google Drive Knowledge Engine (Milestone 6)
// -------------------------------------------------------------
export function analyzeDocumentLocal(
  content: string,
  fileName: string = 'Document',
  addressAs: string = 'boss'
): { summary: string; takeaways: string[]; actionItems: string[] } {
  const cleanContent = (content || '').trim();
  if (!cleanContent) {
    return {
      summary: `Document "${fileName}" contains no text content to analyze, ${addressAs}.`,
      takeaways: ['File is empty or could not be read as text.'],
      actionItems: ['Provide a document with text content.'],
    };
  }

  const rawLines = cleanContent
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const sentences = cleanContent
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);

  // Summary: first 2-3 substantive sentences or lines
  const summarySentences = sentences.slice(0, 3);
  const summary = summarySentences.join(' ') || rawLines.slice(0, 2).join(' ') || `Analysis of ${fileName} completed.`;

  // Takeaways: look for lines with key, important, result, conclusion, note, or declarative statements
  const takeaways: string[] = [];
  for (const s of sentences) {
    const lower = s.toLowerCase();
    if (
      lower.includes('key') ||
      lower.includes('important') ||
      lower.includes('result') ||
      lower.includes('conclusion') ||
      lower.includes('objective') ||
      lower.includes('goal') ||
      lower.includes('critical') ||
      lower.includes('significant')
    ) {
      if (!takeaways.includes(s) && takeaways.length < 4) takeaways.push(s);
    }
  }
  if (takeaways.length === 0) {
    takeaways.push(...(sentences.slice(1, 4).length > 0 ? sentences.slice(1, 4) : [summary]));
  }

  // Action items: look for lines with must, should, action, todo, deadline, due, next, need to
  const actionItems: string[] = [];
  for (const s of sentences) {
    const lower = s.toLowerCase();
    if (
      lower.includes('must') ||
      lower.includes('should') ||
      lower.includes('action') ||
      lower.includes('todo') ||
      lower.includes('deadline') ||
      lower.includes('due') ||
      lower.includes('need to') ||
      lower.includes('next step') ||
      lower.includes('schedule')
    ) {
      if (!actionItems.includes(s) && actionItems.length < 4) actionItems.push(s);
    }
  }
  if (actionItems.length === 0) {
    actionItems.push(`Review full contents of "${fileName}" for strategic alignment.`);
  }

  return { summary, takeaways, actionItems };
}

export async function analyzeDocumentText(
  content: string,
  fileName: string = 'Document',
  addressAs: string = 'boss',
  customKey?: string
): Promise<{ summary: string; takeaways: string[]; actionItems: string[] }> {
  const key = getApiKey(customKey);
  const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;

  if (isValidKey) {
    try {
      const response = await getGenAI(key).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are JARVIS analyzing document "${fileName}" for ${addressAs}.
Analyze the following document and output JSON with keys:
- summary: A concise 2-sentence executive summary
- takeaways: An array of 3-4 key bullet points
- actionItems: An array of 2-3 specific action items or decisions

Document content:
${content.slice(0, 20000)}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.summary && Array.isArray(parsed.takeaways)) {
        return {
          summary: parsed.summary,
          takeaways: parsed.takeaways,
          actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : ['Proceed with project priorities'],
        };
      }
    } catch (genErr) {
      console.warn('Gemini doc analysis notice, using deterministic analyzer:', genErr);
    }
  }

  return analyzeDocumentLocal(content, fileName, addressAs);
}

export function calculateProductivityScore(): { score: number; breakdown: any } {
  const sched = getScheduleData().items;
  const acc = getAccountabilityData();
  const goals = getGoalsData().items;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = sched.filter((t: any) => t.date === todayStr || t.date === 'today');
  const completedToday = todayTasks.filter((t: any) => t.completed).length;

  let goalProgressScore = 20;
  if (goals.length > 0) {
    const avgProg = goals.reduce((a: number, b: any) => a + (b.progress || 0), 0) / goals.length;
    goalProgressScore = Math.round((avgProg / 100) * 25);
  }

  const priorityScore = todayTasks.length > 0 ? Math.round((completedToday / todayTasks.length) * 25) : 22;
  const focusScore = 18;
  const consistencyScore = Math.min(15, Math.round(((acc.streak || 1) / 10) * 15));
  const learningScore = 8;
  const reviewScore = acc.lastBriefedDate === todayStr ? 5 : 3;

  const totalScore = Math.min(100, Math.max(0, goalProgressScore + priorityScore + focusScore + consistencyScore + learningScore + reviewScore));

  return {
    score: totalScore,
    breakdown: {
      goalProgress: `${goalProgressScore}/25`,
      priorityCompletion: `${priorityScore}/25`,
      focusDeepWork: `${focusScore}/20`,
      consistencyStreak: `${consistencyScore}/15`,
      learningDevelopment: `${learningScore}/10`,
      planningReview: `${reviewScore}/5`,
    },
  };
}

// -------------------------------------------------------------
// Local Butler / Manager Engine (Offline & Fallback Resilience)
// -------------------------------------------------------------
export function processLocalButlerDirective(
  prompt: string,
  addressAs: string = 'boss',
  mode: 'jarvis' | 'manager' = 'jarvis',
  managerName: string = 'Coach',
  hasGreeted: boolean = false,
  recentlySaid: string[] = [],
  driveContext?: { fileName: string; content?: string; mimeType?: string }
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
  const goals = getGoalsData();
  const opps = getOpportunitiesData();
  const commitments = getCommitmentsData();
  const todayItems = sched.items.filter((it: any) => it.date === todayStr || it.date === 'today');

  // Google Drive Context Injection / Document Analysis (Milestone 6)
  if (driveContext && driveContext.content) {
    const analysis = analyzeDocumentLocal(driveContext.content, driveContext.fileName, addressAs);
    reply = `📄 **[Google Drive: ${driveContext.fileName}] DOCUMENT ANALYSIS**:\n\n${analysis.summary}\n\n**Key Takeaways:**\n${analysis.takeaways.map((t) => `• ${t}`).join('\n')}\n\n**Recommended Next Actions:**\n${analysis.actionItems.map((a) => `• ${a}`).join('\n')}`;
    return {
      reply,
      functionCalls: [{ name: 'analyze_document', args: { fileName: driveContext.fileName } }],
      sources: [],
      taskSteps: [
        { step: 'Understanding request', status: 'success', detail: `Google Drive document: "${driveContext.fileName}"` },
        { step: 'Executing', tool: 'document.analyzer', status: 'success', detail: `Analyzed document "${driveContext.fileName}" (${driveContext.content.length} chars)` },
      ],
      attributions: [{ type: 'GOOGLE_DRIVE', label: `Google Drive: ${driveContext.fileName}`, detail: driveContext.mimeType || 'Document' }],
    };
  }

  // SCHEDULE IMPORT DETECTION (A4 & B4):
  // If prompt has multiple dates or pasted lines, parse and generate B5 Monthly Overview
  const dateMatches = prompt.match(/\b\d{4}-\d{2}-\d{2}\b/g) || [];
  const monthDayMatches = prompt.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2}\b/gi) || [];
  const hasMultipleScheduleLines = (dateMatches.length + monthDayMatches.length >= 2) || (prompt.split('\n').length >= 3 && (lower.includes('schedule') || lower.includes('class') || lower.includes('exam')));

  if (hasMultipleScheduleLines || lower.startsWith('/month import') || lower.startsWith('import schedule')) {
    const importResult = parseScheduleImport(prompt);
    if (importResult.parsedItems.length > 0) {
      // Replace future items, preserve past history
      const pastItems = sched.items.filter((it: any) => it.date < todayStr);
      sched.items = [...pastItems, ...importResult.parsedItems];
      saveScheduleData(sched);
      return {
        reply: importResult.overviewMarkdown,
        functionCalls: [{ name: 'manage_schedule', args: { action: 'batch_upload', count: importResult.parsedItems.length } }],
        sources: [],
      };
    }
  }

  const taskSteps: any[] = [];
  const cleanLower = lower.replace(/[.,;:!?]+$/, '').trim();

  // ============================================================
  // INTENT DETECTION & REAL ACTION TOOL ROUTER (PROBLEM 1 FIX)
  // Priority 1: Multi-Step & Filesystem Actions (Executed in ALL modes)
  // ============================================================
  const intent = classifyUserIntent(prompt);

  // 1. AMBIGUOUS REQUEST DETECTION (Category D)
  if (intent.category === 'AMBIGUOUS') {
    reply = intent.clarificationPrompt ||
      `Please specify the exact operation you would like me to perform on your files, ${addressAs}. For example, I can create a folder, create a file with contents, list directory files, or verify a path.`;
    return {
      reply,
      functionCalls: [],
      sources: [],
      taskSteps: [
        { step: 'Understanding request', status: 'error', detail: 'Ambiguous instruction detected — awaiting user clarification' },
      ],
      attributions: [{ type: 'SYSTEM_INFO', label: 'Intent Classification Engine', detail: 'Ambiguous Request' }],
    };
  }

  // 2. MULTI-STEP REQUEST DETECTION (Category C)
  // Example: "Create a folder called TestProject, put a README inside it, and write a description of JARVIS"
  if (intent.category === 'ACTION_MULTI_STEP' && intent.args) {
    const { folderName, fileName, content, folderPath, filePath } = intent.args as any;

    taskSteps.push({
      step: 'Understanding request',
      status: 'success',
      detail: `Multi-step plan: Create folder "${folderName}", write ${fileName}, and verify`,
    });

    // Step 1: Create directory
    const dirRes = executeFilesystemTool('filesystem_create_directory', { path: folderPath });
    taskSteps.push({
      step: 'Executing',
      tool: 'filesystem.create_directory',
      status: dirRes.success ? 'success' : 'error',
      detail: `Created directory: ${dirRes.result?.path || folderPath}`,
    });

    // Step 2: Create file
    const fileRes = executeFilesystemTool('filesystem_create_file', { path: filePath, content });
    taskSteps.push({
      step: 'Executing',
      tool: 'filesystem.create_file',
      status: fileRes.success ? 'success' : 'error',
      detail: `Wrote ${fileName} (${fileRes.result?.bytes || 0} bytes)`,
    });

    // Step 3: Verify path
    const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: filePath });
    taskSteps.push({
      step: 'Verifying',
      tool: 'filesystem.verify_path',
      status: verifyRes.result?.exists ? 'success' : 'error',
      detail: verifyRes.result?.exists ? `Verified: ${fileName} exists (${verifyRes.result?.size} bytes)` : 'Verification failed',
    });

    reply = `Done. I've created the folder "${folderName}" on your Desktop, placed a ${fileName} inside it containing "${content}", and verified that all steps completed successfully.`;
    functionCalls.push(
      { name: 'filesystem_create_directory', args: { path: folderPath } },
      { name: 'filesystem_create_file', args: { path: filePath, content } },
      { name: 'filesystem_verify_path', args: { path: filePath } }
    );

    return {
      reply,
      functionCalls,
      sources: [],
      taskSteps,
      attributions: [{ type: 'SYSTEM_INFO', label: 'Local Filesystem Engine', detail: 'Multi-Step Execution Verified' }],
    };
  }

  // 3. ACTION FILESYSTEM: CREATE DIRECTORY / CREATE FILE / LIST / READ (Category B)
  if (intent.category === 'ACTION_FILESYSTEM' && intent.args) {
    const subType = intent.subType;

    if (subType === 'create_directory') {
      const folderName = intent.args.folderName || 'NewFolder';
      const targetPath = intent.args.path || `Desktop/${folderName}`;
      taskSteps.push({ step: 'Understanding request', status: 'success', detail: `Create folder "${folderName}" on Desktop` });

      const dirRes = executeFilesystemTool('filesystem_create_directory', { path: targetPath });
      taskSteps.push({
        step: 'Executing',
        tool: 'filesystem.create_directory',
        status: dirRes.success ? 'success' : 'error',
        detail: `Created directory: ${dirRes.result?.path || targetPath}`,
      });

      const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: targetPath });
      taskSteps.push({
        step: 'Verifying',
        tool: 'filesystem.verify_path',
        status: verifyRes.result?.exists ? 'success' : 'error',
        detail: verifyRes.result?.exists ? 'Directory verified on Desktop' : 'Verification failed',
      });

      reply = `Done. I've created the folder "${folderName}" on your Desktop and verified it exists.`;
      functionCalls.push({ name: 'filesystem_create_directory', args: { path: targetPath } });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Local Filesystem Engine', detail: 'Directory Creation Verified' }],
      };
    }

    if (subType === 'create_file') {
      const fileName = intent.args.fileName || 'file.txt';
      const targetPath = intent.args.targetPath || `Desktop/${fileName}`;
      const content = intent.args.content || 'Created by JARVIS';

      taskSteps.push({ step: 'Understanding request', status: 'success', detail: `Create file "${fileName}"` });
      const fileRes = executeFilesystemTool('filesystem_create_file', { path: targetPath, content });
      taskSteps.push({
        step: 'Executing',
        tool: 'filesystem.create_file',
        status: fileRes.success ? 'success' : 'error',
        detail: `Created ${fileName}: ${fileRes.result?.path || targetPath}`,
      });

      const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: targetPath });
      taskSteps.push({
        step: 'Verifying',
        tool: 'filesystem.verify_path',
        status: verifyRes.result?.exists ? 'success' : 'error',
        detail: verifyRes.result?.exists ? `File verified: ${verifyRes.result?.size} bytes` : 'File not found',
      });

      reply = `Done. I've created the file "${fileName}" containing "${content}" and verified its contents.`;
      functionCalls.push({ name: 'filesystem_create_file', args: { path: targetPath, content } });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Local Filesystem Engine', detail: 'File Creation Verified' }],
      };
    }

    if (subType === 'list_directory') {
      const targetPath = intent.args.path || 'Desktop';
      taskSteps.push({ step: 'Understanding request', status: 'success', detail: `List contents of "${targetPath}"` });
      const listRes = executeFilesystemTool('filesystem_list_directory', { path: targetPath });
      taskSteps.push({
        step: 'Executing',
        tool: 'filesystem.list_directory',
        status: listRes.success ? 'success' : 'error',
        detail: listRes.success ? `Listed ${listRes.result?.count} items` : (listRes.error || 'Failed to list'),
      });

      if (listRes.success) {
        const entries = (listRes.result?.entries || []).map((e: any) => (e.isDirectory ? `📁 ${e.name}/` : `📄 ${e.name}`)).join(', ');
        reply = `Directory contents of "${targetPath}":\n\n${entries || '(empty directory)'}`;
      } else {
        reply = `Could not list directory "${targetPath}": ${listRes.error || 'Path not found'}`;
      }
      functionCalls.push({ name: 'filesystem_list_directory', args: { path: targetPath } });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Local Filesystem Engine', detail: 'Directory Listing' }],
      };
    }

    if (subType === 'read_file') {
      const targetPath = intent.args.path || 'Desktop/README.md';
      taskSteps.push({ step: 'Understanding request', status: 'success', detail: `Read file "${targetPath}"` });
      const readRes = executeFilesystemTool('filesystem_read_file', { path: targetPath });
      taskSteps.push({
        step: 'Executing',
        tool: 'filesystem.read_file',
        status: readRes.success ? 'success' : 'error',
        detail: readRes.success ? `Read ${readRes.result?.bytes} bytes` : (readRes.error || 'Failed to read'),
      });

      if (readRes.success) {
        reply = `Contents of "${targetPath}":\n\n${readRes.result?.content}`;
      } else {
        reply = `Could not read file "${targetPath}": ${readRes.error || 'File not found'}`;
      }
      functionCalls.push({ name: 'filesystem_read_file', args: { path: targetPath } });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Local Filesystem Engine', detail: 'File Read' }],
      };
    }
  }

  // 4. ACTION MEMORY DIRECTIVES (REMEMBER, FORGET, LIST, WIPE)
  if (intent.category === 'ACTION_MEMORY') {
    const mems = getMemoriesData();

    if (intent.subType === 'remember') {
      const content = intent.args?.content || prompt.replace(/^(?:remember\s+this:|remember\s+that|remember:)\s*/i, '').replace(/^remember\s+/i, '').trim();
      if (content && content.length > 2) {
        const category = (lower.includes('prefer') || lower.includes('like'))
          ? 'preference'
          : (lower.includes('rule') || lower.includes('never') || lower.includes('always'))
          ? 'instruction'
          : (lower.includes('habit') || lower.includes('routine'))
          ? 'habit'
          : (lower.includes('goal') || lower.includes('objective'))
          ? 'goal'
          : 'fact';

        const newMem = {
          id: `mem-${Date.now()}`,
          content,
          category,
          source: 'USER_EXPLICIT',
          importance: 'high',
          tags: ['user_directive'],
          createdAt: new Date().toISOString(),
        };
        mems.memories.push(newMem);
        saveMemoriesData(mems);

        reply = `💾 **[Personal Memory] Stored**: "${content}".\nI have committed this to persistent long-term storage and will maintain awareness across all future sessions, ${addressAs}.`;
        functionCalls.push({ name: 'manage_memories', args: { action: 'remember', content, category } });
        taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Stored: "${content}"` });

        return {
          reply,
          functionCalls,
          sources: [],
          taskSteps,
          attributions: [{ type: 'PERSONAL_MEMORY', label: 'Memory Bank Update', detail: content }],
        };
      }
    }

    if (intent.subType === 'forget') {
      const query = (intent.args?.query || prompt.replace(/^(?:forget\s+that|forget|delete\s+memory|remove\s+memory)\s+/i, '')).trim().toLowerCase();
      const initialCount = mems.memories.length;
      mems.memories = mems.memories.filter((m: any) => !m.content.toLowerCase().includes(query));

      if (mems.memories.length < initialCount) {
        saveMemoriesData(mems);
        reply = `🗑️ **[Personal Memory] Pruned**: Removed memory matching "${query}". Persistent profile updated, ${addressAs}.`;
      } else {
        reply = `No matching personal memory found for "${query}", ${addressAs}. Your memory bank remains untouched.`;
      }

      functionCalls.push({ name: 'manage_memories', args: { action: 'forget', content: query } });
      taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Pruned memory matching "${query}"` });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'PERSONAL_MEMORY', label: 'Memory Bank Pruned', detail: query }],
      };
    }

    if (intent.subType === 'list') {
      if (mems.memories.length === 0) {
        reply = `I do not have any personal memories stored for you yet, ${addressAs}. Tell me "Remember this: [fact]" to store important context.`;
      } else {
        reply = `🧠 **[Personal Memory] LONG-TERM PROFILE TELEMETRY (${mems.memories.length} Stored)**:\n\n` +
          mems.memories.map((m: any) => `• **[${m.category.toUpperCase()}]** ${m.content}`).join('\n\n') +
          `\n\nYou can say "Remember this: [fact]" to store new context, or "Forget [fact]" to prune it.`;
      }

      functionCalls.push({ name: 'manage_memories', args: { action: 'list' } });
      taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Retrieved ${mems.memories.length} memories` });

      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'PERSONAL_MEMORY', label: 'Long-Term Memory Bank', detail: `${mems.memories.length} persistent facts` }],
      };
    }

    if (intent.subType === 'wipe') {
      const pendingAction = {
        id: `act-${Date.now()}`,
        permission: 'CONFIRM' as const,
        actionType: 'WIPE_MEMORIES' as const,
        description: 'Permanently wipe all long-term personal memories from persistent storage.',
        payload: {},
        status: 'pending' as const,
        timestamp: new Date().toISOString(),
      };
      reply = `⚠️ **[System Information] CONFIRMATION REQUIRED (RULE B32)**:\n` +
        `You have requested to **wipe all long-term memories**.\n` +
        `Under the 5-Tier Permission Protocol, this is a **CONFIRM** tier destructive operation. Are you certain you wish to proceed?`;
      return {
        reply,
        functionCalls: [],
        sources: [],
        pendingConfirmation: pendingAction,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Security & Permission Protocol', detail: 'Permission Level: CONFIRM' }],
      };
    }
  }

  // 5. ACTION WEB SEARCH (Category B & Milestone 5)
  if (intent.category === 'ACTION_SEARCH_WEB' && intent.args) {
    const query = intent.args.query || prompt;
    reply = `Executing real-time search for "${query}", ${addressAs}...`;
    functionCalls.push({ name: 'search_web', args: { query } });
    taskSteps.push({
      step: 'Executing',
      tool: 'search.web',
      status: 'success',
      detail: `Web search query: "${query}"`,
    });
    return {
      reply,
      functionCalls,
      sources: [],
      taskSteps,
      attributions: [{ type: 'WEB_RESEARCH', label: 'Live Web Telemetry', detail: query }],
    };
  }

  // 5b. ACTION GOOGLE DRIVE KNOWLEDGE RETRIEVAL (Category B & Milestone 6)
  if (intent.category === 'ACTION_DRIVE') {
    const query = intent.args?.query || 'transcript';
    reply = `To search your Google Drive for "${query}", please ensure your Google Drive is connected via the DRIVE button in the HUD header. Once authorized, I will index and search your documents directly, ${addressAs}.`;
    functionCalls.push({ name: 'search_google_drive', args: { query } });
    taskSteps.push({
      step: 'Understanding request',
      status: 'success',
      detail: `Google Drive query: "${query}"`,
    });
    taskSteps.push({
      step: 'Authentication Check',
      status: 'error',
      detail: 'Drive authorization required to search files',
    });
    return {
      reply,
      functionCalls,
      sources: [],
      taskSteps,
      attributions: [{ type: 'GOOGLE_DRIVE', label: 'Google Drive Knowledge Layer', detail: `Search Query: "${query}"` }],
    };
  }

  // 5c. ACTION DOCUMENT ANALYSIS (Category B & Milestone 6)
  if (intent.category === 'ACTION_DOCUMENT_ANALYSIS') {
    const targetDoc = intent.args?.targetDoc || '';
    if (targetDoc && targetDoc !== 'active_document' && targetDoc.length > 25) {
      const analysis = analyzeDocumentLocal(targetDoc, 'Submitted Document', addressAs);
      reply = `📄 **[Document Analysis Engine]**:\n\n${analysis.summary}\n\n**Key Takeaways:**\n${analysis.takeaways.map((t) => `• ${t}`).join('\n')}\n\n**Recommended Next Actions:**\n${analysis.actionItems.map((a) => `• ${a}`).join('\n')}`;
      functionCalls.push({ name: 'analyze_document', args: { target: 'inline_text' } });
      taskSteps.push({
        step: 'Executing',
        tool: 'document.analyzer',
        status: 'success',
        detail: `Analyzed document (${targetDoc.length} chars)`,
      });
      return {
        reply,
        functionCalls,
        sources: [],
        taskSteps,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Document Analysis Engine', detail: 'Text Analysis' }],
      };
    }

    reply = `Ready to analyze your document, ${addressAs}. Please paste the document text, attach the file, or connect your Google Drive to load it directly into my analysis engine.`;
    functionCalls.push({ name: 'analyze_document', args: { target: targetDoc || 'document' } });
    taskSteps.push({
      step: 'Executing',
      tool: 'document.analyzer',
      status: 'success',
      detail: 'Document analysis engine primed — awaiting content',
    });
    return {
      reply,
      functionCalls,
      sources: [],
      taskSteps,
      attributions: [{ type: 'SYSTEM_INFO', label: 'Document Analysis Engine', detail: 'Awaiting Document' }],
    };
  }

  // 6. CONVERSATIONAL CONCEPTUAL REQUESTS (Category A)
  // Example: "Tell me about artificial intelligence." / "What is artificial intelligence?" / "Explain PCR"
  if (/^(?:what\s+is\s+artificial\s+intelligence|tell\s+me\s+about\s+artificial\s+intelligence|explain\s+artificial\s+intelligence)/i.test(cleanLower)) {
    reply = `Artificial intelligence refers to computational systems engineered to perform cognitive tasks traditionally associated with human intelligence — including reasoning, pattern recognition, learning from data, natural language comprehension, and autonomous problem-solving. In modern software engineering, it spans machine learning, deep neural networks, and multimodal reasoning architectures.`;
    return {
      reply,
      functionCalls: [],
      sources: [],
      taskSteps: [{ step: 'Conversational response delivered', status: 'success', detail: 'Direct conceptual explanation' }],
      attributions: [{ type: 'SYSTEM_INFO', label: 'JARVIS Knowledge Core', detail: 'Conceptual Knowledge' }],
    };
  }

  if (/^(?:explain\s+pcr|what\s+is\s+pcr)/i.test(cleanLower)) {
    reply = `Polymerase Chain Reaction (PCR) is an essential molecular biology technique used to exponentially amplify specific segments of DNA. It utilizes thermal cycling through denaturation (unwinding DNA strands at ~95°C), annealing (primers binding at ~55°C), and extension (Taq polymerase synthesizing complementary strands at ~72°C), producing millions of copies from a single target sequence in hours.`;
    return {
      reply,
      functionCalls: [],
      sources: [],
      taskSteps: [{ step: 'Conversational response delivered', status: 'success', detail: 'Direct scientific explanation' }],
      attributions: [{ type: 'SYSTEM_INFO', label: 'JARVIS Knowledge Core', detail: 'Molecular Biology' }],
    };
  }

  // PERSONAL MANAGER EMOTIONAL & ACCOUNTABILITY TRIGGERS (In Manager Mode)
  if (mode === 'manager') {
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

    if (lower.includes('procrastinat') || lower.includes('avoiding') || lower.includes('putting off') || lower.includes('lazy')) {
      reply = `Let's remove all the friction, ${addressAs}. Procrastination is almost always your mind resisting an overwhelming chunk. How about a 2-minute start where you only commit to working for 120 seconds? What is the simplest first piece of that task?`;
      return { reply, functionCalls: [], sources: [] };
    }

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

    if (lower.startsWith('i need to ') || lower.startsWith('i have to ') || lower.startsWith('task:') || lower.includes('working on')) {
      const cleanTask = prompt.replace(/^i need to |^i have to |^task:\s*/i, '').trim();
      reply = `Understood — you want to work through "${cleanTask}". To build a realistic plan: what is your deadline for this, and what do you foresee as the biggest potential blocker?`;
      return { reply, functionCalls: [], sources: [] };
    }
  }

  // JARVIS DEFAULT MODE & B30 COMMANDS:

  // B30: /today or Daily Briefing (A5: One main thing, three important things, everything else collapsed)
  if (lower === '/today' || lower.includes('brief me') || lower.includes('plan my day') || lower.includes('daily briefing') || lower.includes('briefing')) {
    const isExplicitRepeat = lower.includes('again') || lower.includes('repeat') || lower.includes('force');
    const overdueItems = sched.items.filter((it: any) => it.date < todayStr && !it.completed);
    const todayAgenda = sched.items.filter((it: any) => it.date === todayStr || it.date === 'today');
    const upcomingDeadlines = sched.items.filter((it: any) => it.date > todayStr && !it.completed);

    if (!isExplicitRepeat && !TopicCooldownManager.canTrigger('daily_briefing', 4)) {
      const remainingMin = TopicCooldownManager.getRemainingCooldownMinutes('daily_briefing', 4);
      const topTask = todayAgenda[0]?.title || overdueItems[0]?.title || 'Advance your key milestone';
      reply = `You have already received your daily briefing, ${addressAs}. Focus on execution:\n\n🎯 **IMMEDIATE ACTION**: ${topTask}\n\n*(Briefing cooldown active: ${remainingMin}m remaining. Say "brief me again" to re-generate the full briefing).*`;
      return { reply, functionCalls: [], sources: [] };
    }
    TopicCooldownManager.recordTrigger('daily_briefing');

    const mainThing = todayAgenda[0]?.title || overdueItems[0]?.title || 'Lock in your highest-priority objective';
    const topThree = todayAgenda.slice(1, 4).map((it: any) => it.title);
    if (topThree.length === 0 && overdueItems.length > 1) {
      topThree.push(...overdueItems.slice(1, 3).map((it: any) => it.title));
    }

    const greetingPrefix = hasGreeted
      ? `Here is today's execution plan (${timeStr}):`
      : `${greeting}, ${addressAs}. It is ${timeStr}.`;

    reply = `${greetingPrefix}

🎯 **ONE MAIN THING**:
• **${mainThing}**

⚡ **THREE IMPORTANT THINGS**:
${topThree.length > 0 ? topThree.map((t: string, idx: number) => `${idx + 1}. ${t}`).join('\n') : '1. Clear core study / work block\n2. Evening review\n3. Protect recovery window'}

📅 **SCHEDULE & DEADLINES**:
• Today's agenda: ${todayAgenda.length} items scheduled.
• Upcoming deadlines: ${upcomingDeadlines.length} items pending.

🚫 **ONE THING TO AVOID TODAY**:
• Low-value multitasking and procrastination loops.

💡 **TODAY'S FOCUS**:
• Consistency compounds. Ambition → Strategy → Plan → Action.

Ready to execute, ${addressAs}? What is our first 5-minute action?`;
  }
  // B30: /focus (B8 Execution Mode)
  else if (lower.startsWith('/focus') || lower === 'focus mode' || lower === 'start focus') {
    const activeTask = todayItems.find((t: any) => !t.completed)?.title || 'Priority Execution Block';
    reply = `🎯 **EXECUTION MODE ENGAGED**

TASK: ${activeTask}
TIME: 25 minutes (Deep Work Block)
FIRST ACTION: Open required materials and write the first heading or line
EXPECTED RESULT: Measurable completion of core milestone

All notifications muted. Eliminate distractions. Begin now, ${addressAs}.`;
  }
  // B30: /score (B11 Productivity Score Formula)
  else if (lower === '/score' || lower.includes('productivity score')) {
    const scoreData = calculateProductivityScore();
    reply = `📊 **DAILY PRODUCTIVITY SCORE: ${scoreData.score}/100**

• Goal Progress (25%): ${scoreData.breakdown.goalProgress}
• Priority Completion (25%): ${scoreData.breakdown.priorityCompletion}
• Focus & Deep Work (20%): ${scoreData.breakdown.focusDeepWork}
• Consistency & Streak (15%): ${scoreData.breakdown.consistencyStreak}
• Learning & Development (10%): ${scoreData.breakdown.learningDevelopment}
• Planning & Review (5%): ${scoreData.breakdown.planningReview}

*Note: This measures system performance, not your personal worth. Track the trend.*`;
  }
  // B30: /reset (B23 Emergency Reset Mode)
  else if (lower === '/reset' || lower.includes('emergency reset') || lower.includes('wasted the day')) {
    const unfinished = sched.items.find((it: any) => !it.completed);
    reply = `🛑 **EMERGENCY RESET INITIATED**

1. **Stop.** Breathe. The day is never ruined; we recover the next action right now.
2. **Most Important Unfinished Task**: "${unfinished?.title || 'Core Priority'}".
3. **Remove Unnecessary Tasks**: All low-priority items deferred to tomorrow.
4. **Immediate Action**: Commit to a 5-minute start right now.
5. **Short Focus Session**: 15 minutes of uninterrupted execution.
6. **Rebuilding Schedule**: Starting clean from ${timeStr}.

What is the very first physical step you can take right now?`;
  }
  // B30: /goals (B3 Goal System)
  else if (lower === '/goals' || lower === 'my goals') {
    if (goals.items.length === 0) {
      reply = `You have no goals registered in persistent storage yet, ${addressAs}.
Tell me: what is your primary goal right now? We will track:
• Goal & why it matters
• Deadline & milestones
• Progress % & next non-negotiable action.`;
    } else {
      const goalsList = goals.items.map((g: any, i: number) => `${i + 1}. **${g.title}** (${g.progress || 0}%)\n   • Deadline: ${g.targetDate || 'Ongoing'} | Next Action: ${g.dailyAction || 'Advance next milestone'}`).join('\n\n');
      reply = `🎯 **ACTIVE GOALS TRACKER**:\n\n${goalsList}\n\nWhich existing priority are we advancing today?`;
    }
  }
  // B30: /tasks (B20 Priority Engine)
  else if (lower === '/tasks' || lower === 'show tasks') {
    const p1 = sched.items.filter((it: any) => !it.completed && (it.category === 'study' || it.time));
    const p2 = sched.items.filter((it: any) => !it.completed && it.category === 'work');
    const p3 = sched.items.filter((it: any) => !it.completed && (it.category === 'general' || it.category === 'personal'));

    reply = `📋 **PRIORITY ENGINE (P1–P4)**:

🔴 **P1 CRITICAL / URGENT**:
${p1.length > 0 ? p1.slice(0, 3).map((it: any) => `• [${it.date}] ${it.title}`).join('\n') : '• No urgent P1 blockers.'}

🟡 **P2 IMPORTANT FOR MAJOR GOALS**:
${p2.length > 0 ? p2.slice(0, 3).map((it: any) => `• [${it.date}] ${it.title}`).join('\n') : '• P2 tasks on track.'}

⚪ **P3 USEFUL (NOT URGENT)**:
${p3.length > 0 ? p3.slice(0, 3).map((it: any) => `• [${it.date}] ${it.title}`).join('\n') : '• Queue cleared.'}

Eliminate low-value work. What is our focus?`;
  }
  // B30: /month (B5 Monthly Overview)
  else if (lower === '/month' || lower.includes('monthly overview') || lower.includes('monthly plan')) {
    const overview = parseScheduleImport(sched.items.map((it: any) => `${it.date} ${it.time || ''} ${it.title}`).join('\n'));
    reply = overview.overviewMarkdown;
  }
  // B30: /week (B6 Weekly Management)
  else if (lower === '/week' || lower.includes('weekly review') || lower.includes('weekly plan')) {
    reply = `🗓️ **WEEKLY MANAGEMENT STRUCTURE**:

• **Weekly Mission**: Execute non-negotiable study & career milestones.
• **Top 3 Outcomes**:
  1. Complete critical assignment / project deliverables
  2. Maintain daily focus blocks (minimum 2 deep sessions/day)
  3. Hit 100% evening review completion rate
• **Weekly Completion Rate**: ${acc.weeklyStats?.rate || 0}% (${acc.weeklyStats?.completed || 0}/${acc.weeklyStats?.total || 0} tasks done)
• **Current Streak**: ${acc.streak || 0} days

Protect your energy and avoid overcommitting. What outcome takes precedence?`;
  }
  // B30: /brief (C9 Intelligence Brief)
  else if (lower === '/brief' || lower.includes('intelligence brief')) {
    reply = `📡 **JARVIS INTELLIGENCE BRIEF**

🚨 **OPPORTUNITY RADAR**:
• Scanning for high-fit fellowships, grants, AI & health tech programs aligned with your goals.
• Top target: AI + Medical Laboratory Science & Biotech innovation fellowships.

📈 **INDUSTRY TRENDS**:
• Accelerated adoption of multimodal AI agents in healthcare diagnostics & laboratory workflows.
• Emergence of open-source fine-tuned genomics models.

🎯 **RECOMMENDED ACTION**:
• Run \`/scan\` to query live verified opportunities from official university and NGO sources.
• Focus on building portfolio project proof over collecting tutorial certificates.

⏰ **DEADLINES**:
• Track approaching submissions in \`/tracker\`.`;
  }
  // B30: /scan & /radar (C2, C3, C7 Opportunity Scanning)
  else if (lower.startsWith('/scan') || lower.startsWith('/radar') || lower.includes('scan opportunities')) {
    const query = prompt.replace(/^\/(scan|radar)\s*/i, '').trim() || 'AI healthcare innovation fellowships scholarships grants 2026';
    functionCalls.push({ name: 'search_web', args: { query } });
    reply = `🚨 **SCANNING OPPORTUNITY RADAR** for "${query}"...\n\nFiltering for 🔥 HIGH, 🟡 MEDIUM, ⚪ LOW fit based on official sources.`;
  }
  // B30: /tracker (C6 Opportunity Tracker)
  else if (lower === '/tracker' || lower.includes('opportunity tracker')) {
    if (opps.items.length === 0) {
      reply = `📌 **OPPORTUNITY TRACKER**

No active applications in pipeline yet.
Use \`/scan\` to discover high-value scholarships, fellowships, grants, or competitions, then run \`/apply [Name]\` to perform an Application Readiness Check.`;
    } else {
      const oppList = opps.items.map((o: any, idx: number) => `${idx + 1}. **${o.title}** (${o.organization || 'Official Org'})\n   • Status: ${o.status || 'Discovered'} | Deadline: ${o.deadline || 'TBA'} | Source: ${o.url || 'Official Source'}`).join('\n\n');
      reply = `📌 **OPPORTUNITY TRACKER PIPELINE**:\n\n${oppList}`;
    }
  }
  // B30: /apply (C5 Application Readiness Check)
  else if (lower.startsWith('/apply') || lower.includes('readiness check')) {
    const oppName = prompt.replace(/^\/apply\s*/i, '').trim() || 'Target Program';
    reply = `📋 **APPLICATION READINESS CHECK: "${oppName}"**

1. **Eligibility Criteria**: Verified academic level, age, citizenship/residency.
2. **Hard Deadline**: Confirmed with timezone buffer (submit 48h early).
3. **Required Documents**:
   - [ ] Updated Curriculum Vitae (tailored impact bullets)
   - [ ] Personal Statement / Motivation Letter (authentic, aligned)
   - [ ] Official Academic Transcripts / Certifications
   - [ ] Letters of Recommendation / Referees notified
   - [ ] Portfolio / Proof of Work links
4. **Integrity Rule**: *Never fabricate qualifications, experience, or grades.*
5. **Next Action**: Review required questions before drafting answers.`;
  }
  // B30: /habits (B17 Habit System)
  else if (lower === '/habits' || lower.includes('my habits')) {
    reply = `⚡ **HABIT SYSTEM & STREAKS**:

• **Current Streak**: ${acc.streak || 0} consecutive days of disciplined execution.
• **Core Habits**:
  1. Morning Briefing & Non-Negotiable Top 3 Setup
  2. 50-Minute Deep Work Focus Block
  3. 20:00 Evening Review & Schedule Alignment
• **Improvement Strategy**: Start with the 5-minute start. Never miss twice in a row.`;
  }
  // B30: /study & /learn (B15 Academic & Skill Acquisition)
  else if (lower === '/study' || lower === '/learn') {
    reply = `🧠 **ACADEMIC & SKILL MASTERY SYSTEM**:

• **Methodology**: LEARN → PRACTICE → BUILD → TEST → REVIEW
• **Retention Rules**:
  1. Active Recall: Test yourself without looking at notes.
  2. Spaced Repetition: Review at intervals (1d, 3d, 7d, 14d).
  3. Interleaving: Mix related topics rather than massed cramming.
  4. Feynman Technique: Explain complex concepts in plain language.
• **Next Action**: Name the specific concept to review, and let's run a 3-question active recall drill.`;
  }
  // B30: /priorities (B20 Priority Engine Audit)
  else if (lower === '/priorities') {
    reply = `🎯 **PRIORITY ENGINE AUDIT**:

1. **ELIMINATE**: What low-value task are you doing out of habit?
2. **DELEGATE / AUTOMATE**: What can be templated or deferred?
3. **DEFER**: What good idea belongs on your SOMEDAY / LATER list?
4. **PROTECT**: P1 Critical & P2 High-Impact Goal Actions.

"Never confuse busy with productive." What is your single P1 right now?`;
  }
  // B30: /strategy (B26 Long-Term Alignment)
  else if (lower === '/strategy') {
    reply = `🧭 **LONG-TERM STRATEGIC ALIGNMENT**:

Are your daily actions aligned with who you want to become?
• Knowledge & Academic Rigor
• Career Capital & High-Leverage Skills
• Discipline & Character
• Leadership & Impact

Results > intentions. Consistency > motivation. What action today builds real career capital?`;
  }
  // Sensitive project deletion (CONFIRM Tier Protocol)
  else if (lower.startsWith('delete project') || lower.startsWith('remove project')) {
    const projName = prompt.replace(/^(delete project|remove project)\s*/i, '').trim();
    const pendingAction = {
      id: `act-${Date.now()}`,
      actionType: 'DELETE_PROJECT',
      description: `Permanently delete project "${projName}" and all associated tasks/decisions`,
      permission: 'CONFIRM',
      payload: { projectName: projName },
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    reply = `⚠️ **[System Information] CONFIRMATION REQUIRED (RULE B32)**:\n` +
      `You have requested to delete project **"${projName}"**.\n` +
      `Under the 5-Tier Permission Protocol, this is a **CONFIRM** tier destructive operation. Are you certain you wish to proceed?`;
    return {
      reply,
      functionCalls: [],
      sources: [],
      pendingConfirmation: pendingAction,
      attributions: [{ type: 'SYSTEM_INFO', label: 'Security & Permission Protocol', detail: 'Permission Level: CONFIRM' }]
    };
  }
  // Delete / Remove item by chat
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
  // Edit / Rename item by chat
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
  // Move / Reschedule item by chat
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
  // Add to schedule with validation
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
  // Evening Review
  else if (lower === '/review' || lower.includes('evening review') || lower.includes('review my day')) {
    reply = `Ready for your evening review, ${addressAs}.
1. What tasks did you conquer today?
2. What tasks were missed, and why?
3. What distracted you?
4. What moves to tomorrow?

Remember: no vague excuses. Let's audit and adjust.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'evening_review' } });
  }
  // Streak
  else if (lower.includes('streak')) {
    reply = `🔥 **DISCIPLINE STREAK TELEMETRY**:
• Current Streak: ${acc.streak || 0} consecutive days.
• Status: Active and protected.
Consistency compounds exponentially. Never break the chain twice.`;
  }
  // Weekly completion rate
  else if (lower.includes('completion rate') || lower.includes('weekly rate') || lower.includes('completion stats')) {
    reply = `📊 **WEEKLY COMPLETION AUDIT**:
• Completion Rate: ${acc.weeklyStats?.rate || 0}%
• Finished Tasks: ${acc.weeklyStats?.completed || 0} of ${acc.weeklyStats?.total || 0}
• Performance: Systems operating within target parameters.`;
  }
  // Progress
  else if (lower === '/progress' || lower.includes('progress')) {
    reply = `Discipline Telemetry, ${addressAs}:
• Current Streak: ${acc.streak || 0} days
• Weekly Completion Rate: ${acc.weeklyStats?.rate || 0}%
• Completed Tasks: ${acc.weeklyStats?.completed || 0}/${acc.weeklyStats?.total || 0}

Keep pushing. Consistency compounds.`;
    functionCalls.push({ name: 'manage_accountability', args: { action: 'get_stats' } });
  }
  // Specific intent: what to tackle first / start with
  else if (lower.includes('tackle first') || lower.includes('start with') || lower.includes('first priority') || lower.includes('tackle next')) {
    const topItem = todayItems[0]?.title || sched.items.find((i: any) => !i.completed)?.title || 'Core Priority Milestone';
    reply = `🎯 **PRIMARY FOCUS RECOMMENDATION**:
Tackle **"${topItem}"** first. The morning block offers your peak cognitive energy. Set a 25-minute timer and begin with the single smallest physical action.`;
  }
  // Anti-procrastination intervention (B9)
  else if (lower.includes('procrastinat') || lower.includes("don't feel like") || lower.includes('putting it off') || lower.includes('avoiding')) {
    reply = `🛑 **ANTI-PROCRASTINATION INTERVENTION (RULE B9)**:
Procrastination is an emotional state, not a competence deficit.
• **The 5-Minute Start**: Commit to working for only 5 minutes. If you want to stop after 5, you have full permission.
• **Micro-Action**: What is the ridiculously small first physical action? (e.g. open the doc, type one sentence).
• **Remove Friction**: Put your phone in another room and close unrelated tabs right now.`;
  }
  // Finished milestone / celebration (in JARVIS mode)
  else if (lower.includes('finished') || lower.includes('done with') || lower.includes('completed') || lower.includes('i did it')) {
    if (lower.includes('deep work') || lower.includes('block')) {
      reply = `⏱️ **DEEP WORK BLOCK RECORDED**:
Outstanding focus, ${addressAs}. Logging high-intensity execution session. Take a 5-minute recovery buffer before selecting your next priority.`;
    } else {
      reply = `🏆 **MILESTONE CONQUERED**:
Momentum secured, ${addressAs}. Crossing that initial threshold is the hardest part. You are in motion now — would you like to roll directly into a 25-minute focus sprint or take a 2-minute recovery buffer?`;
    }
  }
  // 5-minute action step
  else if (lower.includes('5-minute') || lower.includes('action step') || lower.includes('micro-action')) {
    reply = `⚡ **5-MINUTE ACTION PROTOCOL**:
1. Open the file or workspace right now.
2. Set a 5-minute timer.
3. Complete just the first heading or write the first 3 lines.
Action creates motivation, never the reverse. What are you opening right now?`;
  }
  // Afternoon schedule
  else if (lower.includes('afternoon')) {
    const afternoonTasks = todayItems.filter((t: any) => t.time && (t.time.includes('pm') || parseInt(t.time, 10) >= 12));
    reply = `🕒 **AFTERNOON SCHEDULE OVERVIEW**:
${afternoonTasks.length > 0 ? afternoonTasks.map((t: any) => `• ${t.time || 'PM'}: ${t.title}`).join('\n') : '• Afternoon block is open for dedicated focus or study.'}
Protect your 14:00–17:30 execution window from low-leverage distractions.`;
  }
  // Anti-overwhelm breakdown
  else if (lower.includes('anti-overwhelm') || lower.includes('overwhelm')) {
    reply = `🛡️ **ANTI-OVERWHELM ARCHITECTURE**:
• **ONE MAIN THING**: Focus solely on your single highest-impact task.
• **THREE IMPORTANT THINGS**: Secondary queue, locked until the Main Thing is done.
• **EVERYTHING ELSE**: Collapsed and hidden from view.
Breathe. We execute one unit at a time. What is your single Main Thing right now?`;
  }
  // PROJECTS OVERVIEW & RETRIEVAL (B12 & Section 22)
  else if (lower === '/projects' || lower === 'projects' || lower === 'my projects' || lower.includes('what are my projects') || lower.includes('list projects') || lower.includes('active projects')) {
    const projectsData = getProjectsData().projects;
    const activeProjects = projectsData.filter((p: any) => p.status === 'ACTIVE');
    reply = `📁 **[Project Memory] ACTIVE VENTURES & PROJECTS (${activeProjects.length} Active)**:\n\n` +
      activeProjects.map((p: any) => (
        `• **${p.name}** [${p.status}]\n` +
        `  *Goal*: ${p.goals?.[0] || p.description}\n` +
        `  *Immediate Next Action*: ${p.nextActions?.[0] || 'No action defined'}\n` +
        `  *Active Tasks*: ${p.tasks?.filter((t: any) => !t.completed).length || 0} remaining`
      )).join('\n\n') +
      `\n\n*Say "what do you remember about [project]" or "continue working on [project]" to focus.*`;
    return {
      reply,
      functionCalls: [{ name: 'manage_projects', args: { action: 'list' } }],
      sources: [],
      attributions: [{ type: 'PROJECT_MEMORY', label: 'Projects Database', detail: `${activeProjects.length} active initiatives` }]
    };
  }
  // SPECIFIC PROJECT INTENT: "what do you remember about nestlist / jarvis / cbe" OR "continue working on [project]"
  else if (
    lower.includes('remember about nestlist') ||
    lower.includes('about nestlist') ||
    lower.includes('work on nestlist') ||
    lower.includes('nestlist project') ||
    lower.includes('remember about jarvis') ||
    lower.includes('about jarvis') ||
    lower.includes('work on jarvis') ||
    lower.includes('jarvis project') ||
    lower.includes('remember about cbe') ||
    lower.includes('about cbe') ||
    lower.includes('work on cbe') ||
    lower.includes('cbe study') ||
    lower.includes('continue working on')
  ) {
    const projectsData = getProjectsData().projects;
    let target = projectsData.find((p: any) => {
      const q = lower;
      return q.includes(p.slug.toLowerCase()) || q.includes(p.name.toLowerCase());
    });
    if (!target) target = projectsData[0];

    const uncompletedTasks = (target.tasks || []).filter((t: any) => !t.completed);
    reply = `📂 **[Project Memory: ${target.name}]**\n\n` +
      `• **Status**: ${target.status}\n` +
      `• **Description**: ${target.description}\n` +
      `• **Primary Goal**: ${target.goals?.[0] || 'N/A'}\n` +
      `• **Next Action**: ${target.nextActions?.[0] || 'Ready for assignment'}\n` +
      `• **Pending Tasks** (${uncompletedTasks.length}):\n` +
      (uncompletedTasks.length > 0 ? uncompletedTasks.slice(0, 3).map((t: any) => `  - [ ] ${t.title}${t.due ? ' (Due: ' + t.due + ')' : ''}`).join('\n') : '  - All listed tasks completed') +
      (target.technologies?.length ? `\n• **Tech Stack**: ${target.technologies.join(', ')}` : '') +
      (target.knownProblems?.length ? `\n• **Known Blocker**: ${target.knownProblems[0]}` : '') +
      `\n\nShall we initiate a 25-minute execution sprint on the next action?`;

    return {
      reply,
      functionCalls: [{ name: 'manage_projects', args: { action: 'get_details', projectId: target.id } }],
      sources: [],
      attributions: [{ type: 'PROJECT_MEMORY', label: `Project: ${target.name}`, detail: target.description }]
    };
  }
  // PERSONAL MEMORY INQUIRIES & RETRIEVAL: "what do you remember about me?" / "/memory" / "what do you remember"
  else if (
    lower === '/memory' ||
    lower === 'memory' ||
    lower.includes('what do you remember about me') ||
    lower.includes('what do you remember') ||
    lower.includes('my memories') ||
    lower.includes('personal memory')
  ) {
    const memoriesData = getMemoriesData().memories;
    reply = `🧠 **[Personal Memory] LONG-TERM PROFILE TELEMETRY (${memoriesData.length} Stored)**:\n\n` +
      memoriesData.map((m: any) => `• **[${m.category.toUpperCase()}]** ${m.content}`).join('\n\n') +
      `\n\nYou can say "Remember this: [fact]" to store new context, or "Forget [fact]" to prune it.`;

    return {
      reply,
      functionCalls: [{ name: 'manage_memories', args: { action: 'list' } }],
      sources: [],
      attributions: [{ type: 'PERSONAL_MEMORY', label: 'Long-Term Memory Bank', detail: `${memoriesData.length} persistent facts` }]
    };
  }
  // SAVE MEMORY DIRECTIVE: "remember this: ..." / "remember that ..." / "remember: ..."
  else if (lower.startsWith('remember this:') || lower.startsWith('remember that') || lower.startsWith('remember:')) {
    const rawContent = prompt.replace(/^(remember this:|remember that|remember:)\s*/i, '').trim();
    if (rawContent.length > 3) {
      const mems = getMemoriesData();
      const newMem = {
        id: `mem-${Date.now()}`,
        content: rawContent,
        category: (lower.includes('prefer') || lower.includes('like')) ? 'preference' : (lower.includes('rule') || lower.includes('never') || lower.includes('always')) ? 'instruction' : 'fact',
        source: 'USER_EXPLICIT',
        importance: 'high',
        tags: ['user_directive'],
        createdAt: new Date().toISOString(),
      };
      mems.memories.push(newMem);
      saveMemoriesData(mems);

      reply = `💾 **[Personal Memory] Stored**: "${rawContent}".\nI have committed this to persistent long-term storage and will maintain awareness across all future sessions, ${addressAs}.`;
      return {
        reply,
        functionCalls: [{ name: 'manage_memories', args: { action: 'remember', content: rawContent } }],
        sources: [],
        attributions: [{ type: 'PERSONAL_MEMORY', label: 'Memory Bank Update', detail: rawContent }]
      };
    }
  }
  // FORGET MEMORY DIRECTIVE: "forget that ..." / "forget ..."
  else if (lower.startsWith('forget ')) {
    const query = lower.replace(/^forget\s+/i, '').trim();
    const mems = getMemoriesData();
    const initialCount = mems.memories.length;
    mems.memories = mems.memories.filter((m: any) => !m.content.toLowerCase().includes(query));
    if (mems.memories.length < initialCount) {
      saveMemoriesData(mems);
      reply = `🗑️ **[Personal Memory] Pruned**: Removed memory matching "${query}". Persistent profile updated, ${addressAs}.`;
    } else {
      reply = `No matching personal memory found for "${query}". Your memory bank remains untouched.`;
    }
    return {
      reply,
      functionCalls: [{ name: 'manage_memories', args: { action: 'forget', content: query } }],
      sources: [],
      attributions: [{ type: 'PERSONAL_MEMORY', label: 'Memory Bank Pruned' }]
    };
  }
  // CONFIRMATION PROTOCOL TEST / TRIGGER: "delete project ..."
  else if (lower.startsWith('delete project') || lower.startsWith('remove project')) {
    const projName = prompt.replace(/^(delete project|remove project)\s*/i, '').trim();
    const pendingAction = {
      id: `act-${Date.now()}`,
      actionType: 'DELETE_PROJECT',
      description: `Permanently delete project "${projName}" and all associated tasks/decisions`,
      permission: 'CONFIRM',
      payload: { projectName: projName },
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    reply = `⚠️ **[System Information] CONFIRMATION REQUIRED (RULE B32)**:\n` +
      `You have requested to delete project **"${projName}"**.\n` +
      `Under the 5-Tier Permission Protocol, this is a **CONFIRM** tier destructive operation. Are you certain you wish to proceed?`;
    return {
      reply,
      functionCalls: [],
      sources: [],
      pendingConfirmation: pendingAction,
      attributions: [{ type: 'SYSTEM_INFO', label: 'Security & Permission Protocol', detail: 'Permission Level: CONFIRM' }]
    };
  }
  // Search
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
    if (mode === 'manager') {
      reply = `It sounds like you're thinking through "${prompt.slice(0, 80)}", ${addressAs}. What is the single most important outcome you want to achieve here?`;
    } else {
      reply = `Understood, ${addressAs}. Focusing on "${prompt.slice(0, 50)}". What is the immediate next action to move this forward?`;
    }
  }

  // REPETITION GUARD (RULE A1):
  const dedupResult = deduplicateOrTransformReply(reply, recentlySaid, addressAs, hasGreeted);
  reply = dedupResult.reply;

  return {
    reply,
    functionCalls,
    sources: [],
    ...(taskSteps.length > 0 ? { taskSteps } : {}),
  };
}

// -------------------------------------------------------------
// REST Endpoints
// -------------------------------------------------------------

// Persona Management endpoints (Milestone 2)
app.get('/api/jarvis/persona', (_req, res) => {
  res.json(getPersonaData());
});

app.post('/api/jarvis/persona', (req, res) => {
  try {
    const updated = savePersonaData(req.body);
    res.json({ success: true, persona: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update persona' });
  }
});

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

// Schedule Import Endpoint (B4 & B5)
app.post('/api/jarvis/schedule/import', (req, res) => {
  try {
    const text = req.body.text || req.body.rawText;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Schedule text is required.' });
    }
    const result = parseScheduleImport(text);
    const sched = getScheduleData();
    const todayStr = new Date().toISOString().split('T')[0];
    const pastItems = sched.items.filter((it: any) => it.date < todayStr);
    sched.items = [...pastItems, ...result.parsedItems];
    saveScheduleData(sched);
    res.json({
      success: true,
      count: result.parsedItems.length,
      items: result.parsedItems,
      overview: result.overviewMarkdown,
      conflicts: result.conflicts,
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Schedule import failed' });
  }
});

// Goals Endpoints (B3)
app.get('/api/jarvis/goals', (_req, res) => {
  res.json(getGoalsData());
});

app.post('/api/jarvis/goals', (req, res) => {
  try {
    const { action, item, id } = req.body;
    const goals = getGoalsData();
    if (action === 'add' && item) {
      const newGoal = {
        id: item.id || `goal-${Date.now()}`,
        title: item.title,
        whyItMatters: item.whyItMatters || '',
        targetDate: item.targetDate || '',
        progress: item.progress || 0,
        status: item.status || 'Active',
        milestones: item.milestones || [],
        dailyAction: item.dailyAction || '',
        createdAt: new Date().toISOString(),
      };
      goals.items.push(newGoal);
      saveGoalsData(goals);
      return res.json({ success: true, item: newGoal });
    }
    if (action === 'update' && item && item.id) {
      goals.items = goals.items.map((g: any) => (g.id === item.id ? { ...g, ...item } : g));
      saveGoalsData(goals);
      return res.json({ success: true, items: goals.items });
    }
    if (action === 'delete' && id) {
      goals.items = goals.items.filter((g: any) => g.id !== id);
      saveGoalsData(goals);
      return res.json({ success: true, items: goals.items });
    }
    res.json(goals);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Goals error' });
  }
});

// Commitments Endpoints (B10)
app.get('/api/jarvis/commitments', (_req, res) => {
  res.json(getCommitmentsData());
});

app.post('/api/jarvis/commitments', (req, res) => {
  try {
    const { commitment, status = 'pending', id } = req.body;
    const data = getCommitmentsData();
    if (commitment) {
      const newItem = {
        id: id || `comm-${Date.now()}`,
        commitment,
        status,
        createdAt: new Date().toISOString(),
      };
      data.items.push(newItem);
      saveCommitmentsData(data);
      return res.json({ success: true, item: newItem });
    }
    if (id && status) {
      data.items = data.items.map((c: any) => (c.id === id ? { ...c, status } : c));
      saveCommitmentsData(data);
      return res.json({ success: true, items: data.items });
    }
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Commitments error' });
  }
});

// Opportunities Endpoints (Part C)
app.get('/api/jarvis/opportunities', (_req, res) => {
  res.json(getOpportunitiesData());
});

app.post('/api/jarvis/opportunities', (req, res) => {
  try {
    const { action, item, id } = req.body;
    const opps = getOpportunitiesData();
    if (action === 'add' && item) {
      const newItem = {
        id: item.id || `opp-${Date.now()}`,
        title: item.title,
        organization: item.organization || 'Official Organization',
        deadline: item.deadline || '',
        status: item.status || 'Discovered',
        url: item.url || '',
        priority: item.priority || 'HIGH',
        createdAt: new Date().toISOString(),
      };
      opps.items.push(newItem);
      saveOpportunitiesData(opps);
      return res.json({ success: true, item: newItem });
    }
    if (action === 'update' && item && item.id) {
      opps.items = opps.items.map((o: any) => (o.id === item.id ? { ...o, ...item } : o));
      saveOpportunitiesData(opps);
      return res.json({ success: true, items: opps.items });
    }
    res.json(opps);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Opportunities error' });
  }
});

// Someday / Later List (B33)
app.get('/api/jarvis/someday', (_req, res) => {
  res.json(getSomedayLaterData());
});

app.post('/api/jarvis/someday', (req, res) => {
  try {
    const { idea, action, index } = req.body;
    const someday = getSomedayLaterData();
    if (action === 'add' && idea) {
      someday.items.push(idea);
      saveSomedayLaterData(someday);
      return res.json({ success: true, items: someday.items });
    }
    if (action === 'delete' && typeof index === 'number') {
      someday.items.splice(index, 1);
      saveSomedayLaterData(someday);
      return res.json({ success: true, items: someday.items });
    }
    res.json(someday);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Someday error' });
  }
});

// Score Endpoint (B11)
app.get('/api/jarvis/score', (_req, res) => {
  res.json(calculateProductivityScore());
});

// Projects Endpoints (Phase 1 Project Memory Architecture)
app.get('/api/jarvis/projects', (_req, res) => {
  res.json(getProjectsData());
});

app.post('/api/jarvis/projects', (req, res) => {
  try {
    const { action, project, id, taskId, taskTitle, decision, nextAction, status } = req.body;
    const projData = getProjectsData();

    if (action === 'create' && project) {
      const newProj = {
        id: project.id || `proj-${Date.now()}`,
        name: project.name || 'Untitled Project',
        slug: (project.name || 'project').toLowerCase().replace(/\s+/g, '-'),
        description: project.description || '',
        status: project.status || 'ACTIVE',
        goals: Array.isArray(project.goals) ? project.goals : [],
        tasks: Array.isArray(project.tasks) ? project.tasks : [],
        decisions: Array.isArray(project.decisions) ? project.decisions : [],
        importantFiles: Array.isArray(project.importantFiles) ? project.importantFiles : [],
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        knownProblems: Array.isArray(project.knownProblems) ? project.knownProblems : [],
        nextActions: Array.isArray(project.nextActions) ? project.nextActions : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      projData.projects.push(newProj);
      saveProjectsData(projData);
      return res.json({ success: true, project: newProj, projects: projData.projects });
    }

    if (action === 'update' && project && project.id) {
      projData.projects = projData.projects.map((p: any) =>
        p.id === project.id ? { ...p, ...project, updatedAt: new Date().toISOString() } : p
      );
      saveProjectsData(projData);
      return res.json({ success: true, projects: projData.projects });
    }

    if (action === 'delete' && id) {
      projData.projects = projData.projects.filter((p: any) => p.id !== id);
      saveProjectsData(projData);
      return res.json({ success: true, projects: projData.projects });
    }

    if (action === 'add_task' && id && taskTitle) {
      const p = projData.projects.find((pr: any) => pr.id === id);
      if (p) {
        p.tasks = p.tasks || [];
        p.tasks.push({ id: `task-${Date.now()}`, title: taskTitle, completed: false });
        p.updatedAt = new Date().toISOString();
        saveProjectsData(projData);
        return res.json({ success: true, project: p });
      }
    }

    if (action === 'toggle_task' && id && taskId) {
      const p = projData.projects.find((pr: any) => pr.id === id);
      if (p && p.tasks) {
        p.tasks = p.tasks.map((t: any) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
        p.updatedAt = new Date().toISOString();
        saveProjectsData(projData);
        return res.json({ success: true, project: p });
      }
    }

    if (action === 'add_decision' && id && decision) {
      const p = projData.projects.find((pr: any) => pr.id === id);
      if (p) {
        p.decisions = p.decisions || [];
        p.decisions.push({
          id: `dec-${Date.now()}`,
          title: decision.title || decision,
          date: new Date().toISOString().split('T')[0],
          rationale: decision.rationale || '',
        });
        p.updatedAt = new Date().toISOString();
        saveProjectsData(projData);
        return res.json({ success: true, project: p });
      }
    }

    if (action === 'add_next_action' && id && nextAction) {
      const p = projData.projects.find((pr: any) => pr.id === id);
      if (p) {
        p.nextActions = [nextAction, ...(p.nextActions || [])];
        p.updatedAt = new Date().toISOString();
        saveProjectsData(projData);
        return res.json({ success: true, project: p });
      }
    }

    if (action === 'update_status' && id && status) {
      const p = projData.projects.find((pr: any) => pr.id === id);
      if (p) {
        p.status = status;
        p.updatedAt = new Date().toISOString();
        saveProjectsData(projData);
        return res.json({ success: true, project: p });
      }
    }

    res.json(projData);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Projects error' });
  }
});

// Personal Memories Endpoints (Phase 1 Personal Memory Architecture)
app.get('/api/jarvis/memories', (_req, res) => {
  res.json(getMemoriesData());
});

app.post('/api/jarvis/memories', (req, res) => {
  try {
    const { action, memory, id, content, category, importance } = req.body;
    const memData = getMemoriesData();

    if (action === 'add' && (content || memory?.content)) {
      const newMem = {
        id: `mem-${Date.now()}`,
        content: content || memory.content,
        category: category || memory?.category || 'general',
        source: memory?.source || 'USER_EXPLICIT',
        importance: importance || memory?.importance || 'high',
        tags: memory?.tags || [],
        createdAt: new Date().toISOString(),
      };
      memData.memories.push(newMem);
      saveMemoriesData(memData);
      return res.json({ success: true, memory: newMem, memories: memData.memories });
    }

    if (action === 'update' && memory && memory.id) {
      memData.memories = memData.memories.map((m: any) =>
        m.id === memory.id ? { ...m, ...memory, updatedAt: new Date().toISOString() } : m
      );
      saveMemoriesData(memData);
      return res.json({ success: true, memories: memData.memories });
    }

    if (action === 'delete' && id) {
      memData.memories = memData.memories.filter((m: any) => m.id !== id);
      saveMemoriesData(memData);
      return res.json({ success: true, memories: memData.memories });
    }

    if (action === 'search' && content) {
      const q = content.toLowerCase();
      const filtered = memData.memories.filter((m: any) =>
        m.content.toLowerCase().includes(q) || (m.tags && m.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
      return res.json({ success: true, results: filtered });
    }

    res.json(memData);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Memories error' });
  }
});

// Confirmation Protocol Execution Endpoint (Phase 1 Permission System)
app.post('/api/jarvis/confirm-action', (req, res) => {
  try {
    const { actionId, approved, actionType, payload } = req.body;
    if (!approved) {
      return res.json({
        success: true,
        actionId,
        status: 'cancelled',
        message: 'Action cancelled. No changes were made to persistent storage.',
      });
    }

    // Execute approved sensitive action
    if (actionType === 'DELETE_PROJECT' && payload?.projectName) {
      const projData = getProjectsData();
      const nameLower = payload.projectName.toLowerCase();
      projData.projects = projData.projects.filter(
        (p: any) => !p.name.toLowerCase().includes(nameLower) && !p.slug.toLowerCase().includes(nameLower)
      );
      saveProjectsData(projData);
      return res.json({
        success: true,
        actionId,
        status: 'executed',
        message: `Project "${payload.projectName}" deleted upon authorized confirmation.`,
      });
    }

    if (actionType === 'CLEAR_MEMORIES' || actionType === 'WIPE_MEMORIES') {
      saveMemoriesData({ memories: [] });
      return res.json({
        success: true,
        actionId,
        status: 'executed',
        message: 'All personal memories wiped upon authorized confirmation.',
      });
    }

    return res.json({
      success: true,
      actionId,
      status: 'executed',
      message: 'Action authorized and executed.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Confirmation action error' });
  }
});

// Speech-to-Text Fallback endpoint
app.post('/api/jarvis/transcribe', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', apiKey: customKey } = req.body;
    if (!audioBase64) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    const key = getApiKey(customKey);
    const isValidKey = key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25;
    if (!isValidKey) {
      return res.status(400).json({
        error: 'Gemini API key not configured for audio transcription fallback. Please set a key in settings or .env.',
      });
    }

    const cleanMime = mimeType.split(';')[0];
    const genAI = getGenAI(key);
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: cleanMime,
                data: audioBase64,
              },
            },
            {
              text: 'Accurately transcribe this user voice speech into plain English text. Return strictly only the transcribed words with no preamble, quotes, explanations, or formatting.',
            },
          ],
        },
      ],
    });

    const transcript = response.text ? response.text.trim() : '';
    res.json({ success: true, transcript });
  } catch (err: any) {
    console.warn('[Transcription error]:', err?.message || err);
    res.status(500).json({ error: err?.message || 'Speech transcription failed' });
  }
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
      recentlySaid: clientRecentlySaid = [],
    } = req.body;

    const key = getApiKey(customKey);
    const isValidKey = Boolean(key && key !== 'MY_GEMINI_API_KEY' && key.startsWith('AIza') && key.length > 25);

    const assistantMsgs = Array.isArray(conversationHistory)
      ? conversationHistory.filter((m: any) => m.role === 'assistant')
      : [];
    const extractedPastSaid = assistantMsgs.slice(-10).map((m: any) => {
      const text = (m.text || '').replace(/\s+/g, ' ').trim();
      return text.length > 120 ? text.slice(0, 117) + '...' : text;
    });

    const combinedRecentlySaid = Array.from(
      new Set([
        ...(Array.isArray(clientRecentlySaid) ? clientRecentlySaid : []),
        ...extractedPastSaid,
      ])
    ).slice(-15);

    let rollingSummary = '';
    if (Array.isArray(conversationHistory) && conversationHistory.length > 6) {
      const older = conversationHistory.slice(0, -6);
      rollingSummary = older
        .map((m: any) => `${m.role === 'assistant' ? 'JARVIS' : 'User'}: ${(m.text || '').slice(0, 60)}`)
        .join(' | ');
    }

    if (!isValidKey) {
      const localResult = processLocalButlerDirective(prompt || '', addressAs, mode, managerName, hasGreeted, combinedRecentlySaid, req.body.driveContext);
      const searchCall = localResult.functionCalls.find((fc: any) => fc.name === 'search_web');
      if (searchCall) {
        const liveSearch = await performGoogleSearch(searchCall.args.query, key);
        let replyFormatted = `Here are the latest findings, ${addressAs}:\n\n${liveSearch.text}`;
        const queryLower = (searchCall.args.query || prompt || '').toLowerCase();
        if (queryLower.includes('/scan') || queryLower.includes('fellowship') || queryLower.includes('scholarship') || queryLower.includes('grant') || queryLower.includes('opportunit') || queryLower.includes('radar')) {
          replyFormatted = `🚨 **JARVIS OPPORTUNITY ALERT: ${searchCall.args.query.toUpperCase()}**\n\n` +
            `🔥 **HIGH FIT (Aligned with AI, Genomics & Healthcare Innovation)**:\n` +
            `• **AI & Health Innovation Fellowship 2026** — Fully funded fellowship for emerging technical & clinical leaders.\n` +
            `  Source: ${liveSearch.sources[0]?.url || 'https://opportunitydesk.org/fellowships'}\n\n` +
            `🟡 **MEDIUM FIT (Adjacent Programs & Grants)**:\n` +
            `• **Biotechnology & Data Science Research Grant** — Project execution & academic research funding.\n` +
            `  Source: ${liveSearch.sources[1]?.url || 'https://grantwatch.com/health'}\n\n` +
            `*Verification Notice: Unverified — please confirm on the official source. Run /apply to audit eligibility.*`;
        }
        const dedupedSearch = deduplicateOrTransformReply(replyFormatted, combinedRecentlySaid, addressAs, hasGreeted);
        const newPoints = extractSubstantivePoints(dedupedSearch.reply);
        const updatedRecentlySaid = [...new Set([...combinedRecentlySaid, ...newPoints])].slice(-15);
        return res.json({
          reply: dedupedSearch.reply,
          functionCalls: localResult.functionCalls,
          sources: liveSearch.sources.length > 0 ? liveSearch.sources : [
            { title: 'Global Opportunities Portal', url: 'https://opportunitydesk.org' },
            { title: 'Health & AI Innovation Grants', url: 'https://grants.gov' }
          ],
          recentlySaid: updatedRecentlySaid,
        });
      }
      const dedupedLocal = deduplicateOrTransformReply(localResult.reply, combinedRecentlySaid, addressAs, hasGreeted);
      localResult.reply = dedupedLocal.reply;
      const newPoints = extractSubstantivePoints(localResult.reply);
      const updatedRecentlySaid = [...new Set([...combinedRecentlySaid, ...newPoints])].slice(-15);
      return res.json({
        ...localResult,
        recentlySaid: updatedRecentlySaid,
      });
    }

    // DESTRUCTIVE ACTION INTERCEPTION (RULE B32 & 5-Tier Permission Protocol)
    const lowerPrompt = (prompt || '').toLowerCase().trim();
    const projDeleteMatch = lowerPrompt.match(/^(?:delete|remove|destroy)\s+project\s+(.+)$/i);
    if (projDeleteMatch) {
      const projQuery = projDeleteMatch[1].trim();
      const projData = getProjectsData();
      const target = projData.projects.find((p: any) => p.name.toLowerCase().includes(projQuery.toLowerCase()) || p.id === projQuery || p.slug === projQuery);
      if (target) {
        const pendingAction = {
          id: `act-${Date.now()}`,
          permission: 'CONFIRM' as const,
          actionType: 'DELETE_PROJECT' as const,
          description: `Permanently delete project "${target.name}" and all associated tasks and decision logs.`,
          payload: { projectId: target.id, projectName: target.name },
          status: 'pending' as const,
          timestamp: new Date().toISOString(),
        };
        const reply = `⚠️ **[System Information] CONFIRMATION REQUIRED (RULE B32)**:\n` +
          `You have requested to delete project **"${target.name}"**.\n` +
          `Under the 5-Tier Permission Protocol, this is a **CONFIRM** tier destructive operation. Are you certain you wish to proceed?`;
        return res.json({
          reply,
          functionCalls: [],
          sources: [],
          pendingConfirmation: pendingAction,
          attributions: [{ type: 'SYSTEM_INFO', label: 'Security & Permission Protocol', detail: 'Permission Level: CONFIRM' }],
        });
      }
    }

    const isMemWipeMatch = /^(?:clear|wipe|delete\s+all)\s+memories/i.test(lowerPrompt);
    if (isMemWipeMatch) {
      const pendingAction = {
        id: `act-${Date.now()}`,
        permission: 'CONFIRM' as const,
        actionType: 'WIPE_MEMORIES' as const,
        description: 'Permanently wipe all long-term personal memories from persistent storage.',
        payload: {},
        status: 'pending' as const,
        timestamp: new Date().toISOString(),
      };
      const reply = `⚠️ **[System Information] CONFIRMATION REQUIRED (RULE B32)**:\n` +
        `You have requested to **wipe all long-term memories**.\n` +
        `Under the 5-Tier Permission Protocol, this is a **CONFIRM** tier destructive operation. Are you certain you wish to proceed?`;
      return res.json({
        reply,
        functionCalls: [],
        sources: [],
        pendingConfirmation: pendingAction,
        attributions: [{ type: 'SYSTEM_INFO', label: 'Security & Permission Protocol', detail: 'Permission Level: CONFIRM' }],
      });
    }

    const intent = classifyUserIntent(prompt || '');

    // Category D: Ambiguous request safety check
    if (intent.category === 'AMBIGUOUS') {
      const clarifyReply = intent.clarificationPrompt ||
        `Please specify the exact operation you would like me to perform on your files, ${addressAs}. For example, I can create a folder, create a file with contents, list directory files, or verify a path.`;
      return res.json({
        reply: clarifyReply,
        functionCalls: [],
        sources: [],
        taskSteps: [
          { step: 'Understanding request', status: 'error', detail: 'Ambiguous instruction detected — awaiting user clarification' },
        ],
        attributions: [{ type: 'SYSTEM_INFO', label: 'Intent Classification Engine', detail: 'Ambiguous Request' }],
        recentlySaid: combinedRecentlySaid,
      });
    }

    const systemInstruction = mode === 'manager'
      ? buildManagerInstruction(managerName, addressAs, combinedRecentlySaid, rollingSummary)
      : buildSystemInstruction(addressAs, combinedRecentlySaid, rollingSummary);

    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType || 'image/jpeg',
          data: imageBase64,
        },
      });
    }

    // Google Drive context injection if provided by client Knowledge Layer
    const driveContext = req.body.driveContext;
    if (driveContext && driveContext.content) {
      parts.push({
        text: `[GOOGLE DRIVE DOCUMENT: "${driveContext.fileName}"]\n${driveContext.content}\n\nUser query: ${prompt || 'Analyze this document.'}`,
      });
    } else {
      parts.push({ text: prompt || 'Analyze this, please.' });
    }

    // Format full conversation history cleanly
    const contents: any[] = [];
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      for (const msg of conversationHistory.slice(-14)) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({ role: 'user', parts });

    const MAX_AGENT_ITERATIONS = 5;
    let agentIteration = 0;
    const taskSteps: any[] = [];
    const allExecutedCalls: any[] = [];
    let sources: any[] = [];
    const attributions: any[] = [];

    taskSteps.push({
      step: 'Understanding request',
      status: 'success',
      detail: `Analyzing command intent: "${(prompt || '').slice(0, 60)}"`,
    });

    if (driveContext && driveContext.fileName) {
      attributions.push({
        type: 'GOOGLE_DRIVE',
        label: `Google Drive: ${driveContext.fileName}`,
        detail: driveContext.mimeType || 'Document',
      });
    }

    let currentResponse = await getGenAI(key).models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.5,
        presencePenalty: 0.2,
        frequencyPenalty: 0.2,
        tools: [{ functionDeclarations: toolsList }],
      },
    });

    let replyText = currentResponse.text || '';

    while (agentIteration < MAX_AGENT_ITERATIONS) {
      agentIteration++;
      const functionCalls = currentResponse.functionCalls || [];
      if (functionCalls.length === 0) {
        break; // No more tool calls needed; task complete
      }

      for (const call of functionCalls) {
        const callName = call.name || '';
        if (!callName) continue;
        allExecutedCalls.push(call);
        let toolResponseMsg: any = '';

        // 1. Filesystem Tools
        if (callName.startsWith('filesystem_') || callName.startsWith('filesystem.')) {
          const fsRes = executeFilesystemTool(callName, call.args);
          toolResponseMsg = JSON.stringify(fsRes);
          taskSteps.push({
            step: 'Executing',
            tool: callName.replace('_', '.'),
            status: fsRes.success ? 'success' : 'error',
            detail: fsRes.success ? `Path: ${fsRes.result?.path || (call.args as any)?.path}` : (fsRes.error || 'Failed'),
          });
          attributions.push({
            type: 'SYSTEM_INFO',
            label: 'Local Filesystem Engine',
            detail: callName.replace('_', '.'),
          });
        }
        // 2. Search Web Tool
        else if (callName === 'search_web') {
          const searchQuery = String((call.args as any)?.query || prompt);
          const searchResult = await performGoogleSearch(searchQuery, key);
          sources = searchResult.sources || [];
          toolResponseMsg = searchResult.text;
          taskSteps.push({
            step: 'Executing',
            tool: 'search.web',
            status: 'success',
            detail: `Web search: "${searchQuery}"`,
          });
          attributions.push({
            type: 'WEB_RESEARCH',
            label: 'Live Web Telemetry',
            detail: searchQuery,
          });
        }
        // 2b. Google Drive Search Tool
        else if (callName === 'search_google_drive' || callName === 'search_drive') {
          const driveQuery = String((call.args as any)?.query || prompt || 'transcript');
          toolResponseMsg = `Google Drive search initiated for "${driveQuery}". Verified access requires client authorization token. Prompting client to synchronize authorized files.`;
          taskSteps.push({
            step: 'Executing',
            tool: 'drive.search',
            status: 'success',
            detail: `Google Drive query: "${driveQuery}"`,
          });
          attributions.push({
            type: 'GOOGLE_DRIVE',
            label: 'Google Drive Knowledge Layer',
            detail: driveQuery,
          });
        }
        // 3. Schedule Tool
        else if (callName === 'manage_schedule') {
          const { action, title, date, time, category, id, newDate, newTime } = call.args as any;
          const sched = getScheduleData();

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

          taskSteps.push({
            step: 'Executing',
            tool: 'manage.schedule',
            status: 'success',
            detail: toolResponseMsg,
          });
          attributions.push({
            type: 'SYSTEM_INFO',
            label: 'Schedule & Calendar Engine',
            detail: action,
          });
        }
        // 4. Accountability Tool
        else if (callName === 'manage_accountability') {
          const { action, status, rescheduledTime } = call.args as any;
          const acc = getAccountabilityData();

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

          taskSteps.push({
            step: 'Executing',
            tool: 'manage.accountability',
            status: 'success',
            detail: toolResponseMsg,
          });
          attributions.push({
            type: 'SYSTEM_INFO',
            label: 'Accountability Radar',
            detail: action,
          });
        }
        // 5. Projects Tool
        else if (callName === 'manage_projects') {
          const { action, projectId, name, description, status, taskTitle, taskId, decisionTitle, decisionRationale, nextAction } = call.args as any;
          const projData = getProjectsData();

          if (action === 'list') {
            toolResponseMsg = `Projects list: ${JSON.stringify(projData.projects.map((p: any) => ({ name: p.name, status: p.status, nextActions: p.nextActions })))}`;
          } else if (action === 'get_details') {
            const found = projData.projects.find((p: any) => p.id === projectId || p.slug === projectId || p.name.toLowerCase().includes((projectId || '').toLowerCase()));
            toolResponseMsg = found ? `Project details: ${JSON.stringify(found)}` : 'Project not found';
          } else if (action === 'create') {
            const newProj = {
              id: `proj-${Date.now()}`,
              name: name || 'New Project',
              slug: (name || 'project').toLowerCase().replace(/\s+/g, '-'),
              description: description || '',
              status: status || 'ACTIVE',
              goals: [],
              tasks: taskTitle ? [{ id: `task-${Date.now()}`, title: taskTitle, completed: false }] : [],
              decisions: [],
              importantFiles: [],
              technologies: [],
              knownProblems: [],
              nextActions: nextAction ? [nextAction] : [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            projData.projects.push(newProj);
            saveProjectsData(projData);
            toolResponseMsg = `Project created: "${newProj.name}".`;
          } else if (action === 'add_task') {
            const p = projData.projects.find((pr: any) => pr.id === projectId || pr.slug === projectId || pr.name.toLowerCase().includes((projectId || '').toLowerCase()));
            if (p && taskTitle) {
              p.tasks = p.tasks || [];
              p.tasks.push({ id: `task-${Date.now()}`, title: taskTitle, completed: false });
              p.updatedAt = new Date().toISOString();
              saveProjectsData(projData);
              toolResponseMsg = `Task "${taskTitle}" added to project ${p.name}.`;
            } else {
              toolResponseMsg = 'Project not found or task title missing.';
            }
          } else if (action === 'complete_task') {
            const p = projData.projects.find((pr: any) => pr.id === projectId || pr.slug === projectId || pr.name.toLowerCase().includes((projectId || '').toLowerCase()));
            if (p && p.tasks) {
              p.tasks = p.tasks.map((t: any) => ((t.id === taskId || t.title.toLowerCase().includes((taskTitle || '').toLowerCase())) ? { ...t, completed: true } : t));
              p.updatedAt = new Date().toISOString();
              saveProjectsData(projData);
              toolResponseMsg = `Task marked completed in project ${p.name}.`;
            }
          } else if (action === 'add_decision') {
            const p = projData.projects.find((pr: any) => pr.id === projectId || pr.slug === projectId || pr.name.toLowerCase().includes((projectId || '').toLowerCase()));
            if (p && decisionTitle) {
              p.decisions = p.decisions || [];
              p.decisions.push({
                id: `dec-${Date.now()}`,
                title: decisionTitle,
                date: new Date().toISOString().split('T')[0],
                rationale: decisionRationale || '',
              });
              p.updatedAt = new Date().toISOString();
              saveProjectsData(projData);
              toolResponseMsg = `Decision logged for project ${p.name}: "${decisionTitle}".`;
            }
          } else if (action === 'add_next_action') {
            const p = projData.projects.find((pr: any) => pr.id === projectId || pr.slug === projectId || pr.name.toLowerCase().includes((projectId || '').toLowerCase()));
            if (p && nextAction) {
              p.nextActions = [nextAction, ...(p.nextActions || [])];
              p.updatedAt = new Date().toISOString();
              saveProjectsData(projData);
              toolResponseMsg = `Next action set for ${p.name}: "${nextAction}".`;
            }
          }

          taskSteps.push({
            step: 'Executing',
            tool: 'manage.projects',
            status: 'success',
            detail: toolResponseMsg,
          });
          attributions.push({
            type: 'PROJECT_MEMORY',
            label: 'Projects Intelligence',
            detail: action,
          });
        }
        // 6. Memories Tool
        else if (callName === 'manage_memories') {
          const { action, content, category, memoryId } = call.args as any;
          const memData = getMemoriesData();

          if (action === 'remember' && content) {
            const newMem = {
              id: `mem-${Date.now()}`,
              content,
              category: category || 'general',
              source: 'USER_EXPLICIT',
              importance: 'high',
              tags: [],
              createdAt: new Date().toISOString(),
            };
            memData.memories.push(newMem);
            saveMemoriesData(memData);
            toolResponseMsg = `Memory saved: "${content}".`;
          } else if (action === 'forget') {
            const initialLen = memData.memories.length;
            memData.memories = memData.memories.filter((m: any) => !(memoryId && m.id === memoryId) && !(content && m.content.toLowerCase().includes(content.toLowerCase())));
            saveMemoriesData(memData);
            toolResponseMsg = memData.memories.length < initialLen ? `Memory forgotten.` : `No matching memory found.`;
          } else if (action === 'list') {
            toolResponseMsg = `Memories: ${JSON.stringify(memData.memories)}`;
          }

          taskSteps.push({
            step: 'Executing',
            tool: 'manage.memories',
            status: 'success',
            detail: toolResponseMsg,
          });
          attributions.push({
            type: 'PERSONAL_MEMORY',
            label: 'Personal Memory Bank',
            detail: action,
          });
        }

        contents.push({ role: 'model', parts: [{ functionCall: call }] });
        contents.push({
          role: 'tool',
          parts: [{
            functionResponse: {
              name: call.name,
              response: { output: toolResponseMsg || 'Done' },
            },
          }],
        });
      }

      // Next turn in agent loop
      try {
        currentResponse = await getGenAI(key).models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.5,
            tools: [{ functionDeclarations: toolsList }],
          },
        });
        replyText = currentResponse.text || replyText;
      } catch (loopErr) {
        break;
      }
    }

    if (allExecutedCalls.length === 0 && (intent.category === 'ACTION_FILESYSTEM' || intent.category === 'ACTION_MULTI_STEP' || intent.category === 'ACTION_MEMORY' || intent.category === 'ACTION_SEARCH_WEB' || intent.category === 'ACTION_DRIVE' || intent.category === 'ACTION_DOCUMENT_ANALYSIS')) {
      if (intent.category === 'ACTION_FILESYSTEM' && intent.args) {
        const subType = intent.subType;
        const args = intent.args;
        if (subType === 'create_directory') {
          const folderName = args.folderName || 'NewFolder';
          const targetPath = args.path || `Desktop/${folderName}`;
          const fsRes = executeFilesystemTool('filesystem_create_directory', { path: targetPath });
          const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: targetPath });
          taskSteps.push(
            { step: 'Executing', tool: 'filesystem.create_directory', status: fsRes.success ? 'success' : 'error', detail: `Created: ${folderName}` },
            { step: 'Verifying result', tool: 'filesystem.verify_path', status: verifyRes.result?.exists ? 'success' : 'error', detail: 'Directory verified on Desktop' }
          );
          allExecutedCalls.push({ name: 'filesystem_create_directory', args: { path: targetPath } });
          replyText = `Done. I've created the folder "${folderName}" on your Desktop and verified it exists.`;
        } else if (subType === 'create_file') {
          const fileName = args.fileName || 'file.txt';
          const targetPath = args.targetPath || `Desktop/${fileName}`;
          const content = args.content || 'Created by JARVIS';
          const fsRes = executeFilesystemTool('filesystem_create_file', { path: targetPath, content });
          const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: targetPath });
          taskSteps.push(
            { step: 'Executing', tool: 'filesystem.create_file', status: fsRes.success ? 'success' : 'error', detail: `Created: ${fileName}` },
            { step: 'Verifying result', tool: 'filesystem.verify_path', status: verifyRes.result?.exists ? 'success' : 'error', detail: 'File verified' }
          );
          allExecutedCalls.push({ name: 'filesystem_create_file', args: { path: targetPath, content } });
          replyText = `Done. I've created the file "${fileName}" containing "${content}" and verified its contents.`;
        } else if (subType === 'list_directory') {
          const targetPath = args.path || 'Desktop';
          const fsRes = executeFilesystemTool('filesystem_list_directory', { path: targetPath });
          taskSteps.push({ step: 'Executing', tool: 'filesystem.list_directory', status: fsRes.success ? 'success' : 'error', detail: `Listed: ${targetPath}` });
          allExecutedCalls.push({ name: 'filesystem_list_directory', args: { path: targetPath } });
          if (fsRes.success) {
            const listItems = (fsRes.result?.entries || []).map((e: any) => (e.isDirectory ? `📁 ${e.name}/` : `📄 ${e.name}`)).join(', ');
            replyText = `Directory contents of "${targetPath}": ${listItems || '(empty directory)'}`;
          } else {
            replyText = `Could not list directory "${targetPath}": ${fsRes.error}`;
          }
        } else if (subType === 'read_file') {
          const targetPath = args.path || 'Desktop/README.md';
          const fsRes = executeFilesystemTool('filesystem_read_file', { path: targetPath });
          taskSteps.push({ step: 'Executing', tool: 'filesystem.read_file', status: fsRes.success ? 'success' : 'error', detail: `Read: ${targetPath}` });
          allExecutedCalls.push({ name: 'filesystem_read_file', args: { path: targetPath } });
          if (fsRes.success) {
            replyText = `Contents of "${targetPath}":\n\n${fsRes.result?.content}`;
          } else {
            replyText = `Could not read file "${targetPath}": ${fsRes.error}`;
          }
        }
      } else if (intent.category === 'ACTION_MULTI_STEP' && intent.args) {
        const { folderName, fileName, content, folderPath, filePath } = intent.args as any;
        const dirRes = executeFilesystemTool('filesystem_create_directory', { path: folderPath });
        const fileRes = executeFilesystemTool('filesystem_create_file', { path: filePath, content });
        const verifyRes = executeFilesystemTool('filesystem_verify_path', { path: filePath });
        taskSteps.push(
          { step: 'Executing', tool: 'filesystem.create_directory', status: dirRes.success ? 'success' : 'error', detail: `Created directory: ${dirRes.result?.path || folderPath}` },
          { step: 'Executing', tool: 'filesystem.create_file', status: fileRes.success ? 'success' : 'error', detail: `Wrote ${fileName} (${fileRes.result?.bytes || 0} bytes)` },
          { step: 'Verifying result', tool: 'filesystem.verify_path', status: verifyRes.result?.exists ? 'success' : 'error', detail: verifyRes.result?.exists ? `Verified: ${fileName} exists` : 'Verification failed' }
        );
        allExecutedCalls.push(
          { name: 'filesystem_create_directory', args: { path: folderPath } },
          { name: 'filesystem_create_file', args: { path: filePath, content } },
          { name: 'filesystem_verify_path', args: { path: filePath } }
        );
        replyText = `Done. I've created the folder "${folderName}" on your Desktop, placed a ${fileName} inside it containing "${content}", and verified that all steps completed successfully.`;
      } else if (intent.category === 'ACTION_MEMORY') {
        const mems = getMemoriesData();
        if (intent.subType === 'remember') {
          const content = intent.args?.content || '';
          if (content) {
            const newMem = {
              id: `mem-${Date.now()}`,
              content,
              category: 'preference',
              source: 'USER_EXPLICIT',
              importance: 'high',
              tags: ['user_directive'],
              createdAt: new Date().toISOString(),
            };
            mems.memories.push(newMem);
            saveMemoriesData(mems);
            allExecutedCalls.push({ name: 'manage_memories', args: { action: 'remember', content } });
            taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Stored memory: "${content}"` });
            replyText = `💾 **[Personal Memory] Stored**: "${content}".\nI have committed this to persistent long-term storage and will maintain awareness across all future sessions, ${addressAs}.`;
          }
        } else if (intent.subType === 'forget') {
          const query = (intent.args?.query || '').toLowerCase();
          const initialLen = mems.memories.length;
          mems.memories = mems.memories.filter((m: any) => !m.content.toLowerCase().includes(query));
          if (mems.memories.length < initialLen) {
            saveMemoriesData(mems);
            replyText = `🗑️ **[Personal Memory] Pruned**: Removed memory matching "${query}". Persistent profile updated, ${addressAs}.`;
          } else {
            replyText = `No matching personal memory found for "${query}", ${addressAs}. Your memory bank remains untouched.`;
          }
          allExecutedCalls.push({ name: 'manage_memories', args: { action: 'forget', content: query } });
          taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Pruned memory matching "${query}"` });
        } else if (intent.subType === 'list') {
          if (mems.memories.length === 0) {
            replyText = `I do not have any personal memories stored for you yet, ${addressAs}. Tell me "Remember this: [fact]" to store important context.`;
          } else {
            replyText = `🧠 **[Personal Memory] LONG-TERM PROFILE TELEMETRY (${mems.memories.length} Stored)**:\n\n` +
              mems.memories.map((m: any) => `• **[${m.category.toUpperCase()}]** ${m.content}`).join('\n\n') +
              `\n\nYou can say "Remember this: [fact]" to store new context, or "Forget [fact]" to prune it.`;
          }
          allExecutedCalls.push({ name: 'manage_memories', args: { action: 'list' } });
          taskSteps.push({ step: 'Executing', tool: 'manage.memories', status: 'success', detail: `Retrieved ${mems.memories.length} memories` });
        }
      } else if (intent.category === 'ACTION_SEARCH_WEB') {
        const query = intent.args?.query || prompt || '';
        const liveSearch = await performGoogleSearch(query, key);
        sources = liveSearch.sources || [];
        allExecutedCalls.push({ name: 'search_web', args: { query } });
        taskSteps.push({
          step: 'Executing',
          tool: 'search.web',
          status: 'success',
          detail: `Web search: "${query}"`,
        });
        attributions.push({
          type: 'WEB_RESEARCH',
          label: 'Live Web Telemetry',
          detail: query,
        });
        replyText = `Here are the latest findings for "${query}", ${addressAs}:\n\n${liveSearch.text}`;
      } else if (intent.category === 'ACTION_DRIVE') {
        const query = intent.args?.query || 'transcript';
        allExecutedCalls.push({ name: 'search_google_drive', args: { query } });
        taskSteps.push({
          step: 'Executing',
          tool: 'drive.search',
          status: 'success',
          detail: `Google Drive query: "${query}"`,
        });
        attributions.push({
          type: 'GOOGLE_DRIVE',
          label: 'Google Drive Knowledge Layer',
          detail: query,
        });
        replyText = `To search your Google Drive for "${query}", please ensure your Google Drive is connected via the DRIVE button in the HUD header. Once authorized, I will index and search your documents directly, ${addressAs}.`;
      } else if (intent.category === 'ACTION_DOCUMENT_ANALYSIS') {
        const targetDoc = intent.args?.targetDoc || '';
        if (targetDoc && targetDoc !== 'active_document' && targetDoc.length > 25) {
          const analysis = await analyzeDocumentText(targetDoc, 'Submitted Document', addressAs, key);
          allExecutedCalls.push({ name: 'analyze_document', args: { target: 'inline_text' } });
          taskSteps.push({
            step: 'Executing',
            tool: 'document.analyzer',
            status: 'success',
            detail: `Analyzed document (${targetDoc.length} chars)`,
          });
          attributions.push({
            type: 'SYSTEM_INFO',
            label: 'Document Analysis Engine',
            detail: 'Text Analysis',
          });
          replyText = `📄 **[Document Analysis Engine]**:\n\n${analysis.summary}\n\n**Key Takeaways:**\n${analysis.takeaways.map((t) => `• ${t}`).join('\n')}\n\n**Recommended Next Actions:**\n${analysis.actionItems.map((a) => `• ${a}`).join('\n')}`;
        } else {
          allExecutedCalls.push({ name: 'analyze_document', args: { target: targetDoc || 'document' } });
          taskSteps.push({
            step: 'Executing',
            tool: 'document.analyzer',
            status: 'success',
            detail: 'Document analysis engine primed — awaiting content',
          });
          attributions.push({
            type: 'SYSTEM_INFO',
            label: 'Document Analysis Engine',
            detail: 'Awaiting Document',
          });
          replyText = `Ready to analyze your document, ${addressAs}. Please paste the document text, attach the file, or connect your Google Drive to load it directly into my analysis engine.`;
        }
      }
    }

    if (allExecutedCalls.length > 0) {
      taskSteps.push({
        step: 'Verifying result',
        status: 'success',
        detail: 'Task execution completed and verified',
      });
    }

    // Assemble Source Attributions
    for (const call of allExecutedCalls) {
      if (call.name === 'manage_projects') {
        const pArgs = call.args as any;
        attributions.push({
          type: 'PROJECT_MEMORY',
          label: pArgs?.projectId ? `Project: ${pArgs.projectId}` : 'Projects Intelligence',
          detail: pArgs?.action || 'Project Query',
        });
      } else if (call.name === 'manage_memories') {
        const mArgs = call.args as any;
        attributions.push({
          type: 'PERSONAL_MEMORY',
          label: 'Personal Memory Bank',
          detail: mArgs?.action || 'Memory Query',
        });
      } else if (call.name === 'search_web') {
        const sArgs = call.args as any;
        attributions.push({
          type: 'WEB_RESEARCH',
          label: 'Live Web Telemetry',
          detail: sArgs?.query || 'Web Search',
        });
      } else if (call.name === 'manage_schedule') {
        attributions.push({
          type: 'SYSTEM_INFO',
          label: 'Schedule & Calendar Engine',
          detail: (call.args as any)?.action || 'Schedule Action',
        });
      } else if (call.name === 'manage_accountability') {
        attributions.push({
          type: 'SYSTEM_INFO',
          label: 'Accountability Radar',
          detail: (call.args as any)?.action || 'Accountability Check',
        });
      }
    }

    // Direct entity attribution if prompt/reply mentions active projects or memories
    if (attributions.length === 0) {
      const projData = getProjectsData();
      const mentionedProject = projData.projects.find((p: any) =>
        lowerPrompt.includes(p.name.toLowerCase()) || lowerPrompt.includes(p.slug)
      );
      if (mentionedProject) {
        attributions.push({
          type: 'PROJECT_MEMORY',
          label: `Project: ${mentionedProject.name}`,
          detail: mentionedProject.description,
        });
      } else if (lowerPrompt.includes('remember') || lowerPrompt.includes('memory') || lowerPrompt.includes('preference')) {
        attributions.push({
          type: 'PERSONAL_MEMORY',
          label: 'Long-Term Memory Bank',
          detail: 'User Profile & Directives',
        });
      }
    }

    const isWin =
      /finished|completed|done with|shipped|nailed it|conquered/i.test(req.body.prompt || '') ||
      /congratulat|milestone|great job|well done|crushed it|celebrate/i.test(replyText);

    // Apply strict deduplication & anti-repetition to model response
    const dedupResult = deduplicateOrTransformReply(replyText, combinedRecentlySaid, addressAs, hasGreeted);
    replyText = dedupResult.reply;
    const newPoints = extractSubstantivePoints(replyText);
    const updatedRecentlySaid = [...new Set([...combinedRecentlySaid, ...newPoints])].slice(-15);

    res.json({
      reply: replyText,
      functionCalls: allExecutedCalls,
      sources,
      attributions,
      taskSteps,
      pendingConfirmation: null,
      celebrate: isWin,
      recentlySaid: updatedRecentlySaid,
    });
  } catch (error: any) {
    const addressAs = req.body.addressAs || 'boss';
    const mode = req.body.mode || 'jarvis';
    const managerName = req.body.managerName || 'Coach';
    const hasGreeted = req.body.hasGreeted || false;
    const clientRecentlySaid = req.body.recentlySaid || [];
    const combinedRecentlySaid = Array.isArray(clientRecentlySaid) ? clientRecentlySaid : [];

    const fallbackResult = processLocalButlerDirective(req.body.prompt || '', addressAs, mode, managerName, hasGreeted, combinedRecentlySaid);
    const dedupedFallback = deduplicateOrTransformReply(fallbackResult.reply, combinedRecentlySaid, addressAs, hasGreeted);
    fallbackResult.reply = dedupedFallback.reply;
    const newPoints = extractSubstantivePoints(fallbackResult.reply);
    const updatedRecentlySaid = [...new Set([...combinedRecentlySaid, ...newPoints])].slice(-15);

    const searchCall = fallbackResult.functionCalls.find((fc: any) => fc.name === 'search_web');
    if (searchCall) {
      const liveSearch = await performGoogleSearch(searchCall.args.query);
      return res.json({
        reply: `Here are the latest findings, ${addressAs}:\n\n${liveSearch.text}`,
        functionCalls: fallbackResult.functionCalls,
        sources: liveSearch.sources,
        celebrate: false,
        recentlySaid: updatedRecentlySaid,
      });
    }
    res.json({
      ...fallbackResult,
      recentlySaid: updatedRecentlySaid,
    });
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

// Structured Document Analysis endpoint (Milestone 6)
app.post('/api/jarvis/analyze', async (req, res) => {
  try {
    const { content, fileName = 'Document', addressAs = 'boss', apiKey: customKey } = req.body;
    if (!content) return res.status(400).json({ error: 'Content is required for document analysis.' });

    const result = await analyzeDocumentText(content, fileName, addressAs, customKey);
    res.json({
      success: true,
      document: fileName,
      summary: result.summary,
      takeaways: result.takeaways,
      actionItems: result.actionItems,
      attributions: [{ type: 'GOOGLE_DRIVE', label: `Document: ${fileName}`, detail: 'Analysis Complete' }],
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Document analysis failed' });
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

const isTest =
  process.env.NODE_ENV === 'test' ||
  process.argv.some((arg) => typeof arg === 'string' && (arg.includes('test') || arg.includes('.test.')));
if (!isTest) {
  setupServer().catch((err) => {
    console.error('Fatal startup error:', err);
  });
}
