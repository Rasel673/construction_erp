'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Check,
  ArrowRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Send
} from 'lucide-react';
import { ERP_MODULES } from '@/lib/mock-data/erp-data';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ModuleDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Projects and Operations',
    'Procurement and Inventory',
    'People and Resources',
    'Customers and Finance',
    'Reports and Analytics',
    'Administration'
  ];

  const filteredModules = ERP_MODULES.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Inspired by Somikoron Enterprise Architecture • Open Interactive Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Complete Construction ERP Module Directory
          </h1>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed">
            Every operational aspect of Bangladeshi civil contracting, road construction, bridge engineering, and high-rise development in a unified modern suite. Click any module to evaluate live interactive workflows.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/configure">
              <Button variant="secondary" size="md" className="bg-white text-[#6D28D9] hover:bg-purple-50 font-semibold border-none">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Configure Custom Company Bundle</span>
              </Button>
            </Link>
            <Link href="/request-quote">
              <Button variant="outline" size="md" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold">
                <Send className="w-4 h-4" />
                <span>Get Quotation Demo</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by module title or feature..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 focus:border-[#6D28D9]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Modules (19)' : cat.split(' and ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModules.map(mod => (
          <Card
            key={mod.id}
            className="group flex flex-col justify-between hover:shadow-lg hover:border-purple-300 transition-all duration-200"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#F5F3FF] text-[#6D28D9] group-hover:bg-[#6D28D9] group-hover:text-white transition-colors duration-200 flex items-center justify-center shrink-0 shadow-2xs">
                  <IconRenderer name={mod.icon} size={24} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={mod.isCore ? 'purple' : 'outline'}>
                    {mod.isCore ? 'Core Module' : 'Specialized'}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">{mod.banglaName}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-purple-600 uppercase tracking-wider">
                  {mod.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#6D28D9] transition-colors mt-0.5">
                  {mod.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              {/* 3-4 Key Features Bullet List */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Features:</p>
                {mod.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-xl flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                <span>Indicative Tier: </span>
                <strong className="text-slate-700 font-semibold">৳{mod.indicativePriceBDTPerMonth.toLocaleString()}/mo</strong>
              </div>
              <Link href={mod.href}>
                <Button variant="primary" size="sm" className="text-xs font-semibold">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
