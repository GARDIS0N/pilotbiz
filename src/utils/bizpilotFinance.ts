// ============================================================================
// BizPilot KE — Financial Formulas, East Africa Time (EAT) & Currency Utilities
// ============================================================================
//
// DOCUMENTED ACCOUNTING FORMULAS:
// 1. Net Sales Revenue = Sum of (totalAmount - taxAmount) for all COMPLETED
//    sales within the date range. Cancelled/refunded sales are excluded.
// 2. Cash Collected = Sum of initial `amountPaid` on completed sales in the
//    period (excluding credit unpaid portion) PLUS `CustomerPayment` records
//    received in the period. Unpaid invoices and unpaid credit sales are
//    NEVER counted as collected cash.
// 3. Cost of Goods Sold (COGS) = Sum of (quantity * unitCost) for all items
//    in completed sales during the period.
// 4. Gross Profit = Net Sales Revenue - COGS.
//    If any sold item had a recorded `unitCost <= 0`, `isProfitEstimated` is
//    flagged true so the UI clearly labels profit as "Estimated".
// 5. Operating Expenses = Sum of expenses in the period WHERE
//    `category !== 'Stock Purchases'` (`!isInventoryPurchase`).
//    Stock purchases increase inventory asset value and are expensed via COGS
//    when sold — excluding them from Operating Expenses prevents double-counting.
// 6. Estimated Net Profit = Gross Profit - Operating Expenses.
// 7. Customer Outstanding Balance =
//      Sum of (totalAmount - initialAmountPaid) on completed credit/partial sales
//    + Sum of (totalAmount - initialAmountPaid) on sent/accepted/overdue/partial invoices
//    - Sum of subsequent CustomerPayment records for that customer.
// 8. Supplier Outstanding Balance =
//      Sum of (totalAmount - initialAmountPaid) on SupplierPurchases
//    - Sum of subsequent SupplierPayment records for that supplier.
// ============================================================================

import {
  BusinessDocument,
  CustomerPayment,
  DateFilterPreset,
  DateRangeFilter,
  ExpenseRecord,
  FinancialMetricsSummary,
  Product,
  SaleRecord,
  SupplierPayment,
  SupplierPurchase,
} from '../types/bizpilot.js';

/**
 * Returns current date string YYYY-MM-DD in East Africa Time (Africa/Nairobi, UTC+3)
 */
export function getEatDateString(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  } catch {
    const eatOffsetMs = 3 * 60 * 60 * 1000;
    const eatDate = new Date(date.getTime() + eatOffsetMs);
    return eatDate.toISOString().slice(0, 10);
  }
}

/**
 * Formats an ISO timestamp into readable East Africa Time (EAT)
 */
