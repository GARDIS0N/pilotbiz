import path from 'path';
import fs from 'fs';

export type IntentCategory =
  | 'CONVERSATIONAL'
  | 'ACTION_FILESYSTEM'
  | 'ACTION_MULTI_STEP'
  | 'ACTION_SEARCH_WEB'
  | 'ACTION_DRIVE'
  | 'ACTION_DOCUMENT_ANALYSIS'
  | 'ACTION_SCHEDULE'
  | 'ACTION_MEMORY'
  | 'ACTION_PROJECT'
  | 'AMBIGUOUS';

export interface ClassifiedIntent {
  category: IntentCategory;
  subType?: string;
  args?: Record<string, any>;
  clarificationPrompt?: string;
}

/**
 * Normalizes user prompt by removing assistant invocations and trailing punctuation.
 */
export function cleanPrompt(prompt: string): string {
  if (!prompt) return '';
  return prompt
    .replace(/^(?:hey\s+)?(?:jarvis|coach|friday|assistant)[,\s:]+/i, '')
    .replace(/^please\s+/i, '')
    .replace(/[.,;:!?]+$/, '')
    .trim();
}

/**
 * Classifies the user's intent into Conversational, Action, Multi-Step, or Ambiguous.
 */
export function classifyUserIntent(rawPrompt: string): ClassifiedIntent {
  const prompt = cleanPrompt(rawPrompt);
  const lower = prompt.toLowerCase();

  // 1. Ambiguous requests (Category D)
  if (
    /^(?:(?:can\s+you\s+|please\s+)?(?:do\s+something\s+with|mess\s+with|do\s+stuff\s+with|touch)\s+(?:my\s+|the\s+)?files?|files?\s+do\s+something)$/i.test(
      lower
    )
  ) {
    return {
      category: 'AMBIGUOUS',
      clarificationPrompt:
        'Please specify the exact operation you would like me to perform on your files (e.g., create a folder, create a file, list files, or verify a path).',
    };
  }

  // 2. Multi-Step Requests (Category C)
  // Example: "Create a folder called TestProject, put a README inside it, and write a description of JARVIS"
  const hasCreateFolderKeyword = /(?:create|make|new|mkdir)\s+(?:a\s+)?(?:folder|directory)/i.test(lower);
  const hasFileOrReadmeKeyword = /(?:readme|file|inside\s+it)/i.test(lower);
  const hasWriteKeyword = /(?:write|put|containing)/i.test(lower);

  if (hasCreateFolderKeyword && hasFileOrReadmeKeyword && hasWriteKeyword) {
    let folderName = 'TestProject';
    const folderMatch =
      prompt.match(/(?:called|named)\s+([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/(?:folder|directory)\s+([A-Za-z0-9_.-]+)/i);
    if (folderMatch) folderName = folderMatch[1].replace(/[.,;:!?]+$/, '');

    let fileName = 'README.md';
    const fileMatch = prompt.match(/(?:file|readme)\s+(?:called|named)?\s*([A-Za-z0-9_.-]+)/i);
    if (fileMatch && fileMatch[1].includes('.')) fileName = fileMatch[1];

    let content = 'Project initialized by JARVIS.';
    const contentQuoted =
      prompt.match(/['"]([^'"]+)['"]/) ||
      prompt.match(/write\s+['"](.+?)['"]/i) ||
      prompt.match(/containing\s+['"](.+?)['"]/i);

    if (contentQuoted) {
      content = contentQuoted[1];
    } else {
      const descMatch = prompt.match(/write\s+(?:a\s+)?(.+?)(?:\s+into|\s+inside|$)/i);
      if (descMatch) {
        content = descMatch[1].trim();
      }
    }

    return {
      category: 'ACTION_MULTI_STEP',
      args: {
        folderName,
        fileName,
        content,
        folderPath: `Desktop/${folderName}`,
        filePath: `Desktop/${folderName}/${fileName}`,
      },
    };
  }

  // 3. Action Filesystem: Create Directory / Folder (Category B)
  if (
    /(?:create|make|mkdir|new)\s+(?:a\s+)?(?:folder|directory)/i.test(lower) ||
    /^(?:create|make|mkdir)\s+folder\s+/i.test(lower) ||
    /^mkdir\s+/i.test(lower)
  ) {
    let folderName = 'NewFolder';
    const folderMatch =
      prompt.match(/(?:called|named)\s+([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/(?:folder|directory)\s+([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/(?:create|make|mkdir)\s+([A-Za-z0-9_.-]+)/i);
    if (folderMatch) folderName = folderMatch[1].replace(/[.,;:!?]+$/, '');

    return {
      category: 'ACTION_FILESYSTEM',
      subType: 'create_directory',
      args: {
        folderName,
        path: `Desktop/${folderName}`,
      },
    };
  }

  // 4. Action Filesystem: Create File (Category B)
  if (
    /(?:create|make|touch|write)\s+(?:a\s+)?file/i.test(lower) ||
    /^(?:create|write)\s+file\s+/i.test(lower)
  ) {
    let fileName = 'file.txt';
    const fileMatch =
      prompt.match(/(?:called|named)\s+([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/file\s+([A-Za-z0-9_.-]+)/i);
    if (fileMatch) fileName = fileMatch[1].replace(/[.,;:!?]+$/, '');

    let folderTarget = '';
    const insideMatch =
      prompt.match(/inside\s+(?:folder\s+)?([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/in\s+(?:folder\s+)?([A-Za-z0-9_.-]+)/i);
    if (insideMatch) folderTarget = insideMatch[1].replace(/[.,;:!?]+$/, '');

    let content = 'Created by JARVIS';
    const contentMatch =
      prompt.match(/['"]([^'"]+)['"]/) ||
      prompt.match(/containing\s+['"]?([^'"]+)['"]?/i) ||
      prompt.match(/with\s+(?:content|text)\s+['"]?([^'"]+)['"]?/i);
    if (contentMatch) content = contentMatch[1];

    const targetPath = folderTarget
      ? `Desktop/${folderTarget}/${fileName}`
      : `Desktop/${fileName}`;

    return {
      category: 'ACTION_FILESYSTEM',
      subType: 'create_file',
      args: {
        fileName,
        targetPath,
        content,
      },
    };
  }

  // 5. Action Filesystem: List Directory / Files (Category B)
  if (
    /^(?:list\s+files|show\s+files|ls|dir|show\s+directory|list\s+directory)/i.test(lower) ||
    lower === 'list files' ||
    lower === 'ls' ||
    lower === 'dir'
  ) {
    let dirTarget = 'Desktop';
    const inFolderMatch = prompt.match(/(?:in|of)\s+(?:folder\s+)?([A-Za-z0-9_.-]+)/i);
    if (inFolderMatch) dirTarget = `Desktop/${inFolderMatch[1]}`;

    return {
      category: 'ACTION_FILESYSTEM',
      subType: 'list_directory',
      args: { path: dirTarget },
    };
  }

  // 6. Action Filesystem: Read File (Category B)
  if (
    /(?:read|open|show|cat|view)\s+(?:the\s+)?file\s+([A-Za-z0-9_.-]+)/i.test(lower) ||
    /^(?:read|cat)\s+([A-Za-z0-9_.-]+)/i.test(lower)
  ) {
    const fileMatch =
      prompt.match(/file\s+([A-Za-z0-9_.-]+)/i) ||
      prompt.match(/^(?:read|cat)\s+([A-Za-z0-9_.-]+)/i);
    const fileName = fileMatch ? fileMatch[1].replace(/[.,;:!?]+$/, '') : 'README.md';

    return {
      category: 'ACTION_FILESYSTEM',
      subType: 'read_file',
      args: { path: `Desktop/${fileName}` },
    };
  }

  // 7. Action Google Drive Knowledge Layer (Category B & Milestone 6)
  if (
    lower.includes('google drive') ||
    lower.includes('my drive') ||
    lower.startsWith('/drive') ||
    lower.startsWith('drive ') ||
    (lower.includes('drive') && (lower.includes('search') || lower.includes('find') || lower.includes('look')))
  ) {
    let cleanQuery = prompt
      .replace(/^\/drive\s*(?:search)?\s*/i, '')
      .replace(/^(?:search|find|look\s+for|check)\s+(?:my\s+)?(?:google\s+drive|drive)\s+(?:for\s+)?/i, '')
      .replace(/(?:in|from|on)\s+(?:my\s+)?(?:google\s+drive|drive)/gi, '')
      .replace(/^(?:search|find)\s+/i, '')
      .replace(/^(?:my\s+)?/i, '')
      .trim();

    if (!cleanQuery || cleanQuery.toLowerCase() === 'drive' || cleanQuery.toLowerCase() === 'google drive') {
      cleanQuery = 'transcript';
    }

    return {
      category: 'ACTION_DRIVE',
      subType: 'search',
      args: { query: cleanQuery },
    };
  }

  // 8. Action Document Analysis (Category B & Milestone 6)
  if (
    lower.startsWith('analyze this document') ||
    lower.startsWith('analyze document') ||
    lower.startsWith('summarize document') ||
    lower.startsWith('analyze this file') ||
    lower.startsWith('analyze file') ||
    lower.startsWith('/analyze')
  ) {
    const target = prompt
      .replace(/^(?:analyze\s+this\s+document|analyze\s+document|summarize\s+document|analyze\s+this\s+file|analyze\s+file|\/analyze)\s*:?\s*/i, '')
      .trim();
    return {
      category: 'ACTION_DOCUMENT_ANALYSIS',
      subType: 'analyze',
      args: { targetDoc: target || 'active_document' },
    };
  }

  // 9. Action Web Search (Category B)
  if (
    lower.startsWith('search for') ||
    lower.startsWith('search web for') ||
    lower.startsWith('search google for') ||
    lower.startsWith('search the web for') ||
    lower.startsWith('search ') ||
    lower.startsWith('/search') ||
    lower.startsWith('google ') ||
    lower.startsWith('/scan') ||
    lower.startsWith('/radar') ||
    lower.startsWith('look up ') ||
    lower.startsWith('find info on ') ||
    lower.startsWith('find information on ') ||
    lower.startsWith('find information about ') ||
    lower.includes('weather in') ||
    lower.includes('weather for') ||
    lower.startsWith('weather') ||
    lower.includes('latest news') ||
    lower.includes('what is the latest')
  ) {
    const cleanQuery = prompt
      .replace(/^\/(?:scan|radar|search)\s*/i, '')
      .replace(/^(?:search\s+for|search\s+the\s+web\s+for|search\s+web\s+for|search\s+google\s+for|search|google|look\s+up|find\s+information\s+about|find\s+information\s+on|find\s+info\s+on)\s*/i, '')
      .trim() || prompt;

    return {
      category: 'ACTION_SEARCH_WEB',
      args: { query: cleanQuery },
    };
  }

  // 8. Action Memory Directives
  // 8a. Retrieve / List memories
  if (
    lower === '/memory' ||
    lower === '/memories' ||
    lower === 'memory' ||
    lower === 'my memories' ||
    lower === 'memories' ||
    lower.includes('what do you remember about me') ||
    lower.includes('what do you remember') ||
    lower.includes('what memories do you have') ||
    lower.includes('show my memories') ||
    lower.includes('list memories') ||
    lower.includes('personal memory')
  ) {
    return {
      category: 'ACTION_MEMORY',
      subType: 'list',
      args: {},
    };
  }

  // 8b. Wipe memories (triggers CONFIRM tier)
  if (/^(?:clear|wipe|delete\s+all)\s+memories/i.test(lower)) {
    return {
      category: 'ACTION_MEMORY',
      subType: 'wipe',
      args: {},
    };
  }

  // 8c. Remember directive
  if (
    lower.startsWith('remember this:') ||
    lower.startsWith('remember that') ||
    lower.startsWith('remember:') ||
    (lower.startsWith('remember ') && !lower.startsWith('remember to ') && !lower.startsWith('remember about '))
  ) {
    const content = prompt
      .replace(/^(?:remember\s+this:|remember\s+that|remember:)\s*/i, '')
      .replace(/^remember\s+/i, '')
      .trim();
    return {
      category: 'ACTION_MEMORY',
      subType: 'remember',
      args: { content },
    };
  }

  // 8d. Forget directive
  if (
    lower.startsWith('forget ') ||
    lower.startsWith('forget that ') ||
    lower.startsWith('delete memory ') ||
    lower.startsWith('remove memory ')
  ) {
    const query = lower
      .replace(/^(?:forget\s+that|forget|delete\s+memory|remove\s+memory)\s+/i, '')
      .trim();
    return {
      category: 'ACTION_MEMORY',
      subType: 'forget',
      args: { query },
    };
  }

  // 9. Conversational Requests (Category A)
  // e.g. "What is artificial intelligence?", "Explain PCR", "How are you", "Tell me about X"
  if (
    /^(?:what\s+is|tell\s+me\s+about|explain|who\s+was|who\s+is|define|how\s+does)\s+/i.test(
      lower
    )
  ) {
    return {
      category: 'CONVERSATIONAL',
      args: { topic: prompt },
    };
  }

  return {
    category: 'CONVERSATIONAL',
    args: { prompt },
  };
}
