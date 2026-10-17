/**
 * Jifuno Alert Webhook Dispatcher
 * Sends operational alerts to a WhatsApp webhook gateway, Slack, Discord, or generic endpoint.
 * Includes rate limiting / deduplication cooldown to prevent notification flooding.
 */

export type AlertLevel = 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL';

export interface AlertPayload {
  level: AlertLevel;
  title: string;
  message: string;
  metadata?: Record<string, any>;
  dedupeKey?: string;
}

const alertCooldowns = new Map<string, number>();
const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes cooldown per dedupeKey

export async function sendSystemAlert(alert: AlertPayload): Promise<boolean> {
  const webhookUrl = process.env.ALERT_WEBHOOK_URL;
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    // Webhook not configured; log locally
    console.log(`[Alert - ${alert.level}] ${alert.title}: ${alert.message}`);
    return false;
  }

  // Deduplication / Cooldown Check
  const key = alert.dedupeKey || `${alert.level}:${alert.title}`;
  const now = Date.now();
  const lastSent = alertCooldowns.get(key);
  if (lastSent && now - lastSent < COOLDOWN_MS) {
    console.log(`[Alert Cooldown] Suppressed repeated alert for "${key}"`);
    return false;
  }
  alertCooldowns.set(key, now);

  const emoji = {
    INFO: 'ℹ️',
    WARN: '⚠️',
    ERROR: '🚨',
    CRITICAL: '🔥'
  }[alert.level] || '📢';

  const formattedText = `${emoji} *[JIFUNO ${alert.level}]* ${alert.title}\n\n${alert.message}\n\n*Time:* ${new Date().toISOString()}\n*Env:* ${process.env.NODE_ENV || 'production'}${
    alert.metadata ? `\n*Context:* \`\`\`${JSON.stringify(alert.metadata, null, 2)}\`\`\`` : ''
  }`;

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: formattedText, // Compatible with Slack, Discord, and WhatsApp webhook forwarders
        content: formattedText,
        level: alert.level,
        title: alert.title,
        message: alert.message,
        metadata: alert.metadata,
        timestamp: new Date().toISOString()
      }),
      signal: AbortSignal.timeout(5000)
    });

    return res.ok;
  } catch (err: any) {
    console.warn('[Alert Webhook Error]: Failed to dispatch alert:', err.message);
    return false;
  }
}
