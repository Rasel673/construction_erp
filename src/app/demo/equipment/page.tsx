'use client';

import React, { useState, useEffect } from 'react';
import {
  Wrench,
  Search,
  Filter,
  Plus,
  Fuel,
  Calendar,
  Building,
  CheckCircle2,
  AlertTriangle,
  RotateCw
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Equipment } from '@/lib/types';

export default function EquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setEquipment(ERPStorage.getEquipment());
  }, []);

  const filteredEquipment = equipment.filter(eq =>
    eq.name.toLowerCase().includes(search.toLowerCase()) ||
    eq.code.toLowerCase().includes(search.toLowerCase()) ||
    eq.registrationNo.toLowerCase().includes(search.toLowerCase()) ||
    eq.assignedProject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Heavy Equipment & Machinery Fleet</h1>
            <Badge variant="purple">Tower Cranes, Piling Rigs & Transit Mixers</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Site machinery deployments, fuel logs, BRTA registrations, and scheduled hydraulic maintenance intervals.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: Deploy new machine to fleet.')}>
          <Plus className="w-4 h-4" />
          <span>Add Equipment</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Active Fleet</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{equipment.length} Heavy Units</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Excavators, cranes and concrete transit trucks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operational Readiness</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">
              {equipment.filter(e => e.status === 'Operational').length} Ready
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">On site performing active shifts</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Scheduled Service Due</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">
              {equipment.filter(e => e.status === 'Maintenance Required').length} Scheduled
            </div>
            <p className="text-[11px] text-amber-800 mt-0.5">Schwing Stetter 7 CBM Mixer (due Feb 24)</p>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEquipment.map(eq => (
          <Card key={eq.id} className="hover:border-purple-300 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                  {eq.code}
                </span>
                <Badge variant={eq.status === 'Operational' ? 'success' : eq.status === 'Maintenance Required' ? 'warning' : 'outline'}>
                  {eq.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{eq.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-1">Reg: {eq.registrationNo}</p>
                <p className="text-xs text-slate-600 mt-2 flex items-center gap-1 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{eq.assignedProject.split('-')[0]}</span>
                </p>
              </div>

              <div className="space-y-2 p-3 bg-slate-50 rounded-xl text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5 text-purple-600" />
                    <span>Avg Fuel Consumption:</span>
                  </span>
                  <strong className="text-slate-900 font-semibold">{eq.fuelConsumptionPerHr}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-600 pt-1.5 border-t border-slate-100">
                  <span className="text-slate-400">Operator:</span>
                  <strong className="text-slate-800">{eq.operatorName}</strong>
                </div>
              </div>
            </CardContent>

            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Next Service: {formatDateBD(eq.nextServiceDate)}</span>
              </span>
              <button
                onClick={() => alert(`Maintenance log for ${eq.name}: all fluids, hydraulic pressure and safety certs up to date.`)}
                className="text-[#6D28D9] font-semibold hover:underline"
              >
                Log →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
