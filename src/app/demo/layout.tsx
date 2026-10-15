'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';
import { Info, Sparkles, SlidersHorizontal, Send } from 'lucide-react';
import Link from 'next/link';

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top Demo Notification Strip */}
      <div className="bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white py-1.5 px-4 text-xs font-medium flex items-center justify-between shadow-xs z-50">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="font-semibold text-amber-200 uppercase tracking-wide">Interactive Demo Environment</span>
          <span className="hidden sm:inline text-purple-200">
            • Explore all 19 Construction ERP modules with realistic Bangladeshi project data without login.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/configure"
            className="hidden md:inline-flex items-center gap-1 text-[11px] bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Select Modules</span>
          </Link>
          <Link
            href="/request-quote"
            className="inline-flex items-center gap-1 text-[11px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-2.5 py-0.5 rounded-full transition-colors shadow-2xs"
          >
            <Send className="w-3 h-3" />
            <span>Request a Quote</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div
          className={cn(
            'flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out',
            collapsed ? 'md:ml-20' : 'md:ml-72'
          )}
        >
          <Header onOpenMobile={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {children}
          </main>

          {/* Simple Clean Footer */}
          <footer className="border-t border-slate-200/80 bg-white px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">NirmanERP Bangladesh</span>
              <span>— Modern Enterprise Construction Operations Platform</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Link href="/demo/modules" className="hover:text-[#6D28D9] transition-colors">Module Directory</Link>
              <Link href="/configure" className="hover:text-[#6D28D9] transition-colors">Configurator</Link>
              <Link href="/request-quote" className="hover:text-[#6D28D9] transition-colors">Request Quote</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