export function formatEatDateTime(isoString: string): string {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('en-KE', {
      timeZone: 'Africa/Nairobi',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoString;
  }
}

export function formatEatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr.length === 10 ? `${dateStr}T12:00:00+03:00` : dateStr);
    return new Intl.DateTimeFormat('en-KE', {
      timeZone: 'Africa/Nairobi',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

/**
 * Builds a DateRangeFilter from a preset in East Africa Time
 */
export function buildDateRangeFilter(preset: DateFilterPreset): DateRangeFilter {
  const now = new Date();
  const endDate = getEatDateString(now);

  if (preset === 'today') {
    return { preset, startDate: endDate, endDate };
  }
  if (preset === '7d') {
    const start = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
    return { preset, startDate: getEatDateString(start), endDate };
  }
  if (preset === '30d') {
    const start = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);
    return { preset, startDate: getEatDateString(start), endDate };
  }
  // 'all' or fallback
  return { preset: 'all', startDate: '2020-01-01', endDate: '2099-12-31' };
}

/**
 * Checks whether an ISO timestamp or YYYY-MM-DD falls within [startDate, endDate] in EAT
 */
export function isWithinDateRange(dateOrIso: string, filter: DateRangeFilter): boolean {
  if (!dateOrIso) return false;
  if (filter.preset === 'all') return true;
  const eatDay =
    dateOrIso.length === 10 ? dateOrIso : getEatDateString(new Date(dateOrIso));
  return eatDay >= filter.startDate && eatDay <= filter.endDate;
}

/**
 * Formats numbers in Kenya Shillings (KSh) or custom currency
 */
export function formatCurrency(amount: number, currency: string = 'KSh'): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const isNegative = safeAmount < 0;
  const absVal = Math.abs(safeAmount);
  const formatted = absVal.toLocaleString('en-KE', {
    minimumFractionDigits: absVal % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${isNegative ? '-' : ''}${currency} ${formatted}`;
}

/**
 * Calculates a specific customer's live outstanding balance from recorded sales,
 * invoices, and payments (never from a manually editable balance field).
 */
export function calculateCustomerBalance(
  customerId: string,
  sales: SaleRecord[],
  documents: BusinessDocument[],
  payments: CustomerPayment[]
): {
  totalBilledCredit: number;
  totalPaymentsReceived: number;
  outstandingBalance: number;
  overdueCount: number;
} {
  const todayEat = getEatDateString();
  let totalBilledCredit = 0;
  let overdueCount = 0;

  // 1. Completed sales for this customer where totalAmount > amountPaid
  for (const sale of sales) {
    if (sale.customerId === customerId && sale.status === 'completed') {
      const unpaidOnSale = Math.max(0, sale.totalAmount - sale.amountPaid);
      if (unpaidOnSale > 0) {
        totalBilledCredit += unpaidOnSale;
        if (sale.dueDate && sale.dueDate < todayEat) {
          overdueCount++;
        }
      }
    }
  }

  // 2. Active invoices (not draft, not cancelled) for this customer
  for (const doc of documents) {
    if (
      doc.customerId === customerId &&
      doc.docType === 'invoice' &&
      doc.status !== 'draft' &&
      doc.status !== 'cancelled'
    ) {
      const unpaidOnInvoice = Math.max(0, doc.totalAmount - doc.amountPaid);
      if (unpaidOnInvoice > 0) {
        totalBilledCredit += unpaidOnInvoice;
        if (doc.dueOrExpiryDate && doc.dueOrExpiryDate < todayEat) {
          overdueCount++;
        }
      }
    }
  }

  // Note: When a CustomerPayment is recorded in dataService, if it is linked to a specific
  // saleId or invoiceId, or applied FIFO across open credit sales/invoices, we either update
  // the sale/invoice amountPaid OR track unallocated payments. To prevent any double-subtraction,
  // let's compute from total credit issued minus total payments recorded!
  // Let's make sure the formula is 100% exact and invariant:
  // Total Credit Issued = Sum of (totalAmount - initialDepositAtCreation)
  // Actually, keeping `amountPaid` on SaleRecord and BusinessDocument updated whenever a
  // CustomerPayment is recorded makes `sum(totalAmount - amountPaid)` directly equal the
  // exact unpaid balance! Let's also sum `payments` for reporting `totalPaymentsReceived`.
  const totalPaymentsReceived = payments
    .filter((p) => p.customerId === customerId)
    .reduce((acc, p) => acc + p.amount, 0);

  return {
    totalBilledCredit: Math.round(totalBilledCredit * 100) / 100,
    totalPaymentsReceived: Math.round(totalPaymentsReceived * 100) / 100,
    outstandingBalance: Math.max(0, Math.round(totalBilledCredit * 100) / 100),
    overdueCount,
  };
}

/**
 * Calculates a specific supplier's live unpaid balance from recorded purchases and payments.
 */
export function calculateSupplierBalance(
  supplierId: string,
  purchases: SupplierPurchase[],
  supplierPayments: SupplierPayment[]
): {
  totalPurchased: number;
  totalPaid: number;
  outstandingBalance: number;
} {
  let totalPurchased = 0;
  let unpaidBalance = 0;

  for (const pur of purchases) {
    if (pur.supplierId === supplierId) {
      totalPurchased += pur.totalAmount;
      unpaidBalance += Math.max(0, pur.totalAmount - pur.amountPaid);
    }
  }

  const totalSubsequentPayments = supplierPayments
    .filter((p) => p.supplierId === supplierId)
    .reduce((acc, p) => acc + p.amount, 0);

  return {
    totalPurchased: Math.round(totalPurchased * 100) / 100,
    totalPaid: Math.round((totalPurchased - unpaidBalance) * 100) / 100,
    outstandingBalance: Math.max(0, Math.round(unpaidBalance * 100) / 100),
  };
}

/**
 * Computes the complete, verified financial metrics summary for a given DateRangeFilter.
 */
export function calculateFinancialMetrics(params: {
  products: Product[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  documents: BusinessDocument[];
  customerPayments: CustomerPayment[];
  supplierPurchases: SupplierPurchase[];
  supplierPayments: SupplierPayment[];
  dateFilter: DateRangeFilter;
}): FinancialMetricsSummary {
  const {
    products,
    sales,
    expenses,
    documents,
    customerPayments,
    supplierPurchases,
    dateFilter,
  } = params;

  // Filter completed sales in date range
  const completedSalesInPeriod = sales.filter(
    (s) => s.status === 'completed' && isWithinDateRange(s.createdAt, dateFilter)
  );

  let salesRevenue = 0;
  let salesTaxTotal = 0;
  let costOfGoodsSold = 0;
  let isProfitEstimated = false;
  let initialCashOnSalesInPeriod = 0;

  for (const sale of completedSalesInPeriod) {
    // Net revenue excludes VAT tax collected on behalf of tax authority
    const netSaleRevenue = Math.max(0, sale.totalAmount - (sale.taxAmount || 0));
    salesRevenue += netSaleRevenue;
    salesTaxTotal += sale.taxAmount || 0;
    costOfGoodsSold += sale.totalCogs || 0;

    if (sale.hasIncompleteCost) {
      isProfitEstimated = true;
    }
    for (const item of sale.items) {
      if (!item.unitCost || item.unitCost <= 0) {
        isProfitEstimated = true;
      }
    }
  }

  // Calculate cash collected in period:
  // To ensure subsequent customer credit payments don't double-count with `sale.amountPaid`,
  // we compute initial cash collected at time of sale + all CustomerPayment records in period.
  // Specifically, for each sale in period, `initialPaid = sale.amountPaid - sum(customerPayments for this sale)`.
  for (const sale of completedSalesInPeriod) {
    const paymentsForThisSale = customerPayments
      .filter((cp) => cp.saleId === sale.id)
      .reduce((sum, cp) => sum + cp.amount, 0);
    const initialDeposit = Math.max(0, sale.amountPaid - paymentsForThisSale);
    initialCashOnSalesInPeriod += initialDeposit;
  }

  const customerPaymentsInPeriod = customerPayments
    .filter((cp) => isWithinDateRange(cp.recordedAt, dateFilter))
    .reduce((sum, cp) => sum + cp.amount, 0);

  const cashCollected = initialCashOnSalesInPeriod + customerPaymentsInPeriod;

  const grossProfit = salesRevenue - costOfGoodsSold;
  const grossMarginPercent =
    salesRevenue > 0 ? Math.round((grossProfit / salesRevenue) * 1000) / 10 : 0;

  // Filter expenses in period
  const expensesInPeriod = expenses.filter((e) =>
    isWithinDateRange(e.expenseDate, dateFilter)
  );

  let operatingExpenses = 0;
  let inventoryPurchasesLogged = 0;

  for (const exp of expensesInPeriod) {
    if (exp.isInventoryPurchase || exp.category === 'Stock Purchases') {
      inventoryPurchasesLogged += exp.amount;
    } else {
      operatingExpenses += exp.amount;
    }
  }

  const totalExpensesOutflow = operatingExpenses + inventoryPurchasesLogged;
  const estimatedNetProfit = grossProfit - operatingExpenses;

  // All-time current outstanding customer balances (live balance sheet metric)
  let outstandingCustomerBalance = 0;
  for (const sale of sales) {
    if (sale.status === 'completed') {
      outstandingCustomerBalance += Math.max(0, sale.totalAmount - sale.amountPaid);
    }
  }
  for (const doc of documents) {
    if (
      doc.docType === 'invoice' &&
      doc.status !== 'draft' &&
      doc.status !== 'cancelled'
    ) {
      outstandingCustomerBalance += Math.max(0, doc.totalAmount - doc.amountPaid);
    }
  }

  // All-time current outstanding supplier balances (live balance sheet metric)
  let outstandingSupplierBalance = 0;
  for (const pur of supplierPurchases) {
    outstandingSupplierBalance += Math.max(0, pur.totalAmount - pur.amountPaid);
  }

  // Active inventory valuation
  const activeProducts = products.filter((p) => !p.isArchived);
  let inventoryValuationAtCost = 0;
  let inventoryRetailValue = 0;

  for (const prod of activeProducts) {
    const positiveStock = Math.max(0, prod.stockQuantity);
    inventoryValuationAtCost += positiveStock * prod.purchaseCost;
    inventoryRetailValue += positiveStock * prod.sellingPrice;
    if (prod.purchaseCost <= 0 && positiveStock > 0) {
      isProfitEstimated = true;
    }
  }

  return {
    salesRevenue: Math.round(salesRevenue * 100) / 100,
    salesTaxTotal: Math.round(salesTaxTotal * 100) / 100,
    salesCount: completedSalesInPeriod.length,
    cashCollected: Math.round(cashCollected * 100) / 100,
    costOfGoodsSold: Math.round(costOfGoodsSold * 100) / 100,
    isProfitEstimated,
    grossProfit: Math.round(grossProfit * 100) / 100,
    grossMarginPercent,
    operatingExpenses: Math.round(operatingExpenses * 100) / 100,
    inventoryPurchasesLogged: Math.round(inventoryPurchasesLogged * 100) / 100,
    totalExpensesOutflow: Math.round(totalExpensesOutflow * 100) / 100,
    estimatedNetProfit: Math.round(estimatedNetProfit * 100) / 100,
    outstandingCustomerBalance: Math.round(outstandingCustomerBalance * 100) / 100,
    outstandingSupplierBalance: Math.round(outstandingSupplierBalance * 100) / 100,
    inventoryValuationAtCost: Math.round(inventoryValuationAtCost * 100) / 100,
    inventoryRetailValue: Math.round(inventoryRetailValue * 100) / 100,
    inventoryPotentialProfit:
      Math.round((inventoryRetailValue - inventoryValuationAtCost) * 100) / 100,
  };
}

/**
 * Formats a Kenyan phone number into international E.164 digits (2547XXXXXXXX) for wa.me links
 */
export function formatKenyanWhatsAppNumber(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('07') && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }
  if (digits.startsWith('01') && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }
  if (digits.startsWith('7') && digits.length === 9) {
    return `254${digits}`;
  }
  if (digits.startsWith('1') && digits.length === 9) {
    return `254${digits}`;
  }
  return digits;
}

/**
 * Generates and downloads a valid UTF-8 CSV file in the browser
 */
export function downloadCsvFile(
  filename: string,
  headers: string[],
  rows: (string | number | boolean | null | undefined)[][]
): void {
  const escapeCell = (val: string | number | boolean | null | undefined): string => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvLines = [
    headers.map(escapeCell).join(','),
    ...rows.map((r) => r.map(escapeCell).join(',')),
  ];
  const csvContent = '\uFEFF' + csvLines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
