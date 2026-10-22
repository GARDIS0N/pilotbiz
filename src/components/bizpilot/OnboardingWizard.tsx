import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Compass,
  Store,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import {
  BusinessType,
  KENYAN_BUSINESS_CATEGORIES,
  KENYAN_COUNTIES_AND_TOWNS,
  SUBSCRIPTION_PLANS,
  SubscriptionPlanId,
} from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';

const onboardingSchema = z.object({
  businessName: z.string().min(2, 'Please enter your business or shop name'),
  ownerName: z.string().min(2, "Please enter the business owner's name"),
  category: z.string().min(2, 'Please select a business category'),
  countyTown: z.string().optional(),
  currency: z.string().min(1, 'Currency is required'),
  phone: z.string().optional(),
  businessType: z.enum(['products', 'services', 'hybrid']),
  subscriptionPlan: z.enum(['FREE', 'STARTER', 'GROWTH']),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export const OnboardingWizard: React.FC = () => {
  const { currentUser, completeOnboarding, logoutAccount } = useBizPilot();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessName: '',
      ownerName: currentUser?.fullName || '',
      category: KENYAN_BUSINESS_CATEGORIES[0],
      countyTown: 'Nairobi',
      currency: 'KSh',
      phone: '',
      businessType: 'products',
      subscriptionPlan: 'GROWTH',
    },
  });

  const selectedPlan = form.watch('subscriptionPlan');
  const selectedType = form.watch('businessType');

  const onSubmit = (values: OnboardingFormValues) => {
    setErrorMsg(null);
    const res = completeOnboarding(values);
    if (!res.ok) {
      setErrorMsg(res.error || 'Could not complete setup.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">BizPilot KE — Workspace Setup</h1>
              <p className="text-xs text-slate-500">
                Set up your business profile once. You can update these details anytime in Settings.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logoutAccount}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6"
        >
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-sm text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Core Business Details */}
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-800" />
              1. Business Identity
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Used on your dashboard, POS receipts, quotations, and invoices.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Baraka Mini-Mart or Neema Cosmetics"
                  {...form.register('businessName')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                />
                {form.formState.errors.businessName && (
                  <p className="mt-1 text-xs text-red-600">
                    {form.formState.errors.businessName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Owner&apos;s Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grace Wambui"
                  {...form.register('ownerName')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                />
                {form.formState.errors.ownerName && (
                  <p className="mt-1 text-xs text-red-600">
                    {form.formState.errors.ownerName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Business Category *
                </label>
                <select
                  {...form.register('category')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none bg-white"
                >
                  {KENYAN_BUSINESS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  County or Town <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  {...form.register('countyTown')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none bg-white"
                >
                  <option value="">Select County / Town (Optional)</option>
                  {KENYAN_COUNTIES_AND_TOWNS.map((town) => (
                    <option key={town} value={town}>
                      {town}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Primary Currency *
                </label>
                <select
                  {...form.register('currency')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none bg-white"
                >
                  <option value="KSh">KSh — Kenya Shilling (KES)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="UGX">UGX — Uganda Shilling</option>
                  <option value="TZS">TZS — Tanzania Shilling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contact Phone <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  {...form.register('phone')}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Preferred Business Type */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              2. Preferred Business Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                [
                  {
                    id: 'products',
                    label: 'Physical Products & Stock',
                    desc: 'Dukas, retail, boutiques, electronics, wholesalers',
                  },
                  {
                    id: 'services',
                    label: 'Services & Freelance',
                    desc: 'Salons, agencies, technicians, consultants',
                  },
                  {
                    id: 'hybrid',
                    label: 'Both Products & Services',
                    desc: 'Repair shops with parts, salons selling cosmetics',
                  },
                ] as Array<{ id: BusinessType; label: string; desc: string }>
              ).map((item) => {
                const active = selectedType === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => form.setValue('businessType', item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-emerald-800 bg-emerald-50/60 ring-2 ring-emerald-800/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Subscription Plan */}
          <div className="pt-4 border-t border-slate-200">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              3. Choose Your Subscription Plan *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['FREE', 'STARTER', 'GROWTH'] as SubscriptionPlanId[]).map((planId) => {
                const plan = SUBSCRIPTION_PLANS[planId];
                const active = selectedPlan === planId;
                return (
                  <button
                    key={planId}
                    type="button"
                    onClick={() => form.setValue('subscriptionPlan', planId)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      active
                        ? 'border-emerald-800 bg-emerald-50/70 ring-2 ring-emerald-800/15'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{plan.name}</span>
                        {active && <CheckCircle2 className="w-4 h-4 text-emerald-800" />}
                      </div>
                      <p className="mt-1 text-base font-extrabold font-mono text-emerald-950">
                        {plan.billingCycle}
                      </p>
                      <p className="mt-1 text-xs text-slate-600">
                        Up to {plan.maxActiveProducts.toLocaleString()} active products
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              Launch My Business Workspace
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
