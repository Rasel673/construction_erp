import {
  Project,
  BOQItem,
  PurchaseOrder,
  InventoryItem,
  Supplier,
  Subcontractor,
  Employee,
  WorkforceAttendance,
  Equipment,
  ClientLead,
  Invoice,
  ExpenseRecord,
  ContractRecord,
  ERPModuleMeta
} from '../types';

export const ERP_MODULES: ERPModuleMeta[] = [
  // 1. Projects and Operations
  {
    id: 'mod-dashboard',
    slug: 'dashboard',
    name: 'Executive Dashboard',
    banglaName: 'ড্যাশবোর্ড',
    category: 'Projects and Operations',
    icon: 'LayoutDashboard',
    shortDesc: 'Comprehensive project portfolio, financial health & live site alerts.',
    description: 'High-level real-time KPI cockpit showing budget utilization, site progress, pending POs and critical material alerts across all Bangladeshi project sites.',
    features: ['Active Projects Map & KPI Cards', 'Budget vs Actual Expenditure', 'Low Stock & Milestone Warnings', 'Live Site Activity Stream'],
    isCore: true,
    indicativePriceBDTPerMonth: 8000,
    href: '/demo'
  },
  {
    id: 'mod-projects',
    slug: 'projects',
    name: 'Project Management',
    banglaName: 'প্রকল্প ব্যবস্থাপনা',
    category: 'Projects and Operations',
    icon: 'HardHat',
    shortDesc: 'End-to-end tracking of civil projects, schedules, locations and health.',
    description: 'Track multi-crore infrastructure, commercial and residential projects with timeline management, progress percent, site engineers and budget tracking.',
    features: ['Project Lifecycle Status', 'Location & Client Mapping', 'Target vs Achieved Timelines', 'Detailed Project Drilldown'],
    isCore: true,
    indicativePriceBDTPerMonth: 12000,
    href: '/demo/projects'
  },
  {
    id: 'mod-estimation',
    slug: 'estimation',
    name: 'Estimation & BOQ',
    banglaName: 'প্রাক্কলন ও বিওকিউ',
    category: 'Projects and Operations',
    icon: 'Calculator',
    shortDesc: 'Automated Bill of Quantities, item rate calculations & revision controls.',
    description: 'Construct detailed BOQs for RCC, rebar, brickwork and finishing. Auto-calculate line totals and grand totals with support for PWD and international standard rates.',
    features: ['Auto Calculated Line & Grand Totals', 'Custom Unit Rates (CFT/MT/Bags)', 'Civil, Structural & MEP Categorization', 'Add & Edit Live BOQ Items'],
    isCore: true,
    indicativePriceBDTPerMonth: 10000,
    href: '/demo/estimation'
  },
  {
    id: 'mod-contracts',
    slug: 'contracts',
    name: 'Contracts Management',
    banglaName: 'চুক্তি ব্যবস্থাপনা',
    category: 'Projects and Operations',
    icon: 'FileSignature',
    shortDesc: 'Legal agreements, performance guarantees, retention money & amendments.',
    description: 'Monitor client agreements, bank guarantees, mobilization advances, retention money clauses, and completion milestones.',
    features: ['Contract Value Tracking (Crore/Lakh)', 'Retention Money Tracking (typically 5-10%)', 'Performance Guarantee Expiry Alerts', 'Legal & Variation Order History'],
    isCore: false,
    indicativePriceBDTPerMonth: 9000,
    href: '/demo/contracts'
  },
  {
    id: 'mod-progress',
    slug: 'progress',
    name: 'Progress & Milestones',
    banglaName: 'অগ্রগতি ও মাইলস্টোন',
    category: 'Projects and Operations',
    icon: 'FlagTriangleRight',
    shortDesc: 'Key milestones, critical path tracking and physical progress verification.',
    description: 'Track site milestones such as Piling completion, Plinth beam casting, Roof slab completion, and Handover stages with date targets.',
    features: ['Visual Milestone Progress Bar', 'Variance & Delay Indicators', 'Site Engineer Inspections', 'Physical vs Financial Variance'],
    isCore: false,
    indicativePriceBDTPerMonth: 7500,
    href: '/demo/progress'
  },

  // 2. Procurement and Inventory
  {
    id: 'mod-procurement',
    slug: 'procurement',
    name: 'Procurement & Purchase Orders',
    banglaName: 'ক্রয় ও পিও',
    category: 'Procurement and Inventory',
    icon: 'ShoppingCart',
    shortDesc: 'Vendor purchase requisitions, PO approval workflows & delivery tracking.',
    description: 'Manage material purchase orders for cement, rebar, bricks, sand, and aggregates with price comparisons and tiered approval chains.',
    features: ['Multi-Item Purchase Order Generator', 'Supplier Delivery & Payment Status', 'Linked Project Cost Allocation', 'Delivery Receipts (Chalan) Tracking'],
    isCore: true,
    indicativePriceBDTPerMonth: 11000,
    href: '/demo/procurement'
  },
  {
    id: 'mod-inventory',
    slug: 'inventory',
    name: 'Inventory & Material Stock',
    banglaName: 'ইনভেন্টরি ও কাঁচামাল',
    category: 'Procurement and Inventory',
    icon: 'Boxes',
    shortDesc: 'Real-time site stock levels, reorder thresholds & wastage control.',
    description: 'Monitor stock on hand for cement bags, rebar bundles, Sylhet sand, aggregate stone chips, and bricks across multiple storage yards.',
    features: ['Automated Low-Stock Threshold Alerts', 'Site-Wise Stock Distribution', 'Consumption & Wastage Audits', 'Raw Material Classification'],
    isCore: true,
    indicativePriceBDTPerMonth: 10500,
    href: '/demo/inventory'
  },
  {
    id: 'mod-suppliers',
    slug: 'suppliers',
    name: 'Supplier Management',
    banglaName: 'সরবরাহকারী ব্যবস্থাপনা',
    category: 'Procurement and Inventory',
    icon: 'Truck',
    shortDesc: 'Vendor directory, supply records, rating scorecards & outstanding balances.',
    description: 'Maintain relationships with major Bangladeshi cement, steel, brick and aggregates vendors. Track total supplied volumes and pending payables.',
    features: ['Vendor Performance Rating', 'Outstanding Payable Balance in BDT', 'Trade Category Categorization', 'Contact & Chalan History'],
    isCore: false,
    indicativePriceBDTPerMonth: 7000,
    href: '/demo/suppliers'
  },
  {
    id: 'mod-subcontractors',
    slug: 'subcontractors',
    name: 'Subcontractor Management',
    banglaName: 'সাবকন্ট্রাক্টর ব্যবস্থাপনা',
    category: 'Procurement and Inventory',
    icon: 'Network',
    shortDesc: 'Piling, electrical, plumbing and shuttering contractor work bills.',
    description: 'Manage trade specialists, running account (RA) bills, retention money deductions, safety compliance and contract values.',
    features: ['Running Account (RA) Bill Tracking', 'Security Retention Deduction Records', 'Work Order Allocation', 'Safety Compliance Scoring'],
    isCore: false,
    indicativePriceBDTPerMonth: 8500,
    href: '/demo/subcontractors'
  },

  // 3. People and Resources
  {
    id: 'mod-hrm',
    slug: 'hrm',
    name: 'HRM & Employee Management',
    banglaName: 'এইচআরএম ও কর্মকর্তা',
    category: 'People and Resources',
    icon: 'Users',
    shortDesc: 'Staff directory, site engineers, quantity surveyors and payroll summaries.',
    description: 'Manage staff profiles, site postings, engineering credentials, designations, salaries and administrative statuses across departments.',
    features: ['Site Engineer & QS Registry', 'Departmental Organization', 'Salary & Compensation Records', 'Site Deployment Tracking'],
    isCore: false,
    indicativePriceBDTPerMonth: 8000,
    href: '/demo/hrm'
  },
  {
    id: 'mod-workforce',
    slug: 'workforce',
    name: 'Workforce & Site Attendance',
    banglaName: 'দৈনিক লেবার ও হাজিরা',
    category: 'People and Resources',
    icon: 'UserCheck',
    shortDesc: 'Daily site labor attendance, Rajmistri & helper headcounts, overtime & wages.',
    description: 'Record daily site labor headcounts for rod binders, masons, carpenters, and helpers. Automatically track daily wage payouts and overtime.',
    features: ['Trade-Wise Headcount (Masons, Rod Binders)', 'Overtime Hours Calculation', 'Daily Cash & Wage Register', 'Shift Attendance Records'],
    isCore: false,
    indicativePriceBDTPerMonth: 9000,
    href: '/demo/workforce'
  },
  {
    id: 'mod-equipment',
    slug: 'equipment',
    name: 'Equipment & Machinery',
    banglaName: 'ভারী যন্ত্রপাতি ও রেন্টাল',
    category: 'People and Resources',
    icon: 'Wrench',
    shortDesc: 'Tower cranes, excavators, transit mixers, fuel tracking & service schedules.',
    description: 'Track high-value construction machinery, site deployments, engine hours, diesel consumption and scheduled periodic maintenance.',
    features: ['Fleet Operating Status (Active/Idle/Transit)', 'Fuel Consumption Logs (Liters/Hr)', 'Service & Maintenance Schedule Alerts', 'Operator Deployment Tracking'],
    isCore: false,
    indicativePriceBDTPerMonth: 9500,
    href: '/demo/equipment'
  },

  // 4. Customers and Finance
  {
    id: 'mod-crm',
    slug: 'crm',
    name: 'CRM & Client Management',
    banglaName: 'সিআরএম ও ক্লায়েন্ট',
    category: 'Customers and Finance',
    icon: 'Briefcase',
    shortDesc: 'Tender leads, client meetings, project surveys & follow-up pipelines.',
    description: 'Track potential real-estate developers, government tender notices, private enterprise leads and negotiation stages.',
    features: ['Sales Stage Funnel (Survey, BOQ, Negotiation)', 'Expected Contract Values in BDT', 'Follow-up Date Reminders', 'Client Meeting Logs'],
    isCore: false,
    indicativePriceBDTPerMonth: 8500,
    href: '/demo/crm'
  },
  {
    id: 'mod-billing',
    slug: 'billing',
    name: 'Billing & Invoicing',
    banglaName: 'বিলিং ও চালান',
    category: 'Customers and Finance',
    icon: 'Receipt',
    shortDesc: 'Client running account (RA) bills, VAT/AIT tax deductions & due balances.',
    description: 'Generate milestone invoices, calculate government VAT and AIT withholdings, track client payments and outstanding collection balances.',
    features: ['Running Account (RA) Billing', 'Paid vs Due Amount Tracking', 'Client Aging Schedule', 'Payment Status Indicators'],
    isCore: true,
    indicativePriceBDTPerMonth: 11000,
    href: '/demo/billing'
  },
  {
    id: 'mod-expenses',
    slug: 'expenses',
    name: 'Expense Management',
    banglaName: 'ব্যয় ব্যবস্থাপনা',
    category: 'Customers and Finance',
    icon: 'CreditCard',
    shortDesc: 'Site petty cash, fuel vouchers, municipal permits & material expense tracking.',
    description: 'Track every BDT spent on site with categorized vouchers, approval hierarchies and digital payment verification (bKash/Bank/Cash).',
    features: ['Categorized Site Vouchers', 'Multi-Level Approval Status', 'Payment Mode Tagging (bKash/Bank)', 'Project Cost Breakdown'],
    isCore: true,
    indicativePriceBDTPerMonth: 9000,
    href: '/demo/expenses'
  },
  {
    id: 'mod-accounting',
    slug: 'accounting',
    name: 'Accounting & Financials',
    banglaName: 'হিসাব ও আর্থিক প্রতিবেদন',
    category: 'Customers and Finance',
    icon: 'PieChart',
    shortDesc: 'Cash flows, receivables, payables, P&L and project profit margins.',
    description: 'Real-time financial statement generator reflecting revenue, direct project expenses, gross margins and bank balances.',
    features: ['Overall Receivables vs Payables', 'Project Gross Margin Analysis', 'Balance Sheet Summary', 'Lakh & Crore Presentation'],
    isCore: true,
    indicativePriceBDTPerMonth: 12000,
    href: '/demo/accounting'
  },

  // 5. Reports and Analytics
  {
    id: 'mod-reports',
    slug: 'reports',
    name: 'Reports & Analytics',
    banglaName: 'রিপোর্ট ও বিশ্লেষণ',
    category: 'Reports and Analytics',
    icon: 'BarChart3',
    shortDesc: 'Project cost variance, material consumption, labor efficiency & budget audits.',
    description: 'Generate executive audit reports, project cost curves, budget variance tables and procurement trends with date filters.',
    features: ['Budget Variance Analysis', 'Material Consumption Trends', 'Project Cost Forecasts', 'Print & Export Friendly Views'],
    isCore: false,
    indicativePriceBDTPerMonth: 10000,
    href: '/demo/reports'
  },

  // 6. Administration
  {
    id: 'mod-licensing',
    slug: 'licensing',
    name: 'Module Management & Licensing',
    banglaName: 'মডিউল ও লাইসেন্সিং',
    category: 'Administration',
    icon: 'ShieldCheck',
    shortDesc: 'Custom ERP bundle builder, active module tokens & license configuration.',
    description: 'Inspect active licensed modules, add or remove operational capabilities, and view indicative enterprise subscription tiers.',
    features: ['Active Module Toggle', 'Indicative Bundle Estimator', 'License Expiry & Renewal Status', 'Enterprise Feature Matrix'],
    isCore: false,
    indicativePriceBDTPerMonth: 5000,
    href: '/demo/licensing'
  },
  {
    id: 'mod-settings',
    slug: 'settings',
    name: 'Company Settings',
    banglaName: 'কোম্পানি সেটিংস',
    category: 'Administration',
    icon: 'Settings',
    shortDesc: 'Company profile, BDT currency formats, tax rates & demo reset.',
    description: 'Configure corporate address, trade license, TIN/BIN details, default fiscal year, decimal formatting and reset interactive demo state.',
    features: ['Company Profile & Registration Info', 'Bangladeshi Currency & Fiscal Year Defaults', 'Theme & Density Customization', 'One-Click Reset Demo Data'],
    isCore: false,
    indicativePriceBDTPerMonth: 4000,
    href: '/demo/settings'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-1',
    code: 'PRJ-DHK-001',
    name: 'Dhaka Elevated Expressway - Flyover Segment 4',
    client: 'Bangladesh Bridge Authority (BBA)',
    location: 'Banani-Airport Corridor, Dhaka',
    startDate: '2024-01-15',
    targetEndDate: '2026-12-30',
    contractValueBDT: 1850000000, // ৳185.00 Cr
    spentBDT: 1145000000, // ৳114.50 Cr
    progressPercent: 64,
    status: 'Active',
    projectManager: 'Engr. Farhan Mahmud',
    milestonesCount: 12,
    completedMilestones: 8
  },
  {
    id: 'prj-2',
    code: 'PRJ-CTG-002',
    name: 'Chattogram Port Multi-purpose Container Yard',
    client: 'Chittagong Port Authority (CPA)',
    location: 'Patenga Coastline, Chattogram',
    startDate: '2023-09-01',
    targetEndDate: '2025-11-20',
    contractValueBDT: 920000000, // ৳92.00 Cr
    spentBDT: 745000000, // ৳74.50 Cr
    progressPercent: 82,
    status: 'Near Completion',
    projectManager: 'Engr. Tariqul Islam',
    milestonesCount: 9,
    completedMilestones: 7
  },
  {
    id: 'prj-3',
    code: 'PRJ-UTT-003',
    name: 'Uttara Sector 18 Eco-Residential Tower Complex',
    client: 'Bengal Concord Real Estate Ltd',
    location: 'Sector 18, Uttara, Dhaka',
    startDate: '2024-04-10',
    targetEndDate: '2027-06-30',
    contractValueBDT: 485000000, // ৳48.50 Cr
    spentBDT: 198000000, // ৳19.80 Cr
    progressPercent: 42,
    status: 'Active',
    projectManager: 'Engr. Sabrina Chowdhury',
    milestonesCount: 15,
    completedMilestones: 6
  },
  {
    id: 'prj-4',
    code: 'PRJ-RPP-004',
    name: 'Rooppur Township Infrastructure & Internal Roads',
    client: 'Ministry of Science & Technology',
    location: 'Ishwardi, Pabna',
    startDate: '2023-06-01',
    targetEndDate: '2025-08-15',
    contractValueBDT: 620000000, // ৳62.00 Cr
    spentBDT: 590000000, // ৳59.00 Cr
    progressPercent: 96,
    status: 'Near Completion',
    projectManager: 'Engr. Kamrul Hasan',
    milestonesCount: 8,
    completedMilestones: 8
  },
  {
    id: 'prj-5',
    code: 'PRJ-SYL-005',
    name: 'Sylhet Bypass 4-Lane Highway & Concrete Bridges',
    client: 'Roads & Highways Department (RHD)',
    location: 'Sylhet Sadar Bypass, Sylhet',
    startDate: '2024-08-01',
    targetEndDate: '2027-02-28',
    contractValueBDT: 780000000, // ৳78.00 Cr
    spentBDT: 140000000, // ৳14.00 Cr
    progressPercent: 18,
    status: 'Active',
    projectManager: 'Engr. Rezaul Karim',
    milestonesCount: 11,
    completedMilestones: 2
  },
  {
    id: 'prj-6',
    code: 'PRJ-COX-006',
    name: 'Cox\'s Bazar Sea-Breeze Luxury Resort & Suites',
    client: 'Bay Sands Hospitality Consortium',
    location: 'Marine Drive, Kolatoli, Cox\'s Bazar',
    startDate: '2024-11-01',
    targetEndDate: '2027-10-31',
    contractValueBDT: 340000000, // ৳34.00 Cr
    spentBDT: 38000000, // ৳3.80 Cr
    progressPercent: 11,
    status: 'Active',
    projectManager: 'Engr. Mofizur Rahman',
    milestonesCount: 14,
    completedMilestones: 1
  }
];

