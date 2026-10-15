'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Filter,
  Download,
  TrendingDown,
  TrendingUp,
  FileText,
  Printer,
  CheckCircle,
  Building
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { Project } from '@/lib/types';

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'variance' | 'cashflow' | 'materials'>('variance');
  const [dateRange, setDateRange] = useState('FY 2024-2025');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProjects(ERPStorage.getProjects());
  }, []);

  // Budget Variance data
  const varianceData = projects.map(p => {
    const plannedBudgetCr = Math.round(p.contractValueBDT / 10000000);
    const actualSpentCr = Math.round(p.spentBDT / 10000000);
    const varianceCr = plannedBudgetCr - actualSpentCr;
    return {
      name: p.name.split('-')[0].replace('Dhaka ', '').replace('Chattogram ', 'CTG ').trim(),
      Budget: plannedBudgetCr,
      Actual: actualSpentCr,
      Remaining: varianceCr,
      status: p.status
    };
  });

  // Monthly Cash Outflow Trend
  const monthlyTrend = [
    { month: 'Jul 24', OutflowCr: 18.5, InflowCr: 22.0 },
    { month: 'Aug 24', OutflowCr: 24.2, InflowCr: 28.5 },
    { month: 'Sep 24', OutflowCr: 21.0, InflowCr: 19.5 },
    { month: 'Oct 24', OutflowCr: 29.8, InflowCr: 32.0 },
    { month: 'Nov 24', OutflowCr: 34.5, InflowCr: 38.0 },
    { month: 'Dec 24', OutflowCr: 31.0, InflowCr: 35.0 },
    { month: 'Jan 25', OutflowCr: 28.0, InflowCr: 45.0 },
    { month: 'Feb 25', OutflowCr: 26.5, InflowCr: 38.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Reports & Audits</h1>
            <Badge variant="purple">Budget Variance & Material Audits</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Detailed variance reports, cash flow trends, procurement audit statements and cost forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
          >
            <option value="FY 2024-2025">Fiscal Year 2024-2025</option>
            <option value="Q3 2024-25">Q3 (Jan - Mar 2025)</option>
            <option value="Q2 2024-25">Q2 (Oct - Dec 2024)</option>
            <option value="All Time">All Active Contracts</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Report</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('variance')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'variance'
              ? 'bg-[#6D28D9] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Budget vs. Actual Variance
        </button>
        <button
          onClick={() => setActiveTab('cashflow')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'cashflow'
              ? 'bg-[#6D28D9] text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Monthly Inflow vs Outflow
        </button>
      </div>

      {/* Tab 1: Budget Variance Chart & Table */}
      {activeTab === 'variance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Budget Variance Analysis (in BDT Crores)</CardTitle>
                <CardDescription>Committed Contract Budget vs Actual Site Expenditures</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {mounted ? (
                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={varianceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Cr" />
                      <Tooltip
                        formatter={(val: any) => [`৳${val} Crore`, '']}
                        contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                      <Bar dataKey="Budget" name="Planned Budget (৳ Cr)" fill="#C4B5FD" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" name="Actual Cost (৳ Cr)" fill="#6D28D9" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Remaining" name="Unspent Balance (৳ Cr)" fill="#16A34A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-72 flex items-center justify-center text-slate-400 text-xs">Loading variance chart...</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Project Name</th>
                    <th className="px-5 py-3 font-semibold text-right">Contract Budget (BDT)</th>
                    <th className="px-5 py-3 font-semibold text-right">Actual Cost to Date</th>
                    <th className="px-5 py-3 font-semibold text-right">Remaining Allocation</th>
                    <th className="px-5 py-3 font-semibold text-center">Variance %</th>
                    <th className="px-5 py-3 font-semibold text-center">Execution Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {projects.map(p => {
                    const variancePercent = Math.round(((p.contractValueBDT - p.spentBDT) / p.contractValueBDT) * 100);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3.5 font-sans font-semibold text-slate-900">{p.name}</td>
                        <td className="px-5 py-3.5 text-right font-bold text-slate-900">{formatBDT(p.contractValueBDT, 'compact')}</td>
                        <td className="px-5 py-3.5 text-right font-bold text-[#6D28D9]">{formatBDT(p.spentBDT, 'compact')}</td>
                        <td className="px-5 py-3.5 text-right font-bold text-emerald-600">{formatBDT(p.contractValueBDT - p.spentBDT, 'compact')}</td>
                        <td className="px-5 py-3.5 text-center font-bold text-slate-700">{variancePercent}% unspent</td>
                        <td className="px-5 py-3.5 text-center font-sans">
                          <Badge variant={p.status === 'Active' ? 'purple' : 'success'}>{p.status}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Monthly Inflow vs Outflow */}
      {activeTab === 'cashflow' && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Cash Flow Trend: Client Inflows vs Site Outflows</CardTitle>
              <CardDescription>Monthly figures in BDT Crores (৳ Cr) for FY 2024-25</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {mounted ? (
              <div className="h-80 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Cr" />
                    <Tooltip
                      formatter={(val: any) => [`৳${val} Crore`, '']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="InflowCr" name="Client Inflows (৳ Cr)" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="OutflowCr" name="Site Outflows (৳ Cr)" stroke="#6D28D9" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-slate-400 text-xs">Loading cashflow chart...</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
