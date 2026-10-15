'use client';

import React, { useState, useEffect } from 'react';
import {
  HardHat,
  Search,
  Plus,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Building,
  CheckCircle,
  Clock,
  ArrowUpRight,
  MapPin,
  TrendingUp,
  X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for creating a demo project
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    client: '',
    location: '',
    contractValueBDT: 250000000,
    spentBDT: 0,
    progressPercent: 10,
    status: 'Active',
    projectManager: 'Engr. Resident Engineer',
    startDate: '2025-03-01',
    targetEndDate: '2027-12-31'
  });

  useEffect(() => {
    setProjects(ERPStorage.getProjects());
    const handleStorage = () => setProjects(ERPStorage.getProjects());
    window.addEventListener('nirman-storage-change', handleStorage);
    return () => window.removeEventListener('nirman-storage-change', handleStorage);
  }, []);

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.client) return;

    const newPrj: Project = {
      id: `prj-${Date.now()}`,
      code: `PRJ-BD-00${projects.length + 1}`,
      name: formData.name || 'Civil Project',
      client: formData.client || 'Client Authority',
      location: formData.location || 'Dhaka, Bangladesh',
      startDate: formData.startDate || '2025-01-01',
      targetEndDate: formData.targetEndDate || '2027-12-31',
      contractValueBDT: Number(formData.contractValueBDT) || 100000000,
      spentBDT: Number(formData.spentBDT) || 0,
      progressPercent: Number(formData.progressPercent) || 5,
      status: (formData.status as any) || 'Active',
      projectManager: formData.projectManager || 'Site Lead',
      milestonesCount: 10,
      completedMilestones: 1
    };

    ERPStorage.addProject(newPrj);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      client: '',
      location: '',
      contractValueBDT: 250000000,
      spentBDT: 0,
      progressPercent: 10,
      status: 'Active',
      projectManager: 'Engr. Resident Engineer'
    });
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this demo project?')) {
      ERPStorage.deleteProject(id);
      if (selectedProject?.id === id) setSelectedProject(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Portfolio Management</h1>
            <Badge variant="purple">Mega Projects & Civil Works</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage infrastructure, bridge viaducts, coastal yards and high-rise structural civil projects across Bangladesh.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by name, code, client or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Active', 'Near Completion', 'In Planning'].map(st => (
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

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map(prj => (
          <Card
            key={prj.id}
            className="hover:border-purple-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            onClick={() => setSelectedProject(prj)}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                  {prj.code}
                </span>
                <Badge
                  variant={
                    prj.status === 'Active'
                      ? 'purple'
                      : prj.status === 'Near Completion'
                      ? 'success'
                      : 'default'
                  }
                >
                  {prj.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-[#6D28D9] transition-colors">
                  {prj.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{prj.client}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{prj.location}</span>
                </p>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50/80 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Contract Value</span>
                  <strong className="text-slate-900 font-bold">{formatBDT(prj.contractValueBDT, 'compact')}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase font-medium">Expended</span>
                  <strong className="text-[#6D28D9] font-bold">{formatBDT(prj.spentBDT, 'compact')}</strong>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Progress</span>
                  <span className="font-bold text-slate-800">{prj.progressPercent}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6D28D9] h-2 rounded-full transition-all"
                    style={{ width: `${prj.progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                  <span>Milestones: {prj.completedMilestones}/{prj.milestonesCount}</span>
                  <span>Lead: {prj.projectManager.split(' ')[1] || prj.projectManager}</span>
                </div>
              </div>
            </CardContent>

            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Target: {formatDateBD(prj.targetEndDate)}</span>
              </span>
              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => setSelectedProject(prj)}
                  className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4 text-[#6D28D9]" />
                </button>
                <button
                  onClick={e => handleDeleteProject(prj.id, e)}
                  className="p-1.5 rounded hover:bg-rose-100 text-rose-600 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Project Detail Slide-over / Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.name}
          description={`${selectedProject.code} • ${selectedProject.client}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] text-slate-500 block uppercase">Contract Value</span>
                <span className="text-base font-bold text-slate-900">{formatBDT(selectedProject.contractValueBDT, 'compact')}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{formatBDT(selectedProject.contractValueBDT, 'full')}</span>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <span className="text-[11px] text-purple-600 block uppercase">Spent to Date</span>
                <span className="text-base font-bold text-[#6D28D9]">{formatBDT(selectedProject.spentBDT, 'compact')}</span>
                <span className="text-[10px] text-purple-400 block mt-0.5">Budget Utilized: {Math.round((selectedProject.spentBDT / selectedProject.contractValueBDT) * 100)}%</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] text-slate-500 block uppercase">Status</span>
                <Badge variant="purple" className="mt-1">{selectedProject.status}</Badge>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-[11px] text-slate-500 block uppercase">Physical Progress</span>
                <span className="text-base font-bold text-slate-900">{selectedProject.progressPercent}%</span>
              </div>
            </div>

            {/* Site & Execution Info */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Site Execution Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Location:</span>
                  <p className="font-semibold text-slate-800">{selectedProject.location}</p>
                </div>
                <div>
                  <span className="text-slate-400">Chief Project Director:</span>
                  <p className="font-semibold text-slate-800">{selectedProject.projectManager}</p>
                </div>
                <div>
                  <span className="text-slate-400">Mobilization Date:</span>
                  <p className="font-semibold text-slate-800">{formatDateBD(selectedProject.startDate)}</p>
                </div>
                <div>
                  <span className="text-slate-400">Contractual Completion:</span>
                  <p className="font-semibold text-slate-800">{formatDateBD(selectedProject.targetEndDate)}</p>
                </div>
              </div>
            </div>

            {/* Simulated Milestones */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Key Project Milestones</h4>
              <div className="space-y-2">
                {[
                  { name: 'Initial Survey, Soil Boring & Site Mobilization', status: 'Completed', date: 'Feb 2024' },
                  { name: 'Substructure Piling & Precast Pile Caps Pouring', status: 'Completed', date: 'Jul 2024' },
                  { name: 'Intermediate Pier Casting & Pier Head Shuttering', status: selectedProject.progressPercent > 50 ? 'Completed' : 'In Progress', date: 'Jan 2025' },
                  { name: 'Deck Slab Concrete Casting with Heavy Transit Mixers', status: selectedProject.progressPercent > 70 ? 'Completed' : 'Upcoming', date: 'Aug 2025' },
                  { name: 'Final Handover, Pavement Surfacing & Snag Rectification', status: 'Upcoming', date: 'Dec 2026' }
                ].map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${m.status === 'Completed' ? 'bg-emerald-500' : m.status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                      <span className="font-medium text-slate-800">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{m.date}</span>
                      <Badge variant={m.status === 'Completed' ? 'success' : m.status === 'In Progress' ? 'warning' : 'default'}>
                        {m.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                Close View
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Construction Project"
        description="Fictional simulation: add a new project to your local demo environment."
      >
        <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Project Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Moghbazar Flyover Repair & Expansion"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Client Authority *</label>
              <input
                type="text"
                required
                placeholder="e.g. Roads & Highways Dept"
                value={formData.client}
                onChange={e => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Site Location</label>
              <input
                type="text"
                placeholder="e.g. Dhaka, Bangladesh"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Contract Value (BDT)</label>
              <input
                type="number"
                value={formData.contractValueBDT}
                onChange={e => setFormData({ ...formData, contractValueBDT: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">{formatBDT(Number(formData.contractValueBDT) || 0)}</span>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assigned Project Manager</label>
              <input
                type="text"
                value={formData.projectManager}
                onChange={e => setFormData({ ...formData, projectManager: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Create Demo Project
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
