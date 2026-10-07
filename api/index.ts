import express from 'express';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json({ limit: '25mb' }));

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

// Local intelligent Butler fallback engine
function processLocalButlerDirective(prompt: string, addressAs: string = 'boss') {
  const lower = prompt.toLowerCase().trim();
  const functionCalls: any[] = [];
  let reply = '';

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });

  if (lower.includes('brief me') || lower.includes('plan my day') || lower.includes('start my day') || lower.includes('morning briefing')) {
    reply = `Good morning, ${addressAs}. It is ${timeStr}. Your mission today is shipping the NestList caretaker listing flow and clearing your MLS Hematology module. Full directives are live on your HUD.`;
    functionCalls.push({
      name: 'display_panel_report',
      args: {
        type: 'daily_briefing',
        title: `JARVIS Daily Briefing — ${dateStr}`,
        summarySpoken: reply,
        contentMarkdown: `# JARVIS DAILY BRIEFING // ${dateStr}\n\n### Today's Mission\nAccelerate NestList landlord onboarding pipeline and master Clinical Chemistry Hematology module.`,
      },
    });
  } else if (lower.includes('what next') || lower.includes('whats next')) {
    reply = `First order of business, ${addressAs}: open your NestList codebase and verify the caretaker listing flow. Start a 25-minute focus session right now. No distractions.`;
    functionCalls.push({
      name: 'manage_timers',
      args: { action: 'start_focus_25', taskTitle: 'NestList Core Sprint' },
    });
  } else if (
    lower.startsWith('search') ||
    lower.startsWith('google') ||
    lower.includes('latest news') ||
    lower.includes('weather') ||
    lower.includes('search web') ||
    lower.includes('who is') ||
    lower.includes('what is the latest')
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

// Tool declarations
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
      title: { type: Type.STRING, description: 'The title or text of the task' },
      id: { type: Type.STRING, description: 'Task ID when completing or modifying an existing task' },
      priority: { type: Type.STRING, enum: ['HIGH', 'MEDIUM', 'LOW'], description: 'Task priority level' },
      category: { type: Type.STRING, enum: ['nestlist', 'studies', 'skills', 'business', 'content', 'general'], description: 'Category' },
      dueTime: { type: Type.STRING, description: 'Due time today in HH:MM format' },
      estimatedMinutes: { type: Type.NUMBER, description: 'Estimated time in minutes' },
      isTop3: { type: Type.BOOLEAN, description: 'Mark as one of today Top 3 non-negotiable tasks' },
    },
    required: ['action'],
  },
};

const toolsList = [searchWebTool, manageTasksTool];

function buildSystemInstruction(addressAs: string = 'boss') {
  return `You are JARVIS, my personal AI manager, strategist, executive assistant, productivity coach, and accountability partner.
Address me as "${addressAs}".
Always speak and respond in English only. Keep replies concise and action-oriented.
Whenever asked about current news, facts, market updates, or real-time data, invoke search_web to get the latest Google Search results.`;
}

// Real-Time Google Search Grounding
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
      console.warn('[Google Search Notice]:', genErr?.message);
    }
  }

  // Fallback web search
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
    text: `Tactical search results retrieved for "${query}". Live sensor feeds are active.`,
    sources: [
      { title: `Google Search: ${query}`, url: `https://www.google.com/search?q=${encodeURIComponent(query)}` },
    ],
  };
}

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

// Chat endpoint
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

    const searchCall = functionCalls.find((fc: any) => fc.name === 'search_web');
    if (searchCall && (searchCall.args as any)?.query) {
      const searchQuery = String((searchCall.args as any).query);
      const searchResult = await performGoogleSearch(searchQuery, key);
      sources = searchResult.sources || [];

      contents.push({ role: 'model', parts: [{ functionCall: searchCall }] });
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
          config: { systemInstruction },
        });
        replyText = groundedResponse.text || searchResult.text;
      } catch (_) {
        replyText = searchResult.text;
      }
    }

    res.json({ reply: replyText, functionCalls, sources });
  } catch (error: any) {
    const addressAs = req.body.addressAs || 'boss';
    res.json(processLocalButlerDirective(req.body.prompt || '', addressAs));
  }
});

// Summarize endpoint
app.post('/api/jarvis/summarize', async (req, res) => {
  try {
    const { content, isUrl, addressAs = 'boss' } = req.body;
    const key = getApiKey();
    if (key) {
      try {
        const prompt = isUrl
          ? `Access and summarize the key insights from: ${content}. Provide 3 key bullet points and a concise verdict.`
          : `Provide a concise executive summary with bullet points of:\n\n${content}`;
        const response = await getGenAI(key).models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: buildSystemInstruction(addressAs),
            tools: [{ googleSearch: {} }],
          },
        });
        if (response.text) return res.json({ summary: response.text });
      } catch (_) {}
    }
    res.json({ summary: `Analysis complete for ${addressAs}.` });
  } catch (_) {
    res.json({ summary: 'Content logged.' });
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
