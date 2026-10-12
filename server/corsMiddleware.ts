import cors, { CorsOptions } from 'cors';

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://jifuno.vercel.app'
];

export function getCorsMiddleware() {
  const envOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  const allowedOrigins = Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]));

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., server-to-server, curl, same-origin)
      if (!origin) return callback(null, true);

      // Allow exact match, localhost ports, or Vercel preview URLs
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/jifuno.*\.vercel\.app$/.test(origin) ||
        /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin);

      if (isAllowed) {
        return callback(null, true);
      } else {
        console.warn(`[CORS Policy]: Origin "${origin}" is not allowed.`);
        return callback(new Error(`CORS Error: Origin ${origin} is not allowed.`));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser compatibility with preflight OPTIONS
  };

  return cors(corsOptions);
}
