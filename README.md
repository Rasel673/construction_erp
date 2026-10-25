# Nirman ERP — Construction ERP Buyer Demo UI (Bangladesh)

A polished, responsive, frontend-first Construction ERP SaaS demo designed specifically for contractors, civil engineering firms, and real estate developers in Bangladesh.

Built with **Next.js App Router (v16)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **Recharts**.

---

## 🏗️ Brand Identity & Theme

- **Primary Purple:** `#6D28D9`
- **Deep Purple:** `#4C1D95`
- **Hover Purple:** `#5B21B6`
- **Violet Accent:** `#8B5CF6`
- **Lavender Background:** `#F5F3FF`
- **Workspace Canvas:** `#F8FAFC`
- **Main Text:** `#0F172A`
- **Secondary Text:** `#64748B`
- **Borders:** `#E2E8F0`

---

## 🗺️ Route Directory

### Public Routes
| Route | Description |
|---|---|
| `/` | Product landing page, feature highlights, ERP modules overview, interactive metrics, and demo CTA |
| `/demo/modules` | Comprehensive directory of all 18 ERP modules with feature matrices |
| `/configure` | Interactive ERP plan & module configurator with real-time monthly/annual BDT estimation |
| `/request-quote` | Enterprise quote request form with React Hook Form + Zod validation and transparent demo confirmation |

### Demo Workspace Routes (`/demo/*`)
| Route | Module | Realistic Bangladeshi Construction Data Features |
|---|---|---|
| `/demo` | **Executive Dashboard** | Project portfolio KPIs, active site cards, budget vs actual variance, monthly expense breakdown chart, activity feed, and compliance deadlines |
| `/demo/projects` | **Project Management** | Mega infrastructure & commercial high-rise projects (Dhaka Elevated Expressway, Rupayan Lakeview, Padma Rail Link), status filters, completion rates, budget tracking |
| `/demo/estimation` | **Estimation & BOQ** | Interactive Bill of Quantities (BOQ) with editable item rows, units (CFT, MT, Nos, SFT), rates in BDT, dynamic project cost calculations |
| `/demo/contracts` | **Contracts & Agreements** | Government (RAJUK, Roads & Highways Department) & private EPC contracts, retention terms, milestone completion tracking |
| `/demo/progress` | **Progress & Milestones** | Gantt milestones, physical vs financial completion tracking, site status logs |
| `/demo/procurement` | **Procurement & POs** | Material requisitions, purchase orders with approval workflow (Approved, Pending, Delivered) |
| `/demo/inventory` | **Inventory & Stock** | Rebar/Rod 500W (BSRM), Cement (Holcim/Bashundhara), Sylhet Sand, Stone Aggregate, 1st Class Bricks with reorder threshold alerts and stock logs |
| `/demo/suppliers` | **Vendor & Supplier Registry** | Bangladesh materials suppliers (BSRM, Bashundhara, Meghna Group, Berger Paints, Heidelberg) with payment credit terms |
| `/demo/subcontractors` | **Subcontractors** | Piling works, shuttering, electrical (Concord, Mir Akhter, Islam Piling) with work package agreements and retention ledger |
| `/demo/crm` | **CRM & Tenders** | Commercial high-rises and institutional inquiries pipeline, site surveys, BOQ submission dates, and follow-up reminders |
| `/demo/hrm` | **HRM & Officers** | Project managers, site safety officers, quantity surveyors, department payroll totals, and leave status |
| `/demo/workforce` | **Site Workforce & Wages** | Daily site labor attendance (Rod Binders, Masons/Rajmistri, Carpenters, Helpers), overtime hours, and cash wage disbursements |
| `/demo/equipment` | **Fleet & Equipment** | Heavy equipment (Piling rig, Tower crane, Concrete mixer trucks, Excavators), site allocations, and maintenance schedules |
| `/demo/billing` | **Client Invoices** | Running bills (RA bills) submitted to clients, retention deductions, VAT/AIT withholding, and payment statuses |
| `/demo/expenses` | **Site Petty Cash & Expenses** | Fuel, site logistics, transport, local equipment hire with project tags and approval states |
| `/demo/accounting` | **Accounts & General Ledger** | Chart of accounts, double-entry journal vouchers, trial balance, and balance sheet preview |
| `/demo/reports` | **Executive Analytics** | Material consumption trends, project variance analytics, labor productivity, and financial export simulation |
| `/demo/licensing` | **Subscription & Licensing** | Active ERP tier, module activation toggles, user license allocation, and billing simulation |
| `/demo/settings` | **Company Settings** | Multi-entity switcher (e.g., Nirman Holdings Ltd., Padma Infra Tech), user role permissions, and regional preferences |

