import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  BusinessDocument,
  BusinessType,
  BusinessWorkspace,
  CustomerPayment,
  CustomerRecord,
  DocumentLineItem,
  DocumentStatus,
  DocumentType,
  ExpenseCategory,
  ExpenseRecord,
  PaymentMethod,
  Product,
  SaleRecord,
  StockMovement,
  StockMovementType,
  SUBSCRIPTION_PLANS,
  SubscriptionPlanId,
  SupplierPayment,
  SupplierPurchase,
  SupplierPurchaseItem,
  SupplierRecord,
  UserAccount,
} from '../types/bizpilot.js';
import { getEatDateString } from '../utils/bizpilotFinance.js';

const LOCAL_STORAGE_KEY = 'bizpilot_ke_persistent_store_v1';
const SESSION_USER_KEY = 'bizpilot_ke_active_user_id_v1';

export interface PersistedDatabase {
  users: UserAccount[];
  businesses: BusinessWorkspace[];
  products: Product[];
  stockMovements: StockMovement[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  customers: CustomerRecord[];
  customerPayments: CustomerPayment[];
  suppliers: SupplierRecord[];
  supplierPurchases: SupplierPurchase[];
  supplierPayments: SupplierPayment[];
  documents: BusinessDocument[];
}

const EMPTY_DB: PersistedDatabase = {
  users: [],
  businesses: [],
  products: [],
  stockMovements: [],
  sales: [],
  expenses: [],
  customers: [],
  customerPayments: [],
  suppliers: [],
  supplierPurchases: [],
  supplierPayments: [],
  documents: [],
};

function uid(prefix: string = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Generates realistic, coherent sample data ONLY when the user explicitly clicks
 * "Explore Demo Kenyan Business" or "Load Sample Shop Data".
 * New registered accounts NEVER get fabricated data automatically.
 */
export function buildDemoKenyanWorkspace(userId: string, userEmail: string, userName: string): {
  business: BusinessWorkspace;
  products: Product[];
  stockMovements: StockMovement[];
  customers: CustomerRecord[];
  suppliers: SupplierRecord[];
  sales: SaleRecord[];
  customerPayments: CustomerPayment[];
  supplierPurchases: SupplierPurchase[];
  supplierPayments: SupplierPayment[];
  expenses: ExpenseRecord[];
  documents: BusinessDocument[];
} {
  const now = new Date();
  const todayStr = getEatDateString(now);
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
  const fourDaysAgo = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);
  const sixDaysAgo = new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const bizId = `biz_demo_${userId}`;

  const business: BusinessWorkspace = {
    id: bizId,
    ownerId: userId,
    name: 'Kilimani Mart & Electronics KE',
    ownerName: userName || 'Amina Wanjiku',
    category: 'Retail Shop & Mini-Supermarket (Duka)',
    businessType: 'hybrid',
    countyTown: 'Nairobi',
    currency: 'KSh',
    phone: '+254 712 345 678',
    email: userEmail,
    kraPinOptional: 'P051234567X',
    taxEnabled: false,
    taxName: 'VAT',
    taxRate: 16,
    allowNegativeStock: false,
    subscriptionPlan: 'GROWTH',
    receiptFooter: 'Asante kwa kununua nasi! M-Pesa Till No: 582910. Goods once sold are subject to store warranty policy.',
    createdAt: sixDaysAgo.toISOString(),
    updatedAt: now.toISOString(),
  };

  const sup1: SupplierRecord = {
    id: `sup_1_${bizId}`,
    businessId: bizId,
    name: 'Eastleigh Prime Distributors Ltd',
    contactPerson: 'Hassan Abdi',
    phone: '+254 722 800 111',
    email: 'orders@eastleighprime.co.ke',
    category: 'FMCG & Household',
    notes: 'Delivers every Tuesday and Friday morning. Accepts M-Pesa & Bank Transfer.',
    createdAt: sixDaysAgo.toISOString(),
    updatedAt: sixDaysAgo.toISOString(),
  };

  const sup2: SupplierRecord = {
    id: `sup_2_${bizId}`,
    businessId: bizId,
    name: 'Luthuli Tech & Accessories Wholesale',
    contactPerson: 'Kevin Omondi',
    phone: '+254 733 900 222',
    email: 'sales@luthulitech.co.ke',
    category: 'Electronics & Phone Accessories',
    notes: '7-day credit terms on bulk charger and cable orders.',
    createdAt: sixDaysAgo.toISOString(),
    updatedAt: sixDaysAgo.toISOString(),
  };

  const products: Product[] = [
    {
      id: `prod_1_${bizId}`,
      businessId: bizId,
      name: 'Ajab All-Purpose Wheat Flour (2kg Bale/Packet)',
      sku: 'SKU-FLR-001',
      category: 'Food & Pantry',
      description: 'Premium 2kg fortified home baking wheat flour.',
      purchaseCost: 165,
      sellingPrice: 210,
      stockQuantity: 42,
      lowStockThreshold: 15,
      unit: 'pkt',
      supplierId: sup1.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: `prod_2_${bizId}`,
      businessId: bizId,
      name: 'Fresh Fri Vegetable Cooking Oil (3 Litres)',
      sku: 'SKU-OIL-003',
      category: 'Food & Pantry',
      description: 'Triple refined cholesterol-free cooking oil 3L jerrycan.',
      purchaseCost: 780,
      sellingPrice: 950,
      stockQuantity: 4, // Low stock!
      lowStockThreshold: 8,
      unit: 'btl',
      supplierId: sup1.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: `prod_3_${bizId}`,
      businessId: bizId,
      name: 'Oraimo Fast Charging Type-C Cable (1m)',
      sku: 'SKU-ELC-101',
      category: 'Electronics & Accessories',
      description: '2.4A durable braided USB-to-Type-C fast data & charging cable.',
      purchaseCost: 220,
      sellingPrice: 450,
      stockQuantity: 19,
      lowStockThreshold: 5,
      unit: 'pcs',
      supplierId: sup2.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: `prod_4_${bizId}`,
      businessId: bizId,
      name: 'Oraimo 20,000mAh PowerBank Toast 20',
      sku: 'SKU-ELC-205',
      category: 'Electronics & Accessories',
      description: 'Dual USB output 20,000mAh portable power bank with 1-year warranty.',
      purchaseCost: 1850,
      sellingPrice: 2600,
      stockQuantity: 2, // Low stock!
      lowStockThreshold: 4,
      unit: 'pcs',
      supplierId: sup2.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: `prod_5_${bizId}`,
      businessId: bizId,
      name: 'Ketepa Pride Tea Leaves (500g)',
      sku: 'SKU-TEA-050',
      category: 'Beverages',
      description: 'Finest Kenyan black tea leaves 500g family pack.',
      purchaseCost: 210,
      sellingPrice: 280,
      stockQuantity: 28,
      lowStockThreshold: 10,
      unit: 'pkt',
      supplierId: sup1.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
    {
      id: `prod_6_${bizId}`,
      businessId: bizId,
      name: 'Menengai Cream Laundry Bar Soap (1kg)',
      sku: 'SKU-SOP-010',
      category: 'Household & Cleaning',
      description: 'Multi-purpose long-lasting cream bar soap 1kg.',
      purchaseCost: 145,
      sellingPrice: 190,
      stockQuantity: 0, // Out of stock!
      lowStockThreshold: 10,
      unit: 'bar',
      supplierId: sup1.id,
      isArchived: false,
      createdAt: sixDaysAgo.toISOString(),
      updatedAt: now.toISOString(),
    },
  ];

  const stockMovements: StockMovement[] = products.map((p) => ({
    id: `mov_init_${p.id}`,
    businessId: bizId,
    productId: p.id,
    productName: p.name,
    sku: p.sku,
    movementType: 'initial',
    quantityChange: p.stockQuantity + 5,
    previousStock: 0,
    newStock: p.stockQuantity + 5,
    unitCostAtTime: p.purchaseCost,
    notes: 'Opening stock count',
    createdAt: sixDaysAgo.toISOString(),
  }));

  const cust1: CustomerRecord = {
    id: `cust_1_${bizId}`,
    businessId: bizId,
    name: 'Mama Brian Catering Services',
    phone: '0721456789',
    email: 'mamabrian.catering@gmail.com',
    notes: 'Regular bulk buyer of flour, cooking oil, and tea leaves. Settles credit every Friday.',
    createdAt: sixDaysAgo.toISOString(),
    updatedAt: now.toISOString(),
  };

  const cust2: CustomerRecord = {
    id: `cust_2_${bizId}`,
    businessId: bizId,
    name: 'David Kamau (Boda Stage Chairman)',
    phone: '0711987654',
    email: 'dkamau@yahoo.com',
    notes: 'Buys phone cables and powerbanks for stage riders.',
    createdAt: fourDaysAgo.toISOString(),
    updatedAt: now.toISOString(),
  };

  const cust3: CustomerRecord = {
    id: `cust_3_${bizId}`,
    businessId: bizId,
    name: 'Grace Njeri Salon & Spa',
    phone: '0799112233',
    email: 'gracenjerisalon@gmail.com',
    notes: 'Orders supplies and electronics.',
    createdAt: twoDaysAgo.toISOString(),
    updatedAt: now.toISOString(),
  };

  // Recorded sales across the last few days + today
  const sales: SaleRecord[] = [
    {
      id: `sale_1_${bizId}`,
      businessId: bizId,
      receiptNumber: 'RCP-20261017-001',
      idempotencyKey: `idem_demo_1_${bizId}`,
      customerId: cust1.id,
      customerName: cust1.name,
      items: [
        {
          id: 'sli_1',
          productId: products[0].id,
          productName: products[0].name,
          sku: products[0].sku,
          quantity: 10,
          unitPrice: 210,
          unitCost: 165,
          lineTotal: 2100,
        },
        {
          id: 'sli_2',
          productId: products[1].id,
          productName: products[1].name,
          sku: products[1].sku,
          quantity: 4,
          unitPrice: 950,
          unitCost: 780,
          lineTotal: 3800,
        },
      ],
      subtotal: 5900,
      discountAmount: 100,
      taxAmount: 0,
      totalAmount: 5800,
      amountPaid: 4000, // KSh 1,800 remaining on credit!
      totalCogs: 10 * 165 + 4 * 780, // 4,770
      hasIncompleteCost: false,
      paymentMethod: 'credit',
      paymentReference: 'QJK82M90LP (Deposit KSh 2,500 + Payment KSh 1,500)',
      paymentStatus: 'partial',
      dueDate: getEatDateString(yesterday), // Overdue by 1 day!
      status: 'completed',
      notes: 'Paid KSh 2,500 initial deposit + KSh 1,500 follow-up; KSh 1,800 balance due.',
      createdAt: twoDaysAgo.toISOString(),
    },
    {
      id: `sale_2_${bizId}`,
      businessId: bizId,
      receiptNumber: 'RCP-20261018-002',
      idempotencyKey: `idem_demo_2_${bizId}`,
      customerId: cust2.id,
      customerName: cust2.name,
      items: [
        {
          id: 'sli_3',
          productId: products[3].id,
          productName: products[3].name,
          sku: products[3].sku,
          quantity: 2,
          unitPrice: 2600,
          unitCost: 1850,
          lineTotal: 5200,
        },
        {
          id: 'sli_4',
          productId: products[2].id,
          productName: products[2].name,
          sku: products[2].sku,
          quantity: 3,
          unitPrice: 450,
          unitCost: 220,
          lineTotal: 1350,
        },
      ],
      subtotal: 6550,
      discountAmount: 50,
      taxAmount: 0,
      totalAmount: 6500,
      amountPaid: 6500,
      totalCogs: 2 * 1850 + 3 * 220, // 4,360
      hasIncompleteCost: false,
      paymentMethod: 'mpesa',
      paymentReference: 'SJL94K12WX',
      paymentStatus: 'paid',
      status: 'completed',
      notes: 'Paid in full via M-Pesa Till.',
      createdAt: yesterday.toISOString(),
    },
    {
      id: `sale_3_${bizId}`,
      businessId: bizId,
      receiptNumber: 'RCP-20261019-003',
      idempotencyKey: `idem_demo_3_${bizId}`,
      customerName: 'Walk-in Customer',
      items: [
        {
          id: 'sli_5',
          productId: products[0].id,
          productName: products[0].name,
          sku: products[0].sku,
          quantity: 3,
          unitPrice: 210,
          unitCost: 165,
          lineTotal: 630,
        },
        {
          id: 'sli_6',
          productId: products[4].id,
          productName: products[4].name,
          sku: products[4].sku,
          quantity: 2,
          unitPrice: 280,
          unitCost: 210,
          lineTotal: 560,
        },
        {
          id: 'sli_7',
          productId: products[2].id,
          productName: products[2].name,
          sku: products[2].sku,
          quantity: 2,
          unitPrice: 450,
          unitCost: 220,
          lineTotal: 900,
        },
      ],
      subtotal: 2090,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 2090,
      amountPaid: 2090,
      totalCogs: 3 * 165 + 2 * 210 + 2 * 220, // 1,355
      hasIncompleteCost: false,
      paymentMethod: 'mpesa',
      paymentReference: 'SJM10P88QA',
      paymentStatus: 'paid',
      status: 'completed',
      notes: 'Morning walk-in sale.',
      createdAt: now.toISOString(),
    },
  ];

  const customerPayments: CustomerPayment[] = [
    {
      id: `cpay_1_${bizId}`,
      businessId: bizId,
      customerId: cust1.id,
      customerName: cust1.name,
      saleId: sales[0].id,
      amount: 1500,
      paymentMethod: 'mpesa',
      reference: 'SJK45T99BN',
      notes: 'Partial credit instalment via M-Pesa',
      recordedAt: yesterday.toISOString(),
    },
  ];

  const supplierPurchases: SupplierPurchase[] = [
    {
      id: `spurch_1_${bizId}`,
      businessId: bizId,
      supplierId: sup2.id,
      supplierName: sup2.name,
      purchaseNumber: 'PO-20261015-001',
      items: [
        {
          productId: products[3].id,
          productName: products[3].name,
          sku: products[3].sku,
          quantity: 6,
          unitCost: 1850,
          previousCost: 1800,
          lineTotal: 11100,
        },
      ],
      totalAmount: 11100,
      amountPaid: 7100, // KSh 4,000 owed to supplier!
      paymentMethod: 'mpesa',
      paymentStatus: 'partial',
      dueDate: getEatDateString(nextWeek),
      notes: 'Paid KSh 7,100 on delivery; KSh 4,000 balance due next week.',
      createdAt: fourDaysAgo.toISOString(),
    },
  ];

  const supplierPayments: SupplierPayment[] = [
    {
      id: `spay_1_${bizId}`,
      businessId: bizId,
      supplierId: sup2.id,
      supplierName: sup2.name,
      purchaseId: supplierPurchases[0].id,
      amount: 2100,
      paymentMethod: 'mpesa',
      reference: 'SJH11M44RT',
      notes: 'Follow-up supplier payment',
      recordedAt: twoDaysAgo.toISOString(),
    },
  ];

  const expenses: ExpenseRecord[] = [
    {
      id: `exp_1_${bizId}`,
      businessId: bizId,
      description: 'Boda Rider Delivery & CBD Stock Transport',
      amount: 450,
      category: 'Transport',
      isInventoryPurchase: false,
      expenseDate: todayStr,
      paymentMethod: 'cash',
      receiptReference: 'CASH-VOUCHER-12',
      notes: 'Transporting electronics stock from Luthuli Avenue to Kilimani shop.',
      createdAt: now.toISOString(),
    },
    {
      id: `exp_2_${bizId}`,
      businessId: bizId,
      description: 'KPLC Prepaid Electricity Tokens',
      amount: 1200,
      category: 'Utilities',
      isInventoryPurchase: false,
      expenseDate: getEatDateString(yesterday),
      paymentMethod: 'mpesa',
      receiptReference: 'KPLC-88492011',
      notes: 'Shop lighting and display fridge tokens.',
      createdAt: yesterday.toISOString(),
    },
    {
      id: `exp_3_${bizId}`,
      businessId: bizId,
      description: 'Safaricom Business Fibre Internet',
      amount: 2999,
      category: 'Internet & Communication',
      isInventoryPurchase: false,
      expenseDate: getEatDateString(fourDaysAgo),
      paymentMethod: 'mpesa',
      receiptReference: 'SAF-FIBRE-OCT',
      notes: 'Monthly shop Wi-Fi & WhatsApp customer order line.',
      createdAt: fourDaysAgo.toISOString(),
    },
  ];

  const documents: BusinessDocument[] = [
    {
      id: `doc_1_${bizId}`,
      businessId: bizId,
      docType: 'invoice',
      docNumber: 'INV-20261018-001',
      customerId: cust3.id,
      customerName: cust3.name,
      customerPhone: cust3.phone,
      customerEmail: cust3.email,
      items: [
        {
          id: 'dli_1',
          productId: products[4].id,
          description: 'Ketepa Pride Tea Leaves (500g) — Staff Refreshments',
          quantity: 5,
          unitPrice: 280,
          discount: 0,
          lineTotal: 1400,
        },
        {
          id: 'dli_2',
          productId: products[2].id,
          description: 'Oraimo Fast Charging Type-C Cable (1m) — Reception Desk',
          quantity: 2,
          unitPrice: 450,
          discount: 0,
          lineTotal: 900,
        },
      ],
      subtotal: 2300,
      discountAmount: 0,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 2300,
      amountPaid: 1000, // KSh 1,300 unpaid on this invoice
      status: 'partially_paid',
      issueDate: getEatDateString(yesterday),
      dueOrExpiryDate: getEatDateString(nextWeek),
      notes: 'KSh 1,000 deposit received via M-Pesa; balance of KSh 1,300 due within 7 days.',
      createdAt: yesterday.toISOString(),
    },
    {
      id: `doc_2_${bizId}`,
      businessId: bizId,
      docType: 'quotation',
      docNumber: 'QUO-20261019-001',
      customerId: cust1.id,
      customerName: cust1.name,
      customerPhone: cust1.phone,
      customerEmail: cust1.email,
      items: [
        {
          id: 'dli_3',
          productId: products[0].id,
          description: 'Ajab All-Purpose Wheat Flour (2kg Packet) — Bulk Event Supply',
          quantity: 24,
          unitPrice: 200,
          discount: 0,
          lineTotal: 4800,
        },
        {
          id: 'dli_4',
          productId: products[1].id,
          description: 'Fresh Fri Vegetable Cooking Oil (3 Litres)',
          quantity: 6,
          unitPrice: 920,
          discount: 0,
          lineTotal: 5520,
        },
      ],
      subtotal: 10320,
      discountAmount: 320,
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 10000,
      amountPaid: 0,
      status: 'accepted',
      issueDate: todayStr,
      dueOrExpiryDate: getEatDateString(nextWeek),
      notes: 'Special wholesale event quotation valid for 7 days.',
      createdAt: now.toISOString(),
    },
  ];

  return {
    business,
    products,
    stockMovements,
    customers: [cust1, cust2, cust3],
    suppliers: [sup1, sup2],
    sales,
    customerPayments,
    supplierPurchases,
    supplierPayments,
    expenses,
    documents,
  };
}

export interface OnboardingPayload {
  businessName: string;
  ownerName: string;
  category: string;
  countyTown?: string;
  currency: string;
  phone?: string;
  businessType: BusinessType;
  subscriptionPlan: SubscriptionPlanId;
}

export interface CreateSaleInput {
  idempotencyKey: string;
  customerId?: string;
  customerName?: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice?: number;
  }>;
  discountAmount: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  amountPaid?: number;
  dueDate?: string;
  notes?: string;
}

interface BizPilotContextValue {
  // Environment & Auth state
  storageMode: 'local-persistent' | 'supabase-cloud';
  currentUser: UserAccount | null;
  business: BusinessWorkspace | null;
  isLoading: boolean;