export const INITIAL_BOQ: BOQItem[] = [
  {
    id: 'boq-1',
    itemCode: 'BOQ-RCC-01',
    description: 'Reinforced Cement Concrete (RCC M25 grade) in columns, pier caps and bridge deck slabs using Seven Rings/Crown Special Cement and 20mm crushed stone aggregate including shuttering, curing and de-shuttering.',
    category: 'Reinforced Concrete',
    unit: 'CFT',
    quantity: 45000,
    unitRateBDT: 420,
    totalBDT: 18900000,
    projectId: 'prj-1',
    status: 'Approved'
  },
  {
    id: 'boq-2',
    itemCode: 'BOQ-STL-02',
    description: 'Supplying, bending, binding and fixing in position 500W High-Yield deformed steel rebar (BSRM Centum / AKS) of sizes 16mm to 32mm according to structural drawings.',
    category: 'Structural Steel',
    unit: 'MT',
    quantity: 320,
    unitRateBDT: 98500,
    totalBDT: 31520000,
    projectId: 'prj-1',
    status: 'Approved'
  },
  {
    id: 'boq-3',
    itemCode: 'BOQ-BRK-03',
    description: '125mm thick first-class machine-made gas-burned brick masonry work in cement mortar (1:4) including racking joints, scaffolding and continuous water curing for 14 days.',
    category: 'Civil Works',
    unit: 'SFT',
    quantity: 85000,
    unitRateBDT: 145,
    totalBDT: 12325000,
    projectId: 'prj-3',
    status: 'Approved'
  },
  {
    id: 'boq-4',
    itemCode: 'BOQ-SND-04',
    description: 'Supplying coarse Sylhet Sand having Fineness Modulus (FM) not less than 2.50 free from silt, loam and organic impurities at site for structural casting.',
    category: 'Civil Works',
    unit: 'CFT',
    quantity: 65000,
    unitRateBDT: 72,
    totalBDT: 4680000,
    projectId: 'prj-1',
    status: 'Approved'
  },
  {
    id: 'boq-5',
    itemCode: 'BOQ-AGG-05',
    description: 'Supplying clean crushed stone aggregate (20mm down graded) from Pachagarh/Bholaganj boulders tested for Los Angeles abrasion and soundness.',
    category: 'Civil Works',
    unit: 'CFT',
    quantity: 75000,
    unitRateBDT: 185,
    totalBDT: 13875000,
    projectId: 'prj-2',
    status: 'Approved'
  },
  {
    id: 'boq-6',
    itemCode: 'BOQ-FIN-06',
    description: 'Applying two coats of weather-resistant elastomeric exterior paint over one coat of alkali-resistant primer on external surfaces including high-reach suspended scaffolding.',
    category: 'Finishing',
    unit: 'SFT',
    quantity: 110000,
    unitRateBDT: 48,
    totalBDT: 5280000,
    projectId: 'prj-3',
    status: 'Approved'
  },
  {
    id: 'boq-7',
    itemCode: 'BOQ-ERTH-07',
    description: 'Deep foundation mechanized excavation in all types of soils including dewatering, shoring and disposal of surplus soil outside municipal limits (lead up to 10km).',
    category: 'Earthwork',
    unit: 'CFT',
    quantity: 150000,
    unitRateBDT: 24,
    totalBDT: 3600000,
    projectId: 'prj-5',
    status: 'Revised'
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2025-089',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    supplierName: 'Seven Rings Cement Industrial Sales',
    supplierId: 'sup-1',
    orderDate: '2025-02-10',
    deliveryDate: '2025-02-18',
    totalAmountBDT: 2850000,
    paidAmountBDT: 2850000,
    status: 'Delivered',
    itemsSummary: '5,000 Bags Portland Composite Cement (PCC)'
  },
  {
    id: 'po-2',
    poNumber: 'PO-2025-090',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    supplierName: 'BSRM Steels Ltd - Corporate Projects',
    supplierId: 'sup-2',
    orderDate: '2025-02-15',
    deliveryDate: '2025-02-25',
    totalAmountBDT: 8372500,
    paidAmountBDT: 5000000,
    status: 'Partially Delivered',
    itemsSummary: '85 MT 500W High-Yield Deformed Rebar (20mm & 25mm)'
  },
  {
    id: 'po-3',
    poNumber: 'PO-2025-091',
    projectId: 'prj-3',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    supplierName: 'Meghna Aggregates & Stone Quarry Ltd',
    supplierId: 'sup-3',
    orderDate: '2025-02-20',
    deliveryDate: '2025-03-05',
    totalAmountBDT: 1440000,
    paidAmountBDT: 0,
    status: 'Pending',
    itemsSummary: '20,000 CFT Coarse Sylhet Sand (FM 2.50)'
  },
  {
    id: 'po-4',
    poNumber: 'PO-2025-092',
    projectId: 'prj-2',
    projectName: 'Chattogram Port Multi-purpose Container Yard',
    supplierName: 'Mir Concrete Products Ltd',
    supplierId: 'sup-4',
    orderDate: '2025-01-28',
    deliveryDate: '2025-02-05',
    totalAmountBDT: 3450000,
    paidAmountBDT: 3450000,
    status: 'Delivered',
    itemsSummary: '45,000 Pcs Heavy-Duty Interlocking Paver Blocks'
  },
  {
    id: 'po-5',
    poNumber: 'PO-2025-093',
    projectId: 'prj-5',
    projectName: 'Sylhet Bypass 4-Lane Highway & Concrete Bridges',
    supplierName: 'Rahimafrooz Energy & Power Generators',
    supplierId: 'sup-5',
    orderDate: '2025-02-02',
    deliveryDate: '2025-02-12',
    totalAmountBDT: 920000,
    paidAmountBDT: 920000,
    status: 'Delivered',
    itemsSummary: 'Lubricants & 12,000 Liters Heavy Diesel for Fleet'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    code: 'MAT-CEM-01',
    name: 'Seven Rings Special Portland Composite Cement (PCC)',
    category: 'Cement',
    unit: 'Bags',
    availableQty: 1850,
    minThresholdQty: 2500,
    unitCostBDT: 570,
    locationSite: 'Banani Central Yard - Flyover Segment 4',
    lastUpdated: '2025-02-22',
    status: 'Low Stock'
  },
  {
    id: 'inv-2',
    code: 'MAT-STL-02',
    name: 'BSRM Centum 500W High-Yield Rebar 20mm',
    category: 'Rebar / Rod',
    unit: 'MT',
    availableQty: 115,
    minThresholdQty: 40,
    unitCostBDT: 98500,
    locationSite: 'Airport Stockyard, Dhaka',
    lastUpdated: '2025-02-23',
    status: 'Adequate'
  },
  {
    id: 'inv-3',
    code: 'MAT-STL-03',
    name: 'AKS Grade 500W Deformed Rebar 16mm',
    category: 'Rebar / Rod',
    unit: 'MT',
    availableQty: 14,
    minThresholdQty: 30,
    unitCostBDT: 96000,
    locationSite: 'Uttara Sector 18 Basement Yard',
    lastUpdated: '2025-02-21',
    status: 'Critical'
  },
  {
    id: 'inv-4',
    code: 'MAT-SND-04',
    name: 'Sylhet Coarse Sand (FM 2.50)',
    category: 'Sand & Aggregates',
    unit: 'CFT',
    availableQty: 24500,
    minThresholdQty: 10000,
    unitCostBDT: 72,
    locationSite: 'Patenga Wharf Depot, Chattogram',
    lastUpdated: '2025-02-20',
    status: 'Adequate'
  },
  {
    id: 'inv-5',
    code: 'MAT-AGG-05',
    name: '20mm Down Graded Crushed Stone Aggregate',
    category: 'Sand & Aggregates',
    unit: 'CFT',
    availableQty: 8200,
    minThresholdQty: 15000,
    unitCostBDT: 185,
    locationSite: 'Banani Central Yard - Flyover Segment 4',
    lastUpdated: '2025-02-23',
    status: 'Low Stock'
  },
  {
    id: 'inv-6',
    code: 'MAT-BRK-06',
    name: 'First Class Machine Gas-Burned Red Bricks',
    category: 'Bricks & Blocks',
    unit: 'Nos',
    availableQty: 68000,
    minThresholdQty: 20000,
    unitCostBDT: 14,
    locationSite: 'Uttara Sector 18 Tower Complex',
    lastUpdated: '2025-02-18',
    status: 'Adequate'
  },
  {
    id: 'inv-7',
    code: 'MAT-PNT-07',
    name: 'Berger WeatherCoat Smooth Luxury Acrylic Paint',
    category: 'Finishing & Paints',
    unit: 'Gallons',
    availableQty: 120,
    minThresholdQty: 350,
    unitCostBDT: 3400,
    locationSite: 'Rooppur Township Warehouse',
    lastUpdated: '2025-02-19',
    status: 'Low Stock'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Seven Rings Cement Industrial Sales',
    contactPerson: 'S. M. Mahbubur Rahman',
    phone: '+880 1711-234567',
    email: 'corp.sales@sevenringscement.com',
    location: 'Gulshan-2, Dhaka',
    category: 'Cement & Raw Materials',
    activeOrdersCount: 4,
    totalSuppliedBDT: 48500000,
    outstandingBalanceBDT: 4200000,
    rating: 4.8
  },
  {
    id: 'sup-2',
    name: 'BSRM Steels Ltd - Corporate Projects Division',
    contactPerson: 'Engr. Kazi Ashfaqur',
    phone: '+880 1819-876543',
    email: 'infrastructure@bsrm.com',
    location: 'Ali Mansion, Sadarghat, Chattogram',
    category: 'Steel & Rebar',
    activeOrdersCount: 3,
    totalSuppliedBDT: 185000000,
    outstandingBalanceBDT: 16500000,
    rating: 4.9
  },
  {
    id: 'sup-3',
    name: 'Meghna Aggregates & Stone Quarry Ltd',
    contactPerson: 'Abdul Wadud Choudhury',
    phone: '+880 1733-445566',
    email: 'quarry.supply@meghna-group.biz',
    location: 'Bholaganj, Companiganj, Sylhet',
    category: 'Aggregate & Sand',
    activeOrdersCount: 5,
    totalSuppliedBDT: 38200000,
    outstandingBalanceBDT: 2800000,
    rating: 4.6
  },
  {
    id: 'sup-4',
    name: 'Mir Concrete Products Ltd',
    contactPerson: 'Mir Shakawat Hossain',
    phone: '+880 1971-112233',
    email: 'sales@mirconcrete.com',
    location: 'Mirpur-1, Dhaka',
    category: 'Cement & Raw Materials',
    activeOrdersCount: 2,
    totalSuppliedBDT: 24000000,
    outstandingBalanceBDT: 1100000,
    rating: 4.7
  },
  {
    id: 'sup-5',
    name: 'Rahimafrooz Energy & Power Generators',
    contactPerson: 'Tanveer Mahmud',
    phone: '+880 1713-998877',
    email: 'industrial.power@rahimafrooz.com',
    location: 'Tejgaon I/A, Dhaka',
    category: 'Heavy Equipment Rental',
    activeOrdersCount: 2,
    totalSuppliedBDT: 16500000,
    outstandingBalanceBDT: 850000,
    rating: 4.5
  }
];

