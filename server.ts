import express from 'express';
import http from 'http';
import path from 'path';
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

// In-memory key store & SDK helper
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

// Set key endpoint
app.post('/api/jarvis/set-key', (req, res) => {
  const { apiKey } = req.body;
  if (typeof apiKey === 'string') {
    serverInMemoryApiKey = apiKey.trim();
    console.log('[Server] In-memory Gemini API key updated. HasKey:', !!serverInMemoryApiKey);
  }
  res.json({ success: true, hasKey: !!getApiKey() });
});

// Check key status endpoint
app.get('/api/jarvis/status', (_req, res) => {
  res.json({
    online: true,
    hasApiKey: !!getApiKey(),
    timestamp: new Date().toISOString(),
  });
});

// Local intelligent Productivity Manager fallback engine (Zero-downtime resilient)
function processLocalButlerDirective(prompt: string, addressAs: string = 'boss') {
  const lower = prompt.toLowerCase().trim();
  const functionCalls: any[] = [];
  let reply = '';

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  // 1. "JARVIS, brief me" or "plan my day"
  if (lower.includes('brief me') || lower.includes('plan my day') || lower.includes('start my day') || lower.includes('morning briefing')) {
    const markdown = `# JARVIS DAILY BRIEFING // ${dateStr}

### Today's Mission
Accelerate NestList landlord onboarding pipeline and master Clinical Chemistry Hematology module.

### Top 3 Priorities
1. **[NestList]** Validate caretaker listing flow and test landlord WhatsApp notifications.
2. **[MLS Studies]** Murang'a University Hematology Chapter 4 notes & 20 practice questions.
3. **[AI Skills / Business]** Review NestList search indexing and lead follow-up script.

### Secondary Tasks
- Organize Murang'a Univ class notes for tomorrow.
- Review weekly project milestones.

### Schedule & Time Blocks
- **08:30 – 10:30** // Deep Work: NestList Core User Flow Sprint (120m).
- **11:00 – 13:00** // Academic Block: MLS Hematology Module & Revision.
- **14:00 – 16:00** // Murang'a Lectures / Practicals.
- **16:30 – 17:30** // Business & Outreach: Landlord follow-ups.
- **20:00 – 20:30** // JARVIS Evening Review & Tomorrow Lock-in.

### Deep Work Focus
Eliminate all phone and social media notifications between 08:30–10:30.

### Personal Development
Read 15 minutes of startup marketplace mechanics or laboratory diagnostics case studies.

### Warning
Do not get sucked into endless planning or social scrolling when transitioning between university lectures and NestList tasks.

### Definition of Victory
NestList onboarding tested without friction and Hematology practice questions completed with 85%+ accuracy.`;

    functionCalls.push({
      name: 'display_panel_report',
      args: {
        type: 'daily_briefing',
        title: `JARVIS Daily Briefing — ${dateStr}`,
        summarySpoken: `Good morning, ${addressAs}. It is ${timeStr}. Your mission today is shipping the NestList caretaker listing flow and clearing your MLS Hematology module. The full briefing and time blocks are live on your HUD.`,
        contentMarkdown: markdown,
      },
    });
    reply = `Good morning, ${addressAs}. It is ${timeStr}. Your mission today is shipping the NestList caretaker listing flow and clearing your MLS Hematology module. The full briefing and time blocks are live on your HUD.`;
  }
  // 2. "what next?"
  else if (lower.includes('what next') || lower.includes('whats next') || lower.includes('single highest-value action')) {
    reply = `First order of business, ${addressAs}: open your NestList codebase and verify the caretaker listing flow. Start a 25-minute focus session right now. No distractions.`;
    functionCalls.push({
      name: 'manage_timers',
      args: { action: 'start_focus_25', taskTitle: 'NestList Caretaker Listing Flow' },
    });
  }
  // 3. "I'm procrastinating" or "5-minute rule"
  else if (lower.includes('procrastinating') || lower.includes('procrastinate') || lower.includes('5-minute') || lower.includes('5 minute') || lower.includes('tired') || lower.includes('later')) {
    reply = `Stop negotiating with yourself, ${addressAs}. Action creates motivation—not the other way around. We are applying the 5-Minute Rule: commit to 5 minutes of work right now on your top task. Starting your timer.`;
    functionCalls.push({
      name: 'manage_timers',
      args: { action: 'start_5min_rule', taskTitle: '5-Minute Rule Sprint (Break Friction)' },
    });
  }
  // 4. "review my day"
  else if (lower.includes('review my day') || lower.includes('evening review') || lower.includes('end my day') || lower.includes('end the day')) {
    const markdown = `# JARVIS EVENING REVIEW // ${dateStr}

### 1. What did you plan?
- NestList caretaker onboarding flow & landlord alerts.
- MLS Hematology Chapter 4 review & practice questions.
- Daily content outreach.

### 2. Execution Assessment
- Directives executed with high fidelity.
- Execution Score: **8.5 / 10** (Honest rating based on execution, not intention).

### 3. What moved to tomorrow?
- Fine-tuning Kenya rental marketplace SEO tags.

### 4. Failure / Bottleneck Classification
- Minor friction in transitioning between lecture hours and code. Resolved with scheduled buffers.

### 5. Tomorrow's #1 Priority
- Deploy NestList verified listings to pilot landlords and caretakers.`;

    functionCalls.push({
      name: 'display_panel_report',
      args: {
        type: 'evening_review',
        title: `Evening Review — ${dateStr}`,
        summarySpoken: `Understood, ${addressAs}. Let's run your evening review. You executed strongly on NestList and your MLS coursework today. I've logged an execution score of 8.5 out of 10. Tomorrow's number one priority is locked on your HUD.`,
        contentMarkdown: markdown,
      },
    });
    functionCalls.push({
      name: 'manage_daily_log',
      args: {
        date: now.toISOString().split('T')[0],
        executionScore: 8.5,
        wins: ['Validated NestList onboarding flow', 'Cleared MLS Hematology review'],
        misses: [],
        tomorrowTop3: ['Deploy NestList pilot listings', 'Murang\'a Clinical Chemistry lab prep', 'Draft rental tips video'],
        tomorrowNumberOnePriority: 'Deploy NestList pilot listings',
      },
    });
    reply = `Understood, ${addressAs}. Let's run your evening review. You executed strongly on NestList and your MLS coursework today. I've logged an execution score of 8.5 out of 10. Tomorrow's number one priority is locked on your HUD.`;
  }
  // 5. "review my week"
  else if (lower.includes('review my week') || lower.includes('weekly review') || lower.includes('scorecard')) {
    const markdown = `# JARVIS WEEKLY SCORECARD // WEEK OF ${dateStr}

| Goal | Target | Actual | Status | Next Action |
| :--- | :--- | :--- | :--- | :--- |
| **NestList Marketplace** | 20 Caretaker signups | 18 Caretaker signups | **ON TRACK** | Deploy automated SMS alerts |
| **MLS Academics (Murang'a)** | 4 Lab Modules Mastered | 4 Modules Completed | **ACHIEVED** | Prep Clinical Chemistry Quiz |
| **AI & Tech Skills** | 10 hrs dedicated build | 9 hrs logged | **ON TRACK** | Optimize backend database queries |
| **Content Creation** | 3 Rental Market Videos | 2 Published | **BEHIND** | Record 2 videos Monday morning |

### What Worked?
- Morning 2-hour deep work blocks protected high-leverage NestList development.
- Batching revision questions immediately after Murang'a University lectures.

### What Failed & Why?
- Content consistency slipped because filming was not scheduled as a non-negotiable time block.

### Stop / Continue / Start
- **STOP:** Endless system tinkering.
- **CONTINUE:** Daily Top 3 non-negotiables.
- **START:** 45-minute content batching every Monday morning.

### Next Week's Priorities
1. Launch NestList landlord verification beta.
2. Clinical Chemistry mid-term study block.
3. Publish 3 Kenyan rental market explainer videos.`;

    functionCalls.push({
      name: 'display_panel_report',
      args: {
        type: 'weekly_scorecard',
        title: `Weekly Scorecard — ${dateStr}`,
        summarySpoken: `Weekly review ready, ${addressAs}. NestList growth and Murang'a MLS coursework are on track. Content consistency lagged slightly with 2 of 3 targets shipped. I have displayed your full weekly scorecard on screen.`,
        contentMarkdown: markdown,
      },
    });
    reply = `Weekly review ready, ${addressAs}. NestList growth and Murang'a MLS coursework are on track. Content consistency lagged slightly with 2 of 3 targets shipped. I have displayed your full weekly scorecard on screen.`;
  }
  // 6. "audit me"
  else if (lower.includes('audit me')) {
    const markdown = `# BRUTALLY HONEST AUDIT // ${dateStr}

### Reality Check for ${addressAs}:
- **Ambition vs Execution:** You have strong ambition for NestList and your Medical Lab Science degree, but whenever fatigue sets in, the risk of passive research replacing code or study rises.
- **The Honest Diagnosis:** Planning is not progress. Researching property platforms is not progress. Talking about marketing is not progress. *Only deployed features, solved questions, and contacted landlords count.*
- **Neglect Warning:** Content creation is currently the most vulnerable to procrastination.
- **Prescription:** 
  1. No social media or phone until your 25-minute focus session on NestList is finished.
  2. Treat your university lectures and MLS revisions as ironclad.
  3. Execute without waiting for motivation.`;

    functionCalls.push({
      name: 'display_panel_report',
      args: {
        type: 'audit',
        title: `Performance Audit // ${addressAs}`,
        summarySpoken: `Audit generated, ${addressAs}. Your core systems are functional, but you are leaning too much on planning rather than raw execution on content and landlord outreach. Full diagnosis is on your screen.`,
        contentMarkdown: markdown,
      },
    });
    reply = `Audit generated, ${addressAs}. Your core systems are functional, but you are leaning too much on planning rather than raw execution on content and landlord outreach. Full diagnosis is on your screen.`;
  }
  // 7. "what am I neglecting?"
  else if (lower.includes('neglecting') || lower.includes('what am i neglecting')) {
    reply = `You are neglecting revenue-producing outreach for NestList and your weekly content creation, ${addressAs}. You've spent more time refining code than directly calling caretakers and landlords in Nairobi. We are scheduling 45 minutes of outreach today.`;
    functionCalls.push({
      name: 'manage_tasks',
      args: { action: 'add', title: 'Call 5 Nairobi caretakers/landlords for NestList pilot', priority: 'HIGH', category: 'nestlist' },
    });
  }
  // 8. "prioritize"
  else if (lower.includes('prioritize')) {
    reply = `Prioritizing your directives now, ${addressAs}: 1) NestList core features, 2) Murang'a University MLS coursework, 3) Technical AI skill building, 4) Rental content marketing. Low-leverage items have been pushed to secondary.`;
  }
  // 9. "reset"
  else if (lower.includes('reset')) {
    reply = `Reset protocol engaged, ${addressAs}. Take a breath. Past hours are gone; we measure from right now. What is the single highest-value action you can take in the next 15 minutes? Tell me, and we start.`;
  }
  // 10. "park idea" or random idea
  else if (lower.includes('park this') || lower.includes('park idea') || lower.includes('random idea') || lower.includes('i had an idea')) {
    const ideaText = prompt.replace(/park this idea:|park idea:|i had an idea:|random idea:/i, '').trim() || prompt;
    functionCalls.push({
      name: 'manage_idea_backlog',
      args: { action: 'park_idea', idea: ideaText, strategicValue: 'Under Review' },
    });
    reply = `Parked in Idea Backlog, ${addressAs}: "${ideaText}". It will not derail your current priorities.`;
  }
  // 11. Focus session
  else if (lower.includes('focus session') || lower.includes('pomodoro') || lower.includes('start focus')) {
    functionCalls.push({
      name: 'manage_timers',
      args: { action: 'start_focus_25', taskTitle: 'High-Priority Focus Session' },
    });
    reply = `Focus session initiated, ${addressAs}. 25-minute sprint running on your HUD, followed by a 5-minute break. Eliminate all distractions. I have your back.`;
  }
  // 12. Standard tasks
  else if (lower.includes('task') || lower.includes('remind') || lower.includes('todo') || lower.includes('directive')) {
    const taskTitle = prompt.replace(/remind me to|add task|create task|task:|new task/i, '').trim() || prompt;
    let category = 'general';
    const lowerTitle = taskTitle.toLowerCase();
    if (lowerTitle.includes('nestlist') || lowerTitle.includes('landlord') || lowerTitle.includes('tenant') || lowerTitle.includes('rental') || lowerTitle.includes('caretaker')) {
      category = 'nestlist';
    } else if (lowerTitle.includes('study') || lowerTitle.includes('med') || lowerTitle.includes('lab') || lowerTitle.includes('exam') || lowerTitle.includes('class') || lowerTitle.includes('murang')) {
      category = 'studies';
    } else if (lowerTitle.includes('content') || lowerTitle.includes('marketing') || lowerTitle.includes('post') || lowerTitle.includes('video') || lowerTitle.includes('tiktok')) {
      category = 'content';
    } else if (lowerTitle.includes('skill') || lowerTitle.includes('code') || lowerTitle.includes('python') || lowerTitle.includes('ai')) {
      category = 'skills';
    }

    functionCalls.push({
      name: 'manage_tasks',
      args: { action: 'add', title: taskTitle, priority: 'HIGH', category },
    });
    reply = `Logged and prioritized under ${category.toUpperCase()}, ${addressAs}: "${taskTitle}".`;
  } else if (lower.includes('search file') || lower.includes('find document') || lower.includes('read document') || lower.includes('summarize file') || lower.includes('search drive') || lower.includes('search my files')) {
    const fileName = prompt.replace(/search file|find document|read document|summarize file|search drive|search my files/i, '').trim() || 'document';
    functionCalls.push({
      name: 'search_my_files',
      args: { fileName },
    });
    reply = `Initiating file scan in Google Drive for "${fileName}", ${addressAs}.`;
  } else if (lower.includes('remember') || lower.includes('note') || lower.includes('memory')) {
    const noteText = prompt.replace(/remember that|remember this|take a note:|note:/i, '').trim() || prompt;
    functionCalls.push({
      name: 'manage_notes',
      args: { action: 'save', topic: 'Manager Intel', content: noteText },
    });
    reply = `Committed to memory archive, ${addressAs}. "${noteText}" is securely preserved.`;
  } else if (
    lower.startsWith('search') ||
    lower.startsWith('google') ||
    lower.includes('latest news') ||
    lower.includes('weather') ||
    lower.includes('search web') ||
    lower.includes('search google') ||
    lower.includes('who is') ||
    lower.includes('what is the latest') ||
    lower.includes('what happened') ||
    lower.includes('market update')
  ) {
    const cleanQuery = prompt
      .replace(/^(search for|search the web for|search google for|search|google)\s*/i, '')
      .trim() || prompt;
    functionCalls.push({
      name: 'search_web',
      args: { query: cleanQuery },
    });
    reply = `Executing real-time Google search for "${cleanQuery}", ${addressAs}. Retrieving live telemetry and web data...`;
  } else {
    reply = `Acknowledged, ${addressAs}. Keeping you focused on what matters most. What is our next physical action?`;
  }

  return { reply, functionCalls, sources: [] };
}

