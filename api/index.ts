import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { apiRouter } from '../server/apiRouter.js';
import { getCorsMiddleware } from '../server/corsMiddleware.js';
import { securityHeadersMiddleware } from '../server/securityHeaders.js';
import { checkRequiredServerEnv } from '../server/envCheck.js';
import { closetAiRouter } from '../server/closetAiRouter.js';

dotenv.config();
dotenv.config({ path: '.env.local' });

// Log presence of required server environment variables on startup
checkRequiredServerEnv();

const app = express();

// Global middleware
app.use(securityHeadersMiddleware);
app.use(getCorsMiddleware());
app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req: Request, res: Response) =>
  res.json({ status: 'ok', app: 'MyCloset API', time: new Date().toISOString() })
);
app.get('/api/health', (_req: Request, res: Response) =>
  res.json({ status: 'ok', app: 'MyCloset API', time: new Date().toISOString() })
);

// Mount MyCloset AI Stylist endpoints
app.use('/api/closet', closetAiRouter);

// Mount API routes
app.use('/api', apiRouter);
app.use(apiRouter);

export default app;
