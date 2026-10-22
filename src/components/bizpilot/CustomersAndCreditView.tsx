import React, { useState, useMemo } from 'react';
import {
  Users,
  Truck,
  Plus,
  Search,
  Wallet,
  MessageSquare,
  FileText,
  Printer,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  PackagePlus,
  Lock,
} from 'lucide-react';
import {
  CustomerRecord,
  PaymentMethod,
  SUBSCRIPTION_PLANS,
  SupplierRecord,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  calculateCustomerBalance,
  calculateSupplierBalance,
  formatCurrency,
  formatEatDate,
  formatEatDateTime,
  formatKenyanWhatsAppNumber,
  getEatDateString,
} from '../../utils/bizpilotFinance.js';

export const CustomersAndCreditView: React.FC = () => {
  const {
    business,
    products,
    customers,
    sales,
    documents,
    customerPayments,
    suppliers,
    supplierPurchases,
    supplierPayments,
    createCustomer,
    recordCustomerPayment,
    createSupplier,
    recordSupplierPurchase,
    recordSupplierPayment,
    updateBusinessSettings,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';
  const planConfig = SUBSCRIPTION_PLANS[business?.subscriptionPlan || 'GROWTH'];

  const [subTab, setSubTab] = useState<'customers' | 'suppliers'>('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Customer Modals
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custNotes, setCustNotes] = useState('');

  const [payingCustomer, setPayingCustomer] = useState<{
    customer: CustomerRecord;
    balance: number;
  } | null>(null);
  const [payAmount, setPayAmount] = useState<string>('');
  const [payMethod, setPayMethod] = useState<Exclude<PaymentMethod, 'credit'>>('mpesa');
  const [payRef, setPayRef] = useState('');
  const [payNotes, setPayNotes] = useState('');

  // Customer Statement & Polite Reminder Modal
  const [statementCustomer, setStatementCustomer] = useState<CustomerRecord | null>(null);
  const [reminderLang, setReminderLang] = useState<'en' | 'sw'>('en');
  const [copiedReminder, setCopiedReminder] = useState(false);

  // Supplier Modals
  const [isAddSupplierOpen, setIsAddSupplierOpen] = useState(false);
  const [supName, setSupName] = useState('');
  const [supContact, setSupContact] = useState('');
  const [supPhone, setSupPhone] = useState('');
  const [supEmail, setSupEmail] = useState('');
  const [supCategory, setSupCategory] = useState('FMCG & Household');
  const [supNotes, setSupNotes] = useState('');

  // Record Supplier Purchase Order (Restock) Modal
  const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
  const [poSupplierId, setPoSupplierId] = useState('');
  const [poProductId, setPoProductId] = useState('');
  const [poQty, setPoQty] = useState<number>(10);
  const [poUnitCost, setPoUnitCost] = useState<number>(0);
  const [poAmountPaid, setPoAmountPaid] = useState<string>('');
  const [poPayMethod, setPoPayMethod] = useState<Exclude<PaymentMethod, 'credit'>>('mpesa');
  const [poDueDate, setPoDueDate] = useState<string>(() =>
    getEatDateString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  );
  const [poNotes, setPoNotes] = useState('');

  // Pay Supplier Modal
  const [payingSupplier, setPayingSupplier] = useState<{
    supplier: SupplierRecord;
    balance: number;
  } | null>(null);
  const [supPayAmount, setSupPayAmount] = useState<string>('');
  const [supPayMethod, setSupPayMethod] = useState<Exclude<PaymentMethod, 'credit'>>('mpesa');
  const [supPayRef, setSupPayRef] = useState('');

  // Customer rows enriched with dynamically calculated balances
  const customerRows = useMemo(() => {
    return customers
      .map((c) => {
        const bal = calculateCustomerBalance(c.id, sales, documents, customerPayments);
        return { customer: c, ...bal };
      })
      .filter((row) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          row.customer.name.toLowerCase().includes(q) ||
          (row.customer.phone || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.outstandingBalance - a.outstandingBalance);
  }, [customers, sales, documents, customerPayments, searchQuery]);

  // Supplier rows enriched with dynamically calculated balances
  const supplierRows = useMemo(() => {
    return suppliers
      .map((s) => {
        const bal = calculateSupplierBalance(s.id, supplierPurchases, supplierPayments);
        return { supplier: s, ...bal };
      })
      .sort((a, b) => b.outstandingBalance - a.outstandingBalance);
  }, [suppliers, supplierPurchases, supplierPayments]);

  const totalCustomerReceivables = useMemo(
    () => customerRows.reduce((sum, r) => sum + r.outstandingBalance, 0),
    [customerRows]
  );

  const totalSupplierPayables = useMemo(
    () => supplierRows.reduce((sum, r) => sum + r.outstandingBalance, 0),
    [supplierRows]
  );

  // Plan Gate Check
  if (!planConfig.features.customersAndSuppliers) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Customer Credit (Madeni) & Supplier Management
        </h2>
        <p className="text-sm text-slate-600">
          Your workspace is currently on the <strong>{planConfig.name}</strong> plan. Upgrade to{' '}
          <strong>Biashara Starter (KSh 499/mo)</strong> or{' '}
          <strong>Biashara Growth (KSh 999/mo)</strong> to unlock Customer Credit tracking,
          WhatsApp payment reminders, and Supplier Purchase Orders.
        </p>
        <button
          type="button"
          onClick={() => updateBusinessSettings({ subscriptionPlan: 'STARTER' })}
          className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-semibold cursor-pointer"
        >
          Upgrade to Biashara Starter (KSh 499/mo)
        </button>
      </div>
    );
  }

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createCustomer({
      name: custName,
      phone: custPhone,
      email: custEmail,
      notes: custNotes,
    });
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not add customer.' });
      return;
    }
    setCustName('');
    setCustPhone('');
    setCustEmail('');
    setCustNotes('');
    setIsAddCustomerOpen(false);
    setBanner({ type: 'success', text: `Customer "${res.customer?.name}" added.` });
  };

  const handleRecordCustomerPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingCustomer) return;
    const amt = Number(payAmount);
    const res = recordCustomerPayment({
      customerId: payingCustomer.customer.id,
      amount: amt,
      paymentMethod: payMethod,
      reference: payRef,
      notes: payNotes,
    });
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not record payment.' });
      return;
    }
    setBanner({
      type: 'success',
      text: `Recorded ${formatCurrency(amt, currency)} payment from ${payingCustomer.customer.name}. Balance updated automatically.`,
    });
    setPayingCustomer(null);
    setPayAmount('');
    setPayRef('');
    setPayNotes('');
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createSupplier({
      name: supName,
      contactPerson: supContact,
      phone: supPhone,
      email: supEmail,
      category: supCategory,
      notes: supNotes,
    });
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not add supplier.' });
      return;
    }
    setSupName('');
    setSupContact('');
    setSupPhone('');
    setSupEmail('');
    setSupNotes('');
    setIsAddSupplierOpen(false);
    setBanner({ type: 'success', text: `Supplier "${res.supplier?.name}" added.` });
  };

  const handleCreatePurchaseOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const total = poQty * poUnitCost;
    const paid = poAmountPaid === '' ? total : Number(poAmountPaid);
    const res = recordSupplierPurchase({
      supplierId: poSupplierId,
      items: [{ productId: poProductId, quantity: poQty, unitCost: poUnitCost }],
      amountPaid: paid,
      paymentMethod: poPayMethod,
      dueDate: paid < total ? poDueDate : undefined,
      notes: poNotes,
    });
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not record stock purchase.' });
      return;
    }
    setIsPurchaseOrderOpen(false);
    setBanner({
      type: 'success',
      text: 'Stock purchase recorded! Product inventory quantity, cost history, and supplier balance updated.',
    });
  };

  const handlePaySupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingSupplier) return;
    const amt = Number(supPayAmount);
    const res = recordSupplierPayment({
      supplierId: payingSupplier.supplier.id,
      amount: amt,
      paymentMethod: supPayMethod,
      reference: supPayRef,
    });
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not record supplier payment.' });
      return;
    }
    setBanner({
      type: 'success',
      text: `Recorded ${formatCurrency(amt, currency)} payment to ${payingSupplier.supplier.name}.`,
    });
    setPayingSupplier(null);
    setSupPayAmount('');
    setSupPayRef('');
  };

  const buildPoliteReminderMessage = (cust: CustomerRecord, balance: number): string => {
    if (reminderLang === 'sw') {
      return `Habari ${cust.name}, salamu kutoka *${business?.name || 'Biashara Yetu'}*! Tunatumai unaendelea vyema.
Tunakukumbusha kwa upole kuhusu salio lako la *${formatCurrency(balance, currency)}* kwenye akaunti yako.
Tafadhali tujulishe utakapolipa kupitia M-Pesa au Taslimu ili tusasishe taarifa zako. Asante sana kwa kuendelea kuwa mteja wetu mwaminifu! 🙏`;
    }
    return `Hello ${cust.name}, warm greetings from *${business?.name || 'our shop'}*! We hope your week is going well.
This is a polite reminder regarding your current outstanding balance of *${formatCurrency(balance, currency)}*.
Kindly let us know when to expect settlement via M-Pesa or Cash so we can update your statement. Thank you for your continued business and support!`;
  };

  return (
    <div className="space-y-6">
      {/* Top Sub-Tab Switcher */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab('customers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              subTab === 'customers'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Customers & Credit ({customers.length})
          </button>

          <button
            type="button"
            onClick={() => setSubTab('suppliers')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              subTab === 'suppliers'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            Suppliers & Purchasing ({suppliers.length})
          </button>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'customers' ? (
            <button
              type="button"
              onClick={() => setIsAddCustomerOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setPoSupplierId(suppliers[0]?.id || '');
                  setPoProductId(products[0]?.id || '');
                  setPoUnitCost(products[0]?.purchaseCost || 0);
                  setIsPurchaseOrderOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <PackagePlus className="w-4 h-4" />
                Record Stock Purchase (Restock)
              </button>
              <button
                type="button"
                onClick={() => setIsAddSupplierOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Supplier
              </button>
            </>
          )}
        </div>
      </div>

      {banner && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
            banner.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {banner.type === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>{banner.text}</span>
          </div>
          <button type="button" onClick={() => setBanner(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {subTab === 'customers' ? (
        <div className="space-y-6">
          {/* Customer Credit Summary Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Total Outstanding Customer Credit
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-amber-900">
                {formatCurrency(totalCustomerReceivables, currency)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Calculated strictly from unpaid credit sales & invoices minus payments
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Credit Payments Collected
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-emerald-900">
                {formatCurrency(
                  customerPayments.reduce((s, p) => s + p.amount, 0),
                  currency
                )}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Across {customerPayments.length} recorded instalment(s)
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Registered Customers
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
                {customers.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {customerRows.filter((r) => r.outstandingBalance > 0).length} currently owe a
                balance
              </p>
            </div>
          </div>

          {/* Customer Directory & Credit Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search customer by name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-3">Phone & Notes</th>
                    <th className="py-3 px-3 text-right">Payments Made</th>
                    <th className="py-3 px-3 text-right">Outstanding Balance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {customerRows.map((row) => (
                    <tr key={row.customer.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{row.customer.name}</div>
                        {row.customer.email && (
                          <div className="text-xs text-slate-400">{row.customer.email}</div>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-mono text-xs text-slate-700">
                          {row.customer.phone || '—'}
                        </div>
                        {row.customer.notes && (
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {row.customer.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-800">
                        {formatCurrency(row.totalPaymentsReceived, currency)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`font-mono font-bold px-2.5 py-1 rounded-lg ${
                            row.outstandingBalance > 0
                              ? 'bg-amber-100 text-amber-950 border border-amber-300'
                              : 'bg-emerald-50 text-emerald-900'
                          }`}
                        >
                          {formatCurrency(row.outstandingBalance, currency)}
                        </span>
                        {row.overdueCount > 0 && (
                          <div className="text-[10px] font-bold text-red-600 mt-1">
                            {row.overdueCount} overdue item(s)
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {row.outstandingBalance > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setPayingCustomer({
                                  customer: row.customer,
                                  balance: row.outstandingBalance,
                                });
                                setPayAmount(String(row.outstandingBalance));
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <Wallet className="w-3.5 h-3.5" />
                              Record Payment
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setStatementCustomer(row.customer)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Statement & Reminder
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Suppliers & Purchasing Tab */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Unpaid Supplier Balances (Payables)
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-amber-900">
                {formatCurrency(totalSupplierPayables, currency)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Calculated from stock purchase orders minus supplier payments
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Stock Purchases (POs)
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
                {formatCurrency(
                  supplierPurchases.reduce((s, p) => s + p.totalAmount, 0),
                  currency
                )}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Across {supplierPurchases.length} restock order(s)
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Suppliers
              </span>
              <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
                {suppliers.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">Wholesale & distributor partners</p>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Supplier Directory & Balances</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                    <th className="py-3 px-4">Supplier & Contact</th>
                    <th className="py-3 px-3">Category & Notes</th>
                    <th className="py-3 px-3 text-right">Total Purchased</th>
                    <th className="py-3 px-3 text-right">Unpaid Balance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierRows.map((row) => (
                    <tr key={row.supplier.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{row.supplier.name}</div>
                        <div className="text-xs text-slate-500">
                          {row.supplier.contactPerson} • {row.supplier.phone}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                          {row.supplier.category}
                        </span>
                        {row.supplier.notes && (
                          <div className="text-xs text-slate-500 mt-0.5">{row.supplier.notes}</div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {formatCurrency(row.totalPurchased, currency)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`font-mono font-bold px-2.5 py-1 rounded-lg ${
                            row.outstandingBalance > 0
                              ? 'bg-amber-100 text-amber-950 border border-amber-300'
                              : 'bg-emerald-50 text-emerald-900'
                          }`}
                        >
                          {formatCurrency(row.outstandingBalance, currency)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {row.outstandingBalance > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setPayingSupplier({
                                supplier: row.supplier,
                                balance: row.outstandingBalance,
                              });
                              setSupPayAmount(String(row.outstandingBalance));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                          >
                            Pay Supplier
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Stock Purchase Orders Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">
                Recorded Stock Purchase Orders & Cost History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                    <th className="py-2.5 px-4">PO Number</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Supplier</th>
                    <th className="py-2.5 px-3">Items Restocked</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                    <th className="py-2.5 px-4 text-right">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {supplierPurchases.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                        {po.purchaseNumber}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        {formatEatDateTime(po.createdAt)}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {po.supplierName}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {po.items
                          .map(
                            (it) =>
                              `${it.productName} (+${it.quantity} @ ${formatCurrency(it.unitCost, currency)})`
                          )
                          .join(', ')}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(po.totalAmount, currency)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-emerald-900">
                        {formatCurrency(po.amountPaid, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Record Customer Credit Payment Modal */}
      {payingCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleRecordCustomerPayment}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Record Customer Payment</h3>
                <p className="text-xs text-slate-500">
                  {payingCustomer.customer.name} • Current Balance:{' '}
                  <strong>{formatCurrency(payingCustomer.balance, currency)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPayingCustomer(null)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Amount Received ({currency}) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min={1}
                  max={payingCustomer.balance}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Payment Method *
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value as typeof payMethod)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Card</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                M-Pesa / Reference Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. SJK45T99BN"
                value={payRef}
                onChange={(e) => setPayRef(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayingCustomer(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold cursor-pointer"
              >
                Save Payment & Update Balance
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Customer Statement & Polite WhatsApp Payment Reminder Modal */}
      {statementCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          {(() => {
            const bal = calculateCustomerBalance(
              statementCustomer.id,
              sales,
              documents,
              customerPayments
            );
            const custSales = sales.filter(
              (s) => s.customerId === statementCustomer.id && s.status === 'completed'
            );
            const custInvoices = documents.filter(
              (d) =>
                d.customerId === statementCustomer.id &&
                d.docType === 'invoice' &&
                d.status !== 'cancelled' &&
                d.status !== 'draft'
            );
            const custPays = customerPayments.filter(
              (p) => p.customerId === statementCustomer.id
            );
            const reminderText = buildPoliteReminderMessage(
              statementCustomer,
              bal.outstandingBalance
            );
            const waPhone = formatKenyanWhatsAppNumber(statementCustomer.phone);

            return (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-5 my-8">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Customer Account Statement — {statementCustomer.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {business?.name} • Statement Date: {formatEatDate(getEatDateString())}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatementCustomer(null)}
                    className="p-1 text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <p className="font-mono font-bold text-slate-900 mt-0.5">
                      {statementCustomer.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Payments Received:</span>
                    <p className="font-mono font-bold text-emerald-800 mt-0.5">
                      {formatCurrency(bal.totalPaymentsReceived, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Balance Due:</span>
                    <p className="font-mono font-extrabold text-amber-900 text-sm mt-0.5">
                      {formatCurrency(bal.outstandingBalance, currency)}
                    </p>
                  </div>
                </div>

                {/* Transactions List */}
                <div className="space-y-2 max-h-52 overflow-y-auto text-xs border border-slate-200 rounded-xl p-3">
                  <p className="font-bold text-slate-800 uppercase text-[11px]">
                    Sales & Invoices History
                  </p>
                  {custSales.map((s) => (
                    <div
                      key={s.id}
                      className="flex justify-between py-1.5 border-b border-slate-100"
                    >
                      <span>
                        Receipt <strong>{s.receiptNumber}</strong> ({formatEatDateTime(s.createdAt)})
                      </span>
                      <span className="font-mono">
                        Total: {formatCurrency(s.totalAmount, currency)} | Paid:{' '}
                        {formatCurrency(s.amountPaid, currency)} |{' '}
                        <strong className="text-amber-900">
                          Due: {formatCurrency(s.totalAmount - s.amountPaid, currency)}
                        </strong>
                      </span>
                    </div>
                  ))}
                  {custInvoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="flex justify-between py-1.5 border-b border-slate-100"
                    >
                      <span>
                        Invoice <strong>{inv.docNumber}</strong> (Due: {formatEatDate(inv.dueOrExpiryDate)})
                      </span>
                      <span className="font-mono">
                        Total: {formatCurrency(inv.totalAmount, currency)} | Paid:{' '}
                        {formatCurrency(inv.amountPaid, currency)} |{' '}
                        <strong className="text-amber-900">
                          Due: {formatCurrency(inv.totalAmount - inv.amountPaid, currency)}
                        </strong>
                      </span>
                    </div>
                  ))}
                  {custPays.length > 0 && (
                    <div className="pt-2">
                      <p className="font-bold text-emerald-900 uppercase text-[11px]">
                        Recorded Credit Payments
                      </p>
                      {custPays.map((p) => (
                        <div key={p.id} className="flex justify-between py-1 text-emerald-800">
                          <span>
                            {formatEatDateTime(p.recordedAt)} ({p.paymentMethod.toUpperCase()}{' '}
                            {p.reference || ''})
                          </span>
                          <span className="font-mono font-bold">
                            +{formatCurrency(p.amount, currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Polite Payment Reminder Box */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3 print:hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-800" />
                      Polite Payment Reminder (Review Before Sending)
                    </span>
                    <div className="inline-flex rounded-lg bg-white border border-amber-300 p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setReminderLang('en')}
                        className={`px-2 py-0.5 rounded font-semibold ${
                          reminderLang === 'en' ? 'bg-emerald-900 text-white' : 'text-slate-700'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setReminderLang('sw')}
                        className={`px-2 py-0.5 rounded font-semibold ${
                          reminderLang === 'sw' ? 'bg-emerald-900 text-white' : 'text-slate-700'
                        }`}
                      >
                        Kiswahili
                      </button>
                    </div>
                  </div>

                  <textarea
                    readOnly
                    rows={4}
                    value={reminderText}
                    className="w-full p-2.5 text-xs rounded-lg border border-amber-300 bg-white text-slate-800"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(reminderText);
                          setCopiedReminder(true);
                          setTimeout(() => setCopiedReminder(false), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-800 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedReminder ? 'Copied!' : 'Copy Message'}
                      </button>

                      {waPhone && (
                        <a
                          href={`https://wa.me/${waPhone}?text=${encodeURIComponent(reminderText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open in WhatsApp
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Statement
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddCustomer}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">Add New Customer</h3>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Mama Brian Catering"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="0721 456 789"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={custEmail}
                  onChange={(e) => setCustEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Notes
              </label>
              <input
                type="text"
                placeholder="Credit terms or delivery address"
                value={custNotes}
                onChange={(e) => setCustNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddCustomerOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold"
              >
                Save Customer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Supplier Modal */}
      {isAddSupplierOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSupplier}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">Add Supplier</h3>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Supplier / Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eastleigh Prime Distributors"
                value={supName}
                onChange={(e) => setSupName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={supContact}
                  onChange={(e) => setSupContact(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={supPhone}
                  onChange={(e) => setSupPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Notes / Payment Terms
              </label>
              <input
                type="text"
                placeholder="e.g. Delivers Tuesdays, M-Pesa Till 123456"
                value={supNotes}
                onChange={(e) => setSupNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddSupplierOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold"
              >
                Save Supplier
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Record Supplier Purchase Order (Restock) Modal */}
      {isPurchaseOrderOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreatePurchaseOrder}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Record Supplier Stock Purchase (Restock)
                </h3>
                <p className="text-xs text-slate-500">
                  Automatically updates product stock, unit cost history, and supplier balance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPurchaseOrderOpen(false)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Select Supplier *
              </label>
              <select
                required
                value={poSupplierId}
                onChange={(e) => setPoSupplierId(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="">Choose supplier...</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Product Being Restocked *
              </label>
              <select
                required
                value={poProductId}
                onChange={(e) => {
                  setPoProductId(e.target.value);
                  const found = products.find((p) => p.id === e.target.value);
                  if (found) setPoUnitCost(found.purchaseCost);
                }}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="">Choose product...</option>
                {products
                  .filter((p) => !p.isArchived)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (In stock: {p.stockQuantity} {p.unit})
                    </option>
                  ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={poQty}
                  onChange={(e) => setPoQty(Math.max(1, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 text-sm font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Unit Cost ({currency}) *
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  required
                  value={poUnitCost}
                  onChange={(e) => setPoUnitCost(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 text-sm font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase text-slate-500">
                  Order Total
                </span>
                <p className="mt-2 font-mono font-bold text-sm text-slate-900">
                  {formatCurrency(poQty * poUnitCost, currency)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Amount Paid Now ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  max={poQty * poUnitCost}
                  placeholder={String(poQty * poUnitCost)}
                  value={poAmountPaid}
                  onChange={(e) => setPoAmountPaid(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                />
                <span className="text-[10px] text-slate-500">
                  Leave blank if paid in full, or enter partial amount for supplier credit.
                </span>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={poPayMethod}
                  onChange={(e) => setPoPayMethod(e.target.value as typeof poPayMethod)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPurchaseOrderOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold cursor-pointer"
              >
                Complete Restock & Update Inventory
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Pay Supplier Modal */}
      {payingSupplier && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handlePaySupplier}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">
              Record Payment to {payingSupplier.supplier.name}
            </h3>
            <p className="text-xs text-slate-500">
              Unpaid Supplier Balance:{' '}
              <strong>{formatCurrency(payingSupplier.balance, currency)}</strong>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Amount Paid ({currency}) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={payingSupplier.balance}
                  value={supPayAmount}
                  onChange={(e) => setSupPayAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Method
                </label>
                <select
                  value={supPayMethod}
                  onChange={(e) => setSupPayMethod(e.target.value as typeof supPayMethod)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="mpesa">M-Pesa</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPayingSupplier(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold"
              >
                Save Supplier Payment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