export const INITIAL_SUBCONTRACTORS: Subcontractor[] = [
  {
    id: 'sub-1',
    companyName: 'Padma Deep Piling & Geosynthetic Foundation Works',
    contactPerson: 'Engr. Jahirul Islam',
    phone: '+880 1715-667788',
    trade: 'Piling & Foundation',
    assignedProject: 'Dhaka Elevated Expressway - Flyover Segment 4',
    contractAmountBDT: 85000000,
    paidAmountBDT: 68000000,
    retainedSecurityBDT: 4250000,
    complianceRating: 4.8,
    status: 'Active'
  },
  {
    id: 'sub-2',
    companyName: 'Bengal MEP & High-Voltage Electrical Substation Eng',
    contactPerson: 'Engr. Nazmul Huda',
    phone: '+880 1817-223344',
    trade: 'Electrical & Substation',
    assignedProject: 'Uttara Sector 18 Eco-Residential Tower Complex',
    contractAmountBDT: 34000000,
    paidAmountBDT: 18000000,
    retainedSecurityBDT: 1700000,
    complianceRating: 4.6,
    status: 'Active'
  },
  {
    id: 'sub-3',
    companyName: 'Concord HVAC & Central Air Conditioning Systems Ltd',
    contactPerson: 'Mustafizur Rahman',
    phone: '+880 1912-334455',
    trade: 'HVAC & Plumbing',
    assignedProject: 'Chattogram Port Multi-purpose Container Yard',
    contractAmountBDT: 22000000,
    paidAmountBDT: 16500000,
    retainedSecurityBDT: 1100000,
    complianceRating: 4.7,
    status: 'Active'
  },
  {
    id: 'sub-4',
    companyName: 'Vertex Structural Glazing & Aluminium Curtain Walls',
    contactPerson: 'Zakir Hossain',
    phone: '+880 1718-445566',
    trade: 'Glass & Facade',
    assignedProject: 'Cox\'s Bazar Sea-Breeze Luxury Resort & Suites',
    contractAmountBDT: 42000000,
    paidAmountBDT: 12000000,
    retainedSecurityBDT: 2100000,
    complianceRating: 4.4,
    status: 'Active'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    empId: 'NIR-0101',
    name: 'Engr. Farhan Mahmud',
    banglaName: 'প্রকৌ. ফারহান মাহমুদ',
    department: 'Project Engineering',
    designation: 'Chief Project Director (Infrastructure)',
    phone: '+880 1711-001122',
    assignedSite: 'Dhaka Elevated Expressway Segment 4',
    joiningDate: '2021-03-01',
    salaryBDT: 250000,
    status: 'Active'
  },
  {
    id: 'emp-2',
    empId: 'NIR-0102',
    name: 'Tanvir Ahmed, MRICS',
    banglaName: 'তানভীর আহমেদ',
    department: 'Quantity Surveying (QS)',
    designation: 'Lead Quantity Surveyor & Cost Controller',
    phone: '+880 1712-334455',
    assignedSite: 'Head Office - Banani',
    joiningDate: '2022-01-15',
    salaryBDT: 180000,
    status: 'Active'
  },
  {
    id: 'emp-3',
    empId: 'NIR-0103',
    name: 'Nusrat Jahan',
    banglaName: 'নুসরাত জাহান',
    department: 'Procurement',
    designation: 'Head of Central Procurement',
    phone: '+880 1819-556677',
    assignedSite: 'Head Office - Banani',
    joiningDate: '2020-07-10',
    salaryBDT: 165000,
    status: 'Active'
  },
  {
    id: 'emp-4',
    empId: 'NIR-0104',
    name: 'Md. Rafiqul Islam, CSP',
    banglaName: 'মো. রফিকুল ইসলাম',
    department: 'Site Safety',
    designation: 'Senior HSE & Compliance Specialist',
    phone: '+880 1911-778899',
    assignedSite: 'Patenga Coastline, Chattogram',
    joiningDate: '2022-08-01',
    salaryBDT: 130000,
    status: 'Active'
  },
  {
    id: 'emp-5',
    empId: 'NIR-0105',
    name: 'Shamsul Haque, FCA',
    banglaName: 'শামসুল হক',
    department: 'Accounts & Finance',
    designation: 'Chief Financial Controller',
    phone: '+880 1713-223344',
    assignedSite: 'Head Office - Banani',
    joiningDate: '2019-11-01',
    salaryBDT: 280000,
    status: 'Active'
  },
  {
    id: 'emp-6',
    empId: 'NIR-0106',
    name: 'Sabrina Chowdhury',
    banglaName: 'সাবরিনা চৌধুরী',
    department: 'Project Engineering',
    designation: 'Senior Resident Engineer',
    phone: '+880 1714-889900',
    assignedSite: 'Uttara Sector 18 Eco-Residential Complex',
    joiningDate: '2023-02-15',
    salaryBDT: 145000,
    status: 'Active'
  }
];