  // Scoped Workspace Collections (strictly isolated to current business.id)
  products: Product[];
  stockMovements: StockMovement[];
  sales: SaleRecord[];
  expenses: ExpenseRecord[];
  customers: CustomerRecord[];
  customerPayments: CustomerPayment[];
  suppliers: SupplierRecord[];
  supplierPurchases: SupplierPurchase[];
  supplierPayments: SupplierPayment[];
  documents: BusinessDocument[];

  // Auth & Onboarding Actions
  registerAccount: (email: string, password: string, fullName: string) => { ok: boolean; error?: string };
  loginAccount: (email: string, password: string) => { ok: boolean; error?: string };
  loginWithDemoWorkspace: () => void;
  resetPasswordRequest: (email: string, newPassword: string) => { ok: boolean; message: string };
  logoutAccount: () => void;
  completeOnboarding: (payload: OnboardingPayload) => { ok: boolean; error?: string };
  updateBusinessSettings: (updates: Partial<BusinessWorkspace>) => { ok: boolean; error?: string };
  loadSampleDataIntoCurrentWorkspace: () => void;
  clearWorkspaceData: () => void;

  // Product & Inventory Actions
  createProduct: (
    data: Omit<Product, 'id' | 'businessId' | 'isArchived' | 'createdAt' | 'updatedAt'>
  ) => { ok: boolean; error?: string; product?: Product };
  updateProduct: (
    productId: string,
    updates: Partial<Omit<Product, 'id' | 'businessId' | 'createdAt'>>
  ) => { ok: boolean; error?: string };
  toggleArchiveProduct: (productId: string) => void;
  adjustProductStock: (params: {
    productId: string;
    movementType: StockMovementType;
    quantityDelta: number;
    newUnitCost?: number;
    notes: string;
  }) => { ok: boolean; error?: string; warning?: string };

