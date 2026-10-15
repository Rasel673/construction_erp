'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  Plus,
  Calendar,
  Building,
  CheckCircle2,
  DollarSign,
  Download,
  Tag
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { ExpenseRecord } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    voucherNo: 'VCH-DHK-8825',
    date: '2025-02-23',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    category: 'Labor & Wages' as ExpenseRecord['category'],
    amountBDT: 150000,
    paymentMode: 'bKash/Nagad Enterprise' as ExpenseRecord['paymentMode'],
    approvedBy: 'Engr. Farhan Mahmud',
    description: 'Weekly fooding and conveyance allowances for rod binding crew.'
  });

  useEffect(() => {
    setExpenses(ERPStorage.getExpenses());
    const handleStorage = () => setExpenses(ERPStorage.getExpenses());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch =
      exp.voucherNo.toLowerCase().includes(search.toLowerCase()) ||
      exp.description.toLowerCase().includes(search.toLowerCase()) ||
      exp.projectName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenseSum = expenses.reduce((acc, e) => acc + e.amountBDT, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      voucherNo: formData.voucherNo,
      date: formData.date,
      projectId: 'prj-1',
      projectName: formData.projectName,
      category: formData.category,
      amountBDT: Number(formData.amountBDT),
      paymentMode: formData.paymentMode,
      approvedBy: formData.approvedBy,
      description: formData.description
    };
    ERPStorage.addExpense(newRecord);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Site Expense & Voucher Management</h1>
            <Badge variant="purple">Petty Cash, Fuel & Subcontractor Vouchers</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track site petty cash vouchers, digital enterprise payouts (bKash/Nagad), and director expense approvals.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>New Expense Voucher</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Recorded Site Vouchers</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalExpenseSum, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{expenses.length} approved debit vouchers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fuel & Machinery Diesel</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">৳3.45 Lakh</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Heavy generator and excavator operations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Channels</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">Bank & bKash Enterprise</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Instant wage and site supplier disbursements</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search voucher number, description or project..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Fuel & Machineries', 'Labor & Wages', 'Subcontractor Bill', 'Municipal Permits'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expense Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Voucher No</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold min-w-[260px]">Description & Expense Scope</th>
                <th className="px-5 py-3 font-semibold text-right">Amount (BDT)</th>
                <th className="px-5 py-3 font-semibold">Payment Mode</th>
                <th className="px-5 py-3 font-semibold">Authorized By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map(exp => (
                <tr key={exp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{exp.voucherNo}</td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{formatDateBD(exp.date)}</td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">{exp.projectName.split('-')[0]}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-800 leading-snug">{exp.description}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{formatBDT(exp.amountBDT, 'compact')}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={exp.paymentMode === 'Bank Transfer' ? 'purple' : 'outline'}>
                      {exp.paymentMode}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{exp.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Record Site Debit Voucher"
        description="Simulate expense entry with automatic project cost attribution."
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Voucher Number</label>
              <input
                type="text"
                required
                value={formData.voucherNo}
                onChange={e => setFormData({ ...formData, voucherNo: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Expense Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Raw Materials">Raw Materials</option>
                <option value="Labor & Wages">Labor & Wages</option>
                <option value="Subcontractor Bill">Subcontractor Bill</option>
                <option value="Fuel & Machineries">Fuel & Machineries</option>
                <option value="Site Overheads">Site Overheads</option>
                <option value="Municipal Permits">Municipal Permits</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Payment Mode</label>
              <select
                value={formData.paymentMode}
                onChange={e => setFormData({ ...formData, paymentMode: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="bKash/Nagad Enterprise">bKash/Nagad Enterprise</option>
                <option value="Site Petty Cash">Site Petty Cash</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Description & Purpose *</label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Amount (BDT)</label>
              <input
                type="number"
                required
                value={formData.amountBDT}
                onChange={e => setFormData({ ...formData, amountBDT: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Authorized Approver</label>
              <input
                type="text"
                required
                value={formData.approvedBy}
                onChange={e => setFormData({ ...formData, approvedBy: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Voucher
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
