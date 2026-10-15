'use client';

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Download,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatNumberBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { BOQItem } from '@/lib/types';

export default function EstimationBOQPage() {
  const [boqItems, setBoqItems] = useState<BOQItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BOQItem | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    itemCode: 'BOQ-NEW-01',
    description: '',
    category: 'Civil Works' as BOQItem['category'],
    unit: 'CFT' as BOQItem['unit'],
    quantity: 1000,
    unitRateBDT: 450,
    projectId: 'prj-1',
    status: 'Draft' as BOQItem['status']
  });

  useEffect(() => {
    setBoqItems(ERPStorage.getBOQ());
    const handleStorage = () => setBoqItems(ERPStorage.getBOQ());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  // Filter items
  const filteredItems = boqItems.filter(item => {
    const matchesSearch =
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate grand totals dynamically
  const grandTotal = boqItems.reduce((acc, item) => acc + item.totalBDT, 0);
  const filteredTotal = filteredItems.reduce((acc, item) => acc + item.totalBDT, 0);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      itemCode: `BOQ-CIV-0${boqItems.length + 1}`,
      description: '',
      category: 'Civil Works',
      unit: 'CFT',
      quantity: 5000,
      unitRateBDT: 380,
      projectId: 'prj-1',
      status: 'Draft'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: BOQItem) => {
    setEditingItem(item);
    setFormData({
      itemCode: item.itemCode,
      description: item.description,
      category: item.category,
      unit: item.unit,
      quantity: item.quantity,
      unitRateBDT: item.unitRateBDT,
      projectId: item.projectId,
      status: item.status
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const total = formData.quantity * formData.unitRateBDT;

    if (editingItem) {
      const updated: BOQItem = {
        ...editingItem,
        ...formData,
        totalBDT: total
      };
      ERPStorage.updateBOQItem(updated);
    } else {
      const newItem: BOQItem = {
        id: `boq-${Date.now()}`,
        ...formData,
        totalBDT: total
      };
      ERPStorage.addBOQItem(newItem);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this BOQ line item?')) {
      ERPStorage.deleteBOQItem(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Estimation & Bill of Quantities (BOQ)</h1>
            <Badge variant="purple">PWD Standard & Unit Rates</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated calculations for RCC casting, 500W rebar, brick masonry, sand and aggregates with dynamic grand totals.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={() => alert('Simulated: BOQ exported to Excel format.')}>
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export BOQ</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleOpenAdd}>
            <Plus className="w-4 h-4" />
            <span>Add BOQ Item</span>
          </Button>
        </div>
      </div>

      {/* Grand Total Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Grand Total BOQ Value</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(grandTotal, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{formatBDT(grandTotal, 'full')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Line Items</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{boqItems.length} Estimated Items</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Across Civil, Structural Steel & Finishing</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtered View Total</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{formatBDT(filteredTotal, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{filteredItems.length} items currently visible</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items by code, specification or material..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Reinforced Concrete', 'Structural Steel', 'Civil Works', 'Finishing', 'Earthwork'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#6D28D9] text-white shadow-2xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BOQ Interactive Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Item Code</th>
                <th className="px-5 py-3 font-semibold min-w-[300px]">Description & Specifications</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold text-center">Unit</th>
                <th className="px-5 py-3 font-semibold text-right">Quantity</th>
                <th className="px-5 py-3 font-semibold text-right">Unit Rate (BDT)</th>
                <th className="px-5 py-3 font-semibold text-right">Total Amount (BDT)</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-semibold text-[#6D28D9]">{item.itemCode}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800 leading-relaxed">{item.description}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center font-semibold text-slate-700">{item.unit}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium text-slate-800">{formatNumberBD(item.quantity)}</td>
                  <td className="px-5 py-3.5 text-right font-mono text-slate-700">৳{formatNumberBD(item.unitRateBDT)}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{formatBDT(item.totalBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={item.status === 'Approved' ? 'success' : item.status === 'Revised' ? 'warning' : 'outline'}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#6D28D9]" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded hover:bg-rose-50 text-rose-600 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer with Live Grand Total */}
            <tfoot className="bg-[#F5F3FF] border-t-2 border-[#DDD6FE] text-xs font-bold text-slate-900">
              <tr>
                <td colSpan={6} className="px-5 py-3.5 text-right uppercase tracking-wider text-purple-900">
                  Total Bill of Quantities Calculation:
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-sm text-[#6D28D9]">
                  {formatBDT(filteredTotal, 'full')}
                </td>
                <td colSpan={2} className="px-5 py-3.5 text-center text-purple-700">
                  Auto-calculated
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal with Live Rate * Qty Calculation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit BOQ Item' : 'Add New BOQ Line Item'}
        description="Line total is automatically calculated as Quantity × Unit Rate (BDT)."
      >
        <form onSubmit={handleSaveItem} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Item Code *</label>
              <input
                type="text"
                required
                value={formData.itemCode}
                onChange={e => setFormData({ ...formData, itemCode: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Reinforced Concrete">Reinforced Concrete</option>
                <option value="Structural Steel">Structural Steel</option>
                <option value="Civil Works">Civil Works</option>
                <option value="Finishing">Finishing</option>
                <option value="MEP Services">MEP Services</option>
                <option value="Earthwork">Earthwork</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Item Description & Work Specs *</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Supplying and placing M25 concrete using 20mm crushed stone aggregate..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#8B5CF6]/40"
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
                <option value="CFT">CFT (Cubic Feet)</option>
                <option value="SFT">SFT (Square Feet)</option>
                <option value="MT">MT (Metric Ton)</option>
                <option value="Bags">Bags (50 kg)</option>
                <option value="Nos">Nos (Pieces)</option>
                <option value="Running Meter">Running Meter</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Quantity</label>
              <input
                type="number"
                required
                min={1}
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Unit Rate (BDT)</label>
              <input
                type="number"
                required
                min={1}
                value={formData.unitRateBDT}
                onChange={e => setFormData({ ...formData, unitRateBDT: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Live Calculated Total Preview */}
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
            <span className="font-semibold text-purple-900">Calculated Line Total:</span>
            <span className="text-base font-extrabold text-[#6D28D9]">
              {formatBDT(formData.quantity * formData.unitRateBDT, 'full')}
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingItem ? 'Save Changes' : 'Add to BOQ'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