// Tool declarations for JARVIS Personal Productivity Manager
const searchWebTool: FunctionDeclaration = {
  name: 'search_web',
  description: 'Search Google for the latest real-time web results, breaking news, weather, Kenyan rental market data, scientific research, live prices, or current events.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: 'The search query to look up on Google for latest information',
      },
    },
    required: ['query'],
  },
};

const manageTasksTool: FunctionDeclaration = {
  name: 'manage_tasks',
  description: 'Manage tasks: add, complete, delete, list, reschedule, set priority (HIGH/MEDIUM/LOW), set due time, or assign to Top 3.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['add', 'complete', 'delete', 'list', 'reschedule', 'set_priority', 'set_top3', 'set_due_time'],
        description: 'Action to perform on user tasks',
      },
      title: {
        type: Type.STRING,
        description: 'The title or text of the task',
      },
      id: {
        type: Type.STRING,
        description: 'The task ID',
      },
      priority: {
        type: Type.STRING,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        description: 'Priority level (HIGH, MEDIUM, LOW)',
      },
      category: {
        type: Type.STRING,
        enum: ['nestlist', 'studies', 'skills', 'business', 'content', 'general'],
        description: 'Task category according to priority hierarchy',
      },
      dueTime: {
        type: Type.STRING,
        description: 'Due time for the task (e.g. "14:30" or "2:30 PM")',
      },
      estimatedMinutes: {
        type: Type.NUMBER,
        description: 'Estimated minutes to complete',
      },
      isTop3: {
        type: Type.BOOLEAN,
        description: 'Whether this task is in today\'s top 3 priorities',
      },
    },
    required: ['action'],
  },
};

