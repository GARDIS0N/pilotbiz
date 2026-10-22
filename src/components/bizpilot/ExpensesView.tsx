import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Wallet,
  Plus,
  Search,
  Download,
  Edit3,
  Trash2,
  X,
  Info,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  EXPENSE_CATEGORIES,
  ExpenseCategory,
  ExpenseRecord,
  PaymentMethod,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  downloadCsvFile,
  formatCurrency,
  formatEatDate,
  getEatDateString,
} from '../../utils/bizpilotFinance.js';

const expenseSchema = z.object({
  description: z.string().min(2, 'Expense description is required'),
  amount: z.coerce.number().positive('Amount must be greater than zero'),
  category: z.string().min(2, 'Category is required'),
  expenseDate: z.string().min(10, 'Valid date is required'),
  paymentMethod: z.enum(['mpesa', 'cash', 'bank_transfer', 'card']),
  supplierId: z.string().optional(),
  receiptReference: z.string().optional(),
  notes: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const ExpensesView: React.FC = () => {
  const {
    business,
    expenses,
    suppliers,
    createExpense,
    updateExpense,
    deleteExpense,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [monthFilter, setMonthFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseRecord | null>(null);
  const [banner, setBanner] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      category: 'Transport',
      expenseDate: getEatDateString(),
      paymentMethod: 'mpesa',
      supplierId: '',
      receiptReference: '',
      notes: '',
    },
  });

  const watchedCategory = form.watch('category');

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;
      if (monthFilter && !e.expenseDate.startsWith(monthFilter)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.receiptReference || '').toLowerCase().includes(q) ||
          (e.notes || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [expenses, categoryFilter, monthFilter, searchQuery]);

  const totals = useMemo(() => {
    let operatingTotal = 0;
    let inventoryPurchaseTotal = 0;
    for (const e of filteredExpenses) {
      if (e.isInventoryPurchase || e.category === 'Stock Purchases') {
        inventoryPurchaseTotal += e.amount;
      } else {
        operatingTotal += e.amount;
      }
    }
    return {
      operatingTotal,
      inventoryPurchaseTotal,
      combinedOutflow: operatingTotal + inventoryPurchaseTotal,
    };
  }, [filteredExpenses]);

  const categoryChartData = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of filteredExpenses) {
      map.set(e.category, (map.get(e.category) || 0) + e.amount);
    }
    return Array.from(map.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredExpenses]);

  const monthlySummary = useMemo(() => {
    const map = new Map<string, { month: string; operating: number; stock: number }>();
    for (const e of expenses) {
      const ym = e.expenseDate.slice(0, 7);
      const entry = map.get(ym) || { month: ym, operating: 0, stock: 0 };
      if (e.isInventoryPurchase || e.category === 'Stock Purchases') {
        entry.stock += e.amount;
      } else {
        entry.operating += e.amount;
      }
      map.set(ym, entry);
    }
    return Array.from(map.values()).sort((a, b) => b.month.localeCompare(a.month));
  }, [expenses]);

  const openCreate = () => {
    setEditingExpense(null);
    form.reset({
      description: '',
      amount: 0,
      category: 'Transport',
      expenseDate: getEatDateString(),
      paymentMethod: 'mpesa',
      supplierId: '',
      receiptReference: '',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const openEdit = (exp: ExpenseRecord) => {
    setEditingExpense(exp);
    form.reset({
      description: exp.description,
      amount: exp.amount,
      category: exp.category,
      expenseDate: exp.expenseDate,
      paymentMethod: exp.paymentMethod,
      supplierId: exp.supplierId || '',
      receiptReference: exp.receiptReference || '',
      notes: exp.notes || '',
    });
    setIsModalOpen(true);
  };

  const onSubmit = (values: ExpenseFormValues) => {
    setBanner(null);
    const supplierObj = values.supplierId
      ? suppliers.find((s) => s.id === values.supplierId)
      : undefined;

    if (editingExpense) {
      const res = updateExpense(editingExpense.id, {
        description: values.description,
        amount: values.amount,
        category: values.category as ExpenseCategory,
        expenseDate: values.expenseDate,
        paymentMethod: values.paymentMethod,
        supplierId: supplierObj?.id,
        supplierName: supplierObj?.name,
        receiptReference: values.receiptReference || undefined,
        notes: values.notes || undefined,
      });
      if (!res.ok) {
        setBanner({ type: 'error', text: res.error || 'Could not update expense.' });
        return;
      }
      setBanner({ type: 'success', text: 'Expense updated.' });
    } else {
      const res = createExpense({
        description: values.description,
        amount: values.amount,
        category: values.category as ExpenseCategory,
        expenseDate: values.expenseDate,
        paymentMethod: values.paymentMethod,
        supplierId: supplierObj?.id,
        supplierName: supplierObj?.name,
        receiptReference: values.receiptReference || undefined,
        notes: values.notes || undefined,
      });
      if (!res.ok) {
        setBanner({ type: 'error', text: res.error || 'Could not record expense.' });
        return;
      }
      setBanner({ type: 'success', text: 'Expense recorded.' });
    }
    setIsModalOpen(false);
  };

  const handleExportCsv = () => {
    downloadCsvFile(
      `bizpilot-expenses-${getEatDateString()}.csv`,
      [
        'Date',
        'Description',
        'Category',
        'Classification',
        'Amount (KSh)',
        'Payment Method',
        'Receipt / Ref',
        'Supplier',
        'Notes',
      ],
      filteredExpenses.map((e) => [
        e.expenseDate,
        e.description,
        e.category,
        e.isInventoryPurchase ? 'Inventory Purchase (Non-Operating)' : 'Operating Expense',
        e.amount,
        e.paymentMethod.toUpperCase(),
        e.receiptReference || '',
        e.supplierName || '',
        e.notes || '',
      ])
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Expense Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track operating costs and keep stock purchases separated from overhead expenses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Log Expense
          </button>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Operating Expenses (Deducted in Net Profit)
          </span>
          <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            {formatCurrency(totals.operatingTotal, currency)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Rent, transport, utilities, salaries, marketing & equipment
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Stock Purchases Logged (Tracked Separately)
          </span>
          <p className="mt-2 text-2xl font-extrabold font-mono text-amber-900">
            {formatCurrency(totals.inventoryPurchaseTotal, currency)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Excluded from Operating Expenses so COGS is never double-counted
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Recorded Outflow
          </span>
          <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            {formatCurrency(totals.combinedOutflow, currency)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Across {filteredExpenses.length} expense record(s)
          </p>
        </div>
      </div>

      {/* Category Chart & Monthly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Expenses by Category ({currency})
          </h3>
          {categoryChartData.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No expenses recorded yet.
            </div>
          ) : (
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#475569' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                  <Tooltip
                    formatter={(val: number) => formatCurrency(val, currency)}
                    contentStyle={{ borderRadius: '10px', fontSize: '12px' }}
                  />
                  <Bar dataKey="amount" fill="#d97706" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Monthly Expense Summary</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {monthlySummary.length === 0 ? (
              <p className="text-slate-500 py-6 text-center">No monthly records yet.</p>
            ) : (
              monthlySummary.map((m) => (
                <div key={m.month} className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{m.month}</span>
                    {m.stock > 0 && (
                      <div className="text-[11px] text-amber-800">
                        + {formatCurrency(m.stock, currency)} stock purchases
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">
                      {formatCurrency(m.operating, currency)}
                    </span>
                    <div className="text-[10px] text-slate-400">Operating</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Filters & Expenses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search expense description, category, or voucher ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
            >
              <option value="ALL">All Categories</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="px-3 py-2 text-xs font-mono rounded-xl border border-slate-300"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Description & Notes</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Method & Ref</th>
                <th className="py-3 px-3 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-xs text-slate-600">
                    {formatEatDate(exp.expenseDate)}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{exp.description}</div>
                    {exp.notes && <div className="text-xs text-slate-500">{exp.notes}</div>}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                        exp.isInventoryPurchase
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs text-slate-600">
                    <span className="uppercase font-semibold">{exp.paymentMethod}</span>
                    {exp.receiptReference && (
                      <span className="ml-1.5 font-mono text-slate-400">
                        ({exp.receiptReference})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatCurrency(exp.amount, currency)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(exp)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteExpense(exp.id)}
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Expense Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingExpense ? 'Edit Expense' : 'Record Business Expense'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Expense Description *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Monthly shop rent or KPLC electricity tokens"
                  {...form.register('description')}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-red-600 mt-1">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Amount ({currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register('amount')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                  {form.formState.errors.amount && (
                    <p className="text-xs text-red-600 mt-1">
                      {form.formState.errors.amount.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    {...form.register('category')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    {EXPENSE_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {watchedCategory === 'Stock Purchases' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-2 text-xs text-amber-950">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-800" />
                  <span>
                    <strong>Accounting Protection:</strong> Because you selected{' '}
                    <em>Stock Purchases</em>, this outflow is tracked separately from Operating
                    Expenses so inventory costs are not double-counted against Cost of Goods Sold
                    (COGS) in your Net Profit report.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    {...form.register('expenseDate')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Payment Method *
                  </label>
                  <select
                    {...form.register('paymentMethod')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="mpesa">M-Pesa</option>
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="card">Card</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Receipt / M-Pesa Ref (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SJK99M12P"
                    {...form.register('receiptReference')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Supplier (Optional)
                  </label>
                  <select
                    {...form.register('supplierId')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="">None</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Additional details"
                  {...form.register('notes')}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                >
                  {editingExpense ? 'Save Changes' : 'Save Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
