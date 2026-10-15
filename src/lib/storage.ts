'use client';

import {
  INITIAL_PROJECTS,
  INITIAL_BOQ,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_SUPPLIERS,
  INITIAL_SUBCONTRACTORS,
  INITIAL_EMPLOYEES,
  INITIAL_WORKFORCE,
  INITIAL_EQUIPMENT,
  INITIAL_CLIENT_LEADS,
  INITIAL_INVOICES,
  INITIAL_EXPENSES,
  INITIAL_CONTRACTS,
  ERP_MODULES,
  COMPANY_PROFILES
} from './mock-data/erp-data';
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
  ContractRecord
} from './types';

const STORAGE_KEYS = {
  PROJECTS: 'nirman_erp_projects_v1',
  BOQ: 'nirman_erp_boq_v1',
  PURCHASE_ORDERS: 'nirman_erp_pos_v1',
  INVENTORY: 'nirman_erp_inventory_v1',
  SUPPLIERS: 'nirman_erp_suppliers_v1',
  SUBCONTRACTORS: 'nirman_erp_subcontractors_v1',
  EMPLOYEES: 'nirman_erp_employees_v1',
  WORKFORCE: 'nirman_erp_workforce_v1',
  EQUIPMENT: 'nirman_erp_equipment_v1',
  CLIENT_LEADS: 'nirman_erp_leads_v1',
  INVOICES: 'nirman_erp_invoices_v1',
  EXPENSES: 'nirman_erp_expenses_v1',
  CONTRACTS: 'nirman_erp_contracts_v1',
  SELECTED_MODULES: 'nirman_erp_selected_modules_v1',
  ACTIVE_COMPANY: 'nirman_erp_active_company_v1'
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading localStorage key ${key}:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event('nirman-storage-change'));
  } catch (err) {
    console.warn(`Error writing localStorage key ${key}:`, err);
  }
}

export const ERPStorage = {
  // Projects
  getProjects: (): Project[] => safeGet(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS),
  saveProjects: (data: Project[]) => safeSet(STORAGE_KEYS.PROJECTS, data),
  addProject: (project: Project) => {
    const list = safeGet<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    safeSet(STORAGE_KEYS.PROJECTS, [project, ...list]);
  },
  updateProject: (project: Project) => {
    const list = safeGet<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    safeSet(STORAGE_KEYS.PROJECTS, list.map(p => p.id === project.id ? project : p));
  },
  deleteProject: (id: string) => {
    const list = safeGet<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    safeSet(STORAGE_KEYS.PROJECTS, list.filter(p => p.id !== id));
  },

  // BOQ
  getBOQ: (): BOQItem[] => safeGet(STORAGE_KEYS.BOQ, INITIAL_BOQ),
  saveBOQ: (data: BOQItem[]) => safeSet(STORAGE_KEYS.BOQ, data),
  addBOQItem: (item: BOQItem) => {
    const list = safeGet<BOQItem[]>(STORAGE_KEYS.BOQ, INITIAL_BOQ);
    safeSet(STORAGE_KEYS.BOQ, [item, ...list]);
  },
  updateBOQItem: (item: BOQItem) => {
    const list = safeGet<BOQItem[]>(STORAGE_KEYS.BOQ, INITIAL_BOQ);
    safeSet(STORAGE_KEYS.BOQ, list.map(b => b.id === item.id ? item : b));
  },
  deleteBOQItem: (id: string) => {
    const list = safeGet<BOQItem[]>(STORAGE_KEYS.BOQ, INITIAL_BOQ);
    safeSet(STORAGE_KEYS.BOQ, list.filter(b => b.id !== id));
  },

  // Purchase Orders
  getPOs: (): PurchaseOrder[] => safeGet(STORAGE_KEYS.PURCHASE_ORDERS, INITIAL_PURCHASE_ORDERS),
  addPO: (po: PurchaseOrder) => {
    const list = safeGet<PurchaseOrder[]>(STORAGE_KEYS.PURCHASE_ORDERS, INITIAL_PURCHASE_ORDERS);
    safeSet(STORAGE_KEYS.PURCHASE_ORDERS, [po, ...list]);
  },

  // Inventory
  getInventory: (): InventoryItem[] => safeGet(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY),
  addInventoryItem: (item: InventoryItem) => {
    const list = safeGet<InventoryItem[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
    safeSet(STORAGE_KEYS.INVENTORY, [item, ...list]);
  },

  // Suppliers & Subcontractors
  getSuppliers: (): Supplier[] => safeGet(STORAGE_KEYS.SUPPLIERS, INITIAL_SUPPLIERS),
  getSubcontractors: (): Subcontractor[] => safeGet(STORAGE_KEYS.SUBCONTRACTORS, INITIAL_SUBCONTRACTORS),

  // Employees & Workforce
  getEmployees: (): Employee[] => safeGet(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES),
  getWorkforce: (): WorkforceAttendance[] => safeGet(STORAGE_KEYS.WORKFORCE, INITIAL_WORKFORCE),
  addWorkforce: (wf: WorkforceAttendance) => {
    const list = safeGet<WorkforceAttendance[]>(STORAGE_KEYS.WORKFORCE, INITIAL_WORKFORCE);
    safeSet(STORAGE_KEYS.WORKFORCE, [wf, ...list]);
  },

  // Equipment
  getEquipment: (): Equipment[] => safeGet(STORAGE_KEYS.EQUIPMENT, INITIAL_EQUIPMENT),

  // CRM Leads
  getClientLeads: (): ClientLead[] => safeGet(STORAGE_KEYS.CLIENT_LEADS, INITIAL_CLIENT_LEADS),
  addLead: (lead: ClientLead) => {
    const list = safeGet<ClientLead[]>(STORAGE_KEYS.CLIENT_LEADS, INITIAL_CLIENT_LEADS);
    safeSet(STORAGE_KEYS.CLIENT_LEADS, [lead, ...list]);
  },

  // Invoices & Expenses
  getInvoices: (): Invoice[] => safeGet(STORAGE_KEYS.INVOICES, INITIAL_INVOICES),
  addInvoice: (inv: Invoice) => {
    const list = safeGet<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
    safeSet(STORAGE_KEYS.INVOICES, [inv, ...list]);
  },
  getExpenses: (): ExpenseRecord[] => safeGet(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES),
  addExpense: (exp: ExpenseRecord) => {
    const list = safeGet<ExpenseRecord[]>(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
    safeSet(STORAGE_KEYS.EXPENSES, [exp, ...list]);
  },

  // Contracts
  getContracts: (): ContractRecord[] => safeGet(STORAGE_KEYS.CONTRACTS, INITIAL_CONTRACTS),

  // Selected Modules for Configurator & Quote Flow
  getSelectedModules: (): string[] => {
    const defaultSelected = ERP_MODULES.filter(m => m.isCore).map(m => m.id);
    return safeGet(STORAGE_KEYS.SELECTED_MODULES, defaultSelected);
  },
  saveSelectedModules: (ids: string[]) => safeSet(STORAGE_KEYS.SELECTED_MODULES, ids),

  // Active Demo Company
  getActiveCompanyId: (): string => safeGet(STORAGE_KEYS.ACTIVE_COMPANY, COMPANY_PROFILES[0].id),
  setActiveCompanyId: (id: string) => safeSet(STORAGE_KEYS.ACTIVE_COMPANY, id),

  // Reset all to demo factory defaults
  resetAllDemoData: () => {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => window.localStorage.removeItem(key));
    window.dispatchEvent(new Event('nirman-storage-change'));
  }
};