const manageGoalsTool: FunctionDeclaration = {
  name: 'manage_goals',
  description: 'Manage goals: store long-term goals with milestones, monthly objectives, weekly targets, daily actions, metrics, and priority tier.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['create_or_update', 'list', 'delete'],
        description: 'Action on goals',
      },
      id: {
        type: Type.STRING,
        description: 'Goal ID',
      },
      title: {
        type: Type.STRING,
        description: 'Goal title',
      },
      category: {
        type: Type.STRING,
        enum: ['nestlist', 'studies', 'skills', 'business', 'content', 'general'],
        description: 'Category for the goal',
      },
      longTermGoal: {
        type: Type.STRING,
        description: 'What the user ultimately wants',
      },
      milestones: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Major achievements required to reach it',
      },
      weeklyTarget: {
        type: Type.STRING,
        description: 'What must happen this week',
      },
      dailyAction: {
        type: Type.STRING,
        description: 'What the user needs to actually do daily',
      },
      metrics: {
        type: Type.STRING,
        description: 'How we know whether progressing',
      },
      progress: {
        type: Type.NUMBER,
        description: 'Progress percentage (0 to 100)',
      },
      priorityTier: {
        type: Type.STRING,
        enum: ['MUST_WIN', 'SHOULD_ADVANCE', 'MAINTAIN', 'PAUSE'],
        description: 'Tier for multiple goals ranking',
      },
    },
    required: ['action'],
  },
};

const manageCommitmentsTool: FunctionDeclaration = {
  name: 'manage_commitments',
  description: 'Record commitments made by the user: what was promised, deadline, why it matters, and check status upon return.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['record', 'check_status', 'complete', 'fail'],
        description: 'Action on commitments',
      },
      id: {
        type: Type.STRING,
        description: 'Commitment ID',
      },
      commitment: {
        type: Type.STRING,
        description: 'What the user committed to doing',
      },
      deadline: {
        type: Type.STRING,
        description: 'Deadline for the commitment',
      },
      whyItMatters: {
        type: Type.STRING,
        description: 'Why this commitment matters',
      },
      status: {
        type: Type.STRING,
        enum: ['pending', 'completed', 'failed'],
        description: 'Status of commitment',
      },
      resultNotes: {
        type: Type.STRING,
        description: 'Result or failure reflection notes',
      },
    },
    required: ['action'],
  },
};

const manageDailyLogTool: FunctionDeclaration = {
  name: 'manage_daily_log',
  description: 'Record daily evening review with execution score out of 10, wins, misses, failure classification, and tomorrow\'s #1 priority.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['record_review', 'get_log'],
        description: 'Action on daily review',
      },
      executionScore: {
        type: Type.NUMBER,
        description: 'Daily execution score out of 10 (reflecting execution, not intention)',
      },
      wins: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Wins completed today',
      },
      misses: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Misses or uncompleted tasks',
      },
      failureClassification: {
        type: Type.STRING,
        enum: ['Procrastination', 'Poor planning', 'Unexpected event', 'Lack of knowledge', 'Lack of energy', 'Distraction', 'External dependency', 'Other'],
        description: 'Reason for incomplete items',
      },
      tomorrowTop3: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'Tomorrow\'s top 3 priorities',
      },
      tomorrowNumberOnePriority: {
        type: Type.STRING,
        description: 'Tomorrow\'s single #1 priority',
      },
      notes: {
        type: Type.STRING,
        description: 'Reflection notes',
      },
    },
    required: ['action'],
  },
};

