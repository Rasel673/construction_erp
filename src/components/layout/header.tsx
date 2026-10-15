'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Search,
  Building2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Shield,
  Layers,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { COMPANY_PROFILES } from '@/lib/mock-data/erp-data';
import { ERPStorage } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  onOpenMobile: () => void;
}

export function Header({ onOpenMobile }: HeaderProps) {
  const pathname = usePathname();
  const [activeCompanyId, setActiveCompanyId] = useState(COMPANY_PROFILES[0].id);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  useEffect(() => {
    setActiveCompanyId(ERPStorage.getActiveCompanyId());
  }, []);

  const activeCompany = COMPANY_PROFILES.find(c => c.id === activeCompanyId) || COMPANY_PROFILES[0];

  const handleSelectCompany = (id: string) => {
    setActiveCompanyId(id);
    ERPStorage.setActiveCompanyId(id);
    setCompanyDropdownOpen(false);
  };

  const handleResetDemoData = () => {
    ERPStorage.resetAllDemoData();
    setResetSuccessMessage(true);
    setProfileOpen(false);
    setTimeout(() => {
      setResetSuccessMessage(false);
      window.location.reload();
    }, 800);
  };

  // Build breadcrumbs
  const getBreadcrumbTitle = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length <= 1) return 'Executive Dashboard';
    const segment = parts[1];
    const map: Record<string, string> = {
      modules: 'All ERP Modules',
      projects: 'Project Management',
      estimation: 'Estimation & BOQ',
      contracts: 'Contracts Management',
      progress: 'Progress & Milestones',
      procurement: 'Procurement & Purchase Orders',
      inventory: 'Inventory & Materials',
      suppliers: 'Supplier Management',
      subcontractors: 'Subcontractor Management',
      hrm: 'HRM & Employee Management',
      workforce: 'Workforce & Daily Wages',
      equipment: 'Heavy Equipment & Fleet',
      crm: 'CRM & Tender Inquiries',
      billing: 'Billing & Invoices',
      expenses: 'Site Expenses',
      accounting: 'Financial Summaries',
      reports: 'Reports & Audits',
      licensing: 'Module Licensing',
      settings: 'Company Settings'
    };
    return map[segment] || segment.toUpperCase();
  };

  const notifications = [
    { id: 1, title: 'Low Stock Alert', desc: 'Seven Rings Cement in Banani Yard is under 2,000 bags.', time: '10m ago', urgent: true },
    { id: 2, title: 'Milestone Completed', desc: 'Dhaka Elevated Expressway: Pier Cap 18 cast successfully.', time: '1h ago', urgent: false },
    { id: 3, title: 'PO Approved', desc: 'PO-2025-090 for BSRM Steel 500W signed by Project Director.', time: '3h ago', urgent: false }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <Link href="/demo" className="text-slate-400 hover:text-[#6D28D9] transition-colors hidden sm:inline">
              Construction ERP
            </Link>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <span className="font-semibold text-slate-800">{getBreadcrumbTitle()}</span>
          </div>
        </div>

        {/* Center: Search Trigger (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setShowSearchModal(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 text-slate-400 text-xs hover:border-purple-300 hover:bg-white transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search projects, BOQ items, materials, vendors...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-200/70 text-slate-600 rounded font-mono">Ctrl+K</kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Demo Environment Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold">DEMO MODE</span>
            <span className="text-[11px] text-emerald-600">• No Login Required</span>
          </div>

          {/* Company Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setCompanyDropdownOpen(!companyDropdownOpen);
                setNotificationsOpen(false);
                setProfileOpen(false);
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-700 transition-colors"
            >
              <Building2 className="w-4 h-4 text-[#6D28D9]" />
              <span className="font-medium max-w-[130px] truncate hidden md:inline">{activeCompany.shortName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {companyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Switch Operating Company</p>
                  <p className="text-xs text-slate-500">Demo profiles with local tax and fiscal setups</p>
                </div>
                <div className="p-1 space-y-0.5">
                  {COMPANY_PROFILES.map(comp => (
                    <button
                      key={comp.id}
                      onClick={() => handleSelectCompany(comp.id)}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between hover:bg-[#F5F3FF] transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">{comp.name}</p>
                        <p className="text-[11px] text-slate-500">{comp.tin} • {comp.currency}</p>
                      </div>
                      {comp.id === activeCompanyId && <Check className="w-4 h-4 text-[#6D28D9]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setCompanyDropdownOpen(false);
                setProfileOpen(false);
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#6D28D9] ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Operational Alerts</span>
                  <Badge variant="purple">3 New</Badge>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold ${n.urgent ? 'text-rose-600' : 'text-slate-800'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="px-3 pt-2 border-t border-slate-100 text-center">
                  <Link
                    href="/demo/inventory"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] font-semibold text-[#6D28D9] hover:underline"
                  >
                    View All Low Stock Alerts
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setCompanyDropdownOpen(false);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                CE
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">Demo Managing Director</p>
                  <p className="text-[11px] text-[#6D28D9] font-medium">Enterprise Evaluation Mode</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Full Admin Access (Simulation)</p>
                </div>

                <div className="p-1 space-y-0.5">
                  <Link
                    href="/demo/modules"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-[#F5F3FF] hover:text-[#6D28D9] rounded-lg transition-colors"
                  >
                    <Layers className="w-4 h-4 text-slate-400" />
                    <span>Explore All 19 ERP Modules</span>
                  </Link>

                  <Link
                    href="/configure"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-[#F5F3FF] hover:text-[#6D28D9] rounded-lg transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                    <span>Configure Custom Bundle</span>
                  </Link>

                  <Link
                    href="/demo/licensing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-[#F5F3FF] hover:text-[#6D28D9] rounded-lg transition-colors"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>Licensing & Module Pricing</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleResetDemoData}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-medium"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Demo Data to Default</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reset Feedback Notification */}
      {resetSuccessMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>Demo database restored to default settings! Refreshing...</span>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-3 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#6D28D9]" />
              <input
                type="text"
                autoFocus
                placeholder="Search projects, BOQ, equipment, POs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 text-sm outline-none text-slate-800 placeholder-slate-400"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs px-2 py-1 bg-slate-100 text-slate-500 rounded font-medium hover:bg-slate-200"
              >
                ESC
              </button>
            </div>

            <div className="p-4 max-h-80 overflow-y-auto space-y-3">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Quick Navigation Links</div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/demo/projects"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-[#F5F3FF] transition-all text-left"
                >
                  <p className="text-xs font-semibold text-slate-800">Projects Directory</p>
                  <p className="text-[11px] text-slate-500">6 Active Infrastructure Projects</p>
                </Link>
                <Link
                  href="/demo/estimation"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-[#F5F3FF] transition-all text-left"
                >
                  <p className="text-xs font-semibold text-slate-800">Estimation & BOQ</p>
                  <p className="text-[11px] text-slate-500">Auto Line & Grand Totals</p>
                </Link>
                <Link
                  href="/demo/inventory"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-[#F5F3FF] transition-all text-left"
                >
                  <p className="text-xs font-semibold text-slate-800">Inventory Stock</p>
                  <p className="text-[11px] text-slate-500">Cement, Rebar, Sand Alerts</p>
                </Link>
                <Link
                  href="/demo/reports"
                  onClick={() => setShowSearchModal(false)}
                  className="p-2.5 rounded-lg border border-slate-100 hover:border-purple-200 hover:bg-[#F5F3FF] transition-all text-left"
                >
                  <p className="text-xs font-semibold text-slate-800">Reports & Analytics</p>
                  <p className="text-[11px] text-slate-500">Variance & Cost Analysis</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
