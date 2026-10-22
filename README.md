# 🧭 BizPilot KE — AI-Powered Business Management Platform for Kenyan SMEs

> **"Run your business. Know your numbers. Grow with confidence."**

**BizPilot KE** is a full-stack SaaS business management web application built specifically for Kenyan small and medium-sized businesses — including retail shops (*dukas*), mini-supermarkets, clothing & cosmetics boutiques, electronics & phone accessory stores, online vendors, freelancers, and small wholesalers.

---

## 🌟 Core Modules & Capabilities

1. **Authentication, Multi-Tenant Isolation & Onboarding**
   - Email & password registration, login, logout, password reset, and persistent sessions.
   - Guided Kenyan SME onboarding collecting Business Name, Owner Name, Category, County/Town, Currency (`KSh` default), Contact Phone, Business Type (`Products`, `Services`, `Hybrid`), and Subscription Plan (`FREE`, `STARTER`, `GROWTH`).
   - Brand-new accounts start with a **clean, empty workspace** and helpful empty-state actions (never fabricated sales numbers), plus an optional 1-click **Sample Nairobi Shop Demo** (`Kilimani Mart & Electronics KE`).

2. **Live Financial Dashboard (East Africa Time — `Africa/Nairobi`)**
   - Date filters for **Today**, **Last 7 Days**, **Last 30 Days**, **All Time**, and **Custom Date Ranges**.
   - Real-time KPIs: Sales Revenue, Actual Cash/M-Pesa Collected, Operating Expenses, Gross Profit, Estimated Net Profit, Outstanding Customer Balances (*Madeni*), Active Products, and Low-Stock Alerts.
   - Interactive Recharts visualizations for Sales vs. Expenses Trends and Best-Selling Products.

3. **Product & Inventory Management**
   - Create, edit, archive, search, filter, sort, and paginate products.
   - Tracks SKU, Category, Supplier, Purchase Cost, Selling Price, Unit Gross Profit, Current Stock, and Low-Stock Alert Threshold.
   - Prevents accidental negative stock (unless explicitly authorized in Business Settings with warning logs).
   - Full **Stock Movement Audit History** recording every opening balance, POS sale, sale cancellation, supplier restock, and manual stock adjustment.

4. **Point of Sale (POS) & Official Receipts**
   - Fast checkout with quantity validation, authorized discounts, and optional configurable VAT/tax.
   - Supports **M-Pesa** (recordkeeping with confirmation codes), **Cash**, **Bank Transfer**, **Card**, and **Credit / Pay Later**.
   - Idempotency protection prevents duplicate sales from repeated clicks.
   - Printable official receipts, PDF export via print, WhatsApp receipt copy, and **Sale Cancellation / Refund** workflow that automatically restores stock quantities.

5. **Expense Tracking (With Double-Counting Prevention)**
   - Tracks Rent, Transport, Stock Purchases, Utilities, Salaries, Internet & Communication, Marketing, Equipment, and Other expenses.
   - Automatically separates **Stock Purchases (Inventory)** from **Operating Expenses** so Cost of Goods Sold (COGS) is never double-counted in Net Profit reports.

6. **Customers & Credit Management (*Madeni*) + Suppliers & Purchasing**
   - Dynamically calculates customer outstanding balances from recorded credit sales, invoices, and partial/full payments (never a manually editable number).
   - Generates printable **Customer Statements** and **Polite Payment Reminders** in both **English** and **Kiswahili** with Click-to-WhatsApp (`wa.me`) review links.
   - Tracks **Suppliers**, **Stock Purchase Orders (Restocks)** (automatically updating inventory quantities and cost history), and **Unpaid Supplier Balances**.

7. **Invoices & Quotations**
   - Generates numbered Quotations (`QUO-...`) and Invoices (`INV-...`) with configurable tax settings and transparent KRA advisory notes.
   - Tracks statuses (`draft`, `sent`, `accepted`, `partially_paid`, `paid`, `overdue`, `cancelled`) — viewing an invoice never marks it as paid.
   - **1-Click Convert Quotation to Invoice** without duplicating underlying records.

8. **BizPilot Copilot AI Assistant & WhatsApp Communication Studio**
   - Server-side AI service abstraction (`/api/bizpilot/copilot`) reading `GEMINI_API_KEY` / `OPENAI_API_KEY` from environment variables on the backend so keys are never exposed in frontend code.
   - Includes a complete **Deterministic Kenyan SME Business Analyst Engine** fallback so all analysis, restock alerts, and promotional templates work 100% free without an external AI key.

---

## 📐 Documented Financial Formulas

- **Net Sales Revenue** = Sum of `(totalAmount - taxAmount)` for completed (non-cancelled) sales in the selected period.
- **Actual Cash Collected** = Initial payments on completed sales in the period + subsequent customer credit/invoice payments received in the period. **Unpaid invoices and unpaid credit sales are never counted as collected cash.**
- **Cost of Goods Sold (COGS)** = Sum of `(quantity * unitCost)` for items sold in completed sales during the period.
- **Gross Profit** = `Net Sales Revenue - COGS` (Clearly labeled as *Estimated* if any product has an incomplete `0` purchase cost).
- **Operating Expenses** = Sum of expenses in the period excluding `Stock Purchases`.
- **Estimated Net Profit** = `Gross Profit - Operating Expenses`.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, Lucide Icons, Recharts, React Hook Form, Zod
- **Backend / API**: Express (`server/bizpilotRouter.ts`)
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth (`supabase/migrations/20261020000000_bizpilot_ke_schema.sql`) with clearly separated **Local Persistent Development Mode** (`localStorage` + `data/bizpilot_workspaces.json`).

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Run automated tests**:
   ```bash
   npx tsx --test test/bizpilot-ke.test.ts
   ```
