import React, { useState } from 'react';
import {
  Store,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Database,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import {
  KENYAN_BUSINESS_CATEGORIES,
  KENYAN_COUNTIES_AND_TOWNS,
  SUBSCRIPTION_PLANS,
  SubscriptionPlanId,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';

export const SettingsAndBillingView: React.FC = () => {
  const {
    business,
    products,
    storageMode,
    updateBusinessSettings,
    loadSampleDataIntoCurrentWorkspace,
    clearWorkspaceData,
  } = useBizPilot();

  const [name, setName] = useState(business?.name || '');
  const [ownerName, setOwnerName] = useState(business?.ownerName || '');
  const [category, setCategory] = useState(
    business?.category || KENYAN_BUSINESS_CATEGORIES[0]
  );
  const [countyTown, setCountyTown] = useState(business?.countyTown || 'Nairobi');
  const [currency, setCurrency] = useState(business?.currency || 'KSh');
  const [phone, setPhone] = useState(business?.phone || '');
  const [kraPin, setKraPin] = useState(business?.kraPinOptional || '');
  const [taxEnabled, setTaxEnabled] = useState(Boolean(business?.taxEnabled));
  const [taxName, setTaxName] = useState(business?.taxName || 'VAT');
  const [taxRate, setTaxRate] = useState<number>(business?.taxRate ?? 16);
  const [allowNegativeStock, setAllowNegativeStock] = useState(
    Boolean(business?.allowNegativeStock)
  );
  const [receiptFooter, setReceiptFooter] = useState(business?.receiptFooter || '');
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  const activeProductsCount = products.filter((p) => !p.isArchived).length;
  const currentPlan = SUBSCRIPTION_PLANS[business?.subscriptionPlan || 'GROWTH'];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessSettings({
      name: name.trim() || business?.name || 'My Business',
      ownerName: ownerName.trim() || business?.ownerName || 'Owner',
      category,
      countyTown,
      currency,
      phone,
      kraPinOptional: kraPin.trim() || undefined,
      taxEnabled,
      taxName: taxName.trim() || 'VAT',
      taxRate: Math.max(0, Math.min(100, Number(taxRate))),
      allowNegativeStock,
      receiptFooter,
    });
    setSavedBanner('Business settings and tax preferences saved.');
    setTimeout(() => setSavedBanner(null), 3000);
  };

  const handleSwitchPlan = (planId: SubscriptionPlanId) => {
    updateBusinessSettings({ subscriptionPlan: planId });
    setSavedBanner(`Switched workspace subscription to ${SUBSCRIPTION_PLANS[planId].name}.`);
    setTimeout(() => setSavedBanner(null), 3000);
  };

  return (
    <div className="space-y-6">
      {savedBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs sm:text-sm text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{savedBanner}</span>
        </div>
      )}

      {/* 1. Subscriptions & Monetization Plans */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-900" />
              Subscription Plan & Product Capacity
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Active Plan: <strong>{currentPlan.name}</strong> ({currentPlan.billingCycle}) •
              Using <strong>{activeProductsCount}</strong> of {currentPlan.maxActiveProducts}{' '}
              active products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['FREE', 'STARTER', 'GROWTH'] as SubscriptionPlanId[]).map((planId) => {
            const plan = SUBSCRIPTION_PLANS[planId];
            const isCurrent = business?.subscriptionPlan === planId;
            return (
              <div
                key={planId}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isCurrent
                    ? 'border-emerald-800 bg-emerald-50/40 ring-2 ring-emerald-800/15'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{plan.name}</h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-900 text-white">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
                    KSh {plan.priceKsh.toLocaleString()}
                    <span className="text-xs font-sans font-normal text-slate-500">
                      {plan.priceKsh === 0 ? ' / free' : ' / month'}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {plan.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => handleSwitchPlan(planId)}
                  className={`mt-5 w-full py-2 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-emerald-900 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Switch to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Business Profile, Tax & Inventory Policy Form */}
      <form
        onSubmit={handleSaveProfile}
        className="bg-white p-6 rounded-2xl border border-slate-200 space-y-5"
      >
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-900" />
            Business Profile, Tax & Inventory Controls
          </h2>
          <p className="text-xs text-slate-500">
            Update your shop details, receipt footer, tax rate, and negative stock policy
            without repeating onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Owner&apos;s Name *
            </label>
            <input
              type="text"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            >
              {KENYAN_BUSINESS_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              County / Town
            </label>
            <select
              value={countyTown}
              onChange={(e) => setCountyTown(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            >
              {KENYAN_COUNTIES_AND_TOWNS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            >
              <option value="KSh">KSh (Kenya Shilling)</option>
              <option value="USD">USD ($)</option>
              <option value="UGX">UGX</option>
              <option value="TZS">TZS</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300"
            />
          </div>
        </div>

        {/* Tax & Inventory Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={taxEnabled}
                onChange={(e) => setTaxEnabled(e.target.checked)}
                className="rounded border-slate-300 text-emerald-900"
              />
              Enable Tax / VAT Calculation on POS Sales
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-600">Tax Label</span>
                <input
                  type="text"
                  value={taxName}
                  onChange={(e) => setTaxName(e.target.value)}
                  className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <span className="text-slate-600">Rate (%)</span>
                <input
                  type="number"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full mt-1 px-2.5 py-1.5 font-mono rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Note: Tax settings assist with internal recordkeeping and do not replace official
              KRA eTIMS verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={allowNegativeStock}
                onChange={(e) => setAllowNegativeStock(e.target.checked)}
                className="rounded border-slate-300 text-emerald-900"
              />
              Allow Negative Inventory When Recording Sales
            </label>
            <p className="text-xs text-slate-600">
              By default, BizPilot KE prevents accidental negative stock. Enable this only if you
              sell items before recording incoming supplier deliveries (a warning will still be
              logged).
            </p>
            <div>
              <span className="text-xs text-slate-600">Optional KRA PIN (For Receipts)</span>
              <input
                type="text"
                placeholder="Optional"
                value={kraPin}
                onChange={(e) => setKraPin(e.target.value.toUpperCase())}
                className="w-full mt-1 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
            Official Receipt Footer Message
          </label>
          <input
            type="text"
            value={receiptFooter}
            onChange={(e) => setReceiptFooter(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold cursor-pointer"
          >
            Save Business Settings
          </button>
        </div>
      </form>

      {/* 3. Environment & Workspace Data Utilities */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-900" />
              Storage Mode & Workspace Data Controls
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current Environment:{' '}
              <strong className="uppercase text-emerald-900">{storageMode}</strong> (Clearly
              separated local persistent storage + Supabase schema ready in{' '}
              <code>supabase/migrations/</code>)
            </p>
          </div>
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              loadSampleDataIntoCurrentWorkspace();
              setSavedBanner('Loaded sample Kenyan shop dataset into your workspace.');
            }}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Load Sample Kenyan Shop Data
          </button>

          <button
            type="button"
            onClick={() => {
              clearWorkspaceData();
              setSavedBanner('Workspace records cleared to a fresh empty state.');
            }}
            className="px-4 py-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Workspace Records to Empty
          </button>
        </div>
      </div>
    </div>
  );
};