export const INITIAL_WORKFORCE: WorkforceAttendance[] = [
  {
    id: 'wf-1',
    date: '2025-02-23',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    trade: 'Rod Binders',
    presentCount: 68,
    overtimeHours: 136,
    dailyWagesBDT: 74800,
    shift: 'Day',
    supervisor: 'Md. Jalal Uddin (Sardar)'
  },
  {
    id: 'wf-2',
    date: '2025-02-23',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    trade: 'Carpenters & Shuttering',
    presentCount: 45,
    overtimeHours: 90,
    dailyWagesBDT: 54000,
    shift: 'Day',
    supervisor: 'Bashir Ahmed (Head Mistri)'
  },
  {
    id: 'wf-3',
    date: '2025-02-23',
    projectId: 'prj-3',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    trade: 'Masons / Rajmistri',
    presentCount: 38,
    overtimeHours: 38,
    dailyWagesBDT: 41800,
    shift: 'Day',
    supervisor: 'Akbar Ali Mistri'
  },
  {
    id: 'wf-4',
    date: '2025-02-23',
    projectId: 'prj-3',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    trade: 'General Helpers',
    presentCount: 82,
    overtimeHours: 82,
    dailyWagesBDT: 65600,
    shift: 'Day',
    supervisor: 'Sultan Mahmud'
  },
  {
    id: 'wf-5',
    date: '2025-02-23',
    projectId: 'prj-2',
    projectName: 'Chattogram Port Multi-purpose Container Yard',
    trade: 'Tile & Marble Technicians',
    presentCount: 22,
    overtimeHours: 44,
    dailyWagesBDT: 28600,
    shift: 'Morning',
    supervisor: 'Noor Mohammad'
  }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-1',
    code: 'EQ-EXC-01',
    name: 'SANY SY215C Hydraulic Excavator 21.5 Ton',
    type: 'Excavator',
    registrationNo: 'DHAKA-TA-11-4820',
    assignedProject: 'Dhaka Elevated Expressway - Flyover Segment 4',
    operatorName: 'Nurul Islam',
    status: 'Operational',
    fuelConsumptionPerHr: '14.5 Liters/Hr',
    nextServiceDate: '2025-03-15'
  },
  {
    id: 'eq-2',
    code: 'EQ-CRN-02',
    name: 'Zoomlion TC7035-16 Heavy Tower Crane',
    type: 'Tower Crane',
    registrationNo: 'DHAKA-ME-09-1234',
    assignedProject: 'Uttara Sector 18 Eco-Residential Complex',
    operatorName: 'Abul Kashem',
    status: 'Operational',
    fuelConsumptionPerHr: '28 kWh Electrical',
    nextServiceDate: '2025-03-01'
  },
  {
    id: 'eq-3',
    code: 'EQ-MIX-03',
    name: 'Schwing Stetter 7 CBM Concrete Transit Mixer',
    type: 'Concrete Mixer Truck',
    registrationNo: 'CTG-DA-15-7890',
    assignedProject: 'Chattogram Port Multi-purpose Container Yard',
    operatorName: 'Dulal Mia',
    status: 'Maintenance Required',
    fuelConsumptionPerHr: '9.2 Liters/Hr',
    nextServiceDate: '2025-02-24'
  },
  {
    id: 'eq-4',
    code: 'EQ-PLG-04',
    name: 'Junttan PM20 Hydraulic Precast Piling Rig',
    type: 'Piling Rig',
    registrationNo: 'DHAKA-TA-12-9901',
    assignedProject: 'Sylhet Bypass 4-Lane Highway & Bridges',
    operatorName: 'Gias Uddin',
    status: 'Operational',
    fuelConsumptionPerHr: '22.0 Liters/Hr',
    nextServiceDate: '2025-04-10'
  },
  {
    id: 'eq-5',
    code: 'EQ-GEN-05',
    name: 'Cummins 250 kVA Soundproof Heavy Diesel Generator',
    type: 'Diesel Generator',
    registrationNo: 'SITE-GEN-04',
    assignedProject: 'Rooppur Township Infrastructure & Roads',
    operatorName: 'Hafizur Rahman',
    status: 'Operational',
    fuelConsumptionPerHr: '36.5 Liters/Hr',
    nextServiceDate: '2025-03-20'
  }
];

