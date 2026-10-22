import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDateRangeFilter,
  calculateCustomerBalance,
  calculateFinancialMetrics,
  calculateSupplierBalance,
  formatCurrency,
  formatKenyanWhatsAppNumber,
  getEatDateString,
} from '../src/utils/bizpilotFinance.js';
import { buildDemoKenyanWorkspace } from '../src/services/bizpilotStore.js';
import { generateDeterministicCopilotResponse } from '../server/bizpilotRouter.js';

test('BizPilot KE — Currency & Kenyan WhatsApp Phone Formatting', () => {
  assert.equal(formatCurrency(12500, 'KSh'), 'KSh 12,500');
  assert.equal(formatCurrency(-450, 'KSh'), '-KSh 450');
  assert.equal(formatKenyanWhatsAppNumber('0721 456 789'), '254721456789');
  assert.equal(formatKenyanWhatsAppNumber('0110123456'), '254110123456');
  assert.equal(formatKenyanWhatsAppNumber('+254 733 900 222'), '254733900222');
});

test('BizPilot KE — Financial Formulas Prevent Double-Counting & Exclude Unpaid Credit from Cash Collected', () => {
  const demo = buildDemoKenyanWorkspace('usr_test_1', 'test@kilimani.co.ke', 'Amina Wanjiku');
  const allTimeFilter = buildDateRangeFilter('all');

  // Add an inventory purchase expense to verify it is NOT double-counted in Operating Expenses
  const expensesWithStockPurchase = [
    ...demo.expenses,
    {
      id: 'exp_stock_test',
      businessId: demo.business.id,
      description: 'Bulk Wheat Flour Restock',
      amount: 10000,
      category: 'Stock Purchases' as const,
      isInventoryPurchase: true,
      expenseDate: getEatDateString(),
      paymentMethod: 'mpesa' as const,
      createdAt: new Date().toISOString(),
    },
  ];

  const metrics = calculateFinancialMetrics({
    products: demo.products,
    sales: demo.sales,
    expenses: expensesWithStockPurchase,
    documents: demo.documents,
    customerPayments: demo.customerPayments,
    supplierPurchases: demo.supplierPurchases,
    supplierPayments: demo.supplierPayments,
    dateFilter: allTimeFilter,
  });

  // Sales Revenue = 5800 + 6500 + 2090 = 14390
  assert.equal(metrics.salesRevenue, 14390);
  assert.equal(metrics.salesCount, 3);

  // Cash Collected = 4000 (paid on sale_1 including 1500 credit payment) + 6500 (sale_2) + 2090 (sale_3) = 12,590
  // Explicitly excludes the KSh 1,800 unpaid credit on sale_1 and KSh 1,300 unpaid on invoice doc_1!
  assert.equal(metrics.cashCollected, 12590);

  // Operating Expenses must equal ONLY non-inventory operating expenses (450 + 1200 + 2999 = 4649)
  assert.equal(metrics.operatingExpenses, 4649);
  assert.equal(metrics.inventoryPurchasesLogged, 10000);

  // Gross Profit = Sales Revenue (14,390) - COGS (4770 + 4360 + 1355 = 10,485) = 3,905
  assert.equal(metrics.costOfGoodsSold, 10485);
  assert.equal(metrics.grossProfit, 3905);

  // Estimated Net Profit = Gross Profit (3905) - Operating Expenses (4649) = -744
  assert.equal(metrics.estimatedNetProfit, -744);
});

test('BizPilot KE — Customer Credit & Supplier Balances Calculated Dynamically', () => {
  const demo = buildDemoKenyanWorkspace('usr_test_2', 'test2@kilimani.co.ke', 'Amina Wanjiku');

  // Cust 1 has KSh 5,800 credit sale with KSh 4,000 paid -> KSh 1,800 outstanding
  const cust1Bal = calculateCustomerBalance(
    demo.customers[0].id,
    demo.sales,
    demo.documents,
    demo.customerPayments
  );
  assert.equal(cust1Bal.outstandingBalance, 1800);
  assert.equal(cust1Bal.totalPaymentsReceived, 1500);

  // Cust 3 has KSh 2,300 invoice with KSh 1,000 paid -> KSh 1,300 outstanding
  const cust3Bal = calculateCustomerBalance(
    demo.customers[2].id,
    demo.sales,
    demo.documents,
    demo.customerPayments
  );
  assert.equal(cust3Bal.outstandingBalance, 1300);

  // Supplier 2 has KSh 11,100 PO with KSh 7,100 paid -> KSh 4,000 outstanding
  const sup2Bal = calculateSupplierBalance(
    demo.suppliers[1].id,
    demo.supplierPurchases,
    demo.supplierPayments
  );
  assert.equal(sup2Bal.outstandingBalance, 4000);
});

test('BizPilot KE — Copilot Deterministic Analyst Engine Distinguishes Verified Figures & Empty Workspaces', () => {
  const emptyReply = generateDeterministicCopilotResponse('Summarize', 'summary', {
    businessName: 'New Duka',
    category: 'Retail',
    countyTown: 'Nakuru',
    currency: 'KSh',
    periodLabel: 'Today',
    metrics: {
      salesRevenue: 0,
      salesCount: 0,
      cashCollected: 0,
      costOfGoodsSold: 0,
      grossProfit: 0,
      grossMarginPercent: 0,
      isProfitEstimated: false,
      operatingExpenses: 0,
      inventoryPurchasesLogged: 0,
      estimatedNetProfit: 0,
      outstandingCustomerBalance: 0,
      outstandingSupplierBalance: 0,
      inventoryValuationAtCost: 0,
      activeProductCount: 0,
    },
    lowStockProducts: [],
    topSellingProducts: [],
    expenseBreakdown: [],
  });

  assert.ok(
    emptyReply.reply.includes('insufficient transaction data'),
    'Must explain when data is insufficient instead of inventing numbers'
  );
});
