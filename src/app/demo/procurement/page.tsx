'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Search,
  Plus,
  Filter,
  Eye,
  Truck,
  CheckCircle,
  Clock,
  Download,
  Building,
  Calendar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { PurchaseOrder } from '@/lib/types';

export default function ProcurementPage() {
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    poNumber: 'PO-2025-095',
    projectName: 'Dhaka Elevated Expressway - Flyover Segment 4',
    supplierName: 'Seven Rings Cement Industrial Sales',
    orderDate: '2025-02-23',
    deliveryDate: '2025-03-05',
    totalAmountBDT: 2500000,
    paidAmountBDT: 0,
    status: 'Pending' as PurchaseOrder['status'],
    itemsSummary: '3,000 Bags Portland Composite Cement (PCC)'
  });

  useEffect(() => {
    setPos(ERPStorage.getPOs());
    const handleStorage = () => setPos(ERPStorage.getPOs());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const filteredPOs = pos.filter(p => {
    const matchesSearch =
      p.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.itemsSummary.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPOAmount = pos.reduce((acc, p) => acc + p.totalAmountBDT, 0);

  const handleCreatePO = (e: React.FormEvent) => {
    e.preventDefault();
    const newPO: PurchaseOrder = {
      id: `po-${Date.now()}`,
      poNumber: formData.poNumber,
      projectId: 'prj-1',
      projectName: formData.projectName,
      supplierName: formData.supplierName,
      supplierId: 'sup-1',
      orderDate: formData.orderDate,
      deliveryDate: formData.deliveryDate,
      totalAmountBDT: Number(formData.totalAmountBDT),
      paidAmountBDT: Number(formData.paidAmountBDT),
      status: formData.status,
      itemsSummary: formData.itemsSummary
    };

    ERPStorage.addPO(newPO);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Procurement & Purchase Orders</h1>
            <Badge variant="purple">Cement, Steel & Raw Materials</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Generate formal construction material purchase orders, monitor supplier delivery challans, and track payment schedules.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>New Purchase Order</span>
        </Button>
      </div>

      {/* PO Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Orders Committed</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalPOAmount, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{pos.length} total purchase orders issued</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Deliveries Received</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">
              {pos.filter(p => p.status === 'Delivered').length} Fulfilled
            </div>
            <p className="text-[11px] text-emerald-600 mt-0.5">Verified at site weighbridges</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Orders</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              {pos.filter(p => p.status === 'Pending' || p.status === 'Partially Delivered').length} In Transit
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Awaiting site arrival & gate pass</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by PO number, supplier, or material..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Delivered', 'Partially Delivered', 'Pending'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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

      {/* PO Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">PO Number</th>
                <th className="px-5 py-3 font-semibold">Supplier / Vendor</th>
                <th className="px-5 py-3 font-semibold">Project Site</th>
                <th className="px-5 py-3 font-semibold min-w-[240px]">Materials Summary</th>
                <th className="px-5 py-3 font-semibold">Order Date</th>
                <th className="px-5 py-3 font-semibold text-right">PO Total (BDT)</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPOs.map(po => (
                <tr key={po.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{po.poNumber}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">{po.supplierName}</td>
                  <td className="px-5 py-3.5 text-slate-600">{po.projectName.split('-')[0]}</td>
                  <td className="px-5 py-3.5 text-slate-700 leading-snug">{po.itemsSummary}</td>
                  <td className="px-5 py-3.5 text-slate-500 font-mono">{formatDateBD(po.orderDate)}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{formatBDT(po.totalAmountBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={po.status === 'Delivered' ? 'success' : po.status === 'Partially Delivered' ? 'warning' : 'outline'}>
                      {po.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedPO(po)}
                      className="p-1.5 rounded hover:bg-slate-100 text-[#6D28D9] font-medium transition-colors"
                      title="View PO Details"
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

      {/* PO Detail Modal */}
      {selectedPO && (
        <Modal
          isOpen={!!selectedPO}
          onClose={() => setSelectedPO(null)}
          title={`Purchase Order: ${selectedPO.poNumber}`}
          description={`Assigned Project: ${selectedPO.projectName}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Authorized Vendor:</span>
                <span className="font-bold text-slate-900">{selectedPO.supplierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Order Issue Date:</span>
                <span className="font-semibold text-slate-800">{formatDateBD(selectedPO.orderDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Delivery:</span>
                <span className="font-semibold text-slate-800">{formatDateBD(selectedPO.deliveryDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fulfillment Status:</span>
                <Badge variant="purple">{selectedPO.status}</Badge>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ordered Materials Scope</span>
              <p className="text-sm font-medium text-slate-800">{selectedPO.itemsSummary}</p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
              <span className="font-bold text-purple-900">Total Purchase Order Value:</span>
              <span className="text-base font-extrabold text-[#6D28D9]">{formatBDT(selectedPO.totalAmountBDT, 'full')}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedPO(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add PO Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Issue Construction Purchase Order (PO)"
        description="Select vendor and enter material requisition quantities."
      >
        <form onSubmit={handleCreatePO} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">PO Number</label>
              <input
                type="text"
                required
                value={formData.poNumber}
                onChange={e => setFormData({ ...formData, poNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Supplier</label>
              <input
                type="text"
                required
                value={formData.supplierName}
                onChange={e => setFormData({ ...formData, supplierName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Materials & Quantity Specifications *</label>
            <textarea
              required
              rows={3}
              value={formData.itemsSummary}
              onChange={e => setFormData({ ...formData, itemsSummary: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Total PO Amount (BDT)</label>
              <input
                type="number"
                required
                value={formData.totalAmountBDT}
                onChange={e => setFormData({ ...formData, totalAmountBDT: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Expected Delivery Date</label>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Generate PO
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