export const INITIAL_CLIENT_LEADS: ClientLead[] = [
  {
    id: 'crm-1',
    clientName: 'Bashundhara Oil & Gas Company Ltd',
    organization: 'Bashundhara Group',
    phone: '+880 1713-004488',
    email: 'projects@bashundharagroup.com',
    projectType: 'Industrial Factory',
    expectedContractBDT: 240000000,
    leadStage: 'Negotiation',
    followUpDate: '2025-02-28',
    notes: 'Bitumen and asphalt production warehouse foundation design reviewed by technical committee.'
  },
  {
    id: 'crm-2',
    clientName: 'Sheltech Holdings Limited',
    organization: 'Sheltech Real Estate',
    phone: '+880 1819-335577',
    email: 'tenders@sheltech-bd.com',
    projectType: 'Commercial Complex',
    expectedContractBDT: 380000000,
    leadStage: 'BOQ Estimation Shared',
    followUpDate: '2025-03-05',
    notes: '22-story commercial tower in Gulshan Avenue. Rate analysis submitted for M30 grade concrete.'
  },
  {
    id: 'crm-3',
    clientName: 'Bangladesh Export Processing Zones Authority (BEPZA)',
    organization: 'Government of Bangladesh',
    phone: '+880 1711-889922',
    email: 'gm.engineering@bepza.gov.bd',
    projectType: 'Government Infrastructure',
    expectedContractBDT: 550000000,
    leadStage: 'Site Survey Done',
    followUpDate: '2025-03-12',
    notes: 'Mirsarai Economic Zone drainage, road network, and internal boundary wall package.'
  },
  {
    id: 'crm-4',
    clientName: 'United Hospital Limited - Chattogram Campus',
    organization: 'United Group Healthcare',
    phone: '+880 1971-446688',
    email: 'expansion@unitedhospital.com.bd',
    projectType: 'Hospital Facility',
    expectedContractBDT: 420000000,
    leadStage: 'New Inquiry',
    followUpDate: '2025-03-18',
    notes: '500-bed multi-disciplinary specialized hospital building in Nasirabad, Chattogram.'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-101',
    invoiceNo: 'INV-2025-041',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    clientName: 'Bangladesh Bridge Authority (BBA)',
    billingPeriod: 'January 2025 (Running Bill #14)',
    issuedDate: '2025-02-01',
    dueDate: '2025-02-28',
    amountBDT: 45000000,
    paidBDT: 45000000,
    dueBDT: 0,
    status: 'Paid'
  },
  {
    id: 'inv-102',
    invoiceNo: 'INV-2025-042',
    projectId: 'prj-2',
    projectName: 'Chattogram Port Multi-purpose Container Yard',
    clientName: 'Chittagong Port Authority (CPA)',
    billingPeriod: 'January 2025 (Running Bill #11)',
    issuedDate: '2025-02-05',
    dueDate: '2025-03-05',
    amountBDT: 38500000,
    paidBDT: 25000000,
    dueBDT: 13500000,
    status: 'Partially Paid'
  },
  {
    id: 'inv-103',
    invoiceNo: 'INV-2025-043',
    projectId: 'prj-3',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    clientName: 'Bengal Concord Real Estate Ltd',
    billingPeriod: 'Milestone 5 (Basement Cast)',
    issuedDate: '2025-02-12',
    dueDate: '2025-03-15',
    amountBDT: 22000000,
    paidBDT: 0,
    dueBDT: 22000000,
    status: 'Unpaid'
  },
  {
    id: 'inv-104',
    invoiceNo: 'INV-2025-044',
    projectId: 'prj-4',
    projectName: 'Rooppur Township Infrastructure & Internal Roads',
    clientName: 'Ministry of Science & Technology',
    billingPeriod: 'Final Handover Retention Release',
    issuedDate: '2025-01-10',
    dueDate: '2025-02-10',
    amountBDT: 18000000,
    paidBDT: 0,
    dueBDT: 18000000,
    status: 'Overdue'
  }
];

