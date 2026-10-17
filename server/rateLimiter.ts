import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number;
  max?: number;
  maxRequests?: number;
  message?: string;
  statusCode?: number;
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export function createRateLimiter(options: RateLimitOptions) {
  const windowMs = options.windowMs;
  const max = options.max ?? options.maxRequests ?? 60;
  const message = options.message || 'Too many requests. Please wait a moment and try again.';
  const statusCode = options.statusCode || 429;

  const hits = new Map<string, RateLimitRecord>();

  // Periodically clean up expired entries to prevent memory growth
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of hits.entries()) {
      if (now > record.resetTime) {
        hits.delete(key);
      }
    }
  }, Math.max(windowMs, 60000));

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req: Request, res: Response, next: NextFunction) => {
    // Resolve client IP (supporting Vercel / reverse proxy headers)
    const ip =
      (req.headers?.['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      'unknown-client';

    const key = `${req.baseUrl || ''}:${ip}`;
    const now = Date.now();
    const record = hits.get(key);

    if (!record || now > record.resetTime) {
      hits.set(key, { count: 1, resetTime: now + windowMs });
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000));
      return next();
    }

    record.count++;
    const remaining = Math.max(0, max - record.count);
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
      return res.status(statusCode).json({
        error: message,
        retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
      });
    }

    next();
  };
}

/**
 * Auth rate limiter: 10 attempts per minute per IP
 * Protects 4-digit PINs and password verification from brute force
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many authentication attempts. For child safety, please wait 1 minute before trying again.'
});

/**
 * Answer check limiter: 60 requests per minute
 * Prevents rapid automated spamming of answers
 */
export const answerCheckLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 60,
  message: 'You are answering very quickly! Take your time to read Rafiki’s hints and questions.'
});

/**
 * General API limiter: 120 requests per minute per IP
 */
export const generalApiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
  message: 'API rate limit exceeded. Please wait a moment.'
});
