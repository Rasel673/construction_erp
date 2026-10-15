'use client';

import React, { useState, useEffect } from 'react';
import {
  FileSignature,
  Search,
  Filter,
  Plus,
  ShieldCheck,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { ContractRecord } from '@/lib/types';

export default function ContractsPage() {
  const [contracts, setContracts] = useState<ContractRecord[]>([]);
  const [search, setSearch] = useState('');
  const [selectedContract, setSelectedContract] = useState<ContractRecord | null>(null);

  useEffect(() => {
    setContracts(ERPStorage.getContracts());
    const handleStorage = () => setContracts(ERPStorage.getContracts());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const filteredContracts = contracts.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.contractNo.toLowerCase().includes(search.toLowerCase()) ||
    c.clientName.toLowerCase().includes(search.toLowerCase()) ||
    c.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const totalContractSum = contracts.reduce((acc, c) => acc + c.contractValueBDT, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Legal Contracts & Agreements</h1>
            <Badge variant="purple">Retention & Bank Guarantees</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking execution clauses, retention money deductions (5%-10%), mobilization advances, and performance bond validity.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="primary" size="sm" onClick={() => alert('Simulated: New contract draft initiated.')}>
            <Plus className="w-4 h-4" />
            <span>Draft Contract</span>
          </Button>
        </div>
      </div>

      {/* Contract Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/20">
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">Total Contract Portfolio</span>
            <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{formatBDT(totalContractSum, 'compact')}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">{contracts.length} active government & private contracts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance Bonds</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">100% Secured</div>
            <p className="text-[11px] text-emerald-600 mt-0.5">All scheduled bank guarantees active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Retention Security</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">7.5%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Standard Bangladesh Defect Liability Period</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by contract number, project or client..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>
      </div>

      {/* Contracts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Contract No</th>
                <th className="px-5 py-3 font-semibold min-w-[260px]">Contract Title & Scope</th>
                <th className="px-5 py-3 font-semibold">Client Authority</th>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="px-5 py-3 font-semibold text-right">Value (BDT)</th>
                <th className="px-5 py-3 font-semibold text-center">Retention %</th>
                <th className="px-5 py-3 font-semibold">Completion Date</th>
                <th className="px-5 py-3 font-semibold text-center">Status</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-[#6D28D9]">{c.contractNo}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-800 leading-snug">{c.title}</td>
                  <td className="px-5 py-3.5 text-slate-700">{c.clientName}</td>
                  <td className="px-5 py-3.5 text-slate-600">{c.projectName.split('-')[0]}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-900">{formatBDT(c.contractValueBDT, 'compact')}</td>
                  <td className="px-5 py-3.5 text-center font-semibold text-slate-700">{c.retentionMoneyPercent}%</td>
                  <td className="px-5 py-3.5 text-slate-600">{formatDateBD(c.completionDate)}</td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={c.status === 'Active' ? 'purple' : 'outline'}>{c.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedContract(c)}
                      className="p-1.5 rounded hover:bg-slate-100 text-[#6D28D9] font-medium transition-colors"
                      title="Inspect Contract"
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

      {/* Contract Detail Modal */}
      {selectedContract && (
        <Modal
          isOpen={!!selectedContract}
          onClose={() => setSelectedContract(null)}
          title={selectedContract.title}
          description={`Contract No: ${selectedContract.contractNo}`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Employer / Client</span>
                <strong className="text-slate-800 text-sm">{selectedContract.clientName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Contract Amount</span>
                <strong className="text-[#6D28D9] text-base">{formatBDT(selectedContract.contractValueBDT, 'full')}</strong>
              </div>
            </div>

            <div className="space-y-2 border border-slate-100 rounded-xl p-3">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Signing Date:</span>
                <span className="font-semibold text-slate-800">{formatDateBD(selectedContract.signingDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Effective Mobilization Date:</span>
                <span className="font-semibold text-slate-800">{formatDateBD(selectedContract.effectiveDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Target Handover Date:</span>
                <span className="font-semibold text-slate-800">{formatDateBD(selectedContract.completionDate)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Retention Deduction Clause:</span>
                <span className="font-semibold text-slate-800">{selectedContract.retentionMoneyPercent}% (Held until Defect Liability Period)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Bank Guarantee (Performance Security):</span>
                <Badge variant="success">{selectedContract.performanceGuaranteeStatus}</Badge>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedContract(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
