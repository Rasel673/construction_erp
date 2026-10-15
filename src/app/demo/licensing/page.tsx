'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Check,
  SlidersHorizontal,
  Send,
  Sparkles,
  Info,
  DollarSign
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ERP_MODULES } from '@/lib/mock-data/erp-data';
import { ERPStorage } from '@/lib/storage';
import { formatBDT } from '@/lib/formatters';

export default function LicensingPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  useEffect(() => {
    setSelectedModules(ERPStorage.getSelectedModules());
  }, []);

  const toggleModule = (id: string) => {
    let next: string[];
    if (selectedModules.includes(id)) {
      next = selectedModules.filter(m => m !== id);
    } else {
      next = [...selectedModules, id];
    }
    setSelectedModules(next);
    ERPStorage.saveSelectedModules(next);
  };

  const totalIndicativePrice = ERP_MODULES.filter(m => selectedModules.includes(m.id)).reduce(
    (acc, m) => acc + m.indicativePriceBDTPerMonth,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Module Management & Licensing</h1>
            <Badge variant="purple">Modular Enterprise Subscription</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Toggle enterprise modules on or off according to your construction company&apos;s specific workflow requirements.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/configure">
            <Button variant="secondary" size="sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Full Configurator</span>
            </Button>
          </Link>
          <Link href="/request-quote">
            <Button variant="primary" size="sm">
              <Send className="w-4 h-4" />
              <span>Submit Commercial Quote</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Indicative Pricing Disclaimer Alert */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Indicative Evaluation Pricing Notice:</strong>
          <p className="mt-0.5 leading-relaxed">
            All prices listed below are illustrative estimates per month in Bangladeshi Taka (BDT) for sales demonstration purposes. Final corporate licensing proposals depend on user seat counts, site locations, and customization requirements.
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-xs uppercase font-semibold text-purple-200">Current Custom Evaluation Bundle</span>
          <div className="text-2xl font-extrabold mt-0.5">
            {selectedModules.length} of {ERP_MODULES.length} Modules Active
          </div>
          <p className="text-xs text-purple-200 mt-1">
            Uncheck any module below to adjust your required scope.
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-purple-200 uppercase font-semibold">Indicative Monthly Total</span>
          <div className="text-3xl font-extrabold text-amber-300">
            ৳{totalIndicativePrice.toLocaleString()}<span className="text-xs font-normal text-white"> / month</span>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ERP_MODULES.map(m => {
          const isSelected = selectedModules.includes(m.id);
          return (
            <div
              key={m.id}
              onClick={() => toggleModule(m.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#6D28D9] bg-[#F5F3FF]/40 shadow-xs ring-1 ring-[#8B5CF6]/30'
                  : 'border-slate-200 bg-white opacity-70 hover:opacity-100 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={isSelected ? 'purple' : 'outline'}>
                    {m.isCore ? 'Core Module' : 'Specialized'}
                  </Badge>
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-[#6D28D9] border-[#6D28D9] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{m.shortDesc}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Indicative:</span>
                <span className="font-bold text-slate-800">৳{m.indicativePriceBDTPerMonth.toLocaleString()}/mo</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
