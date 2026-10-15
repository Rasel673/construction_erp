'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  Calendar,
  Building,
  Phone,
  Mail,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { ClientLead } from '@/lib/types';

export default function CRMPage() {
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLeads(ERPStorage.getClientLeads());
  }, []);

  const filteredLeads = leads.filter(l =>
    l.clientName.toLowerCase().includes(search.toLowerCase()) ||
    l.organization.toLowerCase().includes(search.toLowerCase()) ||
    l.projectType.toLowerCase().includes(search.toLowerCase())
  );

  const totalPipeline = leads.reduce((acc, l) => acc + l.expectedContractBDT, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CRM & Tender Lead Pipeline</h1>
            <Badge variant="purple">BD Real Estate & Mega Tenders</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track private real estate developers, government infrastructure tenders, and commercial bid negotiations.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: New tender lead created.')}>
          <Plus className="w-4 h-4" />
          <span>New Tender Lead</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Active Bid Pipeline</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalPipeline, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{leads.length} high-value active opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Advanced Negotiation</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">৳24.00 Cr</div>
            <p className="text-[11px] text-emerald-600 mt-0.5">Bashundhara Bitumen Warehouse Package</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">BOQs Submitted</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">৳38.00 Cr</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Sheltech 22-Story Commercial Tower</p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredLeads.map(lead => (
          <Card key={lead.id} className="hover:border-purple-300 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {lead.projectType}
                </span>
                <Badge
                  variant={
                    lead.leadStage === 'Negotiation'
                      ? 'purple'
                      : lead.leadStage === 'BOQ Estimation Shared'
                      ? 'warning'
                      : 'outline'
                  }
                >
                  {lead.leadStage}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{lead.clientName}</h3>
                <p className="text-xs font-semibold text-purple-700 mt-0.5">{lead.organization}</p>
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-lg italic">
                  &ldquo;{lead.notes}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#F5F3FF] rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-purple-600 uppercase font-semibold block">Expected Contract Value</span>
                  <strong className="text-base font-extrabold text-[#6D28D9]">
                    {formatBDT(lead.expectedContractBDT, 'compact')}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Next Follow-Up</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDateBD(lead.followUpDate)}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{lead.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>{lead.email}</span>
                </p>
              </div>
            </CardContent>

            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-slate-500">Pipeline Stage: {lead.leadStage}</span>
              <button
                onClick={() => alert(`Client ${lead.clientName}: follow-up note saved.`)}
                className="text-[#6D28D9] font-semibold hover:underline"
              >
                Log Meeting →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
