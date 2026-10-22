// ============================================================================
// BizPilot KE — Core Domain Types, Plan Definitions & Financial Contracts
// ============================================================================

export type SubscriptionPlanId = 'FREE' | 'STARTER' | 'GROWTH';

export type BusinessType = 'products' | 'services' | 'hybrid';

export type PaymentMethod = 'mpesa' | 'cash' | 'bank_transfer' | 'card' | 'credit';

export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'refunded';

export type DocumentType = 'quotation' | 'invoice';

export type DocumentStatus =
  | 'draft'
  | 'sent'
  | 'accepted'
  | 'paid'
  | 'partially_paid'
  | 'overdue'
  | 'cancelled';

export type StockMovementType =
  | 'initial'
  | 'sale'
  | 'sale_cancellation'
  | 'purchase_restock'
  | 'adjustment_in'
  | 'adjustment_out'
  | 'damaged_expired';

export type ExpenseCategory =
  | 'Rent'
  | 'Transport'
  | 'Stock Purchases'
  | 'Utilities'
  | 'Salaries'
  | 'Internet & Communication'
  | 'Marketing'
  | 'Equipment'
  | 'Other';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  passwordHash?: string;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface BusinessWorkspace {
  id: string;
  ownerId: string;
  name: string;
  ownerName: string;
  category: string;
  businessType: BusinessType;
  countyTown: string;
  currency: string;
  phone: string;
  email: string;
  kraPinOptional?: string;
  taxEnabled: boolean;
  taxName: string;
  taxRate: number; // e.g., 16 for 16% VAT
  allowNegativeStock: boolean;
  subscriptionPlan: SubscriptionPlanId;
  receiptFooter: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  purchaseCost: number;
  sellingPrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  unit: string;
  imageUrl?: string;
  supplierId?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  businessId: string;
  productId: string;
  productName: string;
  sku: string;
  movementType: StockMovementType;
  quantityChange: number;
  previousStock: number;
  newStock: number;
  unitCostAtTime: number;
  referenceId?: string;
  notes: string;
  createdAt: string;
}

export interface SaleLineItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  lineTotal: number;
}

export interface SaleRecord {
  id: string;
  businessId: string;
  receiptNumber: string;
  idempotencyKey: string;
  customerId?: string;
  customerName: string;
  items: SaleLineItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  totalCogs: number;
  hasIncompleteCost: boolean;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  paymentStatus: PaymentStatus;
  dueDate?: string;
  status: 'completed' | 'cancelled';
  cancellationReason?: string;
  notes?: string;
  createdAt: string;
}

export interface ExpenseRecord {
  id: string;
  businessId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  /**
   * True when category === 'Stock Purchases'.
   * Inventory purchases are tracked separately from Operating Expenses so
   * Cost of Goods Sold (COGS) is never double-counted in Net Profit reports.
   */
  isInventoryPurchase: boolean;
  expenseDate: string; // YYYY-MM-DD
  paymentMethod: Exclude<PaymentMethod, 'credit'>;
  supplierId?: string;
  supplierName?: string;
  receiptReference?: string;
  notes?: string;
  createdAt: string;
}

