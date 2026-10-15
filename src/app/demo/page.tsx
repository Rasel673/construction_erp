'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HardHat,
  Wallet,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  PackageX,
  Plus,
  Building,
  FileText,
  Truck,
  ChevronRight,
  Activity
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
import { Project, PurchaseOrder, InventoryItem, ExpenseRecord } from '@/lib/types';

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProjects(ERPStorage.getProjects());
    setPos(ERPStorage.getPOs());
    setInventory(ERPStorage.getInventory());
    setExpenses(ERPStorage.getExpenses());

    const handleStorage = () => {
      setProjects(ERPStorage.getProjects());
      setPos(ERPStorage.getPOs());
      setInventory(ERPStorage.getInventory());
      setExpenses(ERPStorage.getExpenses());
    };
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  // Financial aggregates
  const totalContractVal = projects.reduce((acc, p) => acc + p.contractValueBDT, 0);
  const totalSpentVal = projects.reduce((acc, p) => acc + p.spentBDT, 0);
  const activeProjectsCount = projects.filter(p => p.status === 'Active' || p.status === 'Near Completion').length;
  const budgetUtilization = totalContractVal > 0 ? Math.round((totalSpentVal / totalContractVal) * 100) : 0;
  const totalReceivables = 535000000; // ৳53.50 Cr outstanding across clients

  // Budget vs Actual data for top 5 projects
  const chartData = projects.slice(0, 5).map(p => ({
    name: p.name.split('-')[0].replace('Dhaka ', '').replace('Chattogram ', 'CTG ').trim(),
    ContractBudget: Math.round(p.contractValueBDT / 10000000), // in Crores
    ActualSpent: Math.round(p.spentBDT / 10000000) // in Crores
  }));

  const lowStockItems = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical');

  const upcomingMilestones = [
    { id: 1, title: 'Banani Pier Cap #18 Concrete Casting', project: 'Dhaka Elevated Expressway', date: '28 Feb 2025', progress: 85, status: 'On Track' },
    { id: 2, title: 'Basement Mat Foundation Pouring (1,200 CBM)', project: 'Uttara Sector 18 Complex', date: '04 Mar 2025', progress: 70, status: 'Critical Path' },
    { id: 3, title: 'Heavy Container Stacking Pavement Inspection', project: 'Chattogram Port Yard', date: '08 Mar 2025', progress: 95, status: 'Ready for Review' },
    { id: 4, title: 'Piling Load Test on Banani Viaduct', project: 'Dhaka Elevated Expressway', date: '12 Mar 2025', progress: 40, status: 'Scheduled' }
  ];

  const siteActivity = [
    { id: 1, time: '25 mins ago', user: 'Engr. Farhan Mahmud', action: 'Approved daily concrete pour log for Banani Pier 14 (340 CFT M25).' },
    { id: 2, time: '1 hour ago', user: 'Tanvir Ahmed (QS)', action: 'Updated BOQ revision for Structural Rebar schedule with BSRM.' },
    { id: 3, time: '2 hours ago', user: 'Central Store - Banani', action: 'Low stock trigger generated for Seven Rings PCC Cement (1,850 bags remaining).' },
    { id: 4, time: '4 hours ago', user: 'Patenga Wharf Store', action: 'Chalan #4812 received for 20,000 CFT Sylhet Sand.' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Welcome & KPI Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Construction Dashboard</h1>
            <Badge variant="purple">Bangladesh Operations</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time portfolio oversight of major civil, highway, bridge and residential engineering projects.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/demo/projects">
            <Button variant="outline" size="sm">
              <HardHat className="w-4 h-4 text-slate-600" />
              <span>All Projects</span>
            </Button>
          </Link>
          <Link href="/demo/estimation">
            <Button variant="primary" size="sm">
              <Plus className="w-4 h-4" />
              <span>New BOQ Item</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core Financial & Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="hover:border-purple-300">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Projects</span>
              <div className="p-2 rounded-xl bg-[#F5F3FF] text-[#6D28D9]">
                <HardHat className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">{activeProjectsCount} Major Sites</div>
              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1 font-medium">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>6 Total Contracted Projects</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="hover:border-purple-300">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Contract Value</span>
              <div className="p-2 rounded-xl bg-purple-50 text-[#6D28D9]">
                <Building className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">{formatBDT(totalContractVal, 'compact')}</div>
              <p className="text-xs text-slate-500 mt-1">
                Full sum: {formatBDT(totalContractVal, 'full')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="hover:border-purple-300">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget Expended</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">{formatBDT(totalSpentVal, 'compact')}</div>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#6D28D9] h-2 rounded-full transition-all"
                    style={{ width: `${budgetUtilization}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-600">{budgetUtilization}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="hover:border-purple-300">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Receivables</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">{formatBDT(totalReceivables, 'compact')}</div>
              <p className="text-xs text-amber-600 flex items-center gap-1 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Across 4 Client Running Bills</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Budget vs Actual Expenditure Chart (2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Project Budget vs. Actual Expenditure</CardTitle>
              <CardDescription>Comparison in BDT Crores (৳ Cr) across active infrastructure contracts</CardDescription>
            </div>
            <Link href="/demo/reports" className="text-xs font-semibold text-[#6D28D9] hover:underline flex items-center gap-1">
              <span>Detailed Variance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            {mounted ? (
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} unit=" Cr" />
                    <Tooltip
                      formatter={(val: any) => [`৳${val} Crore`, '']}
                      contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="ContractBudget" name="Contract Value (৳ Cr)" fill="#DDD6FE" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ActualSpent" name="Actual Spent (৳ Cr)" fill="#6D28D9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-slate-400 text-xs">Loading analytics...</div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Material Warnings (1 col) */}
        <Card className="border-amber-200/70 bg-gradient-to-b from-amber-50/20 to-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <CardTitle>Low-Stock Alerts</CardTitle>
            </div>
            <Badge variant="warning">{lowStockItems.length} Critical</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.slice(0, 4).map(item => (
              <div key={item.id} className="p-3 rounded-lg border border-slate-100 bg-white hover:border-amber-200 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.locationSite}</p>
                  </div>
                  <Badge variant={item.status === 'Critical' ? 'destructive' : 'warning'}>
                    {item.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs pt-2 border-t border-slate-50">
                  <span className="text-slate-500">
                    Avail: <strong className="text-slate-800">{item.availableQty} {item.unit}</strong>
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    Min: {item.minThresholdQty} {item.unit}
                  </span>
                </div>
              </div>
            ))}

            <Link href="/demo/inventory" className="block pt-2">
              <Button variant="secondary" size="sm" className="w-full text-xs">
                <span>Manage Site Inventory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Project Progress Overview Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Active Projects Progress Overview</CardTitle>
            <CardDescription>Target milestones, assigned directors and budget health</CardDescription>
          </div>
          <Link href="/demo/projects" className="text-xs font-semibold text-[#6D28D9] hover:underline">
            View All ({projects.length})
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Project Name & Code</th>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Contract Sum</th>
                <th className="px-5 py-3 font-semibold">Progress</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Project Director</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.slice(0, 4).map(prj => (
                <tr key={prj.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-800">{prj.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{prj.code} • {prj.location}</p>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{prj.client}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900">{formatBDT(prj.contractValueBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 min-w-[140px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#6D28D9] h-1.5 rounded-full"
                          style={{ width: `${prj.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-semibold text-slate-700">{prj.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge variant={prj.status === 'Active' ? 'purple' : prj.status === 'Near Completion' ? 'success' : 'default'}>
                      {prj.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{prj.projectManager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Lower Triplet: Recent POs, Upcoming Milestones, Live Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Purchase Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6D28D9]" />
              <CardTitle>Recent Purchase Orders</CardTitle>
            </div>
            <Link href="/demo/procurement" className="text-xs text-[#6D28D9] font-medium hover:underline">
              All POs
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pos.slice(0, 4).map(po => (
              <div key={po.id} className="p-2.5 rounded-lg border border-slate-100 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-800">{po.poNumber}</span>
                  <Badge variant={po.status === 'Delivered' ? 'success' : po.status === 'Partially Delivered' ? 'warning' : 'outline'}>
                    {po.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-1">{po.itemsSummary}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 pt-1 border-t border-slate-50">
                  <span>{po.supplierName.split(' ')[0]}</span>
                  <span className="font-semibold text-slate-700">{formatBDT(po.totalAmountBDT, 'compact')}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Milestones */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <CardTitle>Upcoming Milestones</CardTitle>
            </div>
            <Link href="/demo/progress" className="text-xs text-[#6D28D9] font-medium hover:underline">
              Gantt / S-Curve
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingMilestones.map(m => (
              <div key={m.id} className="p-2.5 rounded-lg border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 line-clamp-1">{m.title}</span>
                  <Badge variant={m.status === 'On Track' ? 'success' : m.status === 'Critical Path' ? 'destructive' : 'default'}>
                    {m.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500">{m.project}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{m.date}</span>
                  </span>
                  <span className="font-semibold text-[#6D28D9]">{m.progress}% achieved</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Site Activity Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#6D28D9]" />
              <CardTitle>Live Site Activity Stream</CardTitle>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </CardHeader>
          <CardContent className="space-y-3">
            {siteActivity.map(act => (
              <div key={act.id} className="flex items-start gap-2.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6D28D9] mt-1.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-700 leading-snug">{act.action}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {act.user} • <span className="text-slate-500">{act.time}</span>
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-2 text-center">
              <Link href="/demo/workforce" className="text-xs font-semibold text-[#6D28D9] hover:underline">
                View Site Attendance & Labor Logs →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
