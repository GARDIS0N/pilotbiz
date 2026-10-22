import React, { useState, useMemo } from 'react';
import {
  FileText,
  Plus,
  Printer,
  ArrowRightLeft,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Info,
  Lock,
} from 'lucide-react';
import {
  BusinessDocument,
  DocumentLineItem,
  DocumentStatus,
  DocumentType,
  SUBSCRIPTION_PLANS,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  formatCurrency,
  formatEatDate,
  getEatDateString,
} from '../../utils/bizpilotFinance.js';

export const InvoicesAndQuotationsView: React.FC = () => {
  const {
    business,
    customers,
    products,
    documents,
    createDocument,
    updateDocumentStatus,
    convertQuotationToInvoice,
    updateBusinessSettings,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';
  const planConfig = SUBSCRIPTION_PLANS[business?.subscriptionPlan || 'GROWTH'];

  const [filterType, setFilterType] = useState<'ALL' | 'invoice' | 'quotation'>('ALL');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [docType, setDocType] = useState<DocumentType>('quotation');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [issueDate, setIssueDate] = useState(() => getEatDateString());
  const [dueOrExpiryDate, setDueOrExpiryDate] = useState(() =>
    getEatDateString(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
  );
  const [taxRate, setTaxRate] = useState<number>(
    business?.taxEnabled ? business.taxRate : 0
  );
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [docNotes, setDocNotes] = useState('');
  const [lineItems, setLineItems] = useState<DocumentLineItem[]>([
    {
      id: 'item_1',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      lineTotal: 0,
    },
  ]);

  // Viewing a document NEVER marks it as paid automatically
  const [viewingDocument, setViewingDocument] = useState<BusinessDocument | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const filteredDocuments = useMemo(() => {
    return documents.filter((d) => {
      if (filterType !== 'ALL' && d.docType !== filterType) return false;
      return true;
    });
  }, [documents, filterType]);

  if (!planConfig.features.invoicesAndQuotations) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-xl mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Professional Invoices & Quotations
        </h2>
        <p className="text-sm text-slate-600">
          Upgrade to <strong>Biashara Starter (KSh 499/mo)</strong> or{' '}
          <strong>Biashara Growth (KSh 999/mo)</strong> to generate formal Quotations and
          Invoices with 1-click conversion.
        </p>
        <button
          type="button"
          onClick={() => updateBusinessSettings({ subscriptionPlan: 'STARTER' })}
          className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white text-sm font-semibold cursor-pointer"
        >
          Upgrade to Biashara Starter
        </button>
      </div>
    );
  }

  const updateLineItem = (idx: number, patch: Partial<DocumentLineItem>) => {
    setLineItems((prev) =>
      prev.map((it, i) => {
        if (i !== idx) return it;
        const next = { ...it, ...patch };
        next.lineTotal = Math.max(0, next.quantity * next.unitPrice - (next.discount || 0));
        return next;
      })
    );
  };

  const addLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: `item_${Date.now()}_${prev.length}`,
        description: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        lineTotal: 0,
      },
    ]);
  };

  const removeLineItem = (idx: number) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const subtotal = lineItems.reduce((s, it) => s + it.lineTotal, 0);
  const taxable = Math.max(0, subtotal - (discountAmount || 0));
  const taxTotal = Math.round(taxable * ((taxRate || 0) / 100) * 100) / 100;
  const grandTotal = Math.round((taxable + taxTotal) * 100) / 100;

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);

    const validItems = lineItems.filter(
      (it) => it.description.trim().length > 0 && it.quantity > 0
    );
    if (validItems.length === 0) {
      setBanner({
        type: 'error',
        text: 'Please enter a description and quantity for at least one line item.',
      });
      return;
    }

    const res = createDocument({
      docType,
      customerId: selectedCustomerId || undefined,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items: validItems,
      discountAmount,
      taxRate,
      issueDate,
      dueOrExpiryDate,
      status: 'sent',
      notes: docNotes,
    });

    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Could not create document.' });
      return;
    }

    setIsCreatorOpen(false);
    setBanner({
      type: 'success',
      text: `Created ${docType === 'quotation' ? 'Quotation' : 'Invoice'} ${res.document?.docNumber}.`,
    });
    if (res.document) {
      setViewingDocument(res.document);
    }
  };

  const handleConvertQuote = (quoteId: string) => {
    const res = convertQuotationToInvoice(quoteId);
    if (!res.ok) {
      setBanner({ type: 'error', text: res.error || 'Conversion failed.' });
      return;
    }
    setBanner({
      type: 'success',
      text: `Quotation converted to Invoice ${res.invoice?.docNumber} without duplicating records!`,
    });
    if (res.invoice) {
      setViewingDocument(res.invoice);
    }
  };

  const statusBadgeClass = (status: DocumentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'accepted':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'partially_paid':
      case 'sent':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-slate-200 text-slate-600 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Invoices & Quotations</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate formal quotations and invoices, track payment status, and convert accepted
            quotes into invoices in 1 click.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDocType('quotation');
              setCustomerName('');
              setCustomerPhone('');
              setSelectedCustomerId('');
              setIsCreatorOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl border border-emerald-800 text-emerald-900 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Quotation
          </button>
          <button
            type="button"
            onClick={() => {
              setDocType('invoice');
              setCustomerName('');
              setCustomerPhone('');
              setSelectedCustomerId('');
              setIsCreatorOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Invoice
          </button>
        </div>
      </div>

      {/* Transparent Tax & KRA Advisory Notice */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" />
        <span>
          <strong>Transparent Tax Notice:</strong> Tax rates on quotations and invoices are
          configurable for your business convenience. BizPilot KE provides transparent arithmetic
          calculations and does not independently guarantee KRA eTIMS/tax compliance — please
          verify your statutory tax obligations with a qualified advisor.
        </span>
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

      {/* Documents List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            {(
              [
                { id: 'ALL', label: `All Documents (${documents.length})` },
                {
                  id: 'invoice',
                  label: `Invoices (${documents.filter((d) => d.docType === 'invoice').length})`,
                },
                {
                  id: 'quotation',
                  label: `Quotations (${documents.filter((d) => d.docType === 'quotation').length})`,
                },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  filterType === t.id
                    ? 'bg-emerald-900 text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                <th className="py-3 px-4">Document #</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Issue / Due Date</th>
                <th className="py-3 px-3 text-right">Total</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {doc.docNumber}
                  </td>
                  <td className="py-3 px-3 uppercase text-xs font-semibold text-slate-600">
                    {doc.docType}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900">
                    {doc.customerName}
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-500">
                    <div>Issued: {formatEatDate(doc.issueDate)}</div>
                    <div>
                      {doc.docType === 'quotation' ? 'Expires' : 'Due'}:{' '}
                      {formatEatDate(doc.dueOrExpiryDate)}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    <div>{formatCurrency(doc.totalAmount, currency)}</div>
                    {doc.docType === 'invoice' && doc.amountPaid > 0 && (
                      <div className="text-[11px] text-emerald-800">
                        Paid: {formatCurrency(doc.amountPaid, currency)}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <select
                      aria-label={`Status for ${doc.docNumber}`}
                      value={doc.status}
                      onChange={(e) =>
                        updateDocumentStatus(doc.id, e.target.value as DocumentStatus)
                      }
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border cursor-pointer ${statusBadgeClass(
                        doc.status
                      )}`}
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      {doc.docType === 'quotation' && (
                        <option value="accepted">Accepted</option>
                      )}
                      {doc.docType === 'invoice' && (
                        <>
                          <option value="partially_paid">Partially Paid</option>
                          <option value="paid">Paid</option>
                          <option value="overdue">Overdue</option>
                        </>
                      )}
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setViewingDocument(doc)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer"
                      >
                        View / Print
                      </button>
                      {doc.docType === 'quotation' && !doc.convertedToInvoiceId && (
                        <button
                          type="button"
                          onClick={() => handleConvertQuote(doc.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          title="Convert Quotation to Invoice"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5" />
                          To Invoice
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

      {/* Create Quotation / Invoice Modal */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <form
            onSubmit={handleSaveDocument}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 space-y-4 my-8"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Create New {docType === 'quotation' ? 'Quotation' : 'Invoice'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                className="p-1 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Select Saved Customer
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => {
                    setSelectedCustomerId(e.target.value);
                    const found = customers.find((c) => c.id === e.target.value);
                    if (found) {
                      setCustomerName(found.name);
                      setCustomerPhone(found.phone);
                    }
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                >
                  <option value="">Custom / New Client</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Client or company name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  {docType === 'quotation' ? 'Expiry Date *' : 'Due Date *'}
                </label>
                <input
                  type="date"
                  required
                  value={dueOrExpiryDate}
                  onChange={(e) => setDueOrExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase text-slate-700">
                  Product or Service Line Items
                </label>
                <button
                  type="button"
                  onClick={addLineItem}
                  className="text-xs font-semibold text-emerald-900 hover:underline"
                >
                  + Add Line Item
                </button>
              </div>

              {lineItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs"
                >
                  <div className="col-span-5">
                    <input
                      type="text"
                      list="bp-doc-products"
                      placeholder="Product or service description"
                      value={item.description}
                      onChange={(e) => {
                        const val = e.target.value;
                        const matched = products.find((p) => p.name === val);
                        if (matched) {
                          updateLineItem(idx, {
                            productId: matched.id,
                            description: matched.name,
                            unitPrice: matched.sellingPrice,
                          });
                        } else {
                          updateLineItem(idx, { description: val });
                        }
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={1}
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(idx, { quantity: Math.max(1, Number(e.target.value)) })
                      }
                      className="w-full px-2 py-1.5 font-mono rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="Price"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(idx, { unitPrice: Math.max(0, Number(e.target.value)) })
                      }
                      className="w-full px-2 py-1.5 font-mono rounded-lg border border-slate-300 bg-white"
                    />
                  </div>
                  <div className="col-span-2 text-right font-mono font-bold text-slate-900">
                    {formatCurrency(item.lineTotal, currency)}
                  </div>
                  <div className="col-span-1 text-right">
                    <button
                      type="button"
                      onClick={() => removeLineItem(idx)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <datalist id="bp-doc-products">
                {products
                  .filter((p) => !p.isArchived)
                  .map((p) => (
                    <option key={p.id} value={p.name} />
                  ))}
              </datalist>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Discount ({currency})
                </label>
                <input
                  type="number"
                  min={0}
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={taxRate}
                  onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value)))}
                  className="w-full px-2.5 py-1.5 font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div className="flex flex-col justify-center text-right">
                <span className="text-slate-500">Document Total:</span>
                <span className="text-base font-extrabold font-mono text-emerald-950">
                  {formatCurrency(grandTotal, currency)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold cursor-pointer"
              >
                Save & Generate {docType === 'quotation' ? 'Quotation' : 'Invoice'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Printable Quotation / Invoice View Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-900 text-white">
                  {viewingDocument.docType.toUpperCase()}
                </span>
                <h2 className="mt-2 text-xl font-extrabold font-mono text-slate-900">
                  {viewingDocument.docNumber}
                </h2>
              </div>
              <div className="text-right">
                <h3 className="text-base font-bold text-slate-900">{business?.name}</h3>
                <p className="text-xs text-slate-500">
                  {business?.countyTown} • {business?.phone}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-500 uppercase font-semibold">Prepared For:</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {viewingDocument.customerName}
                </p>
                {viewingDocument.customerPhone && (
                  <p className="text-slate-600">{viewingDocument.customerPhone}</p>
                )}
              </div>
              <div className="text-right space-y-1">
                <p>
                  <span className="text-slate-500">Issue Date:</span>{' '}
                  <strong>{formatEatDate(viewingDocument.issueDate)}</strong>
                </p>
                <p>
                  <span className="text-slate-500">
                    {viewingDocument.docType === 'quotation' ? 'Valid Until:' : 'Due Date:'}
                  </span>{' '}
                  <strong>{formatEatDate(viewingDocument.dueOrExpiryDate)}</strong>
                </p>
                <p>
                  <span className="text-slate-500">Status:</span>{' '}
                  <strong className="uppercase">{viewingDocument.status}</strong>
                </p>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {viewingDocument.items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-2.5 font-medium text-slate-900">{it.description}</td>
                    <td className="py-2.5 text-right font-mono">{it.quantity}</td>
                    <td className="py-2.5 text-right font-mono">
                      {formatCurrency(it.unitPrice, currency)}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(it.lineTotal, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-slate-200 pt-3 flex flex-col items-end space-y-1 text-xs font-mono">
              <div>Subtotal: {formatCurrency(viewingDocument.subtotal, currency)}</div>
              {viewingDocument.discountAmount > 0 && (
                <div className="text-emerald-800">
                  Discount: -{formatCurrency(viewingDocument.discountAmount, currency)}
                </div>
              )}
              {viewingDocument.taxAmount > 0 && (
                <div>
                  Tax ({viewingDocument.taxRate}%):{' '}
                  {formatCurrency(viewingDocument.taxAmount, currency)}
                </div>
              )}
              <div className="text-base font-extrabold text-slate-900 pt-1">
                Total: {formatCurrency(viewingDocument.totalAmount, currency)}
              </div>
              {viewingDocument.docType === 'invoice' && (
                <div className="text-amber-900 font-bold">
                  Balance Due:{' '}
                  {formatCurrency(
                    Math.max(0, viewingDocument.totalAmount - viewingDocument.amountPaid),
                    currency
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 print:hidden">
              <button
                type="button"
                onClick={() => setViewingDocument(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                {viewingDocument.docType === 'quotation' &&
                  !viewingDocument.convertedToInvoiceId && (
                    <button
                      type="button"
                      onClick={() => handleConvertQuote(viewingDocument.id)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      Convert to Invoice
                    </button>
                  )}
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
        </div>
      )}
    </div>
  );
};