export const INITIAL_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-1',
    voucherNo: 'VCH-DHK-8821',
    date: '2025-02-22',
    projectId: 'prj-1',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    category: 'Fuel & Machineries',
    amountBDT: 345000,
    paymentMode: 'Bank Transfer',
    approvedBy: 'Engr. Farhan Mahmud',
    description: 'Bulk diesel procurement for generator fleet and excavators at Banani site.'
  },
  {
    id: 'exp-2',
    voucherNo: 'VCH-DHK-8822',
    date: '2025-02-21',
    projectId: 'prj-3',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    category: 'Labor & Wages',
    amountBDT: 195000,
    paymentMode: 'bKash/Nagad Enterprise',
    approvedBy: 'Sabrina Chowdhury',
    description: 'Weekly cash wages distribution for rod-binding and shuttering workforce.'
  },
  {
    id: 'exp-3',
    voucherNo: 'VCH-CTG-3301',
    date: '2025-02-19',
    projectId: 'prj-2',
    projectName: 'Chattogram Port Multi-purpose Container Yard',
    category: 'Subcontractor Bill',
    amountBDT: 1250000,
    paymentMode: 'Bank Transfer',
    approvedBy: 'Shamsul Haque (CFC)',
    description: 'Running bill payment to Concord HVAC for dock air ventilation duct installation.'
  },
  {
    id: 'exp-4',
    voucherNo: 'VCH-SYL-1190',
    date: '2025-02-18',
    projectId: 'prj-5',
    projectName: 'Sylhet Bypass 4-Lane Highway & Concrete Bridges',
    category: 'Municipal Permits',
    amountBDT: 85000,
    paymentMode: 'Site Petty Cash',
    approvedBy: 'Engr. Rezaul Karim',
    description: 'Local authority right-of-way fee and tree relocation environmental permit.'
  }
];

