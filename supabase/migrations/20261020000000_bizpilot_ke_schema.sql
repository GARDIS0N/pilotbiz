-- ============================================================================
-- BizPilot KE — Production PostgreSQL Schema & Row-Level Security (Supabase)
-- Currency Default: KSh (KES) | Timezone: Africa/Nairobi (EAT)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. BUSINESS WORKSPACES
CREATE TABLE IF NOT EXISTS public.bp_businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2),
  owner_name TEXT NOT NULL,
  category TEXT NOT NULL,
  business_type TEXT NOT NULL DEFAULT 'products' CHECK (business_type IN ('products', 'services', 'hybrid')),
  county_town TEXT,
  currency TEXT NOT NULL DEFAULT 'KSh',
  phone TEXT,
  email TEXT,
  kra_pin_optional TEXT,
  tax_enabled BOOLEAN NOT NULL DEFAULT false,
  tax_name TEXT NOT NULL DEFAULT 'VAT',
  tax_rate NUMERIC(5,2) NOT NULL DEFAULT 16.00 CHECK (tax_rate >= 0 AND tax_rate <= 100),
  allow_negative_stock BOOLEAN NOT NULL DEFAULT false,
  subscription_plan TEXT NOT NULL DEFAULT 'GROWTH' CHECK (subscription_plan IN ('FREE', 'STARTER', 'GROWTH')),
  receipt_footer TEXT DEFAULT 'Thank you for shopping with us! Goods once sold are subject to our return policy.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUPPLIERS
CREATE TABLE IF NOT EXISTS public.bp_suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  category TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS & INVENTORY
CREATE TABLE IF NOT EXISTS public.bp_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  purchase_cost NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (purchase_cost >= 0),
  selling_price NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (selling_price >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 5 CHECK (low_stock_threshold >= 0),
  unit TEXT NOT NULL DEFAULT 'pcs',
  image_url TEXT,
  supplier_id UUID REFERENCES public.bp_suppliers(id) ON DELETE SET NULL,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, sku)
);

-- 4. STOCK MOVEMENTS & COST AUDIT LOG
CREATE TABLE IF NOT EXISTS public.bp_stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.bp_products(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (movement_type IN ('initial', 'sale', 'sale_cancellation', 'purchase_restock', 'adjustment_in', 'adjustment_out', 'damaged_expired')),
  quantity_change INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  unit_cost_at_time NUMERIC(12,2),
  reference_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.bp_customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SALES & POS RECEIPTS
CREATE TABLE IF NOT EXISTS public.bp_sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  receipt_number TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  customer_id UUID REFERENCES public.bp_customers(id) ON DELETE SET NULL,
  customer_name TEXT,
  subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  total_cogs NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (total_cogs >= 0),
  has_incomplete_cost BOOLEAN NOT NULL DEFAULT false,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer', 'card', 'credit')),
  payment_reference TEXT,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('paid', 'partial', 'unpaid', 'refunded')),
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'cancelled')),
  cancellation_reason TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, receipt_number),
  UNIQUE (business_id, idempotency_key)
);

CREATE TABLE IF NOT EXISTS public.bp_sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID NOT NULL REFERENCES public.bp_sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.bp_products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
  unit_cost NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (unit_cost >= 0),
  line_total NUMERIC(12,2) NOT NULL CHECK (line_total >= 0)
);

-- 7. CUSTOMER CREDIT PAYMENTS
CREATE TABLE IF NOT EXISTS public.bp_customer_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.bp_customers(id) ON DELETE CASCADE,
  sale_id UUID REFERENCES public.bp_sales(id) ON DELETE SET NULL,
  invoice_id UUID,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer', 'card')),
  reference TEXT,
  notes TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SUPPLIER PURCHASES & PAYMENTS
CREATE TABLE IF NOT EXISTS public.bp_supplier_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES public.bp_suppliers(id) ON DELETE RESTRICT,
  purchase_number TEXT NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  payment_method TEXT NOT NULL DEFAULT 'mpesa',
  payment_status TEXT NOT NULL CHECK (payment_status IN ('paid', 'partial', 'unpaid')),
  due_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bp_supplier_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES public.bp_suppliers(id) ON DELETE CASCADE,
  purchase_id UUID REFERENCES public.bp_supplier_purchases(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  payment_method TEXT NOT NULL,
  reference TEXT,
  notes TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. EXPENSES
CREATE TABLE IF NOT EXISTS public.bp_expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  category TEXT NOT NULL,
  is_inventory_purchase BOOLEAN NOT NULL DEFAULT false,
  expense_date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  supplier_id UUID REFERENCES public.bp_suppliers(id) ON DELETE SET NULL,
  receipt_reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. INVOICES & QUOTATIONS
CREATE TABLE IF NOT EXISTS public.bp_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES public.bp_businesses(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL CHECK (doc_type IN ('quotation', 'invoice')),
  doc_number TEXT NOT NULL,
  customer_id UUID REFERENCES public.bp_customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  tax_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
  amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'accepted', 'paid', 'partially_paid', 'overdue', 'cancelled')),
  issue_date DATE NOT NULL,
  due_or_expiry_date DATE NOT NULL,
  converted_from_quote_id UUID REFERENCES public.bp_documents(id) ON DELETE SET NULL,
  converted_to_invoice_id UUID REFERENCES public.bp_documents(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (business_id, doc_number)
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.bp_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_customer_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_supplier_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_supplier_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bp_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Strictly isolate each business workspace to its authenticated owner
CREATE POLICY "Owners manage their own business" ON public.bp_businesses
  FOR ALL USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Tenant isolation on products" ON public.bp_products
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on suppliers" ON public.bp_suppliers
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on stock_movements" ON public.bp_stock_movements
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on customers" ON public.bp_customers
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on sales" ON public.bp_sales
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on customer_payments" ON public.bp_customer_payments
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on supplier_purchases" ON public.bp_supplier_purchases
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on supplier_payments" ON public.bp_supplier_payments
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on expenses" ON public.bp_expenses
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));

CREATE POLICY "Tenant isolation on documents" ON public.bp_documents
  FOR ALL USING (business_id IN (SELECT id FROM public.bp_businesses WHERE owner_id = auth.uid()));