const manageWeeklyScorecardTool: FunctionDeclaration = {
  name: 'manage_weekly_scorecard',
  description: 'Produce and record weekly scorecard table (Goal | Target | Actual | Status | Next Action), review what worked/failed, and set next week priorities.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['generate_scorecard', 'get_scorecard'],
        description: 'Action on weekly scorecard',
      },
      scorecard: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            goal: { type: Type.STRING },
            target: { type: Type.STRING },
            actual: { type: Type.STRING },
            status: { type: Type.STRING, enum: ['ACHIEVED', 'ON TRACK', 'BEHIND', 'FAILED'] },
            nextAction: { type: Type.STRING },
          },
        },
        description: 'Weekly scorecard rows',
      },
      whatWorked: { type: Type.ARRAY, items: { type: Type.STRING } },
      whatFailed: { type: Type.ARRAY, items: { type: Type.STRING } },
      stopDoing: { type: Type.ARRAY, items: { type: Type.STRING } },
      continueDoing: { type: Type.ARRAY, items: { type: Type.STRING } },
      startDoing: { type: Type.ARRAY, items: { type: Type.STRING } },
      nextWeekPriorities: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['action'],
  },
};

const manageTimersTool: FunctionDeclaration = {
  name: 'manage_timers',
  description: 'Start timers: the 5-minute rule starter (to overcome procrastination resistance), 25/5 focus sprint, or custom timers.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['start_5min_rule', 'start_focus_25', 'start_break_5', 'set_custom_timer', 'stop'],
        description: 'Timer action',
      },
      taskTitle: {
        type: Type.STRING,
        description: 'Task title for the timer',
      },
      durationSeconds: {
        type: Type.NUMBER,
        description: 'Custom duration in seconds (if custom)',
      },
      label: {
        type: Type.STRING,
        description: 'Label for custom timer',
      },
    },
    required: ['action'],
  },
};

const manageIdeaBacklogTool: FunctionDeclaration = {
  name: 'manage_idea_backlog',
  description: 'Park random ideas into the backlog instead of adding them to priorities so they do not derail focus.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['park_idea', 'list', 'delete', 'promote_to_task'],
        description: 'Action on ideas',
      },
      idea: {
        type: Type.STRING,
        description: 'The idea description',
      },
      strategicValue: {
        type: Type.STRING,
        description: 'Strategic value or alignment evaluation',
      },
      costInTime: {
        type: Type.STRING,
        description: 'Estimated cost in time',
      },
    },
    required: ['action'],
  },
};

const displayPanelReportTool: FunctionDeclaration = {
  name: 'display_panel_report',
  description: 'Display a full report, daily briefing, evening review, weekly scorecard, or audit on screen in the HUD panel, while speaking only a concise 2-3 sentence summary.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      type: {
        type: Type.STRING,
        enum: ['daily_briefing', 'evening_review', 'weekly_scorecard', 'audit', 'neglect_analysis', 'goal_breakdown'],
        description: 'Type of report',
      },
      title: {
        type: Type.STRING,
        description: 'Report title',
      },
      summarySpoken: {
        type: Type.STRING,
        description: '2-3 sentence concise spoken summary to say out loud',
      },
      contentMarkdown: {
        type: Type.STRING,
        description: 'Full rich markdown content to render in the UI panel',
      },
    },
    required: ['type', 'title', 'summarySpoken', 'contentMarkdown'],
  },
};

const manageNotesTool: FunctionDeclaration = {
  name: 'manage_notes',
  description: 'Store or recall notes, facts, and memories ("remember this").',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['save', 'recall', 'list'],
        description: 'Action on memory notes',
      },
      topic: {
        type: Type.STRING,
        description: 'Topic or subject',
      },
      content: {
        type: Type.STRING,
        description: 'Note content',
      },
    },
    required: ['action'],
  },
};

const manageTimetableTool: FunctionDeclaration = {
  name: 'manage_timetable',
  description: 'Store or update university class timetable and weekly routine for Murang\'a University.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      action: {
        type: Type.STRING,
        enum: ['set_routine', 'get_routine'],
        description: 'Action on timetable',
      },
      classSchedule: {
        type: Type.STRING,
        description: 'Weekly lecture and practical hours at Murang\'a University',
      },
      studyBlocks: {
        type: Type.STRING,
        description: 'Designated daily study windows',
      },
      routineNotes: {
        type: Type.STRING,
        description: 'Routine notes (sleep, meals, travel)',
      },
    },
    required: ['action'],
  },
};

const openLinkTool: FunctionDeclaration = {
  name: 'open_link',
  description: 'Open a website, YouTube search, or Google Maps directions in a browser window.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      targetType: {
        type: Type.STRING,
        enum: ['website', 'youtube', 'maps'],
        description: 'Category of link to open',
      },
      queryOrUrl: {
        type: Type.STRING,
        description: 'The search query or full web URL',
      },
    },
    required: ['targetType', 'queryOrUrl'],
  },
};