export const INITIAL_CONTRACTS: ContractRecord[] = [
  {
    id: 'cnt-1',
    contractNo: 'BBA/DEE/PKG-04/2023',
    title: 'Dhaka Elevated Expressway Flyover Construction Contract - Banani to Airport Viaduct',
    clientName: 'Bangladesh Bridge Authority (BBA)',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    signingDate: '2023-11-20',
    effectiveDate: '2024-01-15',
    completionDate: '2026-12-30',
    contractValueBDT: 1850000000,
    retentionMoneyPercent: 5.0,
    status: 'Active',
    performanceGuaranteeStatus: 'Secured'
  },
  {
    id: 'cnt-2',
    contractNo: 'CPA/DEV-CT/2023-09',
    title: 'Construction of Multi-Purpose Heavy Cargo Stacking Yard & Coastal Retaining Wall',
    clientName: 'Chittagong Port Authority (CPA)',
    projectName: 'Chattogram Port Multi-purpose Container Yard',
    signingDate: '2023-08-15',
    effectiveDate: '2023-09-01',
    completionDate: '2025-11-20',
    contractValueBDT: 920000000,
    retentionMoneyPercent: 7.5,
    status: 'Active',
    performanceGuaranteeStatus: 'Secured'
  },
  {
    id: 'cnt-3',
    contractNo: 'BCRE/UTT-18/CIVIL-24',
    title: 'Turnkey Civil Structural Package for Twin 25-Story Eco-Residential Towers',
    clientName: 'Bengal Concord Real Estate Ltd',
    projectName: 'Uttara Sector 18 Eco-Residential Tower Complex',
    signingDate: '2024-03-01',
    effectiveDate: '2024-04-10',
    completionDate: '2027-06-30',
    contractValueBDT: 485000000,
    retentionMoneyPercent: 10.0,
    status: 'Active',
    performanceGuaranteeStatus: 'Secured'
  }
];

