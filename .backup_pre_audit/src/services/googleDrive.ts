/**
 * Google Drive REST API v3 Integration Service for JARVIS
 * Operates under the least-privilege 'drive.file' scope.
 * Handles folder management, atomic JSON persistence, and document retrieval.
 */

export class GoogleAuthExpiredError extends Error {
  constructor(message: string = 'Google Drive access token expired or revoked') {
    super(message);
    this.name = 'GoogleAuthExpiredError';
  }
}

export interface JarvisCloudSyncPayload {
  tasks: any[];
  goals: any[];
  commitments: any[];
  dailyLogs: any[];
  weeklyScorecard: any | null;
  ideaBacklog: any[];
  timetable: any;
  todayMission: string;
  definitionOfVictory: string;
  notes: any[];
  streakCount: number;
  lastSynced: string;
  appVersion: string;
}

export interface DriveFileMetadata {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
}

const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_BASE = 'https://www.googleapis.com/upload/drive/v3';
const JARVIS_FOLDER_NAME = 'JARVIS';
const DATA_FILE_NAME = 'jarvis_data.json';

// In-memory cache for folder ID to minimize redundant lookups
let cachedFolderId: string | null = null;
let cachedDataFileId: string | null = null;

/**
 * Checks response status and throws GoogleAuthExpiredError on 401
 */
function checkResponseStatus(res: Response, context: string) {
  if (res.status === 401) {
    cachedFolderId = null;
    cachedDataFileId = null;
    throw new GoogleAuthExpiredError(`Authentication expired during ${context}. Please re-authenticate.`);
  }
}

/**
 * Locate or create the dedicated 'JARVIS' folder in Google Drive
 */
export async function ensureJarvisFolder(accessToken: string): Promise<string> {
  if (cachedFolderId) {
    return cachedFolderId;
  }

  // 1. Search for existing active folder named 'JARVIS'
  const searchUrl = `${DRIVE_API_BASE}/files?q=name='${JARVIS_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id,name)`;
  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  checkResponseStatus(searchRes, 'folder lookup');

  if (!searchRes.ok) {
    const errText = await searchRes.text();
    throw new Error(`Failed to search Google Drive folders: ${errText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    cachedFolderId = searchData.files[0].id;
    return cachedFolderId!;
  }

  // 2. Create the folder if not found
  const createRes = await fetch(`${DRIVE_API_BASE}/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: JARVIS_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Tactical database and neural archives for JARVIS Chief of Staff',
    }),
  });

  checkResponseStatus(createRes, 'folder creation');

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create JARVIS folder in Google Drive: ${errText}`);
  }

  const createdData = await createRes.json();
  cachedFolderId = createdData.id;
  return cachedFolderId!;
}

/**
 * Locate existing jarvis_data.json file in the JARVIS folder
 */
async function findDataFile(accessToken: string, folderId: string): Promise<string | null> {
  if (cachedDataFileId) return cachedDataFileId;

  const url = `${DRIVE_API_BASE}/files?q=name='${DATA_FILE_NAME}' and '${folderId}' in parents and trashed=false&fields=files(id,name)`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  checkResponseStatus(res, 'file lookup');

  if (!res.ok) return null;
  const data = await res.json();
  if (data.files && data.files.length > 0) {
    cachedDataFileId = data.files[0].id;
    return cachedDataFileId;
  }
  return null;
}

/**
 * Save complete JARVIS manager state to Drive folder
 */
export async function saveJarvisDataToDrive(
  accessToken: string,
  payload: Omit<JarvisCloudSyncPayload, 'lastSynced' | 'appVersion'>
): Promise<{ fileId: string; folderId: string; timestamp: string }> {
  const folderId = await ensureJarvisFolder(accessToken);
  const timestamp = new Date().toISOString();

  const fullPayload: JarvisCloudSyncPayload = {
    ...payload,
    lastSynced: timestamp,
    appVersion: '2.5.0-manager-drive',
  };

  const jsonContent = JSON.stringify(fullPayload, null, 2);
  const existingFileId = await findDataFile(accessToken, folderId);

  let resultFileId = existingFileId;

  if (existingFileId) {
    // Update existing file content using media upload
    const updateUrl = `${DRIVE_UPLOAD_BASE}/files/${existingFileId}?uploadType=media`;
    const updateRes = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: jsonContent,
    });

    checkResponseStatus(updateRes, 'file update');

    if (!updateRes.ok) {
      // If updating fails (e.g. file was deleted in drive), clear cache and recreate
      cachedDataFileId = null;
      return saveJarvisDataToDrive(accessToken, payload);
    }
  } else {
    // Create new file with multipart upload inside JARVIS folder
    const boundary = '-------314159265358979323846';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const metadata = {
      name: DATA_FILE_NAME,
      parents: [folderId],
      mimeType: 'application/json',
      description: 'Master tactical state for JARVIS Personal Manager',
    };

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      jsonContent +
      closeDelimiter;

    const createUrl = `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart`;
    const createRes = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    });

    checkResponseStatus(createRes, 'file creation');

    if (!createRes.ok) {
      const errText = await createRes.text();
      throw new Error(`Failed to upload JARVIS data file to Drive: ${errText}`);
    }

    const createdData = await createRes.json();
    resultFileId = createdData.id;
    cachedDataFileId = resultFileId;
  }

  // Also write individual category files for user readability in Drive (fire and forget)
  writeCategoryBackupFiles(accessToken, folderId, fullPayload).catch((e) => {
    console.warn('Individual category Drive backup notice:', e);
  });

  return { fileId: resultFileId || 'unknown', folderId, timestamp };
}

/**
 * Write individual JSON files (tasks.json, goals.json, etc.) in the JARVIS folder for convenience
 */
async function writeCategoryBackupFiles(
  accessToken: string,
  folderId: string,
  payload: JarvisCloudSyncPayload
) {
  const backups = [
    { name: 'tasks.json', data: payload.tasks },
    { name: 'goals.json', data: payload.goals },
    { name: 'commitments.json', data: payload.commitments },
    { name: 'daily_logs.json', data: payload.dailyLogs },
  ];

  for (const b of backups) {
    try {
      // Find if already exists
      const findUrl = `${DRIVE_API_BASE}/files?q=name='${b.name}' and '${folderId}' in parents and trashed=false&fields=files(id)`;
      const fRes = await fetch(findUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
      if (!fRes.ok) continue;
      const fData = await fRes.json();
      const body = JSON.stringify(b.data, null, 2);

      if (fData.files && fData.files.length > 0) {
        await fetch(`${DRIVE_UPLOAD_BASE}/files/${fData.files[0].id}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body,
        });
      } else {
        const boundary = '-------314159265358979323846';
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelimiter = `\r\n--${boundary}--`;
        const meta = { name: b.name, parents: [folderId], mimeType: 'application/json' };
        const mpBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(meta) +
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          body +
          closeDelimiter;
        await fetch(`${DRIVE_UPLOAD_BASE}/files?uploadType=multipart`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: mpBody,
        });
      }
    } catch (_) {}
  }
}

