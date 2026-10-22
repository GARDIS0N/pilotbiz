import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import express from 'express';
import dotenv from 'dotenv';
import { bizpilotRouter } from './server/bizpilotRouter.js';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Create Express sub-app for Vite dev server so res.json and full Express features work cleanly
const apiApp = express();
apiApp.use(express.json({ limit: '15mb' }));
apiApp.use('/api/bizpilot', bizpilotRouter);
apiApp.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'BizPilot KE API', time: new Date().toISOString() });
});

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'bizpilot-api-dev-middleware',
        configureServer(server) {
          server.middlewares.use(apiApp);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {
              ignored: [
                '**/node_modules/**',
                '**/dist/**',
                '**/.git/**',
                '**/isair-jarvis-repo/**',
                '**/ai-video-generator/**',
                '**/cursor-wander/**',
                '**/Desktop/**',
                '**/backups/**',
                '**/data/**',
              ],
            },
    },
  };
});
