import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Compass,
  ShieldCheck,
  TrendingUp,
  Package,
  Receipt,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  Store,
  Smartphone,
  FileText,
} from 'lucide-react';
import { SUBSCRIPTION_PLANS, SubscriptionPlanId } from '../../types/bizpilot.js';
import { useBizPilot } from '../../services/bizpilotStore.js';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const resetSchema = z.object({
  email: z.string().email('Please enter your account email address'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export const LandingAndAuth: React.FC = () => {
  const { registerAccount, loginAccount, loginWithDemoWorkspace, resetPasswordRequest } =
    useBizPilot();

  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'register' | 'reset'>('landing');
  const [formError, setFormError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '' },
  });

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: '', newPassword: '' },
  });

  const handleLoginSubmit = (values: LoginFormValues) => {
    setFormError(null);
    const res = loginAccount(values.email, values.password);
    if (!res.ok) {
      setFormError(res.error || 'Unable to sign in.');
    }
  };

  const handleRegisterSubmit = (values: RegisterFormValues) => {
    setFormError(null);
    const res = registerAccount(values.email, values.password, values.fullName);
    if (!res.ok) {
      setFormError(res.error || 'Unable to register account.');
    }
  };

  const handleResetSubmit = (values: ResetFormValues) => {
    setFormError(null);
    setResetSuccess(null);
    const res = resetPasswordRequest(values.email, values.newPassword);
    if (!res.ok) {
      setFormError(res.message);
    } else {
      setResetSuccess(res.message);
      resetForm.reset();
    }
  };

  if (authMode !== 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <button
            type="button"
            onClick={() => {
              setAuthMode('landing');
              setFormError(null);
              setResetSuccess(null);
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-900 mb-6"
          >
            ← Back to BizPilot KE Home
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-400 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  BizPilot
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  KE
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Run your business. Know your numbers. Grow with confidence.
              </p>
            </div>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            {authMode === 'login' && 'Sign in to your business workspace'}
            {authMode === 'register' && 'Create your BizPilot KE account'}
            {authMode === 'reset' && 'Reset your account password'}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {authMode === 'login' && 'Access your daily sales, stock, credit records, and reports.'}
            {authMode === 'register' && 'Start with a clean workspace tailored for Kenyan SMEs.'}
            {authMode === 'reset' && 'Enter your registered email and choose a new password.'}
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-slate-200 sm:px-8">
            {formError && (
              <div
                role="alert"
                className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-sm text-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {resetSuccess && (
              <div
                role="status"
                className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-sm text-emerald-900"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{resetSuccess}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setResetSuccess(null);
                    }}
                    className="mt-1 text-xs font-semibold text-emerald-800 underline"
                  >
                    Proceed to Sign In →
                  </button>
                </div>
              </div>
            )}

            {authMode === 'login' && (
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="owner@biashara.co.ke"
                      {...loginForm.register('email')}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('reset');
                        setFormError(null);
                      }}
                      className="text-xs font-medium text-emerald-800 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...loginForm.register('password')}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none"
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Sign In to Workspace
                </button>
              </form>
            )}

            {authMode === 'register' && (
              <form
                onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. John Mwangi or Amina Wanjiku"
                      {...registerForm.register('fullName')}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none"
                    />
                  </div>
                  {registerForm.formState.errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {registerForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Business or Personal Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      placeholder="you@example.co.ke"
                      {...registerForm.register('email')}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none"
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      placeholder="Minimum 6 characters"
                      {...registerForm.register('password')}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 focus:ring-2 focus:ring-emerald-800/20 outline-none"
                    />
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Create Account & Continue to Setup
                </button>
              </form>
            )}

            {authMode === 'reset' && (
              <form onSubmit={resetForm.handleSubmit(handleResetSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Account Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.co.ke"
                    {...resetForm.register('email')}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                  />
                  {resetForm.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {resetForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    {...resetForm.register('newPassword')}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-800 outline-none"
                  />
                  {resetForm.formState.errors.newPassword && (
                    <p className="mt-1 text-xs text-red-600">
                      {resetForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  Reset Password
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>
                  {authMode === 'login'
                    ? "Don't have an account yet?"
                    : 'Already have an account?'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login');
                    setFormError(null);
                    setResetSuccess(null);
                  }}
                  className="font-semibold text-emerald-900 hover:underline"
                >
                  {authMode === 'login' ? 'Create free account' : 'Sign in instead'}
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={loginWithDemoWorkspace}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Store className="w-4 h-4 text-amber-700" />
                  Instant Demo: Open Sample Nairobi Shop (Kilimani Mart KE)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 flex items-center justify-center text-amber-400 shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  BizPilot
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  KE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Built for Kenyan SMEs • KSh & East Africa Time
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-900">
              Features
            </a>
            <a href="#questions" className="hover:text-emerald-900">
              Why BizPilot KE
            </a>
            <a href="#pricing" className="hover:text-emerald-900">
              Pricing (KSh)
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-900 hover:bg-emerald-800 text-white shadow-sm transition-colors cursor-pointer"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/5 border border-emerald-900/15 text-emerald-900 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Designed for Retail Shops, Boutiques, Electronics, Wholesalers & Service SMEs
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Run your business.{' '}
                <span className="text-emerald-900">Know your numbers.</span> Grow with
                confidence.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Manage daily POS sales, M-Pesa & cash recordkeeping, stock alerts, customer credit
                (<span className="italic font-medium">madeni</span>), supplier restocks, expenses,
                invoices, and AI-assisted insights from one clean dashboard in{' '}
                <strong className="text-slate-900">Kenya Shillings (KSh)</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  Create Your Business Workspace
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={loginWithDemoWorkspace}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  Launch Live Nairobi Shop Demo
                </button>
              </div>

              <div className="pt-2 grid grid-cols-3 gap-4 max-w-lg text-xs text-slate-600 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-900">No Fake Numbers</p>
                  <p>Distinguishes cash collected vs unpaid credit</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Mobile-First</p>
                  <p>Works on Android phones, tablets & laptops</p>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Free Tier Ready</p>
                  <p>Start at KSh 0/month up to 30 products</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                      Live Biashara Snapshot
                    </p>
                    <h3 className="text-sm font-bold text-slate-900">
                      Answers the 7 Questions Every Owner Asks
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-mono font-semibold border border-emerald-200">
                    EAT (UTC+3)
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    {
                      q: '1. How much have I sold today?',
                      a: 'Instant POS receipts with M-Pesa, Cash, Bank, Card & Credit breakdown.',
                    },
                    {
                      q: '2. How much money have I spent?',
                      a: 'Separates Operating Expenses from Stock Purchases so costs are never double-counted.',
                    },
                    {
                      q: '3. Which products are selling fastest?',
                      a: 'Automatic unit movement tracking and top-seller rankings.',
                    },
                    {
                      q: '4. Which customers owe me money?',
                      a: 'Calculated from real invoices & credit sales with polite WhatsApp reminders.',
                    },
                    {
                      q: '5. What stock is running low?',
                      a: 'Custom low-stock thresholds, out-of-stock flags, and supplier purchase orders.',
                    },
                    {
                      q: '6. How much profit am I making?',
                      a: 'Transparent Gross Profit (Sales - COGS) and Net Profit formulas.',
                    },
                    {
                      q: '7. What should I do next?',
                      a: 'BizPilot Copilot summarizes performance and flags restock & collection priorities.',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-900">{item.q}</p>
                        <p className="text-slate-600">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Grid */}
      <section id="features" className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Complete Business Toolkit
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
              Everything your shop or service business needs in one place
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Receipt,
                title: 'Point of Sale & Official Receipts',
                desc: 'Record cash, M-Pesa (recordkeeping with transaction codes), bank transfer, or credit sales in seconds. Print or share clean receipts.',
              },
              {
                icon: Package,
                title: 'Inventory & Stock Audit Trail',
                desc: 'Track purchase costs, selling prices, item margins, low-stock warnings, and every stock-in, sale, or damaged adjustment.',
              },
              {
                icon: Users,
                title: 'Customer Credit (Madeni) & Suppliers',
                desc: 'Track partial payments, due dates, customer statements, and unpaid supplier balances without manual spreadsheet errors.',
              },
              {
                icon: FileText,
                title: 'Quotations & Invoices',
                desc: 'Generate professional quotations and convert accepted quotes into invoices in 1 click without duplicating records.',
              },
              {
                icon: Smartphone,
                title: 'WhatsApp Customer Communication',
                desc: 'Copy polite payment reminders (English & Kiswahili), promotional offers, and product catalogue summaries with click-to-chat.',
              },
              {
                icon: Sparkles,
                title: 'BizPilot Copilot & Financial Reports',
                desc: 'Get plain-language weekly summaries, P&L statements, CSV exports, and actionable advice grounded strictly in your saved figures.',
              },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Simple, Transparent Kenyan Pricing
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
              Start free, upgrade as your biashara grows
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              All plans include secure data isolation, KSh formatting, and mobile-responsive access.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['FREE', 'STARTER', 'GROWTH'] as SubscriptionPlanId[]).map((planId) => {
              const plan = SUBSCRIPTION_PLANS[planId];
              const isPopular = planId === 'STARTER';
              return (
                <div
                  key={planId}
                  className={`rounded-2xl bg-white p-6 flex flex-col justify-between border ${
                    isPopular
                      ? 'border-emerald-800 ring-2 ring-emerald-800/15 shadow-md'
                      : 'border-slate-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      {isPopular && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 font-mono">
                        KSh {plan.priceKsh.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500">
                        {plan.priceKsh === 0 ? '/ forever' : '/ month'}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium text-emerald-900">
                      Up to {plan.maxActiveProducts.toLocaleString()} active products
                    </p>

                    <ul className="mt-5 space-y-2.5 text-sm text-slate-600">
                      {plan.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`mt-6 w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${
                      isPopular
                        ? 'bg-emerald-900 hover:bg-emerald-800 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    {plan.priceKsh === 0 ? 'Start Free Plan' : `Choose ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-900" />
            <span className="font-bold text-slate-800">BizPilot KE</span>
            <span>— Run your business. Know your numbers. Grow with confidence.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              Tenant-Isolated Business Records
            </span>
            <span className="inline-flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              Nairobi / East Africa Time (EAT)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