/**
 * Load JARVIS data from Google Drive on startup
 */
export async function loadJarvisDataFromDrive(accessToken: string): Promise<JarvisCloudSyncPayload | null> {
  const folderId = await ensureJarvisFolder(accessToken);
  const dataFileId = await findDataFile(accessToken, folderId);

  if (!dataFileId) {
    return null; // First-time run or no cloud file yet
  }

  const downloadUrl = `${DRIVE_API_BASE}/files/${dataFileId}?alt=media`;
  const res = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  checkResponseStatus(res, 'downloading cloud data');

  if (!res.ok) {
    if (res.status === 404) {
      cachedDataFileId = null;
      return null;
    }
    const errText = await res.text();
    throw new Error(`Failed to load JARVIS data from Google Drive: ${errText}`);
  }

  const data: JarvisCloudSyncPayload = await res.json();
  return data;
}

/**
 * Search and read documents in Google Drive accessible via drive.file scope
 */
export async function searchMyFiles(
  accessToken: string,
  fileName: string,
  folderName?: string
): Promise<{ files: DriveFileMetadata[]; selectedFile?: DriveFileMetadata; content?: string }> {
  let query = `name contains '${fileName.replace(/'/g, "\\'")}' and trashed = false`;

  if (folderName) {
    // Find folder first
    const fRes = await fetch(
      `${DRIVE_API_BASE}/files?q=name='${folderName.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false&fields=files(id)`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    checkResponseStatus(fRes, 'folder lookup');
    if (fRes.ok) {
      const fData = await fRes.json();
      if (fData.files && fData.files.length > 0) {
        query += ` and '${fData.files[0].id}' in parents`;
      }
    }
  }

  const listUrl = `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,modifiedTime,size,webViewLink)&pageSize=10`;
  const listRes = await fetch(listUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  checkResponseStatus(listRes, 'file search');

  if (!listRes.ok) {
    const errText = await listRes.text();
    throw new Error(`Drive file search error: ${errText}`);
  }

  const listData = await listRes.json();
  const files: DriveFileMetadata[] = listData.files || [];

  if (files.length === 0) {
    return { files: [] };
  }

  // Pick the top matching file and attempt to read its content
  const selected = files[0];
  let textContent: string = '';

  try {
    if (selected.mimeType === 'application/vnd.google-apps.document') {
      // Export Google Doc as plain text
      const exportRes = await fetch(`${DRIVE_API_BASE}/files/${selected.id}/export?mimeType=text/plain`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (exportRes.ok) {
        textContent = await exportRes.text();
      }
    } else if (selected.mimeType === 'application/vnd.google-apps.spreadsheet') {
      // Export Google Sheet as CSV
      const exportRes = await fetch(`${DRIVE_API_BASE}/files/${selected.id}/export?mimeType=text/csv`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (exportRes.ok) {
        textContent = await exportRes.text();
      }
    } else {
      // Read text, json, csv, or markdown directly via media download
      const downloadRes = await fetch(`${DRIVE_API_BASE}/files/${selected.id}?alt=media`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (downloadRes.ok) {
        textContent = await downloadRes.text();
      }
    }
  } catch (readErr: any) {
    console.warn('Error reading file content:', readErr?.message);
  }

  return {
    files,
    selectedFile: selected,
    content: textContent ? textContent.slice(0, 15000) : undefined,
  };
}