  // Sales & POS Actions
  recordSale: (input: CreateSaleInput) => {
    ok: boolean;
    error?: string;
    warning?: string;
    sale?: SaleRecord;
  };
  cancelSale: (saleId: string, reason: string) => { ok: boolean; error?: string };

  // Expense Actions
  createExpense: (
    data: Omit<ExpenseRecord, 'id' | 'businessId' | 'isInventoryPurchase' | 'createdAt'>
  ) => { ok: boolean; error?: string };
  updateExpense: (
    expenseId: string,
    updates: Partial<Omit<ExpenseRecord, 'id' | 'businessId' | 'createdAt'>>
  ) => { ok: boolean; error?: string };
  deleteExpense: (expenseId: string) => void;

  // Customer & Credit Actions
  createCustomer: (
    data: Omit<CustomerRecord, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>
  ) => { ok: boolean; error?: string; customer?: CustomerRecord };
  updateCustomer: (
    customerId: string,
    updates: Partial<Omit<CustomerRecord, 'id' | 'businessId' | 'createdAt'>>
  ) => { ok: boolean; error?: string };
  recordCustomerPayment: (params: {
    customerId: string;
    amount: number;
    paymentMethod: Exclude<PaymentMethod, 'credit'>;
    saleId?: string;
    invoiceId?: string;
    reference?: string;
    notes?: string;
  }) => { ok: boolean; error?: string };

  // Supplier & Purchasing Actions
  createSupplier: (
    data: Omit<SupplierRecord, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>
  ) => { ok: boolean; error?: string; supplier?: SupplierRecord };
  updateSupplier: (
    supplierId: string,
    updates: Partial<Omit<SupplierRecord, 'id' | 'businessId' | 'createdAt'>>
  ) => { ok: boolean; error?: string };
  recordSupplierPurchase: (params: {
    supplierId: string;
    items: Array<{ productId: string; quantity: number; unitCost: number }>;
    amountPaid: number;
    paymentMethod: Exclude<PaymentMethod, 'credit'>;
    dueDate?: string;
    notes?: string;
  }) => { ok: boolean; error?: string };
  recordSupplierPayment: (params: {
    supplierId: string;
    purchaseId?: string;
    amount: number;
    paymentMethod: Exclude<PaymentMethod, 'credit'>;
    reference?: string;
    notes?: string;
  }) => { ok: boolean; error?: string };

