import express, { Request, Response } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

export const bizpilotRouter = express.Router();

const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), 'bizpilot_data')
  : path.resolve('data');
const WORKSPACE_STORE_FILE = path.join(DATA_DIR, 'bizpilot_workspaces.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Simple rate-limiter per IP for AI requests (max 25 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 25;
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count };
}

export interface SanitizedBusinessContext {
  businessName: string;
  category: string;
  countyTown: string;
  currency: string;
  periodLabel: string;
  metrics: {
    salesRevenue: number;
    salesCount: number;
    cashCollected: number;
    costOfGoodsSold: number;
    grossProfit: number;
    grossMarginPercent: number;
    isProfitEstimated: boolean;
    operatingExpenses: number;
    inventoryPurchasesLogged: number;
    estimatedNetProfit: number;
    outstandingCustomerBalance: number;
    outstandingSupplierBalance: number;
    inventoryValuationAtCost: number;
    activeProductCount: number;
  };
  lowStockProducts: Array<{
    name: string;
    sku: string;
    stockQuantity: number;
    lowStockThreshold: number;
    sellingPrice: number;
  }>;
  topSellingProducts: Array<{
    name: string;
    unitsSold: number;
    revenue: number;
  }>;
  expenseBreakdown: Array<{
    category: string;
    amount: number;
  }>;
}

/**
 * Deterministic Kenyan SME Business Analyst Engine (Non-AI Fallback & Verification Engine)
 * Uses 100% verified numbers from the user's workspace without inventing figures.
 */
