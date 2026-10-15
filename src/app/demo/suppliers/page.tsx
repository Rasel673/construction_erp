'use client';

import React, { useState, useEffect } from 'react';
import {
  Truck,
  Search,
  Filter,
  Plus,
  Star,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Supplier } from '@/lib/types';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSuppliers(ERPStorage.getSuppliers());
  }, []);

  const filteredSuppliers = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalOutstanding = suppliers.reduce((acc, s) => acc + s.outstandingBalanceBDT, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supplier & Vendor Directory</h1>
            <Badge variant="purple">Cement, Steel & Stone Quarry Partners</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Supplier scorecards, material delivery volume records and outstanding payables across corporate vendors.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => alert('Simulated: Vendor onboarding form opened.')}>
          <Plus className="w-4 h-4" />
          <span>Register Supplier</span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Cumulative Supplied</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">৳31.22 Cr</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Across active major vendor contracts</p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Total Outstanding Payables</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{formatBDT(totalOutstanding, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Verified supplier running accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Enlisted Vendors</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{suppliers.length} Certified</div>
            <p className="text-[11px] text-emerald-600 mt-0.5">PWD and BBA quality compliant</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search suppliers by name, category or contact person..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuppliers.map(sup => (
          <Card key={sup.id} className="hover:border-purple-300 transition-all flex flex-col justify-between">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {sup.category}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{sup.rating}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{sup.name}</h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">{sup.contactPerson}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{sup.location}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Total Supplied</span>
                  <strong className="text-slate-900 font-bold">{formatBDT(sup.totalSuppliedBDT, 'compact')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Outstanding Due</span>
                  <strong className="text-amber-600 font-bold">{formatBDT(sup.outstandingBalanceBDT, 'compact')}</strong>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 pt-1 border-t border-slate-100">
                <p className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{sup.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{sup.email}</span>
                </p>
              </div>
            </CardContent>

            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-slate-500">{sup.activeOrdersCount} Active Purchase Orders</span>
              <button
                onClick={() => alert(`Supplier ${sup.name}: statement of accounts opened.`)}
                className="text-[#6D28D9] font-semibold hover:underline"
              >
                Statement →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