  // Invoices & Quotations Actions
  createDocument: (params: {
    docType: DocumentType;
    customerId?: string;
    customerName: string;
    customerPhone?: string;
    customerEmail?: string;
    items: DocumentLineItem[];
    discountAmount: number;
    taxRate: number;
    issueDate: string;
    dueOrExpiryDate: string;
    status?: DocumentStatus;
    notes?: string;
  }) => { ok: boolean; error?: string; document?: BusinessDocument };
  updateDocumentStatus: (docId: string, status: DocumentStatus) => { ok: boolean; error?: string };
  convertQuotationToInvoice: (
    quoteId: string,
    dueDate?: string
  ) => { ok: boolean; error?: string; invoice?: BusinessDocument };
}

const BizPilotContext = createContext<BizPilotContextValue | null>(null);

export const BizPilotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<PersistedDatabase>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        return { ...EMPTY_DB, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn('Failed to parse local BizPilot DB:', e);
    }
    return EMPTY_DB;
  });

  const [activeUserId, setActiveUserId] = useState<string | null>(() => {
    return localStorage.getItem(SESSION_USER_KEY);
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync from server-side disk store on initial mount if localStorage was empty
  useEffect(() => {
    async function hydrateFromServer() {
      if (db.users.length > 0) return;
      try {
        const res = await fetch('/api/bizpilot/local-store');
        if (res.ok) {
          const json = await res.json();
          if (json.exists && json.data && Array.isArray(json.data.users) && json.data.users.length > 0) {
            setDb({ ...EMPTY_DB, ...json.data });
          }
        }
      } catch {
        // Offline or static preview — localStorage handles persistence
      }
    }
    hydrateFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist DB to localStorage & server disk whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
    // Fire-and-forget sync to local server file
    fetch('/api/bizpilot/local-store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(db),
    }).catch(() => {});
  }, [db]);

  useEffect(() => {
    if (activeUserId) {
      localStorage.setItem(SESSION_USER_KEY, activeUserId);
    } else {
      localStorage.removeItem(SESSION_USER_KEY);
    }
  }, [activeUserId]);

  const currentUser = useMemo(
    () => db.users.find((u) => u.id === activeUserId) || null,
    [db.users, activeUserId]
  );

  const business = useMemo(
    () => (currentUser ? db.businesses.find((b) => b.ownerId === currentUser.id) || null : null),
    [db.businesses, currentUser]
  );

  // Strictly scope all business records to the authenticated user's businessId
  const bizId = business?.id || '__none__';

  const products = useMemo(
    () => db.products.filter((p) => p.businessId === bizId),
    [db.products, bizId]
  );
  const stockMovements = useMemo(
    () =>
      db.stockMovements
        .filter((m) => m.businessId === bizId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [db.stockMovements, bizId]
  );
  const sales = useMemo(
    () =>
      db.sales
        .filter((s) => s.businessId === bizId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [db.sales, bizId]
  );
  const expenses = useMemo(
    () =>
      db.expenses
        .filter((e) => e.businessId === bizId)
        .sort((a, b) => b.expenseDate.localeCompare(a.expenseDate)),
    [db.expenses, bizId]
  );
  const customers = useMemo(
    () => db.customers.filter((c) => c.businessId === bizId),
    [db.customers, bizId]
  );
  const customerPayments = useMemo(
    () =>
      db.customerPayments
        .filter((p) => p.businessId === bizId)
        .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt)),
    [db.customerPayments, bizId]
  );
  const suppliers = useMemo(
    () => db.suppliers.filter((s) => s.businessId === bizId),
    [db.suppliers, bizId]
  );
  const supplierPurchases = useMemo(
    () =>
      db.supplierPurchases
        .filter((p) => p.businessId === bizId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [db.supplierPurchases, bizId]
  );
  const supplierPayments = useMemo(
    () =>
      db.supplierPayments
        .filter((p) => p.businessId === bizId)
        .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt)),
    [db.supplierPayments, bizId]
  );
  const documents = useMemo(
    () =>
      db.documents
        .filter((d) => d.businessId === bizId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [db.documents, bizId]
  );

  // ==========================================================================
  // 1. AUTHENTICATION & ONBOARDING
  // ==========================================================================

  const registerAccount = useCallback(
    (email: string, password: string, fullName: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !normalizedEmail.includes('@')) {
        return { ok: false, error: 'Please enter a valid email address.' };
      }
      if (password.length < 6) {
        return { ok: false, error: 'Password must be at least 6 characters long.' };
      }
      if (db.users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        return {
          ok: false,
          error: 'An account with this email already exists. Please sign in instead.',
        };
      }

      const newUser: UserAccount = {
        id: uid('usr'),
        email: normalizedEmail,
        fullName: fullName.trim() || 'Business Owner',
        passwordHash: btoa(encodeURIComponent(password)),
        onboardingCompleted: false,
        createdAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        users: [...prev.users, newUser],
      }));
      setActiveUserId(newUser.id);
      return { ok: true };
    },
    [db.users]
  );

  const loginAccount = useCallback(
    (email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const user = db.users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (!user) {
        return {
          ok: false,
          error: 'No account found with that email. Create a new account or try the Demo Kenyan Shop.',
        };
      }
      const expectedHash = btoa(encodeURIComponent(password));
      if (user.passwordHash && user.passwordHash !== expectedHash) {
        return { ok: false, error: 'Incorrect password. Please try again or reset your password.' };
      }
      setActiveUserId(user.id);
      return { ok: true };
    },
    [db.users]
  );

  const loginWithDemoWorkspace = useCallback(() => {
    setIsLoading(true);
    const demoEmail = 'amina@kilimanimart.co.ke';
    const existingDemoUser = db.users.find((u) => u.email === demoEmail);
    if (existingDemoUser) {
      setActiveUserId(existingDemoUser.id);
      setIsLoading(false);
      return;
    }

    const demoUserId = 'usr_demo_ke';
    const demoUser: UserAccount = {
      id: demoUserId,
      email: demoEmail,
      fullName: 'Amina Wanjiku',
      passwordHash: btoa(encodeURIComponent('demo1234')),
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
    };

    const seed = buildDemoKenyanWorkspace(demoUserId, demoEmail, demoUser.fullName);

    setDb((prev) => ({
      ...prev,
      users: [...prev.users, demoUser],
      businesses: [...prev.businesses.filter((b) => b.id !== seed.business.id), seed.business],
      products: [...prev.products.filter((p) => p.businessId !== seed.business.id), ...seed.products],
      stockMovements: [
        ...prev.stockMovements.filter((m) => m.businessId !== seed.business.id),
        ...seed.stockMovements,
      ],
      customers: [...prev.customers.filter((c) => c.businessId !== seed.business.id), ...seed.customers],
      suppliers: [...prev.suppliers.filter((s) => s.businessId !== seed.business.id), ...seed.suppliers],
      sales: [...prev.sales.filter((s) => s.businessId !== seed.business.id), ...seed.sales],
      customerPayments: [
        ...prev.customerPayments.filter((cp) => cp.businessId !== seed.business.id),
        ...seed.customerPayments,
      ],
      supplierPurchases: [
        ...prev.supplierPurchases.filter((sp) => sp.businessId !== seed.business.id),
        ...seed.supplierPurchases,
      ],
      supplierPayments: [
        ...prev.supplierPayments.filter((sp) => sp.businessId !== seed.business.id),
        ...seed.supplierPayments,
      ],
      expenses: [...prev.expenses.filter((e) => e.businessId !== seed.business.id), ...seed.expenses],
      documents: [...prev.documents.filter((d) => d.businessId !== seed.business.id), ...seed.documents],
    }));

    setActiveUserId(demoUserId);
    setIsLoading(false);
  }, [db.users]);

  const resetPasswordRequest = useCallback(
    (email: string, newPassword: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (newPassword.length < 6) {
        return { ok: false, message: 'New password must be at least 6 characters.' };
      }
      const exists = db.users.some((u) => u.email.toLowerCase() === normalizedEmail);
      if (!exists) {
        return { ok: false, message: 'No registered account found for that email address.' };
      }
      setDb((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.email.toLowerCase() === normalizedEmail
            ? { ...u, passwordHash: btoa(encodeURIComponent(newPassword)) }
            : u
        ),
      }));
      return {
        ok: true,
        message: 'Password updated successfully! You can now sign in with your new password.',
      };
    },
    [db.users]
  );

  const logoutAccount = useCallback(() => {
    setActiveUserId(null);
  }, []);

  const completeOnboarding = useCallback(
    (payload: OnboardingPayload) => {
      if (!currentUser) {
        return { ok: false, error: 'You must be signed in to complete onboarding.' };
      }
      if (!payload.businessName || payload.businessName.trim().length < 2) {
        return { ok: false, error: 'Business name is required (at least 2 characters).' };
      }
      if (!payload.ownerName || payload.ownerName.trim().length < 2) {
        return { ok: false, error: "Owner's name is required." };
      }

      const nowIso = new Date().toISOString();
      const newWorkspace: BusinessWorkspace = {
        id: uid('biz'),
        ownerId: currentUser.id,
        name: payload.businessName.trim(),
        ownerName: payload.ownerName.trim(),
        category: payload.category,
        businessType: payload.businessType || 'products',
        countyTown: (payload.countyTown || '').trim(),
        currency: payload.currency || 'KSh',
        phone: (payload.phone || '').trim(),
        email: currentUser.email,
        taxEnabled: false,
        taxName: 'VAT',
        taxRate: 16,
        allowNegativeStock: false,
        subscriptionPlan: payload.subscriptionPlan || 'GROWTH',
        receiptFooter: 'Thank you for shopping with us! Karibu tena.',
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      setDb((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === currentUser.id
            ? { ...u, fullName: payload.ownerName.trim(), onboardingCompleted: true }
            : u
        ),
        businesses: [
          ...prev.businesses.filter((b) => b.ownerId !== currentUser.id),
          newWorkspace,
        ],
      }));

      return { ok: true };
    },
    [currentUser]
  );

  const updateBusinessSettings = useCallback(
    (updates: Partial<BusinessWorkspace>) => {
      if (!business) return { ok: false, error: 'No active business workspace.' };
      setDb((prev) => ({
        ...prev,
        businesses: prev.businesses.map((b) =>
          b.id === business.id
            ? { ...b, ...updates, updatedAt: new Date().toISOString() }
            : b
        ),
      }));
      return { ok: true };
    },
    [business]
  );

  const loadSampleDataIntoCurrentWorkspace = useCallback(() => {
    if (!currentUser || !business) return;
    const seed = buildDemoKenyanWorkspace(currentUser.id, currentUser.email, business.ownerName);
    const currentBizId = business.id;

    // Remap seed records to currentBizId
    const remapId = (s: string) => s.replace(seed.business.id, currentBizId);

    setDb((prev) => ({
      ...prev,
      products: [
        ...prev.products.filter((p) => p.businessId !== currentBizId),
        ...seed.products.map((p) => ({
          ...p,
          id: remapId(p.id),
          businessId: currentBizId,
          supplierId: p.supplierId ? remapId(p.supplierId) : undefined,
        })),
      ],
      stockMovements: [
        ...prev.stockMovements.filter((m) => m.businessId !== currentBizId),
        ...seed.stockMovements.map((m) => ({
          ...m,
          id: remapId(m.id),
          businessId: currentBizId,
          productId: remapId(m.productId),
        })),
      ],
      customers: [
        ...prev.customers.filter((c) => c.businessId !== currentBizId),
        ...seed.customers.map((c) => ({ ...c, id: remapId(c.id), businessId: currentBizId })),
      ],
      suppliers: [
        ...prev.suppliers.filter((s) => s.businessId !== currentBizId),
        ...seed.suppliers.map((s) => ({ ...s, id: remapId(s.id), businessId: currentBizId })),
      ],
      sales: [
        ...prev.sales.filter((s) => s.businessId !== currentBizId),
        ...seed.sales.map((s) => ({
          ...s,
          id: remapId(s.id),
          businessId: currentBizId,
          customerId: s.customerId ? remapId(s.customerId) : undefined,
          items: s.items.map((it) => ({ ...it, productId: remapId(it.productId) })),
        })),
      ],
      customerPayments: [
        ...prev.customerPayments.filter((cp) => cp.businessId !== currentBizId),
        ...seed.customerPayments.map((cp) => ({
          ...cp,
          id: remapId(cp.id),
          businessId: currentBizId,
          customerId: remapId(cp.customerId),
          saleId: cp.saleId ? remapId(cp.saleId) : undefined,
        })),
      ],
      supplierPurchases: [
        ...prev.supplierPurchases.filter((sp) => sp.businessId !== currentBizId),
        ...seed.supplierPurchases.map((sp) => ({
          ...sp,
          id: remapId(sp.id),
          businessId: currentBizId,
          supplierId: remapId(sp.supplierId),
          items: sp.items.map((it) => ({ ...it, productId: remapId(it.productId) })),
        })),
      ],
      supplierPayments: [
        ...prev.supplierPayments.filter((sp) => sp.businessId !== currentBizId),
        ...seed.supplierPayments.map((sp) => ({
          ...sp,
          id: remapId(sp.id),
          businessId: currentBizId,
          supplierId: remapId(sp.supplierId),
          purchaseId: sp.purchaseId ? remapId(sp.purchaseId) : undefined,
        })),
      ],
      expenses: [
        ...prev.expenses.filter((e) => e.businessId !== currentBizId),
        ...seed.expenses.map((e) => ({ ...e, id: remapId(e.id), businessId: currentBizId })),
      ],
      documents: [
        ...prev.documents.filter((d) => d.businessId !== currentBizId),
        ...seed.documents.map((d) => ({
          ...d,
          id: remapId(d.id),
          businessId: currentBizId,
          customerId: d.customerId ? remapId(d.customerId) : undefined,
        })),
      ],
    }));
  }, [currentUser, business]);

  const clearWorkspaceData = useCallback(() => {
    if (!business) return;
    const currentBizId = business.id;
    setDb((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.businessId !== currentBizId),
      stockMovements: prev.stockMovements.filter((m) => m.businessId !== currentBizId),
      sales: prev.sales.filter((s) => s.businessId !== currentBizId),
      expenses: prev.expenses.filter((e) => e.businessId !== currentBizId),
      customers: prev.customers.filter((c) => c.businessId !== currentBizId),
      customerPayments: prev.customerPayments.filter((cp) => cp.businessId !== currentBizId),
      suppliers: prev.suppliers.filter((s) => s.businessId !== currentBizId),
      supplierPurchases: prev.supplierPurchases.filter((sp) => sp.businessId !== currentBizId),
      supplierPayments: prev.supplierPayments.filter((sp) => sp.businessId !== currentBizId),
      documents: prev.documents.filter((d) => d.businessId !== currentBizId),
    }));
  }, [business]);

  // ==========================================================================
  // 2. PRODUCT & INVENTORY MANAGEMENT
  // ==========================================================================

  const createProduct = useCallback(
    (data: Omit<Product, 'id' | 'businessId' | 'isArchived' | 'createdAt' | 'updatedAt'>) => {
      if (!business) return { ok: false, error: 'No active business workspace.' };

      const planConfig = SUBSCRIPTION_PLANS[business.subscriptionPlan];
      const activeCount = products.filter((p) => !p.isArchived).length;
      if (activeCount >= planConfig.maxActiveProducts) {
        return {
          ok: false,
          error: `Your ${planConfig.name} plan allows up to ${planConfig.maxActiveProducts} active products. Upgrade your plan in Settings to add more.`,
        };
      }

      if (!data.name.trim()) {
        return { ok: false, error: 'Product name is required.' };
      }
      if (data.sellingPrice < 0 || data.purchaseCost < 0) {
        return { ok: false, error: 'Prices and costs cannot be negative.' };
      }
      if (!business.allowNegativeStock && data.stockQuantity < 0) {
        return { ok: false, error: 'Opening stock quantity cannot be negative.' };
      }

      const normalizedSku =
        data.sku.trim().toUpperCase() ||
        `SKU-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

      if (products.some((p) => p.sku.toUpperCase() === normalizedSku)) {
        return {
          ok: false,
          error: `A product with SKU "${normalizedSku}" already exists in your inventory.`,
        };
      }

      const nowIso = new Date().toISOString();
      const newProduct: Product = {
        ...data,
        id: uid('prod'),
        businessId: business.id,
        name: data.name.trim(),
        sku: normalizedSku,
        isArchived: false,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      const initialMovement: StockMovement | null =
        newProduct.stockQuantity !== 0
          ? {
              id: uid('mov'),
              businessId: business.id,
              productId: newProduct.id,
              productName: newProduct.name,
              sku: newProduct.sku,
              movementType: 'initial',
              quantityChange: newProduct.stockQuantity,
              previousStock: 0,
              newStock: newProduct.stockQuantity,
              unitCostAtTime: newProduct.purchaseCost,
              notes: 'Initial opening stock',
              createdAt: nowIso,
            }
          : null;

      setDb((prev) => ({
        ...prev,
        products: [newProduct, ...prev.products],
        stockMovements: initialMovement
          ? [initialMovement, ...prev.stockMovements]
          : prev.stockMovements,
      }));

      return { ok: true, product: newProduct };
    },
    [business, products]
  );

  const updateProduct = useCallback(
    (
      productId: string,
      updates: Partial<Omit<Product, 'id' | 'businessId' | 'createdAt'>>
    ) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      const existing = products.find((p) => p.id === productId);
      if (!existing) return { ok: false, error: 'Product not found.' };

      if (updates.sellingPrice !== undefined && updates.sellingPrice < 0) {
        return { ok: false, error: 'Selling price cannot be negative.' };
      }
      if (updates.purchaseCost !== undefined && updates.purchaseCost < 0) {
        return { ok: false, error: 'Purchase cost cannot be negative.' };
      }

      setDb((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === productId && p.businessId === business.id
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p
        ),
      }));
      return { ok: true };
    },
    [business, products]
  );

  const toggleArchiveProduct = useCallback(
    (productId: string) => {
      if (!business) return;
      setDb((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === productId && p.businessId === business.id
            ? { ...p, isArchived: !p.isArchived, updatedAt: new Date().toISOString() }
            : p
        ),
      }));
    },
    [business]
  );

  const adjustProductStock = useCallback(
    (params: {
      productId: string;
      movementType: StockMovementType;
      quantityDelta: number;
      newUnitCost?: number;
      notes: string;
    }) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      const prod = products.find((p) => p.id === params.productId);
      if (!prod) return { ok: false, error: 'Product not found.' };
      if (params.quantityDelta === 0) {
        return { ok: false, error: 'Quantity adjustment cannot be zero.' };
      }

      const newStock = prod.stockQuantity + params.quantityDelta;
      if (newStock < 0 && !business.allowNegativeStock) {
        return {
          ok: false,
          error: `Insufficient stock for "${prod.name}". Current stock is ${prod.stockQuantity} ${prod.unit}. Negative inventory is disabled in your Business Settings.`,
        };
      }

      const updatedCost =
        params.newUnitCost !== undefined && params.newUnitCost >= 0
          ? params.newUnitCost
          : prod.purchaseCost;

      const nowIso = new Date().toISOString();
      const movement: StockMovement = {
        id: uid('mov'),
        businessId: business.id,
        productId: prod.id,
        productName: prod.name,
        sku: prod.sku,
        movementType: params.movementType,
        quantityChange: params.quantityDelta,
        previousStock: prod.stockQuantity,
        newStock,
        unitCostAtTime: updatedCost,
        notes: params.notes.trim() || 'Manual stock adjustment',
        createdAt: nowIso,
      };

      setDb((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p.id === prod.id
            ? {
                ...p,
                stockQuantity: newStock,
                purchaseCost: updatedCost,
                updatedAt: nowIso,
              }
            : p
        ),
        stockMovements: [movement, ...prev.stockMovements],
      }));

      return {
        ok: true,
        warning:
          newStock < 0
            ? `Warning: "${prod.name}" stock is now negative (${newStock} ${prod.unit}) as authorized by your business settings.`
            : undefined,
      };
    },
    [business, products]
  );

  // ==========================================================================
  // 3. POINT OF SALE (POS), RECEIPTS & REFUNDS (ATOMIC TRANSACTION)
  // ==========================================================================

  const recordSale = useCallback(
    (input: CreateSaleInput) => {
      if (!business) return { ok: false, error: 'No active business workspace.' };

      // 1. Idempotency check to prevent duplicate submissions
      const duplicate = sales.find((s) => s.idempotencyKey === input.idempotencyKey);
      if (duplicate) {
        return {
          ok: false,
          error: `This sale was already recorded as Receipt ${duplicate.receiptNumber}. Duplicate submission prevented.`,
        };
      }

      if (!input.items || input.items.length === 0) {
        return { ok: false, error: 'Please select at least one product to record a sale.' };
      }

      // 2. Validate quantities and stock availability
      const lineItems: SaleRecord['items'] = [];
      let subtotal = 0;
      let totalCogs = 0;
      let hasIncompleteCost = false;
      let negativeStockWarning: string | undefined;

      for (const reqItem of input.items) {
        if (reqItem.quantity <= 0 || !Number.isInteger(reqItem.quantity)) {
          return { ok: false, error: 'All item quantities must be positive whole numbers.' };
        }
        const prod = products.find((p) => p.id === reqItem.productId && !p.isArchived);
        if (!prod) {
          return { ok: false, error: 'One of the selected products is no longer available.' };
        }
        const projectedStock = prod.stockQuantity - reqItem.quantity;
        if (projectedStock < 0 && !business.allowNegativeStock) {
          return {
            ok: false,
            error: `Not enough stock for "${prod.name}" (${prod.stockQuantity} ${prod.unit} available, tried to sell ${reqItem.quantity}).`,
          };
        }
        if (projectedStock < 0 && business.allowNegativeStock) {
          negativeStockWarning = `Note: "${prod.name}" entered negative stock (${projectedStock} ${prod.unit}) as permitted by your settings.`;
        }

        const unitPrice =
          reqItem.unitPrice !== undefined ? reqItem.unitPrice : prod.sellingPrice;
        const lineTotal = Math.round(unitPrice * reqItem.quantity * 100) / 100;
        const itemCogs = Math.round(prod.purchaseCost * reqItem.quantity * 100) / 100;

        if (!prod.purchaseCost || prod.purchaseCost <= 0) {
          hasIncompleteCost = true;
        }

        subtotal += lineTotal;
        totalCogs += itemCogs;

        lineItems.push({
          id: uid('sli'),
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: reqItem.quantity,
          unitPrice,
          unitCost: prod.purchaseCost,
          lineTotal,
        });
      }

      const discountAmount = Math.max(0, Math.min(subtotal, input.discountAmount || 0));
      const taxableAmount = Math.max(0, subtotal - discountAmount);
      const taxAmount = business.taxEnabled
        ? Math.round(taxableAmount * (business.taxRate / 100) * 100) / 100
        : 0;
      const totalAmount = Math.round((taxableAmount + taxAmount) * 100) / 100;

      // Credit sales require a customer
      if (input.paymentMethod === 'credit' && !input.customerId) {
        return {
          ok: false,
          error: 'Please select or add a Customer when recording a Credit / Pay Later sale.',
        };
      }

      let amountPaid = totalAmount;
      if (input.paymentMethod === 'credit') {
        amountPaid = Math.max(0, Math.min(totalAmount, input.amountPaid || 0));
      } else if (input.amountPaid !== undefined) {
        amountPaid = Math.max(0, Math.min(totalAmount, input.amountPaid));
      }

      if (input.paymentMethod !== 'credit' && amountPaid < totalAmount && !input.customerId) {
        return {
          ok: false,
          error: 'For partial payments, please select a Customer so the remaining balance can be tracked.',
        };
      }

      const paymentStatus: SaleRecord['paymentStatus'] =
        amountPaid >= totalAmount ? 'paid' : amountPaid > 0 ? 'partial' : 'unpaid';

      const customerObj = input.customerId
        ? customers.find((c) => c.id === input.customerId)
        : undefined;

      const todayCompact = getEatDateString().replace(/-/g, '');
      const seqNum = String(sales.length + 1).padStart(3, '0');
      const receiptNumber = `RCP-${todayCompact}-${seqNum}`;
      const nowIso = new Date().toISOString();

      const newSale: SaleRecord = {
        id: uid('sale'),
        businessId: business.id,
        receiptNumber,
        idempotencyKey: input.idempotencyKey,
        customerId: customerObj?.id,
        customerName: customerObj?.name || input.customerName?.trim() || 'Walk-in Customer',
        items: lineItems,
        subtotal: Math.round(subtotal * 100) / 100,
        discountAmount,
        taxAmount,
        totalAmount,
        amountPaid,
        totalCogs: Math.round(totalCogs * 100) / 100,
        hasIncompleteCost,
        paymentMethod: input.paymentMethod,
        paymentReference: input.paymentReference?.trim() || undefined,
        paymentStatus,
        dueDate: input.dueDate || undefined,
        status: 'completed',
        notes: input.notes?.trim() || undefined,
        createdAt: nowIso,
      };

      // Build stock movements and updated products atomically
      const newMovements: StockMovement[] = [];
      const qtyByProductId = new Map<string, number>();
      for (const item of lineItems) {
        qtyByProductId.set(
          item.productId,
          (qtyByProductId.get(item.productId) || 0) + item.quantity
        );
      }

      const updatedProducts = db.products.map((p) => {
        if (p.businessId !== business.id) return p;
        const soldQty = qtyByProductId.get(p.id);
        if (!soldQty) return p;
        const newStock = p.stockQuantity - soldQty;
        newMovements.push({
          id: uid('mov'),
          businessId: business.id,
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          movementType: 'sale',
          quantityChange: -soldQty,
          previousStock: p.stockQuantity,
          newStock,
          unitCostAtTime: p.purchaseCost,
          referenceId: receiptNumber,
          notes: `Sale Receipt ${receiptNumber}`,
          createdAt: nowIso,
        });
        return { ...p, stockQuantity: newStock, updatedAt: nowIso };
      });

      setDb((prev) => ({
        ...prev,
        products: updatedProducts,
        sales: [newSale, ...prev.sales],
        stockMovements: [...newMovements, ...prev.stockMovements],
      }));

      return { ok: true, sale: newSale, warning: negativeStockWarning };
    },
    [business, sales, products, customers, db.products]
  );

  const cancelSale = useCallback(
    (saleId: string, reason: string) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      const targetSale = sales.find((s) => s.id === saleId);
      if (!targetSale) return { ok: false, error: 'Sale record not found.' };
      if (targetSale.status === 'cancelled') {
        return { ok: false, error: 'This sale has already been cancelled.' };
      }

      const nowIso = new Date().toISOString();
      const reversalMovements: StockMovement[] = [];
      const restoreMap = new Map<string, number>();
      for (const item of targetSale.items) {
        restoreMap.set(item.productId, (restoreMap.get(item.productId) || 0) + item.quantity);
      }

      const updatedProducts = db.products.map((p) => {
        if (p.businessId !== business.id) return p;
        const restoreQty = restoreMap.get(p.id);
        if (!restoreQty) return p;
        const newStock = p.stockQuantity + restoreQty;
        reversalMovements.push({
          id: uid('mov'),
          businessId: business.id,
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          movementType: 'sale_cancellation',
          quantityChange: restoreQty,
          previousStock: p.stockQuantity,
          newStock,
          unitCostAtTime: p.purchaseCost,
          referenceId: targetSale.receiptNumber,
          notes: `Cancelled Receipt ${targetSale.receiptNumber}: ${reason || 'Customer refund/void'}`,
          createdAt: nowIso,
        });
        return { ...p, stockQuantity: newStock, updatedAt: nowIso };
      });

      setDb((prev) => ({
        ...prev,
        products: updatedProducts,
        sales: prev.sales.map((s) =>
          s.id === saleId
            ? {
                ...s,
                status: 'cancelled',
                paymentStatus: 'refunded',
                cancellationReason: reason || 'Cancelled by owner',
              }
            : s
        ),
        stockMovements: [...reversalMovements, ...prev.stockMovements],
      }));

      return { ok: true };
    },
    [business, sales, db.products]
  );

  // ==========================================================================
  // 4. EXPENSE TRACKING
  // ==========================================================================

  const createExpense = useCallback(
    (data: Omit<ExpenseRecord, 'id' | 'businessId' | 'isInventoryPurchase' | 'createdAt'>) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!data.description.trim()) {
        return { ok: false, error: 'Expense description is required.' };
      }
      if (!data.amount || data.amount <= 0) {
        return { ok: false, error: 'Expense amount must be greater than zero.' };
      }

      const newExpense: ExpenseRecord = {
        ...data,
        id: uid('exp'),
        businessId: business.id,
        description: data.description.trim(),
        isInventoryPurchase: data.category === 'Stock Purchases',
        createdAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        expenses: [newExpense, ...prev.expenses],
      }));
      return { ok: true };
    },
    [business]
  );

  const updateExpense = useCallback(
    (
      expenseId: string,
      updates: Partial<Omit<ExpenseRecord, 'id' | 'businessId' | 'createdAt'>>
    ) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (updates.amount !== undefined && updates.amount <= 0) {
        return { ok: false, error: 'Expense amount must be greater than zero.' };
      }
      setDb((prev) => ({
        ...prev,
        expenses: prev.expenses.map((e) =>
          e.id === expenseId && e.businessId === business.id
            ? {
                ...e,
                ...updates,
                isInventoryPurchase:
                  (updates.category || e.category) === 'Stock Purchases',
              }
            : e
        ),
      }));
      return { ok: true };
    },
    [business]
  );

  const deleteExpense = useCallback(
    (expenseId: string) => {
      if (!business) return;
      setDb((prev) => ({
        ...prev,
        expenses: prev.expenses.filter(
          (e) => !(e.id === expenseId && e.businessId === business.id)
        ),
      }));
    },
    [business]
  );

  // ==========================================================================
  // 5. CUSTOMERS & CREDIT MANAGEMENT
  // ==========================================================================

  const createCustomer = useCallback(
    (data: Omit<CustomerRecord, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!data.name.trim()) {
        return { ok: false, error: 'Customer name is required.' };
      }
      const nowIso = new Date().toISOString();
      const newCustomer: CustomerRecord = {
        id: uid('cust'),
        businessId: business.id,
        name: data.name.trim(),
        phone: (data.phone || '').trim(),
        email: (data.email || '').trim(),
        notes: (data.notes || '').trim(),
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      setDb((prev) => ({
        ...prev,
        customers: [newCustomer, ...prev.customers],
      }));
      return { ok: true, customer: newCustomer };
    },
    [business]
  );

  const updateCustomer = useCallback(
    (
      customerId: string,
      updates: Partial<Omit<CustomerRecord, 'id' | 'businessId' | 'createdAt'>>
    ) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      setDb((prev) => ({
        ...prev,
        customers: prev.customers.map((c) =>
          c.id === customerId && c.businessId === business.id
            ? { ...c, ...updates, updatedAt: new Date().toISOString() }
            : c
        ),
      }));
      return { ok: true };
    },
    [business]
  );

  const recordCustomerPayment = useCallback(
    (params: {
      customerId: string;
      amount: number;
      paymentMethod: Exclude<PaymentMethod, 'credit'>;
      saleId?: string;
      invoiceId?: string;
      reference?: string;
      notes?: string;
    }) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!params.amount || params.amount <= 0) {
        return { ok: false, error: 'Payment amount must be greater than 0.' };
      }
      const customer = customers.find((c) => c.id === params.customerId);
      if (!customer) return { ok: false, error: 'Customer not found.' };

      let remainingToAllocate = params.amount;
      let linkedSaleId = params.saleId;
      let linkedInvoiceId = params.invoiceId;

      // Allocate payment against specific sale/invoice or FIFO across customer's unpaid sales & invoices
      const updatedSales = db.sales.map((s) => {
        if (s.businessId !== business.id || s.customerId !== customer.id || s.status !== 'completed') {
          return s;
        }
        if (params.saleId && s.id !== params.saleId) return s;
        if (params.invoiceId) return s; // Payment targeted at an invoice

        const unpaid = Math.max(0, s.totalAmount - s.amountPaid);
        if (unpaid <= 0 || remainingToAllocate <= 0) return s;

        const applied = Math.min(unpaid, remainingToAllocate);
        remainingToAllocate = Math.round((remainingToAllocate - applied) * 100) / 100;
        if (!linkedSaleId) linkedSaleId = s.id;

        const newPaid = Math.round((s.amountPaid + applied) * 100) / 100;
        return {
          ...s,
          amountPaid: newPaid,
          paymentStatus: newPaid >= s.totalAmount ? ('paid' as const) : ('partial' as const),
        };
      });

      const updatedDocs = db.documents.map((d) => {
        if (
          d.businessId !== business.id ||
          d.customerId !== customer.id ||
          d.docType !== 'invoice' ||
          d.status === 'cancelled' ||
          d.status === 'draft'
        ) {
          return d;
        }
        if (params.invoiceId && d.id !== params.invoiceId) return d;
        if (params.saleId) return d;

        const unpaid = Math.max(0, d.totalAmount - d.amountPaid);
        if (unpaid <= 0 || remainingToAllocate <= 0) return d;

        const applied = Math.min(unpaid, remainingToAllocate);
        remainingToAllocate = Math.round((remainingToAllocate - applied) * 100) / 100;
        if (!linkedInvoiceId) linkedInvoiceId = d.id;

        const newPaid = Math.round((d.amountPaid + applied) * 100) / 100;
        return {
          ...d,
          amountPaid: newPaid,
          status: newPaid >= d.totalAmount ? ('paid' as const) : ('partially_paid' as const),
        };
      });

      const newPayment: CustomerPayment = {
        id: uid('cpay'),
        businessId: business.id,
        customerId: customer.id,
        customerName: customer.name,
        saleId: linkedSaleId,
        invoiceId: linkedInvoiceId,
        amount: params.amount,
        paymentMethod: params.paymentMethod,
        reference: params.reference?.trim() || undefined,
        notes: params.notes?.trim() || undefined,
        recordedAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        sales: updatedSales,
        documents: updatedDocs,
        customerPayments: [newPayment, ...prev.customerPayments],
      }));

      return { ok: true };
    },
    [business, customers, db.sales, db.documents]
  );

  // ==========================================================================
  // 6. SUPPLIERS & PURCHASING
  // ==========================================================================

  const createSupplier = useCallback(
    (data: Omit<SupplierRecord, 'id' | 'businessId' | 'createdAt' | 'updatedAt'>) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!data.name.trim()) {
        return { ok: false, error: 'Supplier name is required.' };
      }
      const nowIso = new Date().toISOString();
      const newSupplier: SupplierRecord = {
        id: uid('sup'),
        businessId: business.id,
        name: data.name.trim(),
        contactPerson: (data.contactPerson || '').trim(),
        phone: (data.phone || '').trim(),
        email: (data.email || '').trim(),
        category: (data.category || 'General').trim(),
        notes: (data.notes || '').trim(),
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      setDb((prev) => ({
        ...prev,
        suppliers: [newSupplier, ...prev.suppliers],
      }));
      return { ok: true, supplier: newSupplier };
    },
    [business]
  );

  const updateSupplier = useCallback(
    (
      supplierId: string,
      updates: Partial<Omit<SupplierRecord, 'id' | 'businessId' | 'createdAt'>>
    ) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      setDb((prev) => ({
        ...prev,
        suppliers: prev.suppliers.map((s) =>
          s.id === supplierId && s.businessId === business.id
            ? { ...s, ...updates, updatedAt: new Date().toISOString() }
            : s
        ),
      }));
      return { ok: true };
    },
    [business]
  );

  const recordSupplierPurchase = useCallback(
    (params: {
      supplierId: string;
      items: Array<{ productId: string; quantity: number; unitCost: number }>;
      amountPaid: number;
      paymentMethod: Exclude<PaymentMethod, 'credit'>;
      dueDate?: string;
      notes?: string;
    }) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      const supplier = suppliers.find((s) => s.id === params.supplierId);
      if (!supplier) return { ok: false, error: 'Please select a valid supplier.' };
      if (!params.items || params.items.length === 0) {
        return { ok: false, error: 'Add at least one product to the purchase order.' };
      }

      const nowIso = new Date().toISOString();
      const todayCompact = getEatDateString().replace(/-/g, '');
      const purchaseNumber = `PO-${todayCompact}-${String(supplierPurchases.length + 1).padStart(3, '0')}`;

      const purchaseItems: SupplierPurchaseItem[] = [];
      let totalAmount = 0;
      const newMovements: StockMovement[] = [];
      const restockByProduct = new Map<string, { qty: number; cost: number }>();

      for (const item of params.items) {
        if (item.quantity <= 0 || item.unitCost < 0) {
          return { ok: false, error: 'Purchase quantities must be positive and costs non-negative.' };
        }
        const prod = products.find((p) => p.id === item.productId);
        if (!prod) return { ok: false, error: 'Selected product not found.' };

        const lineTotal = Math.round(item.quantity * item.unitCost * 100) / 100;
        totalAmount += lineTotal;
        purchaseItems.push({
          productId: prod.id,
          productName: prod.name,
          sku: prod.sku,
          quantity: item.quantity,
          unitCost: item.unitCost,
          previousCost: prod.purchaseCost,
          lineTotal,
        });
        restockByProduct.set(prod.id, { qty: item.quantity, cost: item.unitCost });
      }

      const safeAmountPaid = Math.max(0, Math.min(totalAmount, params.amountPaid || 0));
      const paymentStatus: SupplierPurchase['paymentStatus'] =
        safeAmountPaid >= totalAmount ? 'paid' : safeAmountPaid > 0 ? 'partial' : 'unpaid';

      const newPurchase: SupplierPurchase = {
        id: uid('spurch'),
        businessId: business.id,
        supplierId: supplier.id,
        supplierName: supplier.name,
        purchaseNumber,
        items: purchaseItems,
        totalAmount: Math.round(totalAmount * 100) / 100,
        amountPaid: safeAmountPaid,
        paymentMethod: params.paymentMethod,
        paymentStatus,
        dueDate: params.dueDate || undefined,
        notes: params.notes?.trim() || undefined,
        createdAt: nowIso,
      };

      const updatedProducts = db.products.map((p) => {
        if (p.businessId !== business.id) return p;
        const restock = restockByProduct.get(p.id);
        if (!restock) return p;
        const newStock = p.stockQuantity + restock.qty;
        newMovements.push({
          id: uid('mov'),
          businessId: business.id,
          productId: p.id,
          productName: p.name,
          sku: p.sku,
          movementType: 'purchase_restock',
          quantityChange: restock.qty,
          previousStock: p.stockQuantity,
          newStock,
          unitCostAtTime: restock.cost,
          referenceId: purchaseNumber,
          notes: `Restock PO ${purchaseNumber} from ${supplier.name} (Cost: ${business.currency} ${restock.cost})`,
          createdAt: nowIso,
        });
        return {
          ...p,
          stockQuantity: newStock,
          purchaseCost: restock.cost,
          supplierId: supplier.id,
          updatedAt: nowIso,
        };
      });

      setDb((prev) => ({
        ...prev,
        products: updatedProducts,
        supplierPurchases: [newPurchase, ...prev.supplierPurchases],
        stockMovements: [...newMovements, ...prev.stockMovements],
      }));

      return { ok: true };
    },
    [business, suppliers, supplierPurchases.length, products, db.products]
  );

  const recordSupplierPayment = useCallback(
    (params: {
      supplierId: string;
      purchaseId?: string;
      amount: number;
      paymentMethod: Exclude<PaymentMethod, 'credit'>;
      reference?: string;
      notes?: string;
    }) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!params.amount || params.amount <= 0) {
        return { ok: false, error: 'Payment amount must be greater than zero.' };
      }
      const supplier = suppliers.find((s) => s.id === params.supplierId);
      if (!supplier) return { ok: false, error: 'Supplier not found.' };

      let remaining = params.amount;
      let linkedPurchaseId = params.purchaseId;

      const updatedPurchases = db.supplierPurchases.map((pur) => {
        if (pur.businessId !== business.id || pur.supplierId !== supplier.id) return pur;
        if (params.purchaseId && pur.id !== params.purchaseId) return pur;

        const unpaid = Math.max(0, pur.totalAmount - pur.amountPaid);
        if (unpaid <= 0 || remaining <= 0) return pur;

        const applied = Math.min(unpaid, remaining);
        remaining = Math.round((remaining - applied) * 100) / 100;
        if (!linkedPurchaseId) linkedPurchaseId = pur.id;

        const newPaid = Math.round((pur.amountPaid + applied) * 100) / 100;
        return {
          ...pur,
          amountPaid: newPaid,
          paymentStatus: newPaid >= pur.totalAmount ? ('paid' as const) : ('partial' as const),
        };
      });

      const newSupplierPayment: SupplierPayment = {
        id: uid('spay'),
        businessId: business.id,
        supplierId: supplier.id,
        supplierName: supplier.name,
        purchaseId: linkedPurchaseId,
        amount: params.amount,
        paymentMethod: params.paymentMethod,
        reference: params.reference?.trim() || undefined,
        notes: params.notes?.trim() || undefined,
        recordedAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        supplierPurchases: updatedPurchases,
        supplierPayments: [newSupplierPayment, ...prev.supplierPayments],
      }));

      return { ok: true };
    },
    [business, suppliers, db.supplierPurchases]
  );

  // ==========================================================================
  // 7. INVOICES & QUOTATIONS
  // ==========================================================================

  const createDocument = useCallback(
    (params: {
      docType: DocumentType;
      customerId?: string;
      customerName: string;
      customerPhone?: string;
      customerEmail?: string;
      items: DocumentLineItem[];
      discountAmount: number;
      taxRate: number;
      issueDate: string;
      dueOrExpiryDate: string;
      status?: DocumentStatus;
      notes?: string;
    }) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      if (!params.customerName.trim()) {
        return { ok: false, error: 'Customer name is required.' };
      }
      if (!params.items || params.items.length === 0) {
        return { ok: false, error: 'Add at least one line item.' };
      }

      const subtotal = params.items.reduce((sum, it) => sum + it.lineTotal, 0);
      const discount = Math.max(0, Math.min(subtotal, params.discountAmount || 0));
      const taxable = Math.max(0, subtotal - discount);
      const taxAmount = Math.round(taxable * ((params.taxRate || 0) / 100) * 100) / 100;
      const totalAmount = Math.round((taxable + taxAmount) * 100) / 100;

      const prefix = params.docType === 'quotation' ? 'QUO' : 'INV';
      const todayCompact = getEatDateString().replace(/-/g, '');
      const seq = String(
        documents.filter((d) => d.docType === params.docType).length + 1
      ).padStart(3, '0');
      const docNumber = `${prefix}-${todayCompact}-${seq}`;

      const newDoc: BusinessDocument = {
        id: uid('doc'),
        businessId: business.id,
        docType: params.docType,
        docNumber,
        customerId: params.customerId,
        customerName: params.customerName.trim(),
        customerPhone: params.customerPhone?.trim(),
        customerEmail: params.customerEmail?.trim(),
        items: params.items,
        subtotal: Math.round(subtotal * 100) / 100,
        discountAmount: discount,
        taxRate: params.taxRate || 0,
        taxAmount,
        totalAmount,
        amountPaid: 0,
        status: params.status || 'sent',
        issueDate: params.issueDate,
        dueOrExpiryDate: params.dueOrExpiryDate,
        notes: params.notes?.trim(),
        createdAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        documents: [newDoc, ...prev.documents],
      }));

      return { ok: true, document: newDoc };
    },
    [business, documents]
  );

  const updateDocumentStatus = useCallback(
    (docId: string, status: DocumentStatus) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      setDb((prev) => ({
        ...prev,
        documents: prev.documents.map((d) => {
          if (d.id !== docId || d.businessId !== business.id) return d;
          const amountPaid = status === 'paid' ? d.totalAmount : d.amountPaid;
          return { ...d, status, amountPaid };
        }),
      }));
      return { ok: true };
    },
    [business]
  );

  const convertQuotationToInvoice = useCallback(
    (quoteId: string, dueDate?: string) => {
      if (!business) return { ok: false, error: 'Unauthorized.' };
      const quote = documents.find((d) => d.id === quoteId && d.docType === 'quotation');
      if (!quote) return { ok: false, error: 'Quotation not found.' };

      if (quote.convertedToInvoiceId) {
        const existingInv = documents.find((d) => d.id === quote.convertedToInvoiceId);
        return {
          ok: false,
          error: `This quotation was already converted to Invoice ${existingInv?.docNumber || quote.convertedToInvoiceId}.`,
        };
      }

      const todayStr = getEatDateString();
      const todayCompact = todayStr.replace(/-/g, '');
      const seq = String(
        documents.filter((d) => d.docType === 'invoice').length + 1
      ).padStart(3, '0');
      const invNumber = `INV-${todayCompact}-${seq}`;

      const defaultDue =
        dueDate ||
        getEatDateString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

      const newInvoice: BusinessDocument = {
        id: uid('doc'),
        businessId: business.id,
        docType: 'invoice',
        docNumber: invNumber,
        customerId: quote.customerId,
        customerName: quote.customerName,
        customerPhone: quote.customerPhone,
        customerEmail: quote.customerEmail,
        items: quote.items.map((it) => ({ ...it, id: uid('dli') })),
        subtotal: quote.subtotal,
        discountAmount: quote.discountAmount,
        taxRate: quote.taxRate,
        taxAmount: quote.taxAmount,
        totalAmount: quote.totalAmount,
        amountPaid: 0,
        status: 'sent',
        issueDate: todayStr,
        dueOrExpiryDate: defaultDue,
        convertedFromQuoteId: quote.id,
        notes: `Converted from Quotation ${quote.docNumber}. ${quote.notes || ''}`.trim(),
        createdAt: new Date().toISOString(),
      };

      setDb((prev) => ({
        ...prev,
        documents: [
          newInvoice,
          ...prev.documents.map((d) =>
            d.id === quote.id
              ? { ...d, status: 'accepted' as const, convertedToInvoiceId: newInvoice.id }
              : d
          ),
        ],
      }));

      return { ok: true, invoice: newInvoice };
    },
    [business, documents]
  );

  const value: BizPilotContextValue = {
    storageMode: 'local-persistent',
    currentUser,
    business,
    isLoading,
    products,
    stockMovements,
    sales,
    expenses,
    customers,
    customerPayments,
    suppliers,
    supplierPurchases,
    supplierPayments,
    documents,
    registerAccount,
    loginAccount,
    loginWithDemoWorkspace,
    resetPasswordRequest,
    logoutAccount,
    completeOnboarding,
    updateBusinessSettings,
    loadSampleDataIntoCurrentWorkspace,
    clearWorkspaceData,
    createProduct,
    updateProduct,
    toggleArchiveProduct,
    adjustProductStock,
    recordSale,
    cancelSale,
    createExpense,
    updateExpense,
    deleteExpense,
    createCustomer,
    updateCustomer,
    recordCustomerPayment,
    createSupplier,
    updateSupplier,
    recordSupplierPurchase,
    recordSupplierPayment,
    createDocument,
    updateDocumentStatus,
    convertQuotationToInvoice,
  };

  return <BizPilotContext.Provider value={value}>{children}</BizPilotContext.Provider>;
};

export function useBizPilot(): BizPilotContextValue {
  const ctx = useContext(BizPilotContext);
  if (!ctx) {
    throw new Error('useBizPilot must be used within a BizPilotProvider');
  }
  return ctx;
}
