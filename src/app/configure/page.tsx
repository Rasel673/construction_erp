'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  Check,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Info,
  CheckCircle2,
  Send,
  RotateCcw
} from 'lucide-react';
import { ERP_MODULES } from '@/lib/mock-data/erp-data';
import { ERPStorage } from '@/lib/storage';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConfigureERPPage() {
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    setSelectedModuleIds(ERPStorage.getSelectedModules());
  }, []);

  const toggleModule = (id: string, isCore: boolean) => {
    let next: string[];
    if (selectedModuleIds.includes(id)) {
      next = selectedModuleIds.filter(m => m !== id);
    } else {
      next = [...selectedModuleIds, id];
    }
    setSelectedModuleIds(next);
    ERPStorage.saveSelectedModules(next);
  };

  const selectAll = () => {
    const allIds = ERP_MODULES.map(m => m.id);
    setSelectedModuleIds(allIds);
    ERPStorage.saveSelectedModules(allIds);
  };

  const selectCoreOnly = () => {
    const coreIds = ERP_MODULES.filter(m => m.isCore).map(m => m.id);
    setSelectedModuleIds(coreIds);
    ERPStorage.saveSelectedModules(coreIds);
  };

  const categories = [
    'All',
    'Projects and Operations',
    'Procurement and Inventory',
    'People and Resources',
    'Customers and Finance',
    'Reports and Analytics',
    'Administration'
  ];

  const filteredModules = ERP_MODULES.filter(m =>
    activeCategory === 'All' ? true : m.category === activeCategory
  );

  const selectedModules = ERP_MODULES.filter(m => selectedModuleIds.includes(m.id));
  const totalMonthlyBDT = selectedModules.reduce((acc, m) => acc + m.indicativePriceBDTPerMonth, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Nirman<span className="text-[#6D28D9]">ERP</span>
            </span>
            <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded bg-purple-50 text-[#6D28D9] font-semibold border border-purple-200">
              Configurator
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button variant="ghost" size="sm">
              <span>Interactive Dashboard</span>
            </Button>
          </Link>
          <Link href="/request-quote">
            <Button variant="primary" size="sm">
              <span>Continue to Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tailored For Bangladeshi Construction Firms</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Configure Your Custom Construction ERP
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Every contractor operates differently. Select exactly the modules you need for your sites, plant, workforce and finance. We customize and deploy only what fits your business.
            </p>
          </div>

          {/* Configuration Summary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[280px] shrink-0 text-center sm:text-left space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-200">
              <span>Selected Scope:</span>
              <strong className="text-white text-sm">{selectedModuleIds.length} / {ERP_MODULES.length} Modules</strong>
            </div>

            <div className="border-t border-white/10 pt-2">
              <span className="text-[11px] text-purple-200 block uppercase font-medium">Indicative Estimate:</span>
              <div className="text-2xl font-extrabold text-amber-300">
                ৳{totalMonthlyBDT.toLocaleString()}<span className="text-xs font-normal text-white"> / month</span>
              </div>
            </div>

            <Link href="/request-quote" className="block pt-1">
              <Button variant="secondary" size="md" className="w-full bg-white text-[#6D28D9] hover:bg-purple-50 font-bold border-none shadow-sm">
                <Send className="w-4 h-4" />
                <span>Request Custom Quote</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Action Controls & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={selectAll} className="text-xs">
              Select All (19)
            </Button>
            <Button variant="outline" size="sm" onClick={selectCoreOnly} className="text-xs">
              Core Modules Only
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? 'All Modules' : cat.split(' and ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Module Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredModules.map(mod => {
            const isSelected = selectedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id, mod.isCore)}
                className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#6D28D9] bg-white shadow-md ring-2 ring-[#8B5CF6]/30'
                    : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#6D28D9] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <IconRenderer name={mod.icon} size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={mod.isCore ? 'purple' : 'outline'}>
                        {mod.isCore ? 'Core Recommended' : 'Specialized'}
                      </Badge>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                      {mod.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{mod.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mod.shortDesc}</p>
                  </div>

                  {/* Bullet features */}
                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    {mod.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Check className="w-3 h-3 text-[#16A34A] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Indicative Tier:</span>
                  <span className="font-bold text-slate-800">৳{mod.indicativePriceBDTPerMonth.toLocaleString()} / mo</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Modules Bottom Bar */}
        <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
              {selectedModuleIds.length}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {selectedModuleIds.length} Modules Selected for Configuration
              </p>
              <p className="text-xs text-slate-500">
                Indicative Evaluation Fee: ~৳{totalMonthlyBDT.toLocaleString()}/month
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/demo/modules" className="flex-1 sm:flex-none">
              <Button variant="outline" size="md" className="w-full">
                <span>View Full Directory</span>
              </Button>
            </Link>
            <Link href="/request-quote" className="flex-1 sm:flex-none">
              <Button variant="primary" size="md" className="w-full">
                <span>Proceed to Quote Request</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
