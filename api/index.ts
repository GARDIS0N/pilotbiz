import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { bizpilotRouter } from '../server/bizpilotRouter.js';

dotenv.config();
dotenv.config({ path: '.env.local' });

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check endpoints
app.get('/health', (_req: Request, res: Response) =>
  res.json({ status: 'ok', app: 'BizPilot KE API', time: new Date().toISOString() })
);
app.get('/api/health', (_req: Request, res: Response) =>
  res.json({ status: 'ok', app: 'BizPilot KE API', time: new Date().toISOString() })
);

// Mount BizPilot KE API & AI Copilot endpoints
app.use('/api/bizpilot', bizpilotRouter);

export default app;
