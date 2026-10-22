import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Sparkles,
  MessageSquare,
  Download,
  Printer,
  Send,
  Copy,
  ExternalLink,
  CheckCircle2,
  Info,
  Calendar,
} from 'lucide-react';
import {
  CopilotMessage,
  DateFilterPreset,
  DateRangeFilter,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  buildDateRangeFilter,
  calculateCustomerBalance,
  calculateFinancialMetrics,
  calculateSupplierBalance,
  downloadCsvFile,
  formatCurrency,
  formatKenyanWhatsAppNumber,
  isWithinDateRange,
} from '../../utils/bizpilotFinance.js';

interface ReportsAndCopilotViewProps {
  initialSection?: 'reports' | 'copilot' | 'whatsapp';
  dateFilter: DateRangeFilter;
  onChangeDateFilter: (filter: DateRangeFilter) => void;
}

export const ReportsAndCopilotView: React.FC<ReportsAndCopilotViewProps> = ({
  initialSection = 'reports',
  dateFilter,
  onChangeDateFilter,
}) => {
  const {
    business,
    products,
    sales,
    expenses,
    customers,
    customerPayments,
    suppliers,
    supplierPurchases,
    supplierPayments,
    documents,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';

  const [section, setSection] = useState<'reports' | 'copilot' | 'whatsapp'>(
    initialSection
  );

  // Sync when parent nav switches between reports, copilot, or whatsapp
  React.useEffect(() => {
    setSection(initialSection);
  }, [initialSection]);

  const metrics = useMemo(
    () =>
      calculateFinancialMetrics({
        products,
        sales,
        expenses,
        documents,
        customerPayments,
        supplierPurchases,
        supplierPayments,
        dateFilter,
      }),
    [
      products,
      sales,
      expenses,
      documents,
      customerPayments,
      supplierPurchases,
      supplierPayments,
      dateFilter,
    ]
  );

  const activeProducts = useMemo(
    () => products.filter((p) => !p.isArchived),
    [products]
  );

  const lowStockProducts = useMemo(
    () => activeProducts.filter((p) => p.stockQuantity <= p.lowStockThreshold),
    [activeProducts]
  );

  const completedSalesInPeriod = useMemo(
    () =>
      sales.filter(
        (s) => s.status === 'completed' && isWithinDateRange(s.createdAt, dateFilter)
      ),
    [sales, dateFilter]
  );

  // Sales by Category & Payment Method Breakdown
  const salesByCategory = useMemo(() => {
    const prodCategoryMap = new Map<string, string>();
    for (const p of products) {
      prodCategoryMap.set(p.id, p.category);
    }
    const catTotals = new Map<
      string,
      { category: string; units: number; revenue: number; cogs: number }
    >();

    for (const sale of completedSalesInPeriod) {
      for (const item of sale.items) {
        const cat = prodCategoryMap.get(item.productId) || 'General';
        const prev = catTotals.get(cat) || {
          category: cat,
          units: 0,
          revenue: 0,
          cogs: 0,
        };
        prev.units += item.quantity;
        prev.revenue += item.lineTotal;
        prev.cogs += item.unitCost * item.quantity;
        catTotals.set(cat, prev);
      }
    }
    return Array.from(catTotals.values()).sort((a, b) => b.revenue - a.revenue);
  }, [completedSalesInPeriod, products]);

  const salesByPaymentMethod = useMemo(() => {
    const map = new Map<string, { method: string; count: number; total: number; collected: number }>();
    for (const sale of completedSalesInPeriod) {
      const m = sale.paymentMethod.toUpperCase();
      const prev = map.get(m) || { method: m, count: 0, total: 0, collected: 0 };
      prev.count += 1;
      prev.total += sale.totalAmount;
      prev.collected += sale.amountPaid;
      map.set(m, prev);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [completedSalesInPeriod]);

  const topSellingProducts = useMemo(() => {
    const map = new Map<string, { name: string; unitsSold: number; revenue: number }>();
    for (const sale of completedSalesInPeriod) {
      for (const item of sale.items) {
        const prev = map.get(item.productId) || {
          name: item.productName,
          unitsSold: 0,
          revenue: 0,
        };
        prev.unitsSold += item.quantity;
        prev.revenue += item.lineTotal;
        map.set(item.productId, prev);
      }
    }
    return Array.from(map.values())
      .sort((a, b) => b.unitsSold - a.unitsSold)
      .slice(0, 6);
  }, [completedSalesInPeriod]);

  // Copilot Chat State
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([]);
  const [copilotInput, setCopilotInput] = useState('');
  const [isCopilotBusy, setIsCopilotBusy] = useState(false);

  // WhatsApp Communication Studio State
  const [waTemplateType, setWaTemplateType] = useState<
    'catalogue' | 'promo' | 'description' | 'followup'
  >('catalogue');
  const [selectedWaProductId, setSelectedWaProductId] = useState<string>(
    activeProducts[0]?.id || ''
  );
  const [selectedWaCustomerId, setSelectedWaCustomerId] = useState<string>(
    customers[0]?.id || ''
  );
  const [waRecipientPhone, setWaRecipientPhone] = useState<string>('');
  const [copiedWaText, setCopiedWaText] = useState(false);

  const askCopilot = async (taskType: string, customPrompt?: string) => {
    if (!business) return;
    const questionText =
      customPrompt ||
      (taskType === 'summary'
        ? 'Summarize my business performance and tell me what to focus on next.'
        : taskType === 'low_stock'
          ? 'Which products are running low on stock and what should I restock first?'
          : taskType === 'marketing_draft'
            ? 'Draft a promotional WhatsApp message for my customers.'
            : taskType === 'product_description'
              ? 'Generate a compelling product description for my top products.'
              : 'Prepare a weekly business summary and credit follow-up guide.');

    const userMsg: CopilotMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'user',
      content: questionText,
      source: 'deterministic-engine',
      timestamp: new Date().toISOString(),
    };

    setCopilotMessages((prev) => [...prev, userMsg]);
    setCopilotInput('');
    setIsCopilotBusy(true);

    const periodLabel =
      dateFilter.preset === 'today'
        ? 'Today'
        : dateFilter.preset === '7d'
          ? 'Last 7 Days'
          : dateFilter.preset === '30d'
            ? 'Last 30 Days'
            : `${dateFilter.startDate} to ${dateFilter.endDate}`;

    const sanitizedContext = {
      businessName: business.name,
      category: business.category,
      countyTown: business.countyTown || 'Kenya',
      currency,
      periodLabel,
      metrics: {
        salesRevenue: metrics.salesRevenue,
        salesCount: metrics.salesCount,
        cashCollected: metrics.cashCollected,
        costOfGoodsSold: metrics.costOfGoodsSold,
        grossProfit: metrics.grossProfit,
        grossMarginPercent: metrics.grossMarginPercent,
        isProfitEstimated: metrics.isProfitEstimated,
        operatingExpenses: metrics.operatingExpenses,
        inventoryPurchasesLogged: metrics.inventoryPurchasesLogged,
        estimatedNetProfit: metrics.estimatedNetProfit,
        outstandingCustomerBalance: metrics.outstandingCustomerBalance,
        outstandingSupplierBalance: metrics.outstandingSupplierBalance,
        inventoryValuationAtCost: metrics.inventoryValuationAtCost,
        activeProductCount: activeProducts.length,
      },
      lowStockProducts: lowStockProducts.map((p) => ({
        name: p.name,
        sku: p.sku,
        stockQuantity: p.stockQuantity,
        lowStockThreshold: p.lowStockThreshold,
        sellingPrice: p.sellingPrice,
      })),
      topSellingProducts,
      expenseBreakdown: [],
    };

    try {
      const res = await fetch('/api/bizpilot/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: questionText,
          taskType,
          context: sanitizedContext,
        }),
      });
      const data = await res.json();
      const assistantMsg: CopilotMessage = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content:
          data.reply ||
          'Unable to generate response right now. Please check your metrics on the Reports tab.',
        source: data.source || 'deterministic-engine',
        timestamp: new Date().toISOString(),
        verifiedMetricsUsed: data.verifiedMetricsUsed || [],
      };
      setCopilotMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const fallbackMsg: CopilotMessage = {
        id: `msg_a_${Date.now()}`,
        role: 'assistant',
        content: `### Offline Business Summary — ${business.name}\n- **Sales Revenue**: ${formatCurrency(metrics.salesRevenue, currency)}\n- **Cash Collected**: ${formatCurrency(metrics.cashCollected, currency)}\n- **Gross Profit**: ${formatCurrency(metrics.grossProfit, currency)}\n- **Operating Expenses**: ${formatCurrency(metrics.operatingExpenses, currency)}\n- **Estimated Net Profit**: ${formatCurrency(metrics.estimatedNetProfit, currency)}`,
        source: 'deterministic-engine',
        timestamp: new Date().toISOString(),
      };
      setCopilotMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsCopilotBusy(false);
    }
  };

  // Export Full Financial P&L Report CSV
  const handleExportReportCsv = () => {
    downloadCsvFile(
      `bizpilot-financial-report-${dateFilter.startDate}-to-${dateFilter.endDate}.csv`,
      ['Metric', 'Amount (KSh)', 'Accounting Definition / Notes'],
      [
        [
          'Net Sales Revenue',
          metrics.salesRevenue,
          `Across ${metrics.salesCount} completed non-cancelled sales`,
        ],
        [
          'Actual Cash Collected',
          metrics.cashCollected,
          'Paid sales + customer credit instalments received (excludes unpaid invoices)',
        ],
        ['Cost of Goods Sold (COGS)', metrics.costOfGoodsSold, 'Recorded unit cost of items sold'],
        [
          metrics.isProfitEstimated ? 'Estimated Gross Profit' : 'Gross Profit',
          metrics.grossProfit,
          `Margin: ${metrics.grossMarginPercent}%`,
        ],
        [
          'Operating Expenses',
          metrics.operatingExpenses,
          'Excludes stock restock purchases so COGS is never double-counted',
        ],
        ['Estimated Net Profit', metrics.estimatedNetProfit, 'Gross Profit minus Operating Expenses'],
        [
          'Outstanding Customer Balances',
          metrics.outstandingCustomerBalance,
          'Unpaid credit sales and active invoices',
        ],
        [
          'Outstanding Supplier Balances',
          metrics.outstandingSupplierBalance,
          'Unpaid supplier stock purchase orders',
        ],
        [
          'Active Inventory Cost Valuation',
          metrics.inventoryValuationAtCost,
          `Across ${activeProducts.length} active products`,
        ],
      ]
    );
  };

  // Build WhatsApp Studio Draft
  const generatedWhatsAppDraft = useMemo(() => {
    const bizName = business?.name || 'Our Shop';
    const town = business?.countyTown || 'Kenya';
    const prod =
      activeProducts.find((p) => p.id === selectedWaProductId) || activeProducts[0];
    const cust =
      customers.find((c) => c.id === selectedWaCustomerId) || customers[0];

    if (waTemplateType === 'catalogue') {
      const inStockList = activeProducts
        .filter((p) => p.stockQuantity > 0)
        .slice(0, 6)
        .map(
          (p) =>
            `✅ *${p.name}* — ${formatCurrency(p.sellingPrice, currency)} (${p.stockQuantity} ${p.unit} available)`
        )
        .join('\n');

      return `*🛍️ ${bizName} (${town}) — Updated Price & Stock Catalogue*\n\nHabari! Here are our featured items currently in stock:\n\n${
        inStockList || '• Contact us for today’s stock list'
      }\n\n📲 Reply with the items and quantities you need for fast pickup or rider delivery!\n💳 Payment via M-Pesa or Cash.${
        business?.phone ? `\n📞 Call/WhatsApp: ${business.phone}` : ''
      }`;
    }

    if (waTemplateType === 'description' && prod) {
      return `*✨ Featured Product: ${prod.name}*\nSKU: ${prod.sku} | Category: ${prod.category}\n\n${
        prod.description || 'High quality, dependable stock ready for immediate pickup or delivery.'
      }\n\n💰 *Price: ${formatCurrency(prod.sellingPrice, currency)} per ${prod.unit}*\n📦 Current Availability: ${
        prod.stockQuantity > 0 ? `${prod.stockQuantity} ${prod.unit} in stock` : 'Pre-order available'
      }\n\nOrder today from *${bizName}* (${town})!`;
    }

    if (waTemplateType === 'promo') {
      const topNames = activeProducts
        .slice(0, 3)
        .map((p) => p.name)
        .join(', ');
      return `*🎉 Special Customer Offer at ${bizName}!*\n\nHabari! Thank you for supporting our business in ${town}. This week we have fresh stock of ${
        topNames || 'your favourite essentials'
      } at fair prices.\n\nOrder via WhatsApp today for priority preparation and instant official receipt. Karibu sana! 🙏`;
    }

    // 'followup'
    const custBal = cust
      ? calculateCustomerBalance(cust.id, sales, documents, customerPayments)
          .outstandingBalance
      : 0;
    return `Habari ${cust?.name || 'Customer'}, warm greetings from *${bizName}*! 🌟\n\nWe appreciate your business with us. ${
      custBal > 0
        ? `This is a polite reminder regarding your current account balance of *${formatCurrency(custBal, currency)}*. Kindly let us know when to expect settlement via M-Pesa or Cash.`
        : 'Thank you for keeping your account up to date! Let us know if you need any restock this week.'
    }\n\nAsante sana!`;
  }, [
    business,
    activeProducts,
    selectedWaProductId,
    customers,
    selectedWaCustomerId,
    waTemplateType,
    currency,
    sales,
    documents,
    customerPayments,
  ]);

  return (
    <div className="space-y-6">
      {/* Top Section Navigation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSection('reports')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer ${
              section === 'reports'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Financial Reports & Insights
          </button>

          <button
            type="button"
            onClick={() => setSection('copilot')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer ${
              section === 'copilot'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            BizPilot Copilot (AI Advisor)
          </button>

          <button
            type="button"
            onClick={() => setSection('whatsapp')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer ${
              section === 'whatsapp'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp & Customer Comms
          </button>
        </div>

        {/* Date Filter for Reports & Copilot */}
        <div className="flex items-center gap-1.5">
          {(
            [
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
              { id: 'all', label: 'All' },
            ] as Array<{ id: DateFilterPreset; label: string }>
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onChangeDateFilter(buildDateRangeFilter(p.id))}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                dateFilter.preset === p.id
                  ? 'bg-emerald-900 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. FINANCIAL REPORTS & INSIGHTS TAB */}
      {/* ==================================================================== */}
      {section === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Profit & Loss (P&L) & Working Capital Statement
                </h2>
                <p className="text-xs text-slate-500">
                  Workspace: <strong>{business?.name}</strong> • Period: {dateFilter.startDate}{' '}
                  to {dateFilter.endDate} (EAT)
                </p>
              </div>
              <div className="flex items-center gap-2 print:hidden">
                <button
                  type="button"
                  onClick={handleExportReportCsv}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export P&L CSV
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Report
                </button>
              </div>
            </div>

            {/* P&L Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-200 pb-2">
                  Income & Profit Statement
                </h3>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Net Sales Revenue ({metrics.salesCount} completed sales)
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatCurrency(metrics.salesRevenue, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Less: Cost of Goods Sold (COGS on sold items)
                  </span>
                  <span className="font-mono text-slate-700">
                    -{formatCurrency(metrics.costOfGoodsSold, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-y border-slate-200 font-bold">
                  <span className="text-emerald-950">
                    {metrics.isProfitEstimated ? 'Estimated Gross Profit' : 'Gross Profit'} (
                    {metrics.grossMarginPercent}% margin)
                  </span>
                  <span className="font-mono text-emerald-900">
                    {formatCurrency(metrics.grossProfit, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Less: Operating Expenses (Excludes stock purchases)
                  </span>
                  <span className="font-mono text-amber-900">
                    -{formatCurrency(metrics.operatingExpenses, currency)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-300 text-base font-extrabold">
                  <span className="text-slate-900">Estimated Net Profit</span>
                  <span
                    className={`font-mono ${
                      metrics.estimatedNetProfit >= 0 ? 'text-emerald-900' : 'text-red-700'
                    }`}
                  >
                    {formatCurrency(metrics.estimatedNetProfit, currency)}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5 text-xs sm:text-sm">
                <h3 className="font-bold text-slate-900 uppercase text-xs tracking-wider border-b border-slate-200 pb-2">
                  Cash Flow, Inventory & Balances Position
                </h3>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Actual Cash / M-Pesa Collected in Period
                  </span>
                  <span className="font-mono font-bold text-emerald-900">
                    {formatCurrency(metrics.cashCollected, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Outstanding Customer Balances (Receivables)
                  </span>
                  <span className="font-mono font-bold text-amber-900">
                    {formatCurrency(metrics.outstandingCustomerBalance, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">
                    Outstanding Supplier Balances (Payables)
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {formatCurrency(metrics.outstandingSupplierBalance, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-t border-slate-200 pt-2">
                  <span className="text-slate-600">Inventory Valuation at Cost</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatCurrency(metrics.inventoryValuationAtCost, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-600">Inventory Retail Value</span>
                  <span className="font-mono text-slate-700">
                    {formatCurrency(metrics.inventoryRetailValue, currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Sales by Category & Payment Method Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Sales by Product Category
                </h3>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase">
                      <th className="py-2">Category</th>
                      <th className="py-2 text-right">Units</th>
                      <th className="py-2 text-right">Revenue</th>
                      <th className="py-2 text-right">Gross Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {salesByCategory.map((c) => (
                      <tr key={c.category}>
                        <td className="py-2 font-medium text-slate-800">{c.category}</td>
                        <td className="py-2 text-right font-mono">{c.units}</td>
                        <td className="py-2 text-right font-mono font-bold">
                          {formatCurrency(c.revenue, currency)}
                        </td>
                        <td className="py-2 text-right font-mono text-emerald-800">
                          {formatCurrency(c.revenue - c.cogs, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Sales by Payment Method
                </h3>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase">
                      <th className="py-2">Payment Method</th>
                      <th className="py-2 text-right">Receipts</th>
                      <th className="py-2 text-right">Total Billed</th>
                      <th className="py-2 text-right">Cash Collected</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {salesByPaymentMethod.map((pm) => (
                      <tr key={pm.method}>
                        <td className="py-2 font-bold text-slate-800">{pm.method}</td>
                        <td className="py-2 text-right font-mono">{pm.count}</td>
                        <td className="py-2 text-right font-mono">
                          {formatCurrency(pm.total, currency)}
                        </td>
                        <td className="py-2 text-right font-mono font-bold text-emerald-900">
                          {formatCurrency(pm.collected, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. BIZPILOT COPILOT (AI BUSINESS ASSISTANT) TAB */}
      {/* ==================================================================== */}
      {section === 'copilot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quick Prompts Sidebar */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 text-xs font-bold border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                BizPilot Copilot
              </div>
              <h2 className="mt-2 text-base font-bold text-slate-900">
                One-Click Business Analysis
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Analyzes your actual saved workspace numbers. Never invents sales or profit
                figures.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'summary',
                  label: 'Summarize Business Performance',
                  desc: 'Verified revenue, cash collected, margins & net profit',
                },
                {
                  id: 'low_stock',
                  label: 'Identify Low-Stock & Restock Priorities',
                  desc: 'Checks stock thresholds against top-selling items',
                },
                {
                  id: 'marketing_draft',
                  label: 'Draft WhatsApp Promotional Messages',
                  desc: 'Ready-to-send broadcast templates for your shop',
                },
                {
                  id: 'product_description',
                  label: 'Generate Product Catalogue Descriptions',
                  desc: 'Clean copy for WhatsApp Status & Instagram',
                },
                {
                  id: 'customer_followup',
                  label: 'Customer Credit (Madeni) Follow-Up Plan',
                  desc: 'Summarizes receivables + English/Swahili reminders',
                },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  disabled={isCopilotBusy}
                  onClick={() => askCopilot(btn.id)}
                  className="w-full p-3 rounded-xl border border-slate-200 hover:border-emerald-800 hover:bg-emerald-50/40 text-left transition-all cursor-pointer"
                >
                  <p className="text-xs font-bold text-slate-900">{btn.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{btn.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Copilot Response Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 flex flex-col min-h-[520px]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  BizPilot Copilot Workspace Advisor — {business?.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Privacy-protected: Customer phone numbers and personal data are never sent to
                  external AI providers.
                </p>
              </div>
            </div>

            <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[420px]">
              {copilotMessages.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">
                    Ask BizPilot Copilot about your numbers
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Select any quick analysis button on the left or type a question below to get
                    personalized insights grounded strictly in your saved workspace records.
                  </p>
                </div>
              ) : (
                copilotMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2 ${
                      msg.role === 'user'
                        ? 'bg-emerald-900 text-white ml-auto max-w-md'
                        : 'bg-slate-50 border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                    {msg.verifiedMetricsUsed && msg.verifiedMetricsUsed.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase text-emerald-900">
                          Verified Figures Used:
                        </span>
                        {msg.verifiedMetricsUsed.map((vm, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-700"
                          >
                            {vm}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!copilotInput.trim()) return;
                askCopilot('custom', copilotInput.trim());
              }}
              className="p-4 border-t border-slate-200 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask e.g. 'How much profit did I make and what stock is low?'"
                value={copilotInput}
                onChange={(e) => setCopilotInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 outline-none focus:border-emerald-800"
              />
              <button
                type="submit"
                disabled={isCopilotBusy}
                className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Ask Copilot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. WHATSAPP & CUSTOMER COMMUNICATION STUDIO TAB */}
      {/* ==================================================================== */}
      {section === 'whatsapp' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              WhatsApp & Customer Communication Studio
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate copyable WhatsApp-ready product catalogues, promotional offers, and polite
              customer follow-ups. All messages require your manual review before sending.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            {(
              [
                { id: 'catalogue', label: 'Shareable Stock Catalogue' },
                { id: 'description', label: 'Product Description Card' },
                { id: 'promo', label: 'Promotional Campaign Draft' },
                { id: 'followup', label: 'Customer Credit Follow-Up' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setWaTemplateType(t.id)}
                className={`p-3 rounded-xl border text-xs font-bold text-left cursor-pointer ${
                  waTemplateType === t.id
                    ? 'border-emerald-800 bg-emerald-50/70 text-emerald-950'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {waTemplateType === 'description' && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Select Product to Feature
                </label>
                <select
                  value={selectedWaProductId}
                  onChange={(e) => setSelectedWaProductId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {activeProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatCurrency(p.sellingPrice, currency)})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {waTemplateType === 'followup' && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Select Customer
                </label>
                <select
                  value={selectedWaCustomerId}
                  onChange={(e) => {
                    setSelectedWaCustomerId(e.target.value);
                    const found = customers.find((c) => c.id === e.target.value);
                    if (found) setWaRecipientPhone(found.phone);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone || 'No phone'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Recipient WhatsApp Phone (Optional for Click-to-Chat)
              </label>
              <input
                type="tel"
                placeholder="e.g. 0721 456 789"
                value={waRecipientPhone}
                onChange={(e) => setWaRecipientPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1.5">
              WhatsApp-Ready Message Preview
            </label>
            <textarea
              readOnly
              rows={8}
              value={generatedWhatsAppDraft}
              className="w-full p-4 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 bg-slate-50 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(generatedWhatsAppDraft);
                setCopiedWaText(true);
                setTimeout(() => setCopiedWaText(false), 2000);
              }}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              {copiedWaText ? 'Copied to Clipboard!' : 'Copy WhatsApp Message'}
            </button>

            {formatKenyanWhatsAppNumber(waRecipientPhone) && (
              <a
                href={`https://wa.me/${formatKenyanWhatsAppNumber(
                  waRecipientPhone
                )}?text=${encodeURIComponent(generatedWhatsAppDraft)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open Click-to-Chat in WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
