import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  Archive,
  Edit3,
  ArrowUpDown,
  History,
  X,
  CheckCircle2,
  AlertCircle,
  Download,
} from 'lucide-react';
import {
  Product,
  StockMovementType,
  SUBSCRIPTION_PLANS,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';
import {
  downloadCsvFile,
  formatCurrency,
  formatEatDateTime,
} from '../../utils/bizpilotFinance.js';

const productFormSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  sku: z.string().min(2, 'SKU is required'),
  category: z.string().min(2, 'Category is required'),
  description: z.string().optional(),
  purchaseCost: z.coerce.number().min(0, 'Purchase cost cannot be negative'),
  sellingPrice: z.coerce.number().min(0, 'Selling price cannot be negative'),
  stockQuantity: z.coerce.number().int('Stock quantity must be a whole number'),
  lowStockThreshold: z.coerce
    .number()
    .int()
    .min(0, 'Low-stock threshold cannot be negative'),
  unit: z.string().min(1, 'Unit is required'),
  imageUrl: z.string().optional(),
  supplierId: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export const ProductsInventoryView: React.FC = () => {
  const {
    business,
    products,
    suppliers,
    stockMovements,
    createProduct,
    updateProduct,
    toggleArchiveProduct,
    adjustProductStock,
  } = useBizPilot();

  const currency = business?.currency || 'KSh';
  const planConfig = SUBSCRIPTION_PLANS[business?.subscriptionPlan || 'GROWTH'];

  const [subTab, setSubTab] = useState<'catalog' | 'movements'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [stockFilter, setStockFilter] = useState<'ALL' | 'LOW' | 'OUT' | 'ARCHIVED'>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'price' | 'margin'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [feedbackBanner, setFeedbackBanner] = useState<{
    type: 'success' | 'error' | 'warning';
    text: string;
  } | null>(null);

  // Stock adjustment form state
  const [adjType, setAdjType] = useState<StockMovementType>('purchase_restock');
  const [adjQuantity, setAdjQuantity] = useState<number>(10);
  const [adjCost, setAdjCost] = useState<number>(0);
  const [adjNotes, setAdjNotes] = useState<string>('');

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: 'Food & Pantry',
      description: '',
      purchaseCost: 0,
      sellingPrice: 0,
      stockQuantity: 0,
      lowStockThreshold: 5,
      unit: 'pcs',
      imageUrl: '',
      supplierId: '',
    },
  });

  const watchedCost = Number(form.watch('purchaseCost') || 0);
  const watchedPrice = Number(form.watch('sellingPrice') || 0);
  const unitGrossProfit = watchedPrice - watchedCost;

  const categories = useMemo(() => {
    const set = new Set<string>([
      'Food & Pantry',
      'Beverages',
      'Electronics & Accessories',
      'Household & Cleaning',
      'Clothing & Cosmetics',
      'Services & Labour',
    ]);
    for (const p of products) {
      if (p.category) set.add(p.category);
    }
    return Array.from(set);
  }, [products]);

  const activeProducts = useMemo(
    () => products.filter((p) => !p.isArchived),
    [products]
  );

  const inventoryStats = useMemo(() => {
    let costValue = 0;
    let retailValue = 0;
    let lowCount = 0;
    let outCount = 0;

    for (const p of activeProducts) {
      const positiveQty = Math.max(0, p.stockQuantity);
      costValue += positiveQty * p.purchaseCost;
      retailValue += positiveQty * p.sellingPrice;
      if (p.stockQuantity <= 0) {
        outCount++;
      } else if (p.stockQuantity <= p.lowStockThreshold) {
        lowCount++;
      }
    }
    return {
      activeCount: activeProducts.length,
      costValue,
      retailValue,
      potentialProfit: retailValue - costValue,
      lowCount,
      outCount,
    };
  }, [activeProducts]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (stockFilter === 'ARCHIVED') return p.isArchived;
        if (p.isArchived) return false;
        if (stockFilter === 'OUT' && p.stockQuantity > 0) return false;
        if (
          stockFilter === 'LOW' &&
          (p.stockQuantity <= 0 || p.stockQuantity > p.lowStockThreshold)
        ) {
          return false;
        }
        if (categoryFilter !== 'ALL' && p.category !== categoryFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'stock') return a.stockQuantity - b.stockQuantity;
        if (sortBy === 'price') return b.sellingPrice - a.sellingPrice;
        return b.sellingPrice - b.purchaseCost - (a.sellingPrice - a.purchaseCost);
      });
  }, [products, stockFilter, categoryFilter, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const openCreateModal = () => {
    setEditingProduct(null);
    const randomSku = `SKU-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    form.reset({
      name: '',
      sku: randomSku,
      category: 'Food & Pantry',
      description: '',
      purchaseCost: 0,
      sellingPrice: 0,
      stockQuantity: 10,
      lowStockThreshold: 5,
      unit: 'pcs',
      imageUrl: '',
      supplierId: suppliers[0]?.id || '',
    });
    setIsProductModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    form.reset({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      description: prod.description || '',
      purchaseCost: prod.purchaseCost,
      sellingPrice: prod.sellingPrice,
      stockQuantity: prod.stockQuantity,
      lowStockThreshold: prod.lowStockThreshold,
      unit: prod.unit,
      imageUrl: prod.imageUrl || '',
      supplierId: prod.supplierId || '',
    });
    setIsProductModalOpen(true);
  };

  const onSubmitProduct = (values: ProductFormValues) => {
    setFeedbackBanner(null);
    if (editingProduct) {
      const res = updateProduct(editingProduct.id, {
        name: values.name,
        sku: values.sku.toUpperCase(),
        category: values.category,
        description: values.description || '',
        purchaseCost: values.purchaseCost,
        sellingPrice: values.sellingPrice,
        lowStockThreshold: values.lowStockThreshold,
        unit: values.unit,
        imageUrl: values.imageUrl || undefined,
        supplierId: values.supplierId || undefined,
      });
      if (!res.ok) {
        setFeedbackBanner({ type: 'error', text: res.error || 'Failed to update product.' });
        return;
      }
      setFeedbackBanner({
        type: 'success',
        text: `Updated "${values.name}" successfully.`,
      });
      setIsProductModalOpen(false);
    } else {
      const res = createProduct({
        name: values.name,
        sku: values.sku.toUpperCase(),
        category: values.category,
        description: values.description || '',
        purchaseCost: values.purchaseCost,
        sellingPrice: values.sellingPrice,
        stockQuantity: values.stockQuantity,
        lowStockThreshold: values.lowStockThreshold,
        unit: values.unit,
        imageUrl: values.imageUrl || undefined,
        supplierId: values.supplierId || undefined,
      });
      if (!res.ok) {
        setFeedbackBanner({ type: 'error', text: res.error || 'Failed to create product.' });
        return;
      }
      setFeedbackBanner({
        type: 'success',
        text: `Added "${values.name}" to your inventory.`,
      });
      setIsProductModalOpen(false);
    }
  };

  const openAdjustStockModal = (prod: Product) => {
    setAdjustingProduct(prod);
    setAdjType('purchase_restock');
    setAdjQuantity(10);
    setAdjCost(prod.purchaseCost);
    setAdjNotes('');
  };

  const handleConfirmStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustingProduct) return;

    const isDeduction = adjType === 'adjustment_out' || adjType === 'damaged_expired';
    const delta = isDeduction ? -Math.abs(adjQuantity) : Math.abs(adjQuantity);

    const res = adjustProductStock({
      productId: adjustingProduct.id,
      movementType: adjType,
      quantityDelta: delta,
      newUnitCost: adjType === 'purchase_restock' ? adjCost : undefined,
      notes: adjNotes || `Stock adjustment (${adjType})`,
    });

    if (!res.ok) {
      setFeedbackBanner({ type: 'error', text: res.error || 'Stock adjustment failed.' });
      return;
    }

    setFeedbackBanner({
      type: res.warning ? 'warning' : 'success',
      text:
        res.warning ||
        `Stock updated for "${adjustingProduct.name}" (${delta > 0 ? `+${delta}` : delta} ${adjustingProduct.unit}).`,
    });
    setAdjustingProduct(null);
  };

  const handleExportInventoryCsv = () => {
    downloadCsvFile(
      `bizpilot-inventory-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        'SKU',
        'Product Name',
        'Category',
        'Stock Quantity',
        'Unit',
        'Low Stock Threshold',
        'Purchase Cost (KSh)',
        'Selling Price (KSh)',
        'Unit Gross Profit (KSh)',
        'Total Cost Valuation (KSh)',
      ],
      activeProducts.map((p) => [
        p.sku,
        p.name,
        p.category,
        p.stockQuantity,
        p.unit,
        p.lowStockThreshold,
        p.purchaseCost,
        p.sellingPrice,
        p.sellingPrice - p.purchaseCost,
        Math.max(0, p.stockQuantity) * p.purchaseCost,
      ])
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Products & Inventory Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Active items: <strong>{inventoryStats.activeCount}</strong> /{' '}
            {planConfig.maxActiveProducts} ({planConfig.name} limit)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportInventoryCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedbackBanner && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
            feedbackBanner.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-900'
              : feedbackBanner.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackBanner.type === 'error' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackBanner(null)}
            className="p-1 hover:bg-black/5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Inventory Valuation & Alert Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Stock Valuation (At Cost)
          </p>
          <p className="mt-1.5 text-xl font-extrabold font-mono text-slate-900">
            {formatCurrency(inventoryStats.costValue, currency)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Capital tied up in {inventoryStats.activeCount} active items
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Potential Gross Profit in Stock
          </p>
          <p className="mt-1.5 text-xl font-extrabold font-mono text-emerald-900">
            {formatCurrency(inventoryStats.potentialProfit, currency)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Retail value: {formatCurrency(inventoryStats.retailValue, currency)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Low-Stock Warnings
          </p>
          <p className="mt-1.5 text-xl font-extrabold font-mono text-amber-900">
            {inventoryStats.lowCount} items
          </p>
          <p className="mt-1 text-xs text-slate-500">At or below alert threshold</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-700">
            Out-of-Stock Warnings
          </p>
          <p className="mt-1.5 text-xl font-extrabold font-mono text-red-700">
            {inventoryStats.outCount} items
          </p>
          <p className="mt-1 text-xs text-slate-500">Zero units remaining on shelf</p>
        </div>
      </div>

      {/* Sub-navigation: Product Catalog vs Stock Movement Audit Log */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setSubTab('catalog')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            subTab === 'catalog'
              ? 'border-emerald-900 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          Product Catalogue ({products.filter((p) => !p.isArchived).length})
        </button>

        <button
          type="button"
          onClick={() => setSubTab('movements')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            subTab === 'movements'
              ? 'border-emerald-900 text-emerald-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className="w-4 h-4" />
          Stock Movement Audit History ({stockMovements.length})
        </button>
      </div>

      {subTab === 'catalog' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Search & Filters Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search by product name, SKU, or category..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
              >
                <option value="ALL">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value as typeof stockFilter);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
              >
                <option value="ALL">Active Products</option>
                <option value="LOW">Low Stock Only</option>
                <option value="OUT">Out of Stock Only</option>
                <option value="ARCHIVED">Archived Products</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white text-slate-700"
              >
                <option value="name">Sort: Name (A–Z)</option>
                <option value="stock">Sort: Lowest Stock First</option>
                <option value="price">Sort: Highest Selling Price</option>
                <option value="margin">Sort: Highest Unit Profit</option>
              </select>
            </div>
          </div>

          {/* Product Table */}
          {paginatedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-800">No matching products found</p>
              <p className="text-xs text-slate-500 mt-1">
                Add a new product or clear your search filters.
              </p>
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-900 text-white text-xs font-semibold cursor-pointer"
              >
                + Add Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase">
                    <th className="py-3 px-4">Product & SKU</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-right">Purchase Cost</th>
                    <th className="py-3 px-3 text-right">Selling Price</th>
                    <th className="py-3 px-3 text-right">Unit Profit</th>
                    <th className="py-3 px-3 text-center">Current Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProducts.map((prod) => {
                    const itemProfit = prod.sellingPrice - prod.purchaseCost;
                    const isOut = prod.stockQuantity <= 0;
                    const isLow =
                      !isOut && prod.stockQuantity <= prod.lowStockThreshold;
                    const supplier = suppliers.find((s) => s.id === prod.supplierId);

                    return (
                      <tr key={prod.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{prod.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono">{prod.sku}</span>
                            {supplier && <span>• Supplier: {supplier.name}</span>}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {formatCurrency(prod.purchaseCost, currency)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                          {formatCurrency(prod.sellingPrice, currency)}
                        </td>
                        <td
                          className={`py-3 px-3 text-right font-mono font-semibold ${
                            itemProfit >= 0 ? 'text-emerald-800' : 'text-red-600'
                          }`}
                        >
                          {formatCurrency(itemProfit, currency)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="inline-flex flex-col items-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                                isOut
                                  ? 'bg-red-100 text-red-800 border border-red-200'
                                  : isLow
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                              }`}
                            >
                              {prod.stockQuantity} {prod.unit}
                            </span>
                            {(isOut || isLow) && (
                              <span className="text-[10px] font-semibold text-amber-800 mt-0.5 flex items-center gap-0.5">
                                <AlertTriangle className="w-2.5 h-2.5" />
                                {isOut ? 'Out of stock' : `Low (≤${prod.lowStockThreshold})`}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openAdjustStockModal(prod)}
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 cursor-pointer"
                              title="Stock In / Adjust Stock"
                            >
                              <ArrowUpDown className="w-3.5 h-3.5 inline mr-1" />
                              Stock
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal(prod)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleArchiveProduct(prod.id)}
                              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer"
                              title={prod.isArchived ? 'Restore Product' : 'Archive Product'}
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>
                Page {currentPage} of {totalPages} ({filteredProducts.length} items)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Stock Movements Audit Log Tab */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">
              Complete Stock Movement & Cost Audit Trail
            </h3>
            <p className="text-xs text-slate-500">
              Every opening balance, POS sale, sale cancellation, supplier restock, and manual stock
              adjustment is recorded automatically.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                  <th className="py-3 px-4">Date & Time (EAT)</th>
                  <th className="py-3 px-3">Product & SKU</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3 text-right">Prev Stock</th>
                  <th className="py-3 px-3 text-right">Change</th>
                  <th className="py-3 px-3 text-right">New Stock</th>
                  <th className="py-3 px-4">Reference / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stockMovements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-mono text-slate-500">
                      {formatEatDateTime(mov.createdAt)}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{mov.productName}</div>
                      <div className="font-mono text-slate-400">{mov.sku}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold uppercase text-[10px]">
                        {mov.movementType.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      {mov.previousStock}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono font-bold ${
                        mov.quantityChange >= 0 ? 'text-emerald-800' : 'text-red-700'
                      }`}
                    >
                      {mov.quantityChange > 0 ? `+${mov.quantityChange}` : mov.quantityChange}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {mov.newStock}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">{mov.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmitProduct)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pembe Maize Meal 2kg"
                    {...form.register('name')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    SKU *
                  </label>
                  <input
                    type="text"
                    {...form.register('sku')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    list="bp-product-categories"
                    {...form.register('category')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                  />
                  <datalist id="bp-product-categories">
                    {categories.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Supplier <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    {...form.register('supplierId')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="">No supplier linked</option>
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Purchase Cost ({currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register('purchaseCost')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Selling Price ({currency}) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...form.register('sellingPrice')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <span className="text-[11px] font-semibold uppercase text-slate-500">
                    Unit Gross Profit
                  </span>
                  <span
                    className={`text-sm font-mono font-bold mt-1 ${
                      unitGrossProfit >= 0 ? 'text-emerald-900' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(unitGrossProfit, currency)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {!editingProduct && (
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Opening Stock *
                    </label>
                    <input
                      type="number"
                      {...form.register('stockQuantity')}
                      className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Low-Stock Alert Threshold
                  </label>
                  <input
                    type="number"
                    {...form.register('lowStockThreshold')}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Unit (pcs, pkt, kg, btl)
                  </label>
                  <input
                    type="text"
                    {...form.register('unit')}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Description / Notes
                </label>
                <input
                  type="text"
                  placeholder="Optional product specification or shelf location"
                  {...form.register('description')}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock-In / Stock Adjustment Modal */}
      {adjustingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Adjust Stock Quantity</h3>
                <p className="text-xs text-slate-500">
                  {adjustingProduct.name} (Current: {adjustingProduct.stockQuantity}{' '}
                  {adjustingProduct.unit})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAdjustingProduct(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmStockAdjustment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Adjustment Type
                </label>
                <select
                  value={adjType}
                  onChange={(e) => setAdjType(e.target.value as StockMovementType)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
                >
                  <option value="purchase_restock">Stock In — Supplier Restock (+)</option>
                  <option value="adjustment_in">Stock In — Physical Count Gain (+)</option>
                  <option value="adjustment_out">Stock Out — Physical Count Reduction (−)</option>
                  <option value="damaged_expired">Stock Out — Damaged / Expired (−)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Quantity ({adjustingProduct.unit})
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={adjQuantity}
                    onChange={(e) => setAdjQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                  />
                </div>

                {adjType === 'purchase_restock' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Unit Purchase Cost ({currency})
                    </label>
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={adjCost}
                      onChange={(e) => setAdjCost(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 text-sm font-mono rounded-xl border border-slate-300"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Reason / Audit Note *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Restock from distributor or Weekly shelf audit"
                  value={adjNotes}
                  onChange={(e) => setAdjNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdjustingProduct(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Record Stock Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
