'use client';

import React, { useState, useEffect } from 'react';
import {
  Network,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Building,
  Phone,
  Wallet,
  Star
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Subcontractor } from '@/lib/types';

export default function SubcontractorsPage() {
  const [subs, setSubs] = useState<Subcontractor[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSubs(ERPStorage.getSubcontractors());
  }, []);

  const filteredSubs = subs.filter(s =>
    s.companyName.toLowerCase().includes(search.toLowerCase()) ||
    s.trade.toLowerCase().includes(search.toLowerCase()) ||
    s.assignedProject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subcontractor Management</h1>
            <Badge variant="purple">Piling, Electrical, HVAC & Finishing Trades</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track Running Account (RA) bills, retention money held for Defect Liability, and safety compliance audits.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: Enlist new subcontractor.')}>
          <Plus className="w-4 h-4" />
          <span>Enlist Subcontractor</span>
        </Button>
      </div>

      {/* Subcontractor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSubs.map(s => (
          <Card key={s.id} className="hover:border-purple-300 transition-all">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {s.trade}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{s.complianceRating} HSE Score</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{s.companyName}</h3>
                <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Project: {s.assignedProject}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{s.contactPerson} ({s.phone})</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Work Order</span>
                  <strong className="text-slate-900 font-bold">{formatBDT(s.contractAmountBDT, 'compact')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">RA Bills Paid</span>
                  <strong className="text-[#6D28D9] font-bold">{formatBDT(s.paidAmountBDT, 'compact')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Security Retained</span>
                  <strong className="text-amber-600 font-bold">{formatBDT(s.retainedSecurityBDT, 'compact')}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <Badge variant={s.status === 'Active' ? 'success' : 'default'}>{s.status}</Badge>
                <button
                  onClick={() => alert(`Subcontractor ${s.companyName}: RA Bills breakdown opened.`)}
                  className="text-xs font-semibold text-[#6D28D9] hover:underline"
                >
                  Running Account (RA) Bills →
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
