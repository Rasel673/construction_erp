'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Building,
  Phone,
  Briefcase,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Employee } from '@/lib/types';

export default function HRMPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  useEffect(() => {
    setEmployees(ERPStorage.getEmployees());
  }, []);

  const filteredEmployees = employees.filter(e => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.empId.toLowerCase().includes(search.toLowerCase()) ||
      e.designation.toLowerCase().includes(search.toLowerCase()) ||
      e.assignedSite.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const totalPayroll = employees.reduce((acc, e) => acc + e.salaryBDT, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">HRM & Engineering Staff</h1>
            <Badge variant="purple">Resident Engineers, QS & Site Safety</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Site deployment assignments, engineering certifications, designations, and departmental compensation.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: Employee registration modal.')}>
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Corporate & Site Staff</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{employees.length} Engineers & Officers</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Across 6 active engineering sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Payroll Commitment</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatBDT(totalPayroll, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct employee salaries (BDT)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Staff Status</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">100% Deployed</div>
            <p className="text-[11px] text-slate-500 mt-0.5">All engineers active on duty</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Dept Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by engineer name, ID or site assignment..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Project Engineering', 'Quantity Surveying (QS)', 'Site Safety', 'Accounts & Finance'].map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                deptFilter === dept
                  ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Employees Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Employee ID</th>
                <th className="px-5 py-3 font-semibold">Full Name & Credentials</th>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Designation</th>
                <th className="px-5 py-3 font-semibold">Assigned Project Site</th>
                <th className="px-5 py-3 font-semibold text-right">Gross Salary (BDT)</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{emp.empId}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-900">{emp.name}</p>
                    {emp.banglaName && <p className="text-[11px] text-slate-400 mt-0.5">{emp.banglaName}</p>}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                      {emp.department}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{emp.designation}</td>
                  <td className="px-5 py-3.5 text-slate-600">{emp.assignedSite}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">
                    ৳{emp.salaryBDT.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={emp.status === 'Active' ? 'success' : 'default'}>{emp.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
