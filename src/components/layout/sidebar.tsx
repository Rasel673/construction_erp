'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  HardHat,
  Calculator,
  FileSignature,
  FlagTriangleRight,
  ShoppingCart,
  Boxes,
  Truck,
  Network,
  Users,
  UserCheck,
  Wrench,
  Briefcase,
  Receipt,
  CreditCard,
  PieChart,
  BarChart3,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  SlidersHorizontal,
  Send,
  Building2,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavGroup {
  name: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    name: 'Core Operations',
    items: [
      { name: 'Dashboard', href: '/demo', icon: LayoutDashboard },
      { name: 'Project Management', href: '/demo/projects', icon: HardHat, badge: '6' },
      { name: 'Estimation & BOQ', href: '/demo/estimation', icon: Calculator },
      { name: 'Contracts', href: '/demo/contracts', icon: FileSignature },
      { name: 'Progress & Milestones', href: '/demo/progress', icon: FlagTriangleRight }
    ]
  },
  {
    name: 'Procurement & Stock',
    items: [
      { name: 'Purchase Orders', href: '/demo/procurement', icon: ShoppingCart },
      { name: 'Inventory & Materials', href: '/demo/inventory', icon: Boxes, badge: 'Alert' },
      { name: 'Suppliers', href: '/demo/suppliers', icon: Truck },
      { name: 'Subcontractors', href: '/demo/subcontractors', icon: Network }
    ]
  },
  {
    name: 'People & Fleet',
    items: [
      { name: 'HRM & Officers', href: '/demo/hrm', icon: Users },
      { name: 'Site Workforce & Wages', href: '/demo/workforce', icon: UserCheck },
      { name: 'Heavy Equipment', href: '/demo/equipment', icon: Wrench }
    ]
  },
  {
    name: 'Finance & Accounts',
    items: [
      { name: 'CRM & Client Leads', href: '/demo/crm', icon: Briefcase },
      { name: 'Billing & Invoices', href: '/demo/billing', icon: Receipt },
      { name: 'Site Expenses', href: '/demo/expenses', icon: CreditCard },
      { name: 'Financial Accounts', href: '/demo/accounting', icon: PieChart }
    ]
  },
  {
    name: 'Analytics & Admin',
    items: [
      { name: 'Reports & Audits', href: '/demo/reports', icon: BarChart3 },
      { name: 'Module Licensing', href: '/demo/licensing', icon: ShieldCheck },
      { name: 'Company Settings', href: '/demo/settings', icon: Settings }
    ]
  }
];

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Core Operations': true,
    'Procurement & Stock': true,
    'People & Fleet': true,
    'Finance & Accounts': true,
    'Analytics & Admin': true
  });

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (href: string) => {
    if (href === '/demo') return pathname === '/demo';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-72',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/demo" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20 shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Nirman<span className="text-[#6D28D9]">ERP</span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 bg-[#F5F3FF] text-[#6D28D9] rounded border border-[#DDD6FE]">BD</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Construction Suite</span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            onClick={onToggleCollapse}
            aria-label="Toggle Sidebar"
            className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {NAV_GROUPS.map(group => {
            const isOpen = openSections[group.name] !== false;
            return (
              <div key={group.name} className="space-y-1">
                {!collapsed && (
                  <button
                    onClick={() => toggleSection(group.name)}
                    className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider hover:text-slate-900 transition-colors"
                  >
                    <span>{group.name}</span>
                    {isOpen ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
                  </button>
                )}

                {(isOpen || collapsed) && (
                  <div className="space-y-0.5">
                    {group.items.map(item => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => onCloseMobile()}
                          title={collapsed ? item.name : undefined}
                          className={cn(
                            'group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                            active
                              ? 'bg-[#6D28D9] text-white shadow-xs font-semibold'
                              : 'text-slate-600 hover:bg-[#F5F3FF] hover:text-[#6D28D9]'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-4 h-4 shrink-0 transition-transform group-hover:scale-105',
                              active ? 'text-white' : 'text-slate-500 group-hover:text-[#6D28D9]'
                            )}
                          />
                          {!collapsed && (
                            <span className="flex-1 truncate">{item.name}</span>
                          )}
                          {!collapsed && item.badge && (
                            <span
                              className={cn(
                                'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                                active
                                  ? 'bg-white/20 text-white'
                                  : item.badge === 'Alert'
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-slate-100 text-slate-600'
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer with Configurator & Landing CTA */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-1.5">
          <Link
            href="/configure"
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] hover:bg-[#EDE9FE] transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title="Configure Modules"
          >
            <SlidersHorizontal className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Configure Your ERP</span>}
          </Link>

          <Link
            href="/request-quote"
            className={cn(
              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-[#6D28D9] hover:bg-[#5B21B6] transition-colors',
              collapsed && 'justify-center px-2'
            )}
            title="Request a Quote"
          >
            <Send className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Request a Quote</span>}
          </Link>

          {!collapsed && (
            <Link
              href="/"
              className="flex items-center justify-between px-3 py-1.5 rounded text-[11px] text-slate-500 hover:text-slate-900 transition-colors"
            >
              <span>Public Landing Page</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