export interface CustomerRecord {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerPayment {
  id: string;
  businessId: string;
  customerId: string;
  customerName: string;
  saleId?: string;
  invoiceId?: string;
  amount: number;
  paymentMethod: Exclude<PaymentMethod, 'credit'>;
  reference?: string;
  notes?: string;
  recordedAt: string;
}

export interface SupplierRecord {
  id: string;
  businessId: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  category: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierPurchaseItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  unitCost: number;
  previousCost: number;
  lineTotal: number;
}

export interface SupplierPurchase {
  id: string;
  businessId: string;
  supplierId: string;
  supplierName: string;
  purchaseNumber: string;
  items: SupplierPurchaseItem[];
  totalAmount: number;
  amountPaid: number;
  paymentMethod: Exclude<PaymentMethod, 'credit'>;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  dueDate?: string;
  notes?: string;
  createdAt: string;
}

export interface SupplierPayment {
  id: string;
  businessId: string;
  supplierId: string;
  supplierName: string;
  purchaseId?: string;
  amount: number;
  paymentMethod: Exclude<PaymentMethod, 'credit'>;
  reference?: string;
  notes?: string;
  recordedAt: string;
}

export interface DocumentLineItem {
  id: string;
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  lineTotal: number;
}

export interface BusinessDocument {
  id: string;
  businessId: string;
  docType: DocumentType;
  docNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: DocumentLineItem[];
  subtotal: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  status: DocumentStatus;
  issueDate: string; // YYYY-MM-DD
  dueOrExpiryDate: string; // YYYY-MM-DD
  convertedFromQuoteId?: string;
  convertedToInvoiceId?: string;
  notes?: string;
  createdAt: string;
}

export interface SubscriptionPlanConfig {
  id: SubscriptionPlanId;
  name: string;
  priceKsh: number;
  billingCycle: string;
  maxActiveProducts: number;
  features: {
    customersAndSuppliers: boolean;
    creditTracking: boolean;
    invoicesAndQuotations: boolean;
    expandedReports: boolean;
    csvExports: boolean;
    aiCopilot: boolean;
    advancedInventoryInsights: boolean;
    prioritySupport: boolean;
  };
  highlights: string[];
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlanId, SubscriptionPlanConfig> = {
  FREE: {
    id: 'FREE',
    name: 'Free Starter Duka',
    priceKsh: 0,
    billingCycle: 'Free forever',
    maxActiveProducts: 30,
    features: {
      customersAndSuppliers: false,
      creditTracking: false,
      invoicesAndQuotations: false,
      expandedReports: false,
      csvExports: false,
      aiCopilot: false,
      advancedInventoryInsights: false,
      prioritySupport: false,
    },
    highlights: [
      '1 Business workspace',
      'Up to 30 active products',
      'Point-of-Sale & receipt printing',
      'Basic sales & expense tracking',
      'Live daily dashboard',
    ],
  },
  STARTER: {
    id: 'STARTER',
    name: 'Biashara Starter',
    priceKsh: 499,
    billingCycle: 'KSh 499 / month',
    maxActiveProducts: 200,
    features: {
      customersAndSuppliers: true,
      creditTracking: true,
      invoicesAndQuotations: true,
      expandedReports: true,
      csvExports: true,
      aiCopilot: false,
      advancedInventoryInsights: false,
      prioritySupport: false,
    },
    highlights: [
      'Up to 200 active products',
      'Customer & supplier directories',
      'Credit (Madeni) & payment tracking',
      'Professional Invoices & Quotations',
      'Expanded financial reports & CSV exports',
      'WhatsApp customer message templates',
    ],
  },
  GROWTH: {
    id: 'GROWTH',
    name: 'Biashara Growth + AI',
    priceKsh: 999,
    billingCycle: 'KSh 999 / month',
    maxActiveProducts: 1000,
    features: {
      customersAndSuppliers: true,
      creditTracking: true,
      invoicesAndQuotations: true,
      expandedReports: true,
      csvExports: true,
      aiCopilot: true,
      advancedInventoryInsights: true,
      prioritySupport: true,
    },
    highlights: [
      'Up to 1,000 active products',
      'BizPilot Copilot AI Business Assistant',
      'Advanced P&L, margin & inventory valuation reports',
      'Full customer credit & supplier payable statements',
      'WhatsApp campaign & catalogue studio',
      'Priority Kenyan SME support',
    ],
  },
};

export const KENYAN_BUSINESS_CATEGORIES = [
  'Retail Shop & Mini-Supermarket (Duka)',
  'Clothing, Boutique & Cosmetics',
  'Electronics & Phone Accessories',
  'Online Seller & Social Media Vendor',
  'Hardware, Agrovet & Building Supplies',
  'Pharmacy, Chemist & Health Store',
  'Freelancer, Agency & Service Provider',
  'Small Wholesaler & Distributor',
  'Cafe, Bakery & Food Business',
  'Home-Based Business & Startup',
];

export const KENYAN_COUNTIES_AND_TOWNS = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret (Uasin Gishu)',
  'Thika / Kiambu',
  'Machakos',
  'Nyeri',
  'Meru',
  'Kakamega',
  'Kisii',
  'Malindi / Kilifi',
  'Naivasha',
  'Nanyuki (Laikipia)',
  'Kericho',
  'Kitale (Trans Nzoia)',
  'Garissa',
  'Embu',
  'Bungoma',
  'Other / Nationwide',
];

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Rent',
  'Transport',
  'Stock Purchases',
  'Utilities',
  'Salaries',
  'Internet & Communication',
  'Marketing',
  'Equipment',
  'Other',
];

export type DateFilterPreset = 'today' | '7d' | '30d' | 'all' | 'custom';

export interface DateRangeFilter {
  preset: DateFilterPreset;
  startDate: string; // YYYY-MM-DD in EAT
  endDate: string;   // YYYY-MM-DD in EAT
}

export interface FinancialMetricsSummary {
  /** Total value of completed (non-cancelled) sales in period (excluding VAT if tax is separated, or gross billed) */
  salesRevenue: number;
  /** Total tax billed on completed sales in period */
  salesTaxTotal: number;
  /** Number of completed sales transactions in period */
  salesCount: number;
  /**
   * Actual cash/M-Pesa/bank/card collected in period:
   * Initial payments on completed sales in period + subsequent customer credit/invoice payments recorded in period.
   * Explicitly excludes unpaid credit sales and unpaid invoices.
   */
  cashCollected: number;
  /** Cost of Goods Sold (COGS) for items sold in completed sales during the period */
  costOfGoodsSold: number;
  /** Whether any sold item had a purchaseCost of 0 or missing cost, making Gross Profit an estimate */
  isProfitEstimated: boolean;
  /** Sales Revenue (net of tax) minus Cost of Goods Sold (COGS) */
  grossProfit: number;
  /** Gross margin percentage: (grossProfit / netSalesRevenue) * 100 */
  grossMarginPercent: number;
  /** Operating expenses in period (EXCLUDES 'Stock Purchases' to prevent double-counting COGS) */
  operatingExpenses: number;
  /** Stock Purchases logged in Expenses module (tracked separately from operating expenses) */
  inventoryPurchasesLogged: number;
  /** Total cash outflow in Expenses module (operatingExpenses + inventoryPurchasesLogged) */
  totalExpensesOutflow: number;
  /** Estimated Net Profit = Gross Profit - Operating Expenses */
  estimatedNetProfit: number;
  /** Total outstanding customer credit balances (from all unpaid/partial credit sales + unpaid/partial invoices minus customer payments) */
  outstandingCustomerBalance: number;
  /** Total unpaid supplier balances (from all supplier purchases minus supplier payments) */
  outstandingSupplierBalance: number;
  /** Inventory valuation at recorded unit purchase cost across active products */
  inventoryValuationAtCost: number;
  /** Inventory retail value at recorded unit selling price across active products */
  inventoryRetailValue: number;
  /** Potential gross profit currently sitting in stock */
  inventoryPotentialProfit: number;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  source: 'ai-provider' | 'deterministic-engine';
  timestamp: string;
  verifiedMetricsUsed?: string[];
}
