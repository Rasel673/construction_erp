export type CurrencyFormat = 'standard' | 'lakh-crore';

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  startDate: string;
  targetEndDate: string;
  contractValueBDT: number;
  spentBDT: number;
  progressPercent: number;
  status: 'In Planning' | 'Active' | 'Near Completion' | 'On Hold' | 'Completed';
  projectManager: string;
  milestonesCount: number;
  completedMilestones: number;
}

export interface BOQItem {
  id: string;
  itemCode: string;
  description: string;
  category: 'Civil Works' | 'Structural Steel' | 'Reinforced Concrete' | 'Finishing' | 'MEP Services' | 'Earthwork';
  unit: 'CFT' | 'SFT' | 'MT' | 'Bags' | 'Nos' | 'Running Meter';
  quantity: number;
  unitRateBDT: number;
  totalBDT: number;
  projectId: string;
  status: 'Draft' | 'Approved' | 'Revised';
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  projectId: string;
  projectName: string;
  supplierName: string;
  supplierId: string;
  orderDate: string;
  deliveryDate: string;
  totalAmountBDT: number;
  paidAmountBDT: number;
  status: 'Pending' | 'Partially Delivered' | 'Delivered' | 'Paid' | 'Cancelled';
  itemsSummary: string;
}

export interface InventoryItem {
  id: string;
  code: string;
  name: string;
  category: 'Cement' | 'Rebar / Rod' | 'Bricks & Blocks' | 'Sand & Aggregates' | 'Finishing & Paints' | 'Plumbing & Electrical';
  unit: 'Bags' | 'MT' | 'CFT' | 'Nos' | 'Gallons';
  availableQty: number;
  minThresholdQty: number;
  unitCostBDT: number;
  locationSite: string;
  lastUpdated: string;
  status: 'Adequate' | 'Low Stock' | 'Critical';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  category: 'Cement & Raw Materials' | 'Steel & Rebar' | 'Aggregate & Sand' | 'Heavy Equipment Rental' | 'Sanitary & Tiles';
  activeOrdersCount: number;
  totalSuppliedBDT: number;
  outstandingBalanceBDT: number;
  rating: number;
}

export interface Subcontractor {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  trade: 'Piling & Foundation' | 'Electrical & Substation' | 'HVAC & Plumbing' | 'Glass & Facade' | 'Painting & Finishing';
  assignedProject: string;
  contractAmountBDT: number;
  paidAmountBDT: number;
  retainedSecurityBDT: number;
  complianceRating: number;
  status: 'Active' | 'Reviewing' | 'Completed';
}

export interface Employee {
  id: string;
  empId: string;
  name: string;
  banglaName?: string;
  department: 'Project Engineering' | 'Procurement' | 'Quantity Surveying (QS)' | 'Site Safety' | 'Accounts & Finance' | 'HR & Admin';
  designation: string;
  phone: string;
  assignedSite: string;
  joiningDate: string;
  salaryBDT: number;
  status: 'Active' | 'On Leave' | 'Transferred';
}

export interface WorkforceAttendance {
  id: string;
  date: string;
  projectId: string;
  projectName: string;
  trade: 'Masons / Rajmistri' | 'Rod Binders' | 'Carpenters & Shuttering' | 'General Helpers' | 'Tile & Marble Technicians';
  presentCount: number;
  overtimeHours: number;
  dailyWagesBDT: number;
  shift: 'Morning' | 'Day' | 'Night Extended';
  supervisor: string;
}

export interface Equipment {
  id: string;
  code: string;
  name: string;
  type: 'Excavator' | 'Tower Crane' | 'Concrete Mixer Truck' | 'Piling Rig' | 'Diesel Generator' | 'Scaffolding Set';
  registrationNo: string;
  assignedProject: string;
  operatorName: string;
  status: 'Operational' | 'Maintenance Required' | 'Idle' | 'In Transit';
  fuelConsumptionPerHr: string;
  nextServiceDate: string;
}

export interface ClientLead {
  id: string;
  clientName: string;
  organization: string;
  phone: string;
  email: string;
  projectType: 'Commercial Complex' | 'Residential High-rise' | 'Government Infrastructure' | 'Industrial Factory' | 'Hospital Facility';
  expectedContractBDT: number;
  leadStage: 'New Inquiry' | 'Site Survey Done' | 'BOQ Estimation Shared' | 'Negotiation' | 'Contract Won' | 'Lost';
  followUpDate: string;
  notes: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  projectId: string;
  projectName: string;
  clientName: string;
  billingPeriod: string;
  issuedDate: string;
  dueDate: string;
  amountBDT: number;
  paidBDT: number;
  dueBDT: number;
  status: 'Paid' | 'Partially Paid' | 'Unpaid' | 'Overdue';
}

export interface ExpenseRecord {
  id: string;
  voucherNo: string;
  date: string;
  projectId: string;
  projectName: string;
  category: 'Raw Materials' | 'Labor & Wages' | 'Subcontractor Bill' | 'Fuel & Machineries' | 'Site Overheads' | 'Municipal Permits';
  amountBDT: number;
  paymentMode: 'Bank Transfer' | 'Site Petty Cash' | 'Cheque' | 'bKash/Nagad Enterprise';
  approvedBy: string;
  description: string;
}

export interface ContractRecord {
  id: string;
  contractNo: string;
  title: string;
  clientName: string;
  projectName: string;
  signingDate: string;
  effectiveDate: string;
  completionDate: string;
  contractValueBDT: number;
  retentionMoneyPercent: number;
  status: 'Active' | 'Under Review' | 'Extension Requested' | 'Closed';
  performanceGuaranteeStatus: 'Secured' | 'Pending Renewal';
}

export interface ERPModuleMeta {
  id: string;
  slug: string;
  name: string;
  banglaName: string;
  category: 'Projects and Operations' | 'Procurement and Inventory' | 'People and Resources' | 'Customers and Finance' | 'Reports and Analytics' | 'Administration';
  icon: string;
  shortDesc: string;
  description: string;
  features: string[];
  isCore: boolean;
  indicativePriceBDTPerMonth: number;
  href: string;
}

export interface QuoteRequestForm {
  companyName: string;
  contactPerson: string;
  phone: string;
  email?: string;
  companyType: 'General Contractor' | 'Real Estate Developer' | 'Subcontractor / Trade Specialist' | 'Infrastructure & Civil Eng';
  selectedModules: string[];
  additionalRequirements?: string;
}
