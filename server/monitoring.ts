import { Request, Response, NextFunction } from 'express';
import { sendSystemAlert } from './alertWebhook.js';

interface RequestMetric {
  timestamp: number;
  statusCode: number;
  durationMs: number;
  path: string;
}

class MonitoringService {
  private startTime = Date.now();
  private recentRequests: RequestMetric[] = [];
  private totalRequests = 0;
  private total5xx = 0;
  private total4xx = 0;
  private total2xx = 0;

  // Window for alert spikes (5 minutes)
  private readonly WINDOW_MS = 5 * 60 * 1000;
  private readonly ERROR_THRESHOLD = 5;

  public recordRequest(path: string, statusCode: number, durationMs: number) {
    const now = Date.now();
    this.totalRequests++;

    if (statusCode >= 500) {
      this.total5xx++;
    } else if (statusCode >= 400) {
      this.total4xx++;
    } else {
      this.total2xx++;
    }

    this.recentRequests.push({ timestamp: now, statusCode, durationMs, path });

    // Clean up older records
    this.cleanupOldMetrics(now);

    // Check for error spike
    if (statusCode >= 500) {
      this.checkErrorSpike(now);
    }
  }

  private cleanupOldMetrics(now: number) {
    const cutoff = now - this.WINDOW_MS;
    while (this.recentRequests.length > 0 && this.recentRequests[0].timestamp < cutoff) {
      this.recentRequests.shift();
    }
  }

  private checkErrorSpike(now: number) {
    const recent5xxCount = this.recentRequests.filter(r => r.statusCode >= 500).length;
    if (recent5xxCount >= this.ERROR_THRESHOLD) {
      sendSystemAlert({
        level: 'CRITICAL',
        title: 'High Error Rate Spike Detected',
        message: `${recent5xxCount} server errors (HTTP 5xx) occurred within the last 5 minutes on Jifuno production API.`,
        dedupeKey: 'error-spike-5xx',
        metadata: {
          recent5xxCount,
          windowSeconds: this.WINDOW_MS / 1000,
          totalLifetimeRequests: this.totalRequests
        }
      });
    }
  }

  public getMetrics() {
    const now = Date.now();
    this.cleanupOldMetrics(now);
    const windowRequests = this.recentRequests.length;
    const window5xx = this.recentRequests.filter(r => r.statusCode >= 500).length;
    const windowErrorRate = windowRequests > 0 ? (window5xx / windowRequests) * 100 : 0;

    const avgDurationMs =
      windowRequests > 0
        ? Math.round(this.recentRequests.reduce((acc, r) => acc + r.durationMs, 0) / windowRequests)
        : 0;

    return {
      uptimeSeconds: Math.floor((now - this.startTime) / 1000),
      totalRequests: this.totalRequests,
      statusCounts: {
        '2xx': this.total2xx,
        '4xx': this.total4xx,
        '5xx': this.total5xx
      },
      slidingWindow: {
        windowSeconds: this.WINDOW_MS / 1000,
        requests: windowRequests,
        serverErrors: window5xx,
        errorRatePct: Math.round(windowErrorRate * 10) / 10,
        avgLatencyMs: avgDurationMs
      },
      memory: process.memoryUsage ? {
        heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        rssMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
      } : null
    };
  }
}

export const monitoringService = new MonitoringService();

export function monitoringMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    monitoringService.recordRequest(req.path || req.url, res.statusCode, duration);
  });
  next();
}
