import React, { useState, useMemo } from 'react';
import {
  Compass,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Wallet,
  Users,
  FileText,
  BarChart3,
  Sparkles,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  AlertTriangle,
  Database,
} from 'lucide-react';
import { BizPilotProvider, useBizPilot } from './services/bizpilotStore.js';
import { LandingAndAuth } from './components/bizpilot/LandingAndAuth.js';
import { OnboardingWizard } from './components/bizpilot/OnboardingWizard.js';
import { DashboardView, NavTabId } from './components/bizpilot/DashboardView.js';
import { ProductsInventoryView } from './components/bizpilot/ProductsInventoryView.js';
import { SalesAndPosView } from './components/bizpilot/SalesAndPosView.js';
import { ExpensesView } from './components/bizpilot/ExpensesView.js';
import { CustomersAndCreditView } from './components/bizpilot/CustomersAndCreditView.js';
import { InvoicesAndQuotationsView } from './components/bizpilot/InvoicesAndQuotationsView.js';
import { ReportsAndCopilotView } from './components/bizpilot/ReportsAndCopilotView.js';
import { SettingsAndBillingView } from './components/bizpilot/SettingsAndBillingView.js';
import { buildDateRangeFilter } from './utils/bizpilotFinance.js';
import { DateRangeFilter } from './types/bizpilot.js';

const BizPilotWorkspaceShell: React.FC = () => {
  const {
    currentUser,
    business,
    products,
    storageMode,
    logoutAccount,
  } = useBizPilot();

  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateRangeFilter>(() =>
    buildDateRangeFilter('30d')
  );

  const lowStockCount = useMemo(
    () =>
      products.filter((p) => !p.isArchived && p.stockQuantity <= p.lowStockThreshold)
        .length,
    [products]
  );

  // Route Guard 1: Unauthenticated -> Landing & Auth
  if (!currentUser) {
    return <LandingAndAuth />;
  }

  // Route Guard 2: Authenticated but Onboarding not yet completed -> Onboarding Wizard
  if (!currentUser.onboardingCompleted || !business) {
    return <OnboardingWizard />;
  }

  const navItems: Array<{
    id: NavTabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pos', label: 'Point of Sale (POS)', icon: ShoppingCart },
    {
      id: 'products',
      label: 'Products & Stock',
      icon: Package,
      badge: lowStockCount > 0 ? lowStockCount : undefined,
    },
    { id: 'expenses', label: 'Expenses', icon: Wallet },
    { id: 'customers', label: 'Customers & Suppliers', icon: Users },
    { id: 'invoices', label: 'Invoices & Quotes', icon: FileText },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
    { id: 'copilot', label: 'BizPilot Copilot AI', icon: Sparkles },
    { id: 'whatsapp', label: 'WhatsApp Studio', icon: MessageSquare },
    { id: 'settings', label: 'Settings & Plan', icon: Settings },
  ];

  const handleSelectNav = (tab: NavTabId) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-emerald-950 text-white border-r border-emerald-900 select-none z-30">
        {/* Brand Logo */}
        <div className="p-5 border-b border-emerald-900/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-sm shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white">
                BizPilot
              </span>
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                KE
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80 truncate">{business.name}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNav(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-emerald-100/85 hover:bg-emerald-900/70 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      active
                        ? 'bg-slate-950 text-amber-400'
                        : 'bg-amber-400 text-slate-950'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Workspace Status & User Footer */}
        <div className="p-4 border-t border-emerald-900/80 space-y-3 text-xs">
          <div className="px-3 py-2 rounded-xl bg-emerald-900/60 border border-emerald-800/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-200 text-[11px]">
              <Database className="w-3.5 h-3.5 text-amber-400" />
              {storageMode === 'local-persistent' ? 'Local Persistent Mode' : 'Supabase Cloud'}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[10px]">
              {business.subscriptionPlan}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="truncate pr-2">
              <p className="font-bold text-white truncate">{business.ownerName}</p>
              <p className="text-[11px] text-emerald-300/80 truncate">{currentUser.email}</p>
            </div>
            <button
              type="button"
              onClick={logoutAccount}
              title="Sign Out"
              className="p-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-100 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-30 bg-emerald-950 text-white px-4 h-14 flex items-center justify-between border-b border-emerald-900">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold">BizPilot KE</span>
            <span className="ml-2 text-[11px] text-emerald-200">{business.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <button
              type="button"
              onClick={() => handleSelectNav('products')}
              className="px-2 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              {lowStockCount}
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg bg-emerald-900 text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-72 max-w-full bg-emerald-950 text-white h-full p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-900 pb-3">
                <span className="text-sm font-bold text-amber-400">{business.name}</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-emerald-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectNav(item.id)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-emerald-100 hover:bg-emerald-900'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </span>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <button
              type="button"
              onClick={logoutAccount}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-900 text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out ({business.ownerName})
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 pb-20 lg:pb-10">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              dateFilter={dateFilter}
              onChangeDateFilter={setDateFilter}
              onNavigate={handleSelectNav}
            />
          )}
          {activeTab === 'pos' && <SalesAndPosView />}
          {activeTab === 'products' && <ProductsInventoryView />}
          {activeTab === 'expenses' && <ExpensesView />}
          {activeTab === 'customers' && <CustomersAndCreditView />}
          {activeTab === 'invoices' && <InvoicesAndQuotationsView />}
          {(activeTab === 'reports' ||
            activeTab === 'copilot' ||
            activeTab === 'whatsapp') && (
            <ReportsAndCopilotView
              initialSection={activeTab}
              dateFilter={dateFilter}
              onChangeDateFilter={setDateFilter}
            />
          )}
          {activeTab === 'settings' && <SettingsAndBillingView />}
        </div>
      </main>

      {/* Compact Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 px-2 py-1.5 grid grid-cols-5 gap-1">
        {(
          [
            { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
            { id: 'pos', label: 'POS Sale', icon: ShoppingCart },
            { id: 'products', label: 'Stock', icon: Package },
            { id: 'customers', label: 'Credit', icon: Users },
            { id: 'copilot', label: 'Copilot', icon: Sparkles },
          ] as Array<{
            id: NavTabId;
            label: string;
            icon: React.ComponentType<{ className?: string }>;
          }>
        ).map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNav(item.id)}
              className={`flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-semibold ${
                active ? 'text-emerald-900 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BizPilotProvider>
      <BizPilotWorkspaceShell />
    </BizPilotProvider>
  );
};

export default App;