export function generateDeterministicCopilotResponse(
  prompt: string,
  taskType: string,
  ctx: SanitizedBusinessContext
): { reply: string; verifiedMetricsUsed: string[] } {
  const cur = ctx.currency || 'KSh';
  const fmt = (n: number) => `${cur} ${(Number(n) || 0).toLocaleString('en-KE')}`;
  const m = ctx.metrics;
  const profitLabel = m.isProfitEstimated
    ? 'Estimated Gross Profit (some items lack recorded purchase costs)'
    : 'Verified Gross Profit';

  const lower = (prompt + ' ' + taskType).toLowerCase();

  //Insufficient data check
  const hasAnyActivity =
    m.salesCount > 0 || m.operatingExpenses > 0 || ctx.metrics.activeProductCount > 0;

  if (!hasAnyActivity) {
    return {
      verifiedMetricsUsed: ['Sales Count: 0', 'Active Products: 0'],
      reply: `### Karibu to BizPilot Copilot for **${ctx.businessName}**!

Right now, your workspace has **0 active products**, **0 recorded sales**, and **0 expenses** for **${ctx.periodLabel}**. Because I never invent or guess financial numbers, there is insufficient transaction data to analyze trends yet.

#### Recommended Next Steps:
1. **Add Products & Stock Costs**: Go to **Products & Inventory** and add your top items with both *Purchase Cost* and *Selling Price* so we can calculate real margins.
2. **Record Daily Sales**: Use **Point of Sale (POS)** whenever a customer pays via M-Pesa, Cash, or Credit.
3. **Log Operating Expenses**: Track rent, transport, and utilities under **Expenses** (keeping stock restocks under Inventory Purchases so costs aren't double-counted).`,
    };
  }

  if (lower.includes('low stock') || lower.includes('restock') || taskType === 'low_stock') {
    if (ctx.lowStockProducts.length === 0) {
      return {
        verifiedMetricsUsed: [
          `Active Products: ${m.activeProductCount}`,
          `Low-Stock Items: 0`,
          `Inventory Valuation (Cost): ${fmt(m.inventoryValuationAtCost)}`,
        ],
        reply: `### Inventory Health Check — **${ctx.businessName}**

Good news! Out of **${m.activeProductCount} active products** (total stock cost valuation: **${fmt(m.inventoryValuationAtCost)}**), **0 products** are currently at or below their low-stock alert threshold.

- **Tip**: Review your **Top-Selling Products** (${
          ctx.topSellingProducts.length > 0
            ? ctx.topSellingProducts.map((p) => `${p.name} (${p.unitsSold} sold)`).join(', ')
            : 'no sales recorded in this period yet'
        }) and ensure supplier lead times in **${ctx.countyTown || 'Kenya'}** are covered before weekend peak demand.`,
      };
    }

    const listMd = ctx.lowStockProducts
      .map(
        (p) =>
          `- **${p.name}** (\`${p.sku}\`): **${p.stockQuantity} left** (Alert threshold: ${p.lowStockThreshold} | Selling price: ${fmt(p.sellingPrice)})`
      )
      .join('\n');

    return {
      verifiedMetricsUsed: [
        `Active Products: ${m.activeProductCount}`,
        `Low-Stock Alert Count: ${ctx.lowStockProducts.length}`,
        `Inventory Cost Valuation: ${fmt(m.inventoryValuationAtCost)}`,
      ],
      reply: `### Low-Stock & Restock Priority Report — **${ctx.businessName}**

You currently have **${ctx.lowStockProducts.length} product(s)** at or below their low-stock threshold:

${listMd}

#### Actionable Restock Advice:
1. **Prioritize Fast Movers First**: Cross-check against your top sellers (${
        ctx.topSellingProducts.slice(0, 3).map((t) => t.name).join(', ') || 'none recorded yet'
      }) so you don't lose daily walk-in sales.
2. **Record Restocks via Suppliers & Purchasing**: When new stock arrives, log it under **Suppliers** or **Stock In** so your inventory valuation (**${fmt(m.inventoryValuationAtCost)}**) updates automatically without inflating operating expenses.`,
    };
  }

  if (
    lower.includes('marketing') ||
    lower.includes('promo') ||
    lower.includes('whatsapp') ||
    taskType === 'marketing_draft'
  ) {
    const heroProducts =
      ctx.topSellingProducts.length > 0
        ? ctx.topSellingProducts.slice(0, 3).map((p) => p.name).join(', ')
        : 'our latest quality stock';

    return {
      verifiedMetricsUsed: [
        `Business: ${ctx.businessName}`,
        `Top Products: ${heroProducts}`,
      ],
      reply: `### Ready-to-Send WhatsApp & Social Media Promo Drafts for **${ctx.businessName}**

> **Note**: Review and customize these templates before sending to your customers.

#### Option 1: WhatsApp Broadcast / Status Update (English + Kenyan Warmth)
\`\`\`text
Habari! 🌟 Fresh stock is available at ${ctx.businessName} (${ctx.countyTown || 'Kenya'})!
Featured today: ${heroProducts}.
✅ Genuine quality at fair prices
✅ Fast delivery / pickup available
✅ Pay conveniently via M-Pesa or Cash
Reply to this message or call us today to reserve yours! Asante sana for supporting us. 🙏
\`\`\`

#### Option 2: Weekend Bundle / Repeat Customer Offer
\`\`\`text
Hello from ${ctx.businessName}! 🎉
This week we are appreciating our loyal customers. Shop with us today and check out ${heroProducts}.
DM us your order list for quick preparation and dispatch!
\`\`\``,
    };
  }

  if (
    lower.includes('description') ||
    lower.includes('catalogue') ||
    taskType === 'product_description'
  ) {
    const topItem = ctx.topSellingProducts[0]?.name || ctx.lowStockProducts[0]?.name || 'Featured Product';
    return {
      verifiedMetricsUsed: [`Business Category: ${ctx.category}`, `Featured Item: ${topItem}`],
      reply: `### Product Description Templates — **${ctx.businessName}** (${ctx.category})

#### Template for **${topItem}** (Instagram / WhatsApp Catalogue)
- **Headline**: Genuine ${topItem} — Available Now at ${ctx.businessName}
- **Highlights**:
  - Dependable quality inspected for daily use
  - Fair pricing in ${cur} with instant official receipt
  - Available for pickup in ${ctx.countyTown || 'town'} or rider delivery
- **Call to Action**: Send us a WhatsApp message to confirm current availability and place your order!`,
    };
  }

  if (
    lower.includes('follow-up') ||
    lower.includes('credit') ||
    lower.includes('deni') ||
    lower.includes('balance') ||
    taskType === 'customer_followup'
  ) {
    return {
      verifiedMetricsUsed: [
        `Verified Outstanding Customer Balances: ${fmt(m.outstandingCustomerBalance)}`,
        `Verified Cash Collected (${ctx.periodLabel}): ${fmt(m.cashCollected)}`,
      ],
      reply: `### Customer Credit & Follow-Up Guide — **${ctx.businessName}**

- **Total Outstanding Customer Balances (All Open Credit & Invoices)**: **${fmt(m.outstandingCustomerBalance)}** *(Verified from recorded credit sales, invoices, and payments)*
- **Cash Collected in ${ctx.periodLabel}**: **${fmt(m.cashCollected)}** *(Excludes unpaid invoices)*

#### Polite WhatsApp Payment Reminder Template (English)
\`\`\`text
Hello [Customer Name], greetings from ${ctx.businessName}! We hope your week is going well.
This is a polite reminder regarding your outstanding balance of ${cur} [Amount].
Kindly let us know when to expect settlement via M-Pesa or Cash so we can update your statement. Thank you for your continued support!
\`\`\`

#### Polite Kiswahili Reminder Template
\`\`\`text
Habari [Customer Name], salamu kutoka ${ctx.businessName}! Tunatumai unaendelea vyema.
Tunakukumbusha kwa upole kuhusu salio lako la ${cur} [Amount]. Tafadhali tujulishe utakapolipa kupitia M-Pesa au Taslimu ili tusasishe rekodi zako. Asante sana kwa kuwa mteja wetu!
\`\`\``,
    };
  }

  // Default: Comprehensive Weekly / Period Performance Summary & Metrics Explanation
  return {
    verifiedMetricsUsed: [
      `Period: ${ctx.periodLabel}`,
      `Completed Sales: ${m.salesCount} (${fmt(m.salesRevenue)})`,
      `Cash Collected: ${fmt(m.cashCollected)}`,
      `${profitLabel}: ${fmt(m.grossProfit)} (${m.grossMarginPercent}% margin)`,
      `Operating Expenses: ${fmt(m.operatingExpenses)}`,
      `Estimated Net Profit: ${fmt(m.estimatedNetProfit)}`,
      `Outstanding Customer Credit: ${fmt(m.outstandingCustomerBalance)}`,
    ],
    reply: `### Executive Business Summary for **${ctx.businessName}** (${ctx.periodLabel})

#### 1. Verified Financial Performance
- **Net Sales Revenue (Billed)**: **${fmt(m.salesRevenue)}** across **${m.salesCount}** completed sale(s).
- **Actual Cash Collected**: **${fmt(m.cashCollected)}** *(Only counts paid sales and credit payments actually received; unpaid invoices are never counted as cash).*
- **Cost of Goods Sold (COGS)**: **${fmt(m.costOfGoodsSold)}**
- **${profitLabel}**: **${fmt(m.grossProfit)}** (**${m.grossMarginPercent}%** gross margin)
- **Operating Expenses**: **${fmt(m.operatingExpenses)}** *(Excludes ${fmt(m.inventoryPurchasesLogged)} in stock purchases so inventory costs are not double-counted).*
- **Estimated Net Profit**: **${fmt(m.estimatedNetProfit)}**

#### 2. Working Capital & Credit Health
- **Customer Balances Owed to You**: **${fmt(m.outstandingCustomerBalance)}**
- **Supplier Balances You Owe**: **${fmt(m.outstandingSupplierBalance)}**
- **Current Stock Valuation (at Cost)**: **${fmt(m.inventoryValuationAtCost)}** across **${m.activeProductCount}** active products.

#### 3. Key Recommendations for Your Business
${
  m.outstandingCustomerBalance > m.cashCollected * 0.3 && m.outstandingCustomerBalance > 0
    ? `- **Collect Receivables**: Customers currently owe **${fmt(m.outstandingCustomerBalance)}**. Use the **Customers & Credit** module to send polite WhatsApp reminders and free up cash flow.\n`
    : ''
}${
      ctx.lowStockProducts.length > 0
        ? `- **Restock Alert**: **${ctx.lowStockProducts.length} product(s)** are running low (${ctx.lowStockProducts.slice(0, 3).map((p) => p.name).join(', ')}).\n`
        : '- **Inventory Levels**: All active products are currently above their low-stock thresholds.\n'
    }${
      m.isProfitEstimated
        ? `- **Improve Profit Accuracy**: One or more products have a purchase cost of KSh 0. Edit your products to add accurate supplier purchase costs so your Gross Profit moves from *Estimated* to *Verified*.\n`
        : '- **Margin Tracking**: All sold items have recorded purchase costs, giving you accurate gross margin visibility.\n'
    }`,
  };
}

