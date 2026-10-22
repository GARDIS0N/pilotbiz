import React, { useMemo } from 'react';
import {
  TrendingUp,
  Wallet,
  Receipt,
  AlertTriangle,
  Package,
  Users,
  Plus,
  ShoppingCart,
  ArrowUpRight,
  Info,
  Sparkles,
  Calendar,
  Store,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { DateFilterPreset, DateRangeFilter } from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  buildDateRangeFilter,
  calculateFinancialMetrics,
  formatCurrency,
  formatEatDate,
  formatEatDateTime,
  getEatDateString,
  isWithinDateRange,
} from '../../utils/bizpilotFinance.js';

export type NavTabId =
  | 'dashboard'
  | 'pos'
  | 'products'
  | 'expenses'
  | 'customers'
  | 'invoices'
  | 'reports'
  | 'copilot'
  | 'whatsapp'
  | 'settings';

interface DashboardViewProps {
  dateFilter: DateRangeFilter;
  onChangeDateFilter: (filter: DateRangeFilter) => void;
  onNavigate: (tab: NavTabId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dateFilter,
  onChangeDateFilter,
  onNavigate,
}) => {
  const {
    business,
    products,
    sales,
    expenses,
    documents,
    customerPayments,
    supplierPurchases,
    supplierPayments,
    loadSampleDataIntoCurrentWorkspace,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';

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

  const outOfStockCount = useMemo(
    () => activeProducts.filter((p) => p.stockQuantity <= 0).length,
    [activeProducts]
  );

  // Filtered recent sales & expenses
  const filteredSales = useMemo(
    () => sales.filter((s) => isWithinDateRange(s.createdAt, dateFilter)),
    [sales, dateFilter]
  );

  const filteredExpenses = useMemo(
    () => expenses.filter((e) => isWithinDateRange(e.expenseDate, dateFilter)),
    [expenses, dateFilter]
  );

  // Best-selling products in selected period
  const bestSellingProducts = useMemo(() => {
    const map = new Map<
      string,
      { name: string; sku: string; unitsSold: number; revenue: number; profit: number }
    >();
    for (const sale of filteredSales) {
      if (sale.status !== 'completed') continue;
      for (const item of sale.items) {
        const prev = map.get(item.productId) || {
          name: item.productName,
          sku: item.sku,
          unitsSold: 0,
          revenue: 0,
          profit: 0,
        };
        prev.unitsSold += item.quantity;
        prev.revenue += item.lineTotal;
        prev.profit += item.lineTotal - item.unitCost * item.quantity;
        map.set(item.productId, prev);
      }
    }
    return Array.from(map.values())
      .sort((a, b) => b.unitsSold - a.unitsSold || b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredSales]);

  // Daily Sales & Expenses Trend Chart Data (last 7 days or selected range)
  const trendChartData = useMemo(() => {
    const dayMap = new Map<
      string,
      { date: string; label: string; sales: number; expenses: number; grossProfit: number }
    >();

    // Seed last 7 days so chart always has clean X axis points
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayStr = getEatDateString(d);
      if (dateFilter.preset === 'today' && dayStr !== dateFilter.startDate) continue;
      dayMap.set(dayStr, {
        date: dayStr,
        label: formatEatDate(dayStr).replace(/,\s*\d{4}$/, ''),
        sales: 0,
        expenses: 0,
        grossProfit: 0,
      });
    }

    for (const sale of filteredSales) {
      if (sale.status !== 'completed') continue;
      const dayStr = getEatDateString(new Date(sale.createdAt));
      const existing = dayMap.get(dayStr) || {
        date: dayStr,
        label: formatEatDate(dayStr).replace(/,\s*\d{4}$/, ''),
        sales: 0,
        expenses: 0,
        grossProfit: 0,
      };
      const netSale = Math.max(0, sale.totalAmount - (sale.taxAmount || 0));
      existing.sales += netSale;
      existing.grossProfit += netSale - sale.totalCogs;
      dayMap.set(dayStr, existing);
    }

    for (const exp of filteredExpenses) {
      if (exp.isInventoryPurchase) continue;
      const existing = dayMap.get(exp.expenseDate) || {
        date: exp.expenseDate,
        label: formatEatDate(exp.expenseDate).replace(/,\s*\d{4}$/, ''),
        sales: 0,
        expenses: 0,
        grossProfit: 0,
      };
      existing.expenses += exp.amount;
      dayMap.set(exp.expenseDate, existing);
    }

    return Array.from(dayMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredSales, filteredExpenses, dateFilter]);

  const isBrandNewWorkspace =
    products.length === 0 && sales.length === 0 && expenses.length === 0;

  const periodTitle =
    dateFilter.preset === 'today'
      ? "Today's"
      : dateFilter.preset === '7d'
        ? 'Last 7 Days'
        : dateFilter.preset === '30d'
          ? 'Last 30 Days'
          : dateFilter.preset === 'all'
            ? 'All-Time'
            : 'Selected Period';

  return (
    <div className="space-y-6">
      {/* Header & Date Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {business?.name || 'Business Dashboard'}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200">
              {business?.subscriptionPlan} Plan
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {business?.category} • {business?.countyTown || 'Kenya'} • All figures calculated live
            in East Africa Time (EAT)
          </p>
        </div>

        {/* Date Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            {(
              [
                { id: 'today', label: 'Today' },
                { id: '7d', label: '7 Days' },
                { id: '30d', label: '30 Days' },
                { id: 'all', label: 'All Time' },
              ] as Array<{ id: DateFilterPreset; label: string }>
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onChangeDateFilter(buildDateRangeFilter(p.id))}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  dateFilter.preset === p.id
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="date"
              aria-label="Start Date"
              value={dateFilter.startDate}
              onChange={(e) =>
                onChangeDateFilter({
                  preset: 'custom',
                  startDate: e.target.value,
                  endDate: dateFilter.endDate,
                })
              }
              className="bg-transparent text-xs font-mono text-slate-700 outline-none"
            />
            <span className="text-slate-400">to</span>
            <input
              type="date"
              aria-label="End Date"
              value={dateFilter.endDate}
              onChange={(e) =>
                onChangeDateFilter({
                  preset: 'custom',
                  startDate: dateFilter.startDate,
                  endDate: e.target.value,
                })
              }
              className="bg-transparent text-xs font-mono text-slate-700 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Empty State Onboarding Banner for New Accounts */}
      {isBrandNewWorkspace && (
        <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to your clean business workspace, {business?.ownerName}!
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Your dashboard is ready — no fabricated sales figures here.
            </h2>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Every metric on BizPilot KE is computed strictly from your actual saved records. Start
              by adding your first product or load our sample Nairobi retail & electronics dataset
              to explore how reports, POS receipts, and credit tracking work.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Your First Product
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pos')}
                className="px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-emerald-700 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Open Point of Sale (POS)
              </button>
              <button
                type="button"
                onClick={loadSampleDataIntoCurrentWorkspace}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-white/15 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                Load Sample Kenyan Shop Data (Optional Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Sales Revenue & Cash Collected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {periodTitle} Sales Revenue
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
              {formatCurrency(metrics.salesRevenue, currency)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Across <strong>{metrics.salesCount}</strong> completed sale(s)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Actual Cash/M-Pesa Collected:</span>
            <span className="font-mono font-bold text-emerald-800">
              {formatCurrency(metrics.cashCollected, currency)}
            </span>
          </div>
        </div>

        {/* 2. Operating Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {periodTitle} Operating Expenses
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
              {formatCurrency(metrics.operatingExpenses, currency)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Rent, transport, utilities, salaries & overheads
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">COGS (Cost of Items Sold):</span>
            <span className="font-mono font-semibold text-slate-800">
              {formatCurrency(metrics.costOfGoodsSold, currency)}
            </span>
          </div>
        </div>

        {/* 3. Gross & Net Profit */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {metrics.isProfitEstimated ? 'Estimated Gross Profit' : 'Gross Profit'}
                </span>
                {metrics.isProfitEstimated && (
                  <span
                    title="Labeled as Estimated because one or more products have a purchase cost of 0."
                    className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900"
                  >
                    Est.
                  </span>
                )}
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p
              className={`mt-2 text-2xl font-extrabold font-mono ${
                metrics.grossProfit >= 0 ? 'text-emerald-900' : 'text-red-700'
              }`}
            >
              {formatCurrency(metrics.grossProfit, currency)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Gross Margin: <strong>{metrics.grossMarginPercent}%</strong> (Sales − COGS)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Estimated Net Profit (after Expenses):</span>
            <span
              className={`font-mono font-bold ${
                metrics.estimatedNetProfit >= 0 ? 'text-emerald-900' : 'text-red-700'
              }`}
            >
              {formatCurrency(metrics.estimatedNetProfit, currency)}
            </span>
          </div>
        </div>

        {/* 4. Outstanding Customer Balances (Credit / Madeni) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer Balances (Madeni)
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold font-mono text-amber-900">
              {formatCurrency(metrics.outstandingCustomerBalance, currency)}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Unpaid credit sales & active invoices (not counted as cash)
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onNavigate('customers')}
              className="font-semibold text-emerald-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Manage credit & send reminders <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. Active Products & Stock Valuation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Products & Stock
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
              {activeProducts.length}{' '}
              <span className="text-sm font-normal text-slate-500">items</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Stock Cost Valuation:{' '}
              <strong className="font-mono">
                {formatCurrency(metrics.inventoryValuationAtCost, currency)}
              </strong>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Retail Stock Value:</span>
            <span className="font-mono font-semibold text-slate-800">
              {formatCurrency(metrics.inventoryRetailValue, currency)}
            </span>
          </div>
        </div>

        {/* 6. Low-Stock Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Low-Stock Alerts
              </span>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  lowStockProducts.length > 0
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-50 text-emerald-800'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
              {lowStockProducts.length}{' '}
              <span className="text-sm font-normal text-slate-500">products</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {outOfStockCount > 0 ? (
                <span className="text-red-700 font-semibold">
                  {outOfStockCount} item(s) completely out of stock!
                </span>
              ) : lowStockProducts.length > 0 ? (
                'At or below restock threshold'
              ) : (
                'All active products are well stocked'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="font-semibold text-emerald-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              View inventory & restock <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section: Sales vs Expenses Trend & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Sales Revenue, Gross Profit & Expenses Over Time
              </h2>
              <p className="text-xs text-slate-500">
                Tracks completed sales against operating expenses ({currency})
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendChartData}>
                <defs>
                  <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14532d" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#14532d" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="expFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  formatter={(val: number) => formatCurrency(val, currency)}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Sales Revenue"
                  stroke="#14532d"
                  strokeWidth={2}
                  fill="url(#salesFill)"
                />
                <Area
                  type="monotone"
                  dataKey="grossProfit"
                  name="Gross Profit"
                  stroke="#15803d"
                  strokeWidth={2}
                  fillOpacity={0}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  name="Operating Expenses"
                  stroke="#d97706"
                  strokeWidth={2}
                  fill="url(#expFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best-Selling Products */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Best-Selling Products</h2>
                <p className="text-xs text-slate-500">
                  Ranked by units sold in {periodTitle.toLowerCase()} period
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('pos')}
                className="text-xs font-semibold text-emerald-900 hover:underline cursor-pointer"
              >
                + New Sale
              </button>
            </div>

            {bestSellingProducts.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <ShoppingCart className="w-7 h-7 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  No sales recorded in this period
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Record a sale in Point of Sale to see your fastest-moving items.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-36 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bestSellingProducts} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={120}
                        tick={{ fontSize: 11, fill: '#334155' }}
                      />
                      <Tooltip
                        formatter={(val: number) => [`${val} units`, 'Units Sold']}
                        contentStyle={{ borderRadius: '10px', fontSize: '12px' }}
                      />
                      <Bar dataKey="unitsSold" fill="#14532d" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="divide-y divide-slate-100 border-t border-slate-100 pt-2">
                  {bestSellingProducts.map((item, idx) => (
                    <div
                      key={item.sku + idx}
                      className="py-2 flex items-center justify-between text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold text-slate-800">
                          {idx + 1}. {item.name}
                        </span>
                        <span className="ml-2 text-slate-400 font-mono">{item.sku}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-emerald-900">{item.unitsSold} sold</span>
                        <span className="ml-2 font-mono text-slate-600">
                          ({formatCurrency(item.revenue, currency)})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Banner if any items are low */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                Stock Restock Alert ({lowStockProducts.length} item
                {lowStockProducts.length === 1 ? '' : 's'} running low)
              </h3>
              <p className="text-xs text-amber-900 mt-0.5">
                {lowStockProducts
                  .slice(0, 4)
                  .map((p) => `${p.name} (${p.stockQuantity} ${p.unit} left)`)
                  .join(' • ')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
          >
            Restock Now
          </button>
        </div>
      )}

      {/* Recent Sales & Recent Expenses Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Sales</h2>
            <button
              type="button"
              onClick={() => onNavigate('pos')}
              className="text-xs font-semibold text-emerald-900 hover:underline cursor-pointer"
            >
              View All / POS →
            </button>
          </div>

          {filteredSales.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
              No sales recorded for the selected date filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-2 pr-2">Receipt</th>
                    <th className="py-2 px-2">Customer</th>
                    <th className="py-2 px-2">Method</th>
                    <th className="py-2 pl-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSales.slice(0, 5).map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-2 font-mono font-semibold text-slate-800">
                        <div>{sale.receiptNumber}</div>
                        <div className="text-[11px] font-sans font-normal text-slate-400">
                          {formatEatDateTime(sale.createdAt)}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-slate-700">{sale.customerName}</td>
                      <td className="py-2.5 px-2">
                        <span className="uppercase font-semibold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                          {sale.paymentMethod}
                        </span>
                        {sale.paymentStatus !== 'paid' && (
                          <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                            {sale.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pl-2 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(sale.totalAmount, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Expenses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">Recent Expenses</h2>
            <button
              type="button"
              onClick={() => onNavigate('expenses')}
              className="text-xs font-semibold text-emerald-900 hover:underline cursor-pointer"
            >
              Manage Expenses →
            </button>
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-xl">
              No expenses recorded for the selected date filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-2 pr-2">Description</th>
                    <th className="py-2 px-2">Category</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 pl-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredExpenses.slice(0, 5).map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50">
                      <td className="py-2.5 pr-2 font-medium text-slate-800">
                        {exp.description}
                      </td>
                      <td className="py-2.5 px-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-slate-500">
                        {formatEatDate(exp.expenseDate)}
                      </td>
                      <td className="py-2.5 pl-2 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(exp.amount, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Accounting Definitions Footnote */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">Transparent Accounting Definitions:</strong>{' '}
          <strong>Sales Revenue</strong> sums completed non-cancelled sales (net of VAT).{' '}
          <strong>Cash Collected</strong> counts only paid sales & credit instalments received
          (unpaid invoices and credit balances are excluded).{' '}
          <strong>Gross Profit</strong> = Sales Revenue − Cost of Goods Sold (COGS).{' '}
          <strong>Operating Expenses</strong> exclude stock restock purchases so inventory costs are
          never double-counted.
        </div>
      </div>
    </div>
  );
};
