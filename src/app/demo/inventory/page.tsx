'use client';

import React, { useState, useEffect } from 'react';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  Plus,
  RefreshCw,
  PackageCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatNumberBD, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { InventoryItem } from '@/lib/types';
import Link from 'next/link';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: 'MAT-STK-08',
    name: '',
    category: 'Cement' as InventoryItem['category'],
    unit: 'Bags' as InventoryItem['unit'],
    availableQty: 1000,
    minThresholdQty: 500,
    unitCostBDT: 550,
    locationSite: 'Banani Central Yard - Flyover Segment 4'
  });

  useEffect(() => {
    setInventory(ERPStorage.getInventory());
    const handleStorage = () => setInventory(ERPStorage.getInventory());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const filteredItems = inventory.filter(i => {
    const matchesSearch =
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.code.toLowerCase().includes(search.toLowerCase()) ||
      i.locationSite.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || i.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;
  const totalStockValuation = inventory.reduce((acc, i) => acc + i.availableQty * i.unitCostBDT, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const status: InventoryItem['status'] =
      formData.availableQty <= formData.minThresholdQty * 0.5
        ? 'Critical'
        : formData.availableQty <= formData.minThresholdQty
        ? 'Low Stock'
        : 'Adequate';

    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      code: formData.code,
      name: formData.name,
      category: formData.category,
      unit: formData.unit,
      availableQty: Number(formData.availableQty),
      minThresholdQty: Number(formData.minThresholdQty),
      unitCostBDT: Number(formData.unitCostBDT),
      locationSite: formData.locationSite,
      lastUpdated: new Date().toISOString().split('T')[0],
      status
    };

    ERPStorage.addInventoryItem(newItem);
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Material Inventory & Stock Control</h1>
            <Badge variant="purple">Cement, Rebar, Sand & Aggregates</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock ledger across central yards and site storage. Automatic minimum reorder notifications.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/demo/procurement">
            <Button variant="secondary" size="sm">
              <span>Create Purchase Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setIsAddOpen(true)}>
            <Plus className="w-4 h-4" />
            <span>Add Material Stock</span>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Stock Valuation</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalStockValuation, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{inventory.length} tracked materials across all sites</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Stock Reorder Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{lowStockCount} Items Below Threshold</div>
            <p className="text-[11px] text-amber-800 mt-0.5">Seven Rings Cement, BSRM Rebar 16mm, etc.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Storage Sites & Wharfs</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">4 Active Yards</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Banani, Patenga Wharf, Uttara & Rooppur</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material by name, code or yard location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Cement', 'Rebar / Rod', 'Sand & Aggregates', 'Bricks & Blocks', 'Finishing & Paints'].map(cat => (
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

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Material Code</th>
                <th className="px-5 py-3 font-semibold min-w-[240px]">Material Description</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Storage Location</th>
                <th className="px-5 py-3 font-semibold text-right">Available Qty</th>
                <th className="px-5 py-3 font-semibold text-right">Min Threshold</th>
                <th className="px-5 py-3 font-semibold text-right">Estimated Unit Cost</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    item.status === 'Critical' ? 'bg-rose-50/30' : item.status === 'Low Stock' ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{item.code}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900">{item.name}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{item.locationSite}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">
                    {formatNumberBD(item.availableQty)} {item.unit}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-500">
                    {formatNumberBD(item.minThresholdQty)} {item.unit}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-700">৳{formatNumberBD(item.unitCostBDT)}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={item.status === 'Critical' ? 'destructive' : item.status === 'Low Stock' ? 'warning' : 'success'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right text-slate-500 font-mono text-[11px]">{formatDateBD(item.lastUpdated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Material Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Material to Site Inventory"
        description="Record newly delivered construction materials or batch receipts."
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Material Code</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Cement">Cement</option>
                <option value="Rebar / Rod">Rebar / Rod</option>
                <option value="Sand & Aggregates">Sand & Aggregates</option>
                <option value="Bricks & Blocks">Bricks & Blocks</option>
                <option value="Finishing & Paints">Finishing & Paints</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Material Name & Grade *</label>
            <input
              type="text"
              required
              placeholder="e.g. Crown Special Cement PCC (50kg)"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Unit</label>
              <select
                value={formData.unit}
                onChange={e => setFormData({ ...formData, unit: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Bags">Bags</option>
                <option value="MT">MT</option>
                <option value="CFT">CFT</option>
                <option value="Nos">Nos</option>
                <option value="Gallons">Gallons</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Available Qty</label>
              <input
                type="number"
                required
                value={formData.availableQty}
                onChange={e => setFormData({ ...formData, availableQty: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Min Threshold</label>
              <input
                type="number"
                required
                value={formData.minThresholdQty}
                onChange={e => setFormData({ ...formData, minThresholdQty: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Site Yard Location</label>
            <input
              type="text"
              required
              value={formData.locationSite}
              onChange={e => setFormData({ ...formData, locationSite: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save to Stock
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
