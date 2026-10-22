import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Printer,
  Copy,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCcw,
  History,
  UserPlus,
  Info,
} from 'lucide-react';
import { PaymentMethod, Product, SaleRecord } from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  formatCurrency,
  formatEatDateTime,
  getEatDateString,
} from '../../utils/bizpilotFinance.js';

interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export const SalesAndPosView: React.FC = () => {
  const {
    business,
    products,
    customers,
    sales,
    recordSale,
    cancelSale,
    createCustomer,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';

  const [subTab, setSubTab] = useState<'pos' | 'history'>('pos');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // POS Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [paymentReference, setPaymentReference] = useState<string>('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [amountPaidInput, setAmountPaidInput] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(() => {
    const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return getEatDateString(d);
  });
  const [saleNotes, setSaleNotes] = useState<string>('');
  const [idempotencyKey, setIdempotencyKey] = useState<string>(
    () => `idem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  );

  // Quick Add Customer Modal in POS
  const [isQuickCustOpen, setIsQuickCustOpen] = useState(false);
  const [quickCustName, setQuickCustName] = useState('');
  const [quickCustPhone, setQuickCustPhone] = useState('');

  // Receipt & Cancellation Modals
  const [activeReceipt, setActiveReceipt] = useState<SaleRecord | null>(null);
  const [cancellingSale, setCancellingSale] = useState<SaleRecord | null>(null);
  const [cancelReason, setCancelReason] = useState('Customer return / refund');
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [posBanner, setPosBanner] = useState<{
    type: 'success' | 'error' | 'warning';
    text: string;
  } | null>(null);

  // History search & date filter
  const [historySearch, setHistorySearch] = useState('');
  const [historyDateFilter, setHistoryDateFilter] = useState('');

  const activeProducts = useMemo(
    () => products.filter((p) => !p.isArchived),
    [products]
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of activeProducts) {
      if (p.category) set.add(p.category);
    }
    return Array.from(set);
  }, [activeProducts]);

  const filteredPosProducts = useMemo(() => {
    return activeProducts.filter((p) => {
      if (categoryFilter !== 'ALL' && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeProducts, categoryFilter, searchQuery]);

  // Cart Calculations
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    [cart]
  );
  const safeDiscount = Math.max(0, Math.min(subtotal, discountAmount || 0));
  const taxableAmount = Math.max(0, subtotal - safeDiscount);
  const taxAmount = business?.taxEnabled
    ? Math.round(taxableAmount * ((business.taxRate || 0) / 100) * 100) / 100
    : 0;
  const totalAmount = Math.round((taxableAmount + taxAmount) * 100) / 100;

  const addToCart = (prod: Product) => {
    setPosBanner(null);
    setCart((prev) => {
      const existing = prev.find((it) => it.product.id === prod.id);
      const nextQty = existing ? existing.quantity + 1 : 1;
      if (nextQty > prod.stockQuantity && !business?.allowNegativeStock) {
        setPosBanner({
          type: 'error',
          text: `Only ${prod.stockQuantity} ${prod.unit} of "${prod.name}" available in stock.`,
        });
        return prev;
      }
      if (existing) {
        return prev.map((it) =>
          it.product.id === prod.id ? { ...it, quantity: nextQty } : it
        );
      }
      return [...prev, { product: prod, quantity: 1, unitPrice: prod.sellingPrice }];
    });
  };

  const updateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((it) => it.product.id !== productId));
      return;
    }
    const target = cart.find((it) => it.product.id === productId);
    if (target && newQty > target.product.stockQuantity && !business?.allowNegativeStock) {
      setPosBanner({
        type: 'error',
        text: `Cannot exceed available stock (${target.product.stockQuantity} ${target.product.unit}) for "${target.product.name}".`,
      });
      return;
    }
    setCart((prev) =>
      prev.map((it) =>
        it.product.id === productId ? { ...it, quantity: newQty } : it
      )
    );
  };

  const handleCompleteSale = (e: React.FormEvent) => {
    e.preventDefault();
    setPosBanner(null);

    const parsedPaid =
      paymentMethod === 'credit'
        ? Number(amountPaidInput || 0)
        : amountPaidInput !== ''
          ? Number(amountPaidInput)
          : totalAmount;

    const res = recordSale({
      idempotencyKey,
      customerId: selectedCustomerId || undefined,
      items: cart.map((c) => ({
        productId: c.product.id,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
      })),
      discountAmount: safeDiscount,
      paymentMethod,
      paymentReference: paymentReference.trim() || undefined,
      amountPaid: parsedPaid,
      dueDate: paymentMethod === 'credit' || parsedPaid < totalAmount ? dueDate : undefined,
      notes: saleNotes.trim() || undefined,
    });

    if (!res.ok) {
      setPosBanner({ type: 'error', text: res.error || 'Failed to record sale.' });
      return;
    }

    // Reset cart & rotate idempotency key for next sale
    setCart([]);
    setDiscountAmount(0);
    setPaymentReference('');
    setAmountPaidInput('');
    setSaleNotes('');
    setIdempotencyKey(`idem_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);

    if (res.sale) {
      setActiveReceipt(res.sale);
    }
    setPosBanner({
      type: res.warning ? 'warning' : 'success',
      text:
        res.warning ||
        `Sale recorded! Official Receipt ${res.sale?.receiptNumber} generated.`,
    });
  };

  const handleQuickAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createCustomer({
      name: quickCustName,
      phone: quickCustPhone,
      email: '',
      notes: 'Added during POS checkout',
    });
    if (res.ok && res.customer) {
      setSelectedCustomerId(res.customer.id);
      setQuickCustName('');
      setQuickCustPhone('');
      setIsQuickCustOpen(false);
    }
  };

  const handleConfirmCancelSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingSale) return;
    const res = cancelSale(cancellingSale.id, cancelReason);
    if (res.ok) {
      setPosBanner({
        type: 'success',
        text: `Receipt ${cancellingSale.receiptNumber} cancelled and stock quantities restored to inventory.`,
      });
    } else {
      setPosBanner({ type: 'error', text: res.error || 'Could not cancel sale.' });
    }
    setCancellingSale(null);
  };

  const buildWhatsAppReceiptText = (sale: SaleRecord): string => {
    const itemsLines = sale.items
      .map(
        (it) =>
          `• ${it.productName} x${it.quantity} @ ${formatCurrency(it.unitPrice, currency)} = ${formatCurrency(it.lineTotal, currency)}`
      )
      .join('\n');
    const unpaid = Math.max(0, sale.totalAmount - sale.amountPaid);

    return `*${business?.name || 'BizPilot KE'} — Official Receipt*
Receipt No: ${sale.receiptNumber}
Date: ${formatEatDateTime(sale.createdAt)}
Customer: ${sale.customerName}
--------------------------------
${itemsLines}
--------------------------------
Subtotal: ${formatCurrency(sale.subtotal, currency)}${
      sale.discountAmount > 0
        ? `\nDiscount: -${formatCurrency(sale.discountAmount, currency)}`
        : ''
    }${
      sale.taxAmount > 0
        ? `\n${business?.taxName || 'VAT'}: ${formatCurrency(sale.taxAmount, currency)}`
        : ''
    }
*Total: ${formatCurrency(sale.totalAmount, currency)}*
Paid (${sale.paymentMethod.toUpperCase()}): ${formatCurrency(sale.amountPaid, currency)}${
      unpaid > 0 ? `\n*Balance Due: ${formatCurrency(unpaid, currency)}*` : ''
    }
${business?.receiptFooter || 'Asante kwa kununua nasi!'}`;
  };

  const handleCopyReceipt = (sale: SaleRecord) => {
    navigator.clipboard.writeText(buildWhatsAppReceiptText(sale));
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  const filteredSalesHistory = useMemo(() => {
    return sales.filter((s) => {
      if (historyDateFilter) {
        const saleEatDay = getEatDateString(new Date(s.createdAt));
        if (saleEatDay !== historyDateFilter) return false;
      }
      if (historySearch.trim()) {
        const q = historySearch.toLowerCase();
        return (
          s.receiptNumber.toLowerCase().includes(q) ||
          s.customerName.toLowerCase().includes(q) ||
          (s.paymentReference || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [sales, historyDateFilter, historySearch]);

  return (
    <div className="space-y-6">
      {/* Sub-navigation: POS Register vs Sales History */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab('pos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              subTab === 'pos'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Point of Sale (New Sale)
          </button>

          <button
            type="button"
            onClick={() => setSubTab('history')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${
              subTab === 'history'
                ? 'bg-emerald-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            Sales History & Receipts ({sales.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span>Stock updates automatically when a sale is completed or refunded.</span>
        </div>
      </div>

      {posBanner && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
            posBanner.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-900'
              : posBanner.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {posBanner.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{posBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setPosBanner(null)}
            className="p-1 hover:bg-black/5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {subTab === 'pos' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Product Selector Grid */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search product by name or scan SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
              >
                <option value="ALL">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {filteredPosProducts.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl">
                <p className="text-sm font-semibold text-slate-700">
                  No active products available
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Add products in the Products & Inventory tab first.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1">
                {filteredPosProducts.map((prod) => {
                  const isOut = prod.stockQuantity <= 0;
                  const inCart = cart.find((c) => c.product.id === prod.id);
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      disabled={isOut && !business?.allowNegativeStock}
                      onClick={() => addToCart(prod)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isOut && !business?.allowNegativeStock
                          ? 'opacity-50 bg-slate-50 border-slate-200 cursor-not-allowed'
                          : inCart
                            ? 'border-emerald-800 bg-emerald-50/40 ring-1 ring-emerald-800/20'
                            : 'border-slate-200 hover:border-emerald-800 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                            {prod.name}
                          </span>
                          {inCart && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-900 text-white text-[11px] font-bold shrink-0">
                              {inCart.quantity} in cart
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          {prod.sku} • {prod.category}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm font-extrabold font-mono text-emerald-950">
                          {formatCurrency(prod.sellingPrice, currency)}
                        </span>
                        <span
                          className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                            isOut
                              ? 'bg-red-100 text-red-800'
                              : prod.stockQuantity <= prod.lowStockThreshold
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {isOut ? 'Out of stock' : `${prod.stockQuantity} ${prod.unit}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right 5 Columns: Cart & Checkout Register */}
          <form
            onSubmit={handleCompleteSale}
            className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-900" />
                Current Sale Register
              </h2>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-10 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <ShoppingCart className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">
                  Tap any product on the left to add it to this sale
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="py-2.5 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                      <p className="font-mono text-slate-500">
                        {formatCurrency(item.unitPrice, currency)} × {item.quantity} ={' '}
                        <strong className="text-slate-900">
                          {formatCurrency(item.unitPrice * item.quantity, currency)}
                        </strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartQty(item.product.id, Math.max(1, Number(e.target.value)))
                        }
                        className="w-12 text-center font-mono font-bold py-1 rounded-lg border border-slate-300"
                      />
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCartQty(item.product.id, 0)}
                        className="p-1.5 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discount & Totals Summary */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatCurrency(subtotal, currency)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <label className="text-slate-600">Authorized Discount ({currency}):</label>
                <input
                  type="number"
                  min={0}
                  max={subtotal}
                  step="1"
                  value={discountAmount || ''}
                  placeholder="0"
                  onChange={(e) => setDiscountAmount(Math.max(0, Number(e.target.value)))}
                  className="w-28 px-2.5 py-1 text-right font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {business?.taxEnabled && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>
                    {business.taxName} ({business.taxRate}%):
                  </span>
                  <span className="font-mono">{formatCurrency(taxAmount, currency)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-slate-900">
                <span>Total Payable:</span>
                <span className="font-mono text-base text-emerald-900">
                  {formatCurrency(totalAmount, currency)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Payment Method *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {(
                  [
                    { id: 'mpesa', label: 'M-Pesa' },
                    { id: 'cash', label: 'Cash' },
                    { id: 'bank_transfer', label: 'Bank' },
                    { id: 'card', label: 'Card' },
                    { id: 'credit', label: 'Credit' },
                  ] as Array<{ id: PaymentMethod; label: string }>
                ).map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
              {paymentMethod === 'mpesa' && (
                <p className="mt-1.5 text-[11px] text-slate-500">
                  Recordkeeping mode: Enter optional M-Pesa confirmation code below after verifying
                  payment on your Till/Paybill phone.
                </p>
              )}
            </div>

            {/* Customer Selection & Payment Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold uppercase text-slate-700">
                    Customer {paymentMethod === 'credit' ? '*' : '(Optional)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsQuickCustOpen(true)}
                    className="text-[11px] font-semibold text-emerald-900 hover:underline inline-flex items-center gap-0.5"
                  >
                    <UserPlus className="w-3 h-3" /> New
                  </button>
                </div>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.phone ? `(${c.phone})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  {paymentMethod === 'mpesa' ? 'M-Pesa Code (Optional)' : 'Ref / Note'}
                </label>
                <input
                  type="text"
                  placeholder={paymentMethod === 'mpesa' ? 'e.g. SJM10P88QA' : 'Optional ref'}
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Credit Deposit & Due Date */}
            {paymentMethod === 'credit' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    Initial Deposit Paid ({currency})
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={totalAmount}
                    placeholder="0"
                    value={amountPaidInput}
                    onChange={(e) => setAmountPaidInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 font-mono rounded-lg border border-amber-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-amber-950 mb-1">
                    Balance Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 font-mono rounded-lg border border-amber-300 bg-white"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={cart.length === 0}
              className="w-full py-3 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              Complete Sale & Generate Receipt ({formatCurrency(totalAmount, currency)})
            </button>
          </form>
        </div>
      ) : (
        /* Sales History & Refund Tab */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by receipt number, customer, or M-Pesa ref..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="date"
                value={historyDateFilter}
                onChange={(e) => setHistoryDateFilter(e.target.value)}
                className="px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
              />
              {historyDateFilter && (
                <button
                  type="button"
                  onClick={() => setHistoryDateFilter('')}
                  className="text-xs text-slate-500 hover:text-slate-900"
                >
                  Clear Date
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-3">Date & Time (EAT)</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Payment Method</th>
                  <th className="py-3 px-3 text-right">Total</th>
                  <th className="py-3 px-3 text-right">Paid</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSalesHistory.map((sale) => (
                  <tr
                    key={sale.id}
                    className={
                      sale.status === 'cancelled'
                        ? 'bg-red-50/40 opacity-70'
                        : 'hover:bg-slate-50'
                    }
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {sale.receiptNumber}
                      {sale.status === 'cancelled' && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-sans uppercase">
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">
                      {formatEatDateTime(sale.createdAt)}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      {sale.customerName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="uppercase font-semibold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        {sale.paymentMethod}
                      </span>
                      {sale.paymentReference && (
                        <span className="ml-1.5 font-mono text-xs text-slate-500">
                          ({sale.paymentReference})
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(sale.totalAmount, currency)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-emerald-900">
                      {formatCurrency(sale.amountPaid, currency)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActiveReceipt(sale)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 cursor-pointer"
                        >
                          Receipt
                        </button>
                        {sale.status === 'completed' && (
                          <button
                            type="button"
                            onClick={() => setCancellingSale(sale)}
                            className="px-2 py-1 rounded-lg border border-red-200 hover:bg-red-50 text-red-700 text-xs font-medium cursor-pointer"
                            title="Cancel / Refund & Restore Stock"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Printable Official Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 print:hidden">
              <span className="text-sm font-bold text-slate-900">
                Official Sales Receipt
              </span>
              <button
                type="button"
                onClick={() => setActiveReceipt(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Receipt Content */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 font-mono text-xs space-y-3">
              <div className="text-center border-b border-dashed border-slate-300 pb-3">
                <h3 className="text-base font-extrabold font-sans text-slate-900">
                  {business?.name}
                </h3>
                <p className="text-[11px] font-sans text-slate-600">
                  {business?.countyTown} {business?.phone ? `• Tel: ${business.phone}` : ''}
                </p>
                {business?.kraPinOptional && (
                  <p className="text-[11px] text-slate-500">PIN: {business.kraPinOptional}</p>
                )}
                <p className="mt-2 font-bold text-slate-900">
                  RECEIPT: {activeReceipt.receiptNumber}
                </p>
                <p className="text-[11px] text-slate-500">
                  {formatEatDateTime(activeReceipt.createdAt)} (EAT)
                </p>
                <p className="text-[11px] text-slate-700 mt-0.5">
                  Customer: {activeReceipt.customerName}
                </p>
              </div>

              <div className="space-y-1.5 border-b border-dashed border-slate-300 pb-3">
                {activeReceipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900">{item.productName}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.quantity} × {formatCurrency(item.unitPrice, currency)}
                      </div>
                    </div>
                    <div className="font-bold text-slate-900">
                      {formatCurrency(item.lineTotal, currency)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1 border-b border-dashed border-slate-300 pb-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(activeReceipt.subtotal, currency)}</span>
                </div>
                {activeReceipt.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Discount:</span>
                    <span>-{formatCurrency(activeReceipt.discountAmount, currency)}</span>
                  </div>
                )}
                {activeReceipt.taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span>{business?.taxName || 'VAT'}:</span>
                    <span>{formatCurrency(activeReceipt.taxAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1">
                  <span>TOTAL:</span>
                  <span>{formatCurrency(activeReceipt.totalAmount, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid ({activeReceipt.paymentMethod.toUpperCase()}):</span>
                  <span>{formatCurrency(activeReceipt.amountPaid, currency)}</span>
                </div>
                {activeReceipt.totalAmount > activeReceipt.amountPaid && (
                  <div className="flex justify-between font-bold text-amber-900">
                    <span>Balance Due:</span>
                    <span>
                      {formatCurrency(
                        activeReceipt.totalAmount - activeReceipt.amountPaid,
                        currency
                      )}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-center text-[11px] font-sans text-slate-500 leading-relaxed">
                {business?.receiptFooter}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 print:hidden">
              <button
                type="button"
                onClick={() => handleCopyReceipt(activeReceipt)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedReceipt ? 'Copied for WhatsApp!' : 'Copy WhatsApp Receipt'}
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel / Refund Sale Confirmation Modal */}
      {cancellingSale && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmCancelSale}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4"
          >
            <h3 className="text-base font-bold text-slate-900">
              Cancel & Refund Receipt {cancellingSale.receiptNumber}?
            </h3>
            <p className="text-xs text-slate-600">
              Cancelling this sale will automatically restore all sold item quantities back to your
              inventory and log a reversal entry in the Stock Audit History.
            </p>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Cancellation Reason *
              </label>
              <input
                type="text"
                required
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancellingSale(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Keep Sale
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
              >
                Confirm Refund & Restore Stock
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quick Add Customer Modal */}
      {isQuickCustOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleQuickAddCustomer}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-5 space-y-4"
          >
            <h3 className="text-sm font-bold text-slate-900">Quick Add Customer</h3>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Peter Njuguna"
                value={quickCustName}
                onChange={(e) => setQuickCustName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="e.g. 0722 123 456"
                value={quickCustPhone}
                onChange={(e) => setQuickCustPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsQuickCustOpen(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-semibold"
              >
                Add & Select
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
