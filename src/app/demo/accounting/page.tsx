'use client';

import React, { useState, useEffect } from 'react';
import {
  PieChart as PieIcon,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Download,
  Building,
  Calendar,
  Wallet,
  Receipt
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Project, Invoice, ExpenseRecord } from '@/lib/types';

export default function AccountingPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProjects(ERPStorage.getProjects());
    setInvoices(ERPStorage.getInvoices());
  }, []);

  const totalContractVal = projects.reduce((acc, p) => acc + p.contractValueBDT, 0);
  const totalBilledVal = invoices.reduce((acc, i) => acc + i.amountBDT, 0);
  const totalCollectedVal = invoices.reduce((acc, i) => acc + i.paidBDT, 0);
  const totalDirectCosts = projects.reduce((acc, p) => acc + p.spentBDT, 0);
  const grossProfitEstimate = totalBilledVal - totalDirectCosts;

  const projectMargins = projects.slice(0, 5).map(p => {
    const margin = p.contractValueBDT > 0 ? Math.round(((p.contractValueBDT - p.spentBDT) / p.contractValueBDT) * 100) : 0;
    return {
      name: p.name.split('-')[0].replace('Dhaka ', '').replace('Chattogram ', 'CTG ').trim(),
      ContractValue: Math.round(p.contractValueBDT / 10000000), // in Cr
      DirectCost: Math.round(p.spentBDT / 10000000), // in Cr
      MarginPercent: margin
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Accounting & Financial Position</h1>
            <Badge variant="purple">Bangladesh Fiscal Year (July-June)</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Executive financial statements, project gross margin curves, and corporate cash flow balances.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => alert('Simulated: Balance Sheet generated in PDF.')}>
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Financial Statement</span>
        </Button>
      </div>

      {/* Financial Health 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Contract Portfolio</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalContractVal, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Full multi-year contracted value</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue Billed (RA)</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatBDT(totalBilledVal, 'compact')}</div>
            <p className="text-[11px] text-emerald-600 mt-0.5 font-medium">Collected: {formatBDT(totalCollectedVal, 'compact')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Direct Construction Costs</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatBDT(totalDirectCosts, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Raw materials, labor, plant & fleet</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Estimated Gross Profit</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">
              {formatBDT(totalContractVal - totalDirectCosts, 'compact')}
            </div>
            <p className="text-[11px] text-emerald-800 mt-0.5 font-medium">
              Portfolio Margin: {Math.round(((totalContractVal - totalDirectCosts) / totalContractVal) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recharts Profit Margin Comparison */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Project Profitability & Cost Absorption</CardTitle>
            <CardDescription>Direct Cost vs Total Contract Value in BDT Crores (৳ Cr)</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {mounted ? (
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectMargins} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Cr" />
                  <Tooltip
                    formatter={(val: any) => [`৳${val} Crore`, '']}
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="ContractValue" name="Contract Value (৳ Cr)" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="DirectCost" name="Cumulative Expended (৳ Cr)" fill="#4C1D95" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400 text-xs">Loading chart...</div>
          )}
        </CardContent>
      </Card>

      {/* Financial Statement Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Balance Sheet & Cash Flow Summary</CardTitle>
          <CardDescription>Fictional corporate consolidation for Dhaka and Chattogram operations</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Financial Ledger Head</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold text-right">Debit (BDT)</th>
                <th className="px-5 py-3 font-semibold text-right">Credit (BDT)</th>
                <th className="px-5 py-3 font-semibold">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr>
                <td className="px-5 py-3.5 font-sans font-semibold text-slate-900">Current Client Receivables (Uncollected RA Bills)</td>
                <td className="px-5 py-3.5 font-sans text-slate-600">Current Assets</td>
                <td className="px-5 py-3.5 text-right font-bold text-slate-900">৳53,50,00,000</td>
                <td className="px-5 py-3.5 text-right text-slate-400">-</td>
                <td className="px-5 py-3.5 font-sans"><Badge variant="success">Certified</Badge></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-sans font-semibold text-slate-900">Retention Money Held by Clients (5-10%)</td>
                <td className="px-5 py-3.5 font-sans text-slate-600">Non-Current Assets</td>
                <td className="px-5 py-3.5 text-right font-bold text-slate-900">৳38,00,00,000</td>
                <td className="px-5 py-3.5 text-right text-slate-400">-</td>
                <td className="px-5 py-3.5 font-sans"><Badge variant="purple">DLP Holding</Badge></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-sans font-semibold text-slate-900">Raw Material Inventory Valuation (Site Stock)</td>
                <td className="px-5 py-3.5 font-sans text-slate-600">Current Inventory</td>
                <td className="px-5 py-3.5 text-right font-bold text-slate-900">৳24,50,00,000</td>
                <td className="px-5 py-3.5 text-right text-slate-400">-</td>
                <td className="px-5 py-3.5 font-sans"><Badge variant="success">Physical Verified</Badge></td>
              </tr>
              <tr>
                <td className="px-5 py-3.5 font-sans font-semibold text-slate-900">Outstanding Supplier Payables (Cement/Rebar)</td>
                <td className="px-5 py-3.5 font-sans text-slate-600">Current Liabilities</td>
                <td className="px-5 py-3.5 text-right text-slate-400">-</td>
                <td className="px-5 py-3.5 text-right font-bold text-rose-600">৳25,45,00,000</td>
                <td className="px-5 py-3.5 font-sans"><Badge variant="warning">Scheduled</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
