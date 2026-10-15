'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Search,
  Plus,
  Clock,
  Calendar,
  Building,
  CheckCircle,
  Coins,
  Flame
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { WorkforceAttendance } from '@/lib/types';

export default function WorkforceAttendancePage() {
  const [workforce, setWorkforce] = useState<WorkforceAttendance[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    date: '2025-02-23',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    trade: 'Rod Binders' as WorkforceAttendance['trade'],
    presentCount: 50,
    overtimeHours: 100,
    dailyWagesBDT: 55000,
    shift: 'Day' as WorkforceAttendance['shift'],
    supervisor: 'Md. Alamgir Mistri'
  });

  useEffect(() => {
    setWorkforce(ERPStorage.getWorkforce());
    const handleStorage = () => setWorkforce(ERPStorage.getWorkforce());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const totalLaborPresent = workforce.reduce((acc, w) => acc + w.presentCount, 0);
  const totalDailyWages = workforce.reduce((acc, w) => acc + w.dailyWagesBDT, 0);
  const totalOvertimeHours = workforce.reduce((acc, w) => acc + w.overtimeHours, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: WorkforceAttendance = {
      id: `wf-${Date.now()}`,
      date: formData.date,
      projectId: 'prj-1',
      projectName: formData.projectName,
      trade: formData.trade,
      presentCount: Number(formData.presentCount),
      overtimeHours: Number(formData.overtimeHours),
      dailyWagesBDT: Number(formData.dailyWagesBDT),
      shift: formData.shift,
      supervisor: formData.supervisor
    };
    ERPStorage.addWorkforce(newRecord);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workforce & Site Daily Attendance</h1>
            <Badge variant="purple">Rajmistri, Rod Binders & Shramik Muster Roll</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Daily site labor headcounts, overtime hours, shift logs, and instant cash wage calculations.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>Record Daily Muster Roll</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Active Site Labor</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{totalLaborPresent} Shramik & Mistri</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Recorded on site today across active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Daily Wage Disbursement</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatBDT(totalDailyWages, 'full')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Based on trade pay rates</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Overtime Hours</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">{totalOvertimeHours} Hours</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Night casting & extended shuttering shifts</p>
          </CardContent>
        </Card>
      </div>

      {/* Workforce Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Site Attendance Logs</CardTitle>
          <CardDescription>Verified by Site Engineers and Head Mistris (Sardar)</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Project Site</th>
                <th className="px-5 py-3 font-semibold">Workforce Trade</th>
                <th className="px-5 py-3 font-semibold text-center">Shift</th>
                <th className="px-5 py-3 font-semibold text-right">Headcount</th>
                <th className="px-5 py-3 font-semibold text-right">Total Overtime</th>
                <th className="px-5 py-3 font-semibold text-right">Total Wage (BDT)</th>
                <th className="px-5 py-3 font-semibold">Mistri / Supervisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workforce.map(w => (
                <tr key={w.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-slate-500">{formatDateBD(w.date)}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800">{w.projectName.split('-')[0]}</td>
                  <td className="px-5 py-3.5 font-medium text-purple-700">
                    <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-100 text-[11px]">
                      {w.trade}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center font-medium text-slate-600">{w.shift}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{w.presentCount} Workers</td>
                  <td className="px-5 py-3.5 text-right font-mono text-amber-700 font-semibold">{w.overtimeHours} hrs</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-[#6D28D9]">{formatBDT(w.dailyWagesBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-slate-600">{w.supervisor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Record Site Daily Muster Roll"
        description="Enter today's trade headcount, overtime and supervisor name."
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
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
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Trade Category</label>
              <select
                value={formData.trade}
                onChange={e => setFormData({ ...formData, trade: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Rod Binders">Rod Binders</option>
                <option value="Masons / Rajmistri">Masons / Rajmistri</option>
                <option value="Carpenters & Shuttering">Carpenters & Shuttering</option>
                <option value="General Helpers">General Helpers</option>
                <option value="Tile & Marble Technicians">Tile & Marble Technicians</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Workers Present</label>
              <input
                type="number"
                required
                min={1}
                value={formData.presentCount}
                onChange={e => setFormData({ ...formData, presentCount: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total Overtime Hours</label>
              <input
                type="number"
                value={formData.overtimeHours}
                onChange={e => setFormData({ ...formData, overtimeHours: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Daily Wages (BDT)</label>
              <input
                type="number"
                required
                value={formData.dailyWagesBDT}
                onChange={e => setFormData({ ...formData, dailyWagesBDT: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Head Mistri / Supervisor</label>
              <input
                type="text"
                required
                value={formData.supervisor}
                onChange={e => setFormData({ ...formData, supervisor: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Muster Roll
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