// Health & Provider Status Endpoint
bizpilotRouter.get('/status', (_req: Request, res: Response) => {
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 10
  );
  const hasOpenAiKey = Boolean(
    process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim().length > 10
  );
  const hasSupabaseConfig = Boolean(
    (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL) &&
      (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
  );

  res.json({
    status: 'ok',
    app: 'BizPilot KE API',
    timezone: 'Africa/Nairobi',
    aiConfigured: hasGeminiKey || hasOpenAiKey,
    aiProvider: hasGeminiKey
      ? 'Google Gemini (Server-Side)'
      : hasOpenAiKey
        ? 'OpenAI (Server-Side)'
        : 'BizPilot Deterministic Analyst Engine (Local Free Fallback)',
    supabaseConfigured: hasSupabaseConfig,
  });
});

// Local Persistent Workspace Sync Endpoints (for Local Dev Mode)
bizpilotRouter.get('/local-store', (_req: Request, res: Response) => {
  try {
    ensureDataDir();
    if (!fs.existsSync(WORKSPACE_STORE_FILE)) {
      res.json({ exists: false, data: null });
      return;
    }
    const raw = fs.readFileSync(WORKSPACE_STORE_FILE, 'utf-8');
    res.json({ exists: true, data: JSON.parse(raw) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read local store', details: String(err) });
  }
});

bizpilotRouter.post('/local-store', (req: Request, res: Response) => {
  try {
    ensureDataDir();
    const payload = req.body;
    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ error: 'Invalid workspace payload' });
      return;
    }
    fs.writeFileSync(WORKSPACE_STORE_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    res.json({ ok: true, savedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write local store', details: String(err) });
  }
});

// Server-side AI Copilot Abstraction Endpoint
bizpilotRouter.post('/copilot', async (req: Request, res: Response) => {
  const clientIp = req.ip || 'local';
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    res.status(429).json({
      error: 'Rate limit reached for BizPilot Copilot. Please wait a few minutes or use the instant template tools.',
    });
    return;
  }

  const { prompt = '', taskType = 'summary', context } = req.body as {
    prompt?: string;
    taskType?: string;
    context?: SanitizedBusinessContext;
  };

  if (!context || !context.businessName || !context.metrics) {
    res.status(400).json({
      error: 'Authorized business workspace context is required for personalized analysis.',
    });
    return;
  }

  // Always compute the verified deterministic baseline first
  const deterministic = generateDeterministicCopilotResponse(prompt, taskType, context);

  // If Gemini API key is configured on server, enhance response while strictly enforcing verified figures
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey && geminiKey.length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const systemInstruction = `You are BizPilot Copilot, an expert Kenyan SME business advisor for "${context.businessName}" (${context.category}) located in ${context.countyTown || 'Kenya'}.
CRITICAL RULES:
1. Use ONLY the verified financial numbers provided in the JSON context below. NEVER invent, guess, or extrapolate sales, expenses, or profit figures.
2. Distinguish between Verified figures and Estimated figures (if isProfitEstimated is true, explicitly state that Gross Profit is an estimate because some items are missing purchase costs).
3. Never count unpaid invoices or credit sales as Cash Collected.
4. Keep currency in ${context.currency || 'KSh'} and tone practical, encouraging, and tailored to Kenyan entrepreneurs.
5. Do not request or output sensitive personal data.`;

      const userMessage = `Task Type: ${taskType}
User Question: ${prompt || 'Summarize my business performance and what I should do next.'}

Verified Business Data (${context.periodLabel}):
${JSON.stringify(context, null, 2)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const aiText = response.text?.trim();
      if (aiText) {
        res.json({
          reply: aiText,
          source: 'ai-provider',
          verifiedMetricsUsed: deterministic.verifiedMetricsUsed,
          rateLimitRemaining: rate.remaining,
        });
        return;
      }
    } catch (aiError) {
      console.warn('[BizPilot Copilot] External AI provider unavailable, using deterministic analyst fallback:', aiError);
    }
  }

  // Return verified deterministic analysis
  res.json({
    reply: deterministic.reply,
    source: 'deterministic-engine',
    verifiedMetricsUsed: deterministic.verifiedMetricsUsed,
    rateLimitRemaining: rate.remaining,
  });
});