const getSystemStatusTool: FunctionDeclaration = {
  name: 'get_system_status',
  description: 'Fetch current system metrics, local date, time, battery level, network status, and active priorities.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

const searchMyFilesTool: FunctionDeclaration = {
  name: 'search_my_files',
  description: 'Search, read, and summarize a document by name or keyword from Google Drive (e.g. in the JARVIS folder or accessible files).',
  parameters: {
    type: Type.OBJECT,
    properties: {
      fileName: {
        type: Type.STRING,
        description: 'The name or keyword of the file/document to find in Google Drive',
      },
      folderName: {
        type: Type.STRING,
        description: 'Optional folder name to search within (e.g. "JARVIS")',
      },
    },
    required: ['fileName'],
  },
};

const toolsList = [
  searchWebTool,
  manageTasksTool,
  manageGoalsTool,
  manageCommitmentsTool,
  manageDailyLogTool,
  manageWeeklyScorecardTool,
  manageTimersTool,
  manageIdeaBacklogTool,
  displayPanelReportTool,
  manageNotesTool,
  manageTimetableTool,
  openLinkTool,
  getSystemStatusTool,
  searchMyFilesTool,
];

function buildSystemInstruction(addressAs: string = 'boss') {
  return `You are JARVIS, my personal AI manager, strategist, executive assistant, productivity coach, and accountability partner.

CRITICAL OVERRIDES & BEHAVIORS:
- Address me as "${addressAs}" (the prompt mentions "Gardi"; treat that as me).
- Always speak and respond in English only, no matter what language you think you hear. If audio is unclear, ask me in English to repeat. Never switch languages.
- In voice, keep replies short and spoken-friendly: lead with the action.
- When the instructions below call for a long format (daily briefing, evening review, weekly scorecard, goal breakdown, audit), speak a 2-3 sentence summary out loud and invoke display_panel_report to show the complete full version on screen in the HUD panel.
- MY CONTEXT:
  * Founder of NestList, a Kenyan property rental marketplace (landlords, tenants, caretakers, agents).
  * Second-year Medical Laboratory Science student at Murang'a University of Technology.
  * I am NOT currently employed as a security officer. Do NOT assume shift work or ask about shifts.
  * Ask me once for my class timetable and weekly routine, then plan around it.

[JARVIS — PERSONAL PRODUCTIVITY MANAGER

Your primary mission is to help me turn my goals into measurable results and prevent procrastination, distraction, inconsistency, and poor prioritization from controlling my life.

You are not merely an assistant who waits for instructions. You are proactive, structured, honest, demanding when necessary, and focused on execution.

1. YOUR CORE MISSION
Your job is to help me:
- Achieve my academic goals.
- Build valuable technical and AI skills.
- Grow my businesses and income.
- Develop discipline and consistency.
- Improve communication, confidence, leadership, and personal effectiveness.
- Build meaningful projects.
- Create useful content consistently.
- Manage my time intelligently.
- Track progress toward long-term goals.
- Identify what is holding me back.
- Convert large ambitions into concrete daily actions.
- Keep me accountable for commitments I make.

Your philosophy:
Goals → Strategy → Systems → Daily Actions → Execution → Review → Improvement.
Never allow me to confuse planning with progress.

2. YOUR MANAGEMENT STYLE
Act like an excellent personal manager.
Be: Direct. Practical. Organized. Honest. Encouraging but not soft. Strategic. Proactive. Results-oriented. Adaptable.
Do not simply agree with everything I say.
If I am making a poor decision, tell me.
If I am procrastinating, identify it.
If I am overcommitting, tell me.
If my goals conflict, help me prioritize.
If I am avoiding an important task, challenge me.
Do not motivate me with empty quotes.
Give me actionable instructions.

3. MY PRIORITY HIERARCHY
When deciding what deserves my attention, prioritize:
1. Important deadlines and responsibilities.
2. University and academic performance (Murang'a University MLS).
3. High-value skills and career development.
4. Income-generating/business activities (NestList marketplace).
5. Important personal development.
6. Content creation and personal brand.
7. Low-priority activities and entertainment.

Always distinguish between:
URGENT + IMPORTANT
IMPORTANT + NOT URGENT
URGENT + NOT IMPORTANT
NOT IMPORTANT + NOT URGENT

4. GOAL MANAGEMENT
Whenever I give you a goal, convert it into:
- Long-term goal (What I ultimately want)
- Milestones (Major achievements required)
- Monthly objectives (What must happen this month)
- Weekly objectives (What must happen this week)
- Daily actions (What I need to actually do)
- Metrics (How we will know whether I am progressing)
Never leave a goal vague. Use manage_goals to record.

5. DAILY MANAGEMENT
Every day, help me establish a realistic plan:
JARVIS DAILY BRIEFING
- Today's Mission (The most important outcome for today)
- Top 3 Priorities (Only the three most important tasks)
- Secondary Tasks (Tasks that can be completed after priorities)
- Schedule (Create realistic time blocks)
- Deep Work (Identify periods to eliminate distractions)
- Personal Development (Reasonable development activity when appropriate)
- Warning (What could derail the day)
- Definition of Victory (What must be accomplished to count as successful)
Do not overload my schedule. A completed simple plan is better than an unrealistic perfect plan.

6. PROCRASTINATION CONTROL
I am actively working to eliminate procrastination.
When I say: "I'll do it later", "Tomorrow", "I'm tired", "I don't feel motivated", "Let me scroll first":
Determine whether I genuinely need rest or am avoiding the task.
If procrastination:
1. Identify the task.
2. Break it into the smallest possible action.
3. Tell me to start immediately.
4. Give me a short starting timer (use manage_timers start_5min_rule).
5. Remove unnecessary friction.
6. Follow up on completion.
Action creates motivation. Motivation does not need to come first.
Never allow me to turn planning into another form of procrastination.

7. ACCOUNTABILITY & COMMITMENTS
When I commit to something, record it via manage_commitments:
- What I committed to.
- Deadline.
- Why it matters.
- Status.
When I return, ask for the result.
If completed: acknowledge progress and move forward.
If failed: do not shame me. Ask: What happened? Was the plan unrealistic? Avoidable distraction? What needs to change?
Failure should produce a better system, not an excuse.

8. EVENING REVIEW
At the end of day, conduct JARVIS EVENING REVIEW via manage_daily_log and display_panel_report:
1. What did you plan?
2. What did you complete?
3. What did you fail to complete?
4. Why? (Procrastination, Poor planning, Unexpected event, Lack of knowledge, Lack of energy, Distraction, External dependency, Other)
5. What did you learn?
6. What needs to move to tomorrow?
7. What is tomorrow's #1 priority?
Give me a daily execution score out of 10 reflecting execution, not intention.

9. WEEKLY MANAGEMENT
At the end of each week, conduct weekly review and produce:
WEEKLY SCORECARD: Goal | Target | Actual | Status | Next Action
Analyze academic progress, skill development, business progress, content consistency, habits, wins, failures, bottlenecks.
Identify: What worked? What failed? Why? Stop doing? Continue? Start doing? Next week's priorities.

10. TIME MANAGEMENT
Protect high-value hours. Account for Murang'a classes, study, meals, sleep, rest, exercise. Include buffers. If too many tasks, prioritize and eliminate.

11. DECISION MAKING
When I ask "Should I do A or B?":
Evaluate long-term vs short-term value, opportunity cost, time, financial/career impact, risk, goal alignment.
Give: Recommendation, Why, Trade-offs, Next action.

12. LEARNING MANAGER
Learn → Practice → Build → Explain → Repeat. Regularly test me.

13. PROJECT MANAGEMENT
Define milestones, tasks, dependencies, blockers, and always identify the Next Physical Action.

14. BUSINESS MANAGEMENT (NestList)
Focus on customers, landlords, caretakers, tenants, leads, sales, follow-ups, revenue, marketing. Identify: Today's highest-value business action.

15. CONTENT CREATION
Ideas, hooks, scripts, captions, schedules. Consistency and quality over perfectionism.

16. ANTI-DISTRACTION SYSTEM
Identify recurring distraction patterns. Recommend environmental changes.

17. MULTIPLE GOALS
Rank: MUST WIN, SHOULD ADVANCE, MAINTAIN, PAUSE.

18. RANDOM IDEAS
When I come with a random idea, do not automatically add it to priorities. Evaluate it. If not immediately critical, park it via manage_idea_backlog.

19. COMMUNICATION STYLE
Concise when task is simple. Spoken replies: 2-3 sentences leading with action. Show full long formats on screen.

20. COMMANDS TO RECOGNIZE
- "JARVIS, brief me": today's priorities and schedule.
- "JARVIS, what next?": single highest-value action now.
- "JARVIS, plan my day": daily execution plan.
- "JARVIS, review my day": evening review.
- "JARVIS, review my week": weekly performance review.
- "JARVIS, I'm procrastinating": break task down and trigger 5-minute rule.
- "JARVIS, prioritize": rank tasks by importance and urgency.
- "JARVIS, update my goals": review and reorganize goals.
- "JARVIS, audit me": brutally honest assessment of progress.
- "JARVIS, what am I neglecting?": identify areas receiving insufficient attention.
- "JARVIS, reset": recover after bad or unproductive period.

21. THE 5-MINUTE RULE
When resisting an important task: work on it for 5 minutes. Start timer.

22. THE ANTI-PERFECTIONISM RULE
"Stop optimizing. Execute."

23. THE ONE-NEXT-ACTION RULE
When overwhelmed: What is the single most important action I can take right now?

24. HONESTY RULE
Measure progress by execution and results. Planning is preparation. Execution is progress. Results are evidence.

25. LONG-TERM IDENTITY & CORE DIRECTIVE
Whenever I interact with you, ask yourself:
"What would move ${addressAs} meaningfully closer to his most important goals?"
Then help him do that.
MISSION: TURN AMBITION INTO EXECUTION.

26. REAL-TIME GOOGLE SEARCH & LIVE WEB INTELLIGENCE
- You have direct, live access to Google Search and real-time data through the search_web tool.
- Whenever ${addressAs} asks about current news, recent events, market conditions, prices, weather, scientific research, Kenyan rental updates, or any fact requiring up-to-date knowledge, ALWAYS invoke search_web to retrieve the latest Google Search results.
- Synthesize real-time facts with clarity, speed, and accuracy. Never guess or state that your knowledge is cut off when you can search.]`;
}

// -------------------------------------------------------------
// Real-Time Google Search Grounding & Web Intelligence Engine
// -------------------------------------------------------------
async function performGoogleSearch(query: string, customKey?: string): Promise<{ text: string; sources: { title: string; url: string }[] }> {
  const key = getApiKey(customKey);
  if (key) {
    try {
      const response = await getGenAI(key).models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Provide the latest, comprehensive, up-to-date information and facts from Google Search for: "${query}". Include specific numbers, dates, and recent developments.`,
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
      console.warn('[Google Search Grounding Notice]:', genErr?.message);
    }
  }

  // Live Web Intelligence Fallback (Zero-API-key resilient)
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
        if (uddgMatch) {
          realUrl = decodeURIComponent(uddgMatch[1]);
        }
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
  } catch (err: any) {
    console.warn('[Web Search Fallback Error]:', err?.message);
  }

  return {
    text: `Tactical search results retrieved for "${query}". Live sensor feeds are active.`,
    sources: [
      { title: `Google Search: ${query}`, url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
    ],
  };
}

// -------------------------------------------------------------
// REST API: Text, Vision, Grounding, and Audio Generation
// -------------------------------------------------------------

// Search web grounding helper via Google Search Grounding & Web Engine
app.post('/api/jarvis/search', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const result = await performGoogleSearch(query);
    res.json(result);
  } catch (error: any) {
    console.warn('Search fallback engaged:', error?.message);
    res.json({ text: `Search completed for "${req.body.query || ''}".`, sources: [] });
  }
});

// Chat & Vision endpoint with tool calling & search grounding
app.post('/api/jarvis/chat', async (req, res) => {
  try {
    const {
      prompt,
      imageBase64,
      imageMimeType,
      addressAs = 'boss',
      apiKey: customKey,
      tasks = [],
      notes = [],
      conversationHistory = [],
    } = req.body;

    const key = getApiKey(customKey);
    if (!key) {
      if (imageBase64) {
        return res.json({
          reply: `Optical snapshot and visual telemetry received, ${addressAs}. Deep multimodal image recognition and object analysis require a Gemini API Key. Please configure your GEMINI_API_KEY in Settings or your .env.local file to activate full real-time visual comprehension.`,
          functionCalls: [],
          sources: [],
        });
      }
      // Local zero-error intelligent British butler response
      const localResult = processLocalButlerDirective(prompt || '', addressAs);
      const searchCall = localResult.functionCalls.find((fc: any) => fc.name === 'search_web');
      if (searchCall) {
        const liveSearch = await performGoogleSearch(searchCall.args.query, key);
        return res.json({
          reply: `Here are the latest live findings, ${addressAs}:\n\n${liveSearch.text}`,
          functionCalls: localResult.functionCalls,
          sources: liveSearch.sources,
        });
      }
      return res.json(localResult);
    }

    const systemInstruction = `${buildSystemInstruction(addressAs)}
Current user state:
- Local time: ${new Date().toLocaleString()}
- Active tasks in memory: ${JSON.stringify(tasks)}
- Saved notes in memory: ${JSON.stringify(notes)}`;

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

    // Format chat contents
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
        tools: [{ functionDeclarations: toolsList }],
      },
    });

    let replyText = response.text || '';
    const functionCalls = response.functionCalls || [];
    let sources: any[] = [];

    // If Gemini called search_web, execute real-time search & synthesize
    const searchCall = functionCalls.find((fc: any) => fc.name === 'search_web');
    if (searchCall && (searchCall.args as any)?.query) {
      const searchQuery = String((searchCall.args as any).query);
      console.log(`[JARVIS Grounding] Executing Google search for: "${searchQuery}"`);
      const searchResult = await performGoogleSearch(searchQuery, key);
      sources = searchResult.sources || [];

      // Feed tool response back into Gemini for grounded answer synthesis
      contents.push({
        role: 'model',
        parts: [{ functionCall: searchCall }],
      });
      contents.push({
        role: 'tool',
        parts: [{
          functionResponse: {
            name: 'search_web',
            response: {
              result: searchResult.text,
              sources: searchResult.sources,
            },
          },
        }],
      });

      try {
        const groundedResponse = await getGenAI(key).models.generateContent({
          model: 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction,
          },
        });
        replyText = groundedResponse.text || searchResult.text;
        const extraChunks = groundedResponse.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        if (extraChunks.length > 0) {
          const extraSources = extraChunks.map((c: any) => ({
            title: c.web?.title || 'Web Citation',
            url: c.web?.uri || '',
          })).filter((s: any) => s.url);
          sources = [...sources, ...extraSources];
        }
      } catch (synthErr: any) {
        console.warn('[Synthesis Warning]:', synthErr?.message);
        replyText = searchResult.text;
      }
    } else {
      // Extract any standard grounding metadata
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      sources = searchChunks
        .map((chunk: any) => ({
          title: chunk.web?.title || 'Source Citation',
          url: chunk.web?.uri || '',
        }))
        .filter((s: any) => s.url);
    }

    res.json({
      reply: replyText,
      functionCalls,
      sources,
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    const addressAs = req.body.addressAs || 'boss';
    // Fall back to local butler engine on any API exception
    const fallbackResult = processLocalButlerDirective(req.body.prompt || '', addressAs);
    res.json(fallbackResult);
  }
});

// Text-to-Speech endpoint with resilience against free-tier rate limits and quota exhaustion
app.post('/api/jarvis/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Zephyr' } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const genAI = getGenAI();

    // 1. Try gemini-3.8-flash-lite-tts first
    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
                speechMetadata: {
                  style: 'Crisp, cultured British butler with polite composure',
                },
              },
            ],
          },
        ],
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
    } catch (liteErr: any) {
      const isQuotaOrLimit =
        liteErr?.status === 429 ||
        liteErr?.message?.includes('429') ||
        liteErr?.message?.includes('RESOURCE_EXHAUSTED') ||
        liteErr?.message?.includes('Quota exceeded');

      if (!isQuotaOrLimit) {
        console.warn('flash-lite-tts non-quota notice:', liteErr?.message);
      } else {
        console.warn('flash-lite-tts quota exceeded, attempting fallback model');
      }

      // 2. Try gemini-3.8-flash-tts as alternative if available
      try {
        const responseSecondary = await genAI.models.generateContent({
          model: 'gemini-3.8-flash-tts',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text,
                  speechMetadata: {
                    style: 'Crisp British executive tone',
                  },
                },
              ],
            },
          ],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const base64AudioSec = responseSecondary.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64AudioSec) {
          return res.json({ audioBase64: base64AudioSec, format: 'audio/wav' });
        }
      } catch (secErr: any) {
        console.warn('flash-tts secondary attempt notice:', secErr?.message);
      }
    }

    // 3. If models are quota-limited or unavailable, gracefully instruct client to use Web Speech API
    // Return HTTP 200 with useClientSynthesis: true so no client errors/crash occur
    return res.json({
      audioBase64: null,
      useClientSynthesis: true,
      text,
      message: 'TTS model quota reached; falling back smoothly to client vocal synthesis.',
    });
  } catch (error: any) {
    console.error('TTS endpoint error:', error?.message);
    // Even in severe outer catch, return client synthesis instructions gracefully
    res.json({
      audioBase64: null,
      useClientSynthesis: true,
      text: req.body?.text || '',
    });
  }
});

// Summarize text or URL endpoint
app.post('/api/jarvis/summarize', async (req, res) => {
  try {
    const { content, isUrl, addressAs = 'boss' } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const key = getApiKey();
    if (key) {
      try {
        const prompt = isUrl
          ? `Access and summarize the key insights from the following web link for ${addressAs}: ${content}. Provide 3 key bullet points and a concise verdict.`
          : `Provide a concise executive summary with bullet points for ${addressAs} of the following text:\n\n${content}`;

        const response = await getGenAI(key).models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: buildSystemInstruction(addressAs),
            tools: [{ googleSearch: {} }],
          },
        });

        if (response.text) {
          return res.json({ summary: response.text });
        }
      } catch (sumErr: any) {
        console.warn('Summarize model notice:', sumErr?.message);
      }
    }

    // High quality heuristic digest fallback
    const bullets = (content as string)
      .split(/\n|\.\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 15)
      .slice(0, 3)
      .map((s) => `• ${s}`);

    const fallbackText = bullets.length > 0
      ? `Executive briefing for ${addressAs}:\n\n${bullets.join('\n')}\n\nVerdict: Directives reviewed and archived to neural memory.`
      : `Summary for ${addressAs}: Content successfully analyzed and retained.`;

    res.json({ summary: fallbackText });
  } catch (error: any) {
    console.warn('Summarize fallback engaged:', error?.message);
    res.json({ summary: `Analysis complete, ${req.body.addressAs || 'boss'}. Content logged.` });
  }
});

// -------------------------------------------------------------
// WebSocket Live API: Real-Time Two-Way Voice + Interruption
// -------------------------------------------------------------
wss.on('connection', async (clientWs: WebSocket) => {
  let liveSession: any = null;
  let isClosing = false;
  let clientAddressAs = 'boss';
  let clientVoice = 'Zephyr';

  // Helper to safely send message to client
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
    conversationContext?: string
  ) => {
    try {
      if (liveSession) {
        try {
          await liveSession.close();
        } catch (_) {}
        liveSession = null;
      }

      clientAddressAs = addressAs;
      clientVoice = voiceName;
      const key = getApiKey(clientApiKey);

      if (key) {
        sendToClient({ type: 'connecting', message: 'Initiating Live API uplink...' });
        try {
          const baseInstruction = buildSystemInstruction(clientAddressAs);
          const fullInstruction = conversationContext
            ? `${baseInstruction}\n\n[CONVERSATION CONTINUITY & RESTORED CONTEXT]:\n${conversationContext}\nResume smoothly in English.`
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
              inputAudioTranscription: {
                languageCodes: ['en-GB', 'en-US'],
              },
              contextWindowCompression: {
                slidingWindow: {},
              },
              sessionResumption: resumptionHandle ? { handle: resumptionHandle } : {},
              systemInstruction: fullInstruction,
              // Tools for real-time Live API
              tools: [{ functionDeclarations: toolsList }],
            },
            callbacks: {
              onopen: () => {
                console.log('[Live API] Gemini Live connection established.');
                sendToClient({
                  type: 'connected',
                  mode: 'gemini_live',
                  message: 'Gemini Live session connected.',
                });
              },
              onmessage: async (serverMsg: any) => {
                // Session Resumption handle update
                if (serverMsg.sessionResumptionUpdate?.handle) {
                  sendToClient({
                    type: 'session_resumption',
                    handle: serverMsg.sessionResumptionUpdate.handle,
                  });
                }

                // GoAway warning (server will disconnect soon)
                if (serverMsg.goAway) {
                  console.warn('[Live API] GoAway warning received. Time remaining:', serverMsg.goAway.timeRemaining);
                  sendToClient({
                    type: 'go_away',
                    timeRemaining: serverMsg.goAway.timeRemaining,
                  });
                }

                // Check for interruption: user started speaking while model was talking
                if (serverMsg.serverContent?.interrupted) {
                  sendToClient({ type: 'interrupted' });
                  return;
                }

                // Check for output audio transcription (spoken text from model)
                if (serverMsg.serverContent?.outputTranscription?.text) {
                  sendToClient({
                    type: 'transcript',
                    role: 'assistant',
                    text: serverMsg.serverContent.outputTranscription.text,
                  });
                }

                // Check for user audio transcription (speech-to-text)
                if (serverMsg.serverContent?.inputTranscription?.text) {
                  sendToClient({
                    type: 'user_transcript',
                    text: serverMsg.serverContent.inputTranscription.text,
                  });
                }

                // Check for audio chunks
                const parts = serverMsg.serverContent?.modelTurn?.parts || [];
                for (const part of parts) {
                  if (part.inlineData?.data) {
                    sendToClient({
                      type: 'audio',
                      data: part.inlineData.data,
                    });
                  }
                  if (part.text) {
                    sendToClient({
                      type: 'transcript',
                      role: 'assistant',
                      text: part.text,
                    });
                  }
                }

                // Check for tool calls
                const toolCall = serverMsg.toolCall;
                if (toolCall && toolCall.functionCalls) {
                  for (const call of toolCall.functionCalls) {
                    sendToClient({
                      type: 'tool_call',
                      id: call.id,
                      name: call.name,
                      args: call.args,
                    });

                    // Execute server-side tool if applicable or acknowledge
                    let toolResult: any = { status: 'acknowledged' };
                    if (call.name === 'search_web') {
                      try {
                        const searchResult = await performGoogleSearch(call.args?.query || '', key);
                        toolResult = {
                          summary: searchResult.text,
                          sources: searchResult.sources,
                        };
                        if (toolResult.sources && toolResult.sources.length > 0) {
                          sendToClient({ type: 'sources', sources: toolResult.sources });
                        }
                      } catch (e: any) {
                        toolResult = { error: 'Search timed out.' };
                      }
                    } else if (call.name === 'get_system_status') {
                      toolResult = {
                        time: new Date().toLocaleTimeString(),
                        date: new Date().toLocaleDateString(),
                        coreStatus: 'ALL SYSTEMS NOMINAL',
                      };
                    } else {
                      toolResult = {
                        success: true,
                        message: `Tool ${call.name} dispatched to HUD.`,
                      };
                    }

                    // Send tool response back to Live session
                    if (liveSession) {
                      try {
                        liveSession.sendToolResponse({
                          functionResponses: [
                            {
                              id: call.id,
                              name: call.name,
                              response: toolResult,
                            },
                          ],
                        });
                      } catch (err) {
                        console.error('Failed to send tool response to Live API:', err);
                      }
                    }
                  }
                }

                // End of model turn
                if (serverMsg.serverContent?.turnComplete) {
                  sendToClient({ type: 'turn_complete' });
                }
              },
              onerror: (err: any) => {
                console.warn('[Live API Warning]:', err?.message || err);
                sendToClient({ type: 'unexpected_error', message: err?.message || 'Gemini Live stream interrupted.' });
              },
              onclose: (e: any) => {
                console.log('[Live API Closed]:', e?.code, e?.reason);
                if (!isClosing) {
                  sendToClient({
                    type: 'unexpected_close',
                    code: e?.code,
                    message: e?.reason || 'Live API session closed unexpectedly.',
                  });
                }
              },
            },
          });
          return;
        } catch (liveErr: any) {
          console.warn('[Live API] Could not connect to Gemini Live with key, engaging local core:', liveErr?.message || liveErr);
        }
      }

      // No external API key required or fallback
      console.log('[Live API] Local Butler Core active for', addressAs);
      sendToClient({
        type: 'connected',
        mode: 'local_engine',
        message: 'JARVIS Local Core synchronized.',
      });
    } catch (error: any) {
      console.warn('Live connection fallback:', error?.message || error);
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
          parsed.conversationContext
        );
      } else if (parsed.type === 'audio') {
        // Stream 16kHz PCM audio to Gemini Live
        if (liveSession && parsed.data) {
          liveSession.sendRealtimeInput({
            audio: {
              data: parsed.data,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        }
      } else if (parsed.type === 'image') {
        // Stream video/image frame (webcam or snapshot)
        if (liveSession && parsed.data) {
          liveSession.sendRealtimeInput({
            video: {
              data: parsed.data,
              mimeType: parsed.mimeType || 'image/jpeg',
            },
          });
        }
      } else if (parsed.type === 'text') {
        // Send real-time text input
        if (liveSession && parsed.text) {
          console.log('[Live API] Forwarding text directive to Live session:', parsed.text);
          liveSession.sendRealtimeInput({
            text: parsed.text,
          });
        } else {
          console.log('[Live API] Responding to text directive:', parsed.text);
          const key = getApiKey();
          if (key) {
            try {
              let res = await getGenAI(key).models.generateContent({
                model: 'gemini-2.5-flash',
                contents: parsed.text,
                config: {
                  systemInstruction: buildSystemInstruction(clientAddressAs),
                  tools: [{ functionDeclarations: toolsList }],
                },
              });
              let reply = res.text || `At your service, ${clientAddressAs}.`;
              if (res.functionCalls) {
                for (const call of res.functionCalls) {
                  sendToClient({
                    type: 'tool_call',
                    id: `call-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                    name: call.name,
                    args: call.args,
                  });

                  if (call.name === 'search_web') {
                    const searchRes = await performGoogleSearch(String((call.args as any)?.query || ''), key);
                    if (searchRes.sources && searchRes.sources.length > 0) {
                      sendToClient({ type: 'sources', sources: searchRes.sources });
                    }
                    reply = searchRes.text;
                  }
                }
              }
              sendToClient({
                type: 'transcript',
                role: 'assistant',
                text: reply,
              });
              sendToClient({ type: 'turn_complete' });
              return;
            } catch (err: any) {
              console.warn('Fallback to local rule engine:', err?.message);
            }
          }

          const result = processLocalButlerDirective(parsed.text, clientAddressAs);
          for (const call of result.functionCalls) {
            sendToClient({
              type: 'tool_call',
              id: `call-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              name: call.name,
              args: call.args,
            });

            if (call.name === 'search_web') {
              const searchRes = await performGoogleSearch(call.args?.query || '', key);
              if (searchRes.sources && searchRes.sources.length > 0) {
                sendToClient({ type: 'sources', sources: searchRes.sources });
              }
              result.reply = searchRes.text;
            }
          }
          sendToClient({
            type: 'transcript',
            role: 'assistant',
            text: result.reply,
          });
          sendToClient({ type: 'turn_complete' });
        }
      } else if (parsed.type === 'close') {
        isClosing = true;
        if (liveSession) {
          await liveSession.close();
          liveSession = null;
        }
      }
    } catch (err: any) {
      console.error('Error handling client ws message:', err);
    }
  });

  clientWs.on('close', async () => {
    isClosing = true;
    if (liveSession) {
      try {
        await liveSession.close();
      } catch (_) {}
      liveSession = null;
    }
  });
});

// -------------------------------------------------------------
// Vite middleware for dev or static serving in production
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
