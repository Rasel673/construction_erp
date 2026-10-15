'use client';

import React, { useState, useEffect } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Building
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Invoice } from '@/lib/types';

export default function BillingInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    setInvoices(ERPStorage.getInvoices());
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
      inv.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoiced = invoices.reduce((acc, i) => acc + i.amountBDT, 0);
  const totalPaid = invoices.reduce((acc, i) => acc + i.paidBDT, 0);
  const totalDue = invoices.reduce((acc, i) => acc + i.dueBDT, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Client Billing & Running Account Invoices</h1>
            <Badge variant="purple">Running Bills, VAT & AIT Deductions</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate milestone progress invoices, track client receivables, withholding taxes, and payment settlements.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: Generate client running bill.')}>
          <Plus className="w-4 h-4" />
          <span>Generate Running Bill</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Billed to Clients</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalInvoiced, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{invoices.length} running account (RA) bills</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payments Collected</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{formatBDT(totalPaid, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Cleared via client bank cheques & RTGS</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Outstanding Receivables</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{formatBDT(totalDue, 'compact')}</div>
            <p className="text-[11px] text-amber-800 mt-0.5">Awaiting certification or payment release</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice number, client or project..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Paid', 'Partially Paid', 'Unpaid', 'Overdue'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Invoice No</th>
                <th className="px-5 py-3 font-semibold">Client Name</th>
                <th className="px-5 py-3 font-semibold">Project Site</th>
                <th className="px-5 py-3 font-semibold">Billing Period</th>
                <th className="px-5 py-3 font-semibold text-right">Invoice Sum</th>
                <th className="px-5 py-3 font-semibold text-right">Paid (BDT)</th>
                <th className="px-5 py-3 font-semibold text-right">Due (BDT)</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{inv.invoiceNo}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{inv.clientName}</td>
                  <td className="px-5 py-3.5 text-slate-600">{inv.projectName.split('-')[0]}</td>
                  <td className="px-5 py-3.5 text-slate-600">{inv.billingPeriod}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{formatBDT(inv.amountBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-emerald-600 font-semibold">{formatBDT(inv.paidBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-amber-600 font-semibold">{formatBDT(inv.dueBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Overdue' ? 'destructive' : 'warning'}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded hover:bg-slate-100 text-[#6D28D9] font-medium transition-colors"
                      title="View Bill Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Client Running Bill: ${selectedInvoice.invoiceNo}`}
          description={`Project: ${selectedInvoice.projectName}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Client / Authority:</span>
                <span className="font-bold text-slate-900">{selectedInvoice.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Billing Period & Scope:</span>
                <span className="font-semibold text-slate-800">{selectedInvoice.billingPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Issue Date:</span>
                <span className="font-mono text-slate-700">{formatDateBD(selectedInvoice.issuedDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Due Payment Date:</span>
                <span className="font-mono text-slate-700">{formatDateBD(selectedInvoice.dueDate)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
              <div>
                <span className="text-[10px] text-purple-700 uppercase font-semibold block">Total Billed</span>
                <strong className="text-slate-900 font-bold text-sm">{formatBDT(selectedInvoice.amountBDT, 'compact')}</strong>
              </div>
              <div>
                <span className="text-[10px] text-emerald-700 uppercase font-semibold block">Paid to Date</span>
                <strong className="text-emerald-700 font-bold text-sm">{formatBDT(selectedInvoice.paidBDT, 'compact')}</strong>
              </div>
              <div>
                <span className="text-[10px] text-amber-700 uppercase font-semibold block">Outstanding Due</span>
                <strong className="text-amber-700 font-bold text-sm">{formatBDT(selectedInvoice.dueBDT, 'compact')}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedInvoice(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