---

## ⚡ Key Highlights & Demo Behavior

1. **South Asian / Bangladeshi Currency Formatting:**
   - Values automatically format using BDT (`৳`), with Lakh (`৳1.25 Lakh`) and Crore (`৳3.50 Cr`) denominations.
2. **Realistic Construction Context:**
   - Real local material terms (BSRM 500W rebar, Holcim cement, Sylhet sand, 1st class bricks, stone chips).
   - Local units: **CFT** (Cubic Feet), **MT** (Metric Ton), **SFT** (Square Feet), **Bags**, and **Nos**.
3. **Local Storage Demo Persistence:**
   - Changes made in the BOQ estimator, module configurator, and forms persist across page reloads via `localStorage` without leaking secrets.
4. **Honest Simulation Transparency:**
   - All interactive forms (e.g., Quote Request, Add BOQ Item, Record Attendance) provide transparent notices confirming that this is a frontend demonstration.

---

## 💻 Local Development

### Requirements
- **Node.js**: v18.18.0 or v20+
- **npm** or **yarn**

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
# Navigate to http://localhost:3000
```

### Build & Typecheck
```bash
# Run production build
npm run build

# Run ESLint validation
npm run lint
```

---

## 🌐 Deployment to a cPanel Subdomain

You can deploy this application to any cPanel subdomain (e.g., `demo.yourdomain.com` or `erp.yourcompany.com.bd`).

### Option A: cPanel "Setup Node.js App" (Recommended)

Most modern cPanel hosts (CloudLinux / cPanel Node.js Selector) support running Next.js applications directly:

1. **Create the Subdomain in cPanel:**
   - Go to **Subdomains** in cPanel.
   - Create `demo.yourdomain.com` pointing to a folder such as `/home/username/demo.yourdomain.com`.

2. **Setup Node.js App:**
   - In cPanel, click **Setup Node.js App** (under Software section).
   - Click **Create Application**.
   - **Node.js version**: Choose `20.x` (or `18.x`).
   - **Application mode**: `Production`.
   - **Application root**: `demo.yourdomain.com`.
   - **Application URL**: `demo.yourdomain.com`.
   - **Application startup file**: `server.js` or `node_modules/next/dist/bin/next` with argument `start`.
   - Click **Create**.

3. **Upload & Install:**
   - Build locally using `npm run build` or upload your source code repository (excluding `node_modules`).
   - Open cPanel Terminal or SSH:
     ```bash
     cd /home/username/demo.yourdomain.com
     npm install --production
     npm run build
     ```
   - In the Node.js App interface, click **Restart Application**.

---

### Option B: Static Export Deployment to cPanel `public_html`

Since all 26 routes are pre-rendered, you can deploy as a static export without needing a running Node.js daemon:

1. **Configure Static Export:**
   - In `next.config.ts`, add `output: 'export'`:
     ```ts
     const nextConfig: NextConfig = {
       output: 'export',
       // other options...
     };
     ```
2. **Build the Static Assets:**
   ```bash
   npm run build
   ```
   This generates an `out/` folder containing static HTML, CSS, and JS files.

3. **Upload to cPanel:**
   - Upload the contents of `out/` into your subdomain's document root (e.g., `/public_html/demo` or `/demo.yourdomain.com`).
   - Ensure the included `.htaccess` file (provided in `public/.htaccess`) is present in the root directory to handle client-side routing.

4. **SSL / HTTPS:**
   - In cPanel, ensure **AutoSSL / Let's Encrypt** is activated for your subdomain to serve over `https://`.

---

## 📄 License & Intellectual Property

Proprietary demo codebase developed for Nirman Construction ERP prospective buyers. All mock company profiles, project names, and financial figures are fictional simulations for demonstration purposes.