export const COMPANY_PROFILES = [
  {
    id: 'cmp-1',
    name: 'Padma Bridge Infrastructure & Builders Ltd',
    shortName: 'Padma Infra Ltd',
    tin: 'BIN-19283746501',
    tradeLicense: 'TRAD/DSCC/029182/2024',
    headOffice: 'Padma Tower, 14 Mohakhali C/A, Dhaka-1212',
    phone: '+880 2 9887766',
    email: 'contact@padmainfra.com.bd',
    currency: 'BDT (৳)',
    fiscalYear: 'July - June (Bangladesh FY)'
  },
  {
    id: 'cmp-2',
    name: 'Bengal Concord Builders & Engineering Ltd',
    shortName: 'Bengal Concord',
    tin: 'BIN-99281726354',
    tradeLicense: 'TRAD/DNCC/082736/2024',
    headOffice: 'Concord Plaza, Road 11, Banani, Dhaka-1213',
    phone: '+880 2 8834455',
    email: 'info@bengalconcord.com.bd',
    currency: 'BDT (৳)',
    fiscalYear: 'July - June (Bangladesh FY)'
  },
  {
    id: 'cmp-3',
    name: 'Chattogram Coastal Port Engineering Consortium',
    shortName: 'Port Infra BD',
    tin: 'BIN-55443322110',
    tradeLicense: 'TRAD/CCC/019283/2024',
    headOffice: 'Agrabad C/A, Chattogram-4100',
    phone: '+880 31 712233',
    email: 'contact@portinfrabd.com',
    currency: 'BDT (৳)',
    fiscalYear: 'July - June (Bangladesh FY)'
  }
];
