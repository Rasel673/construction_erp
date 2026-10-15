'use client';

import React, { useState, useEffect } from 'react';
import {
  FlagTriangleRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  BarChart2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatBDT, formatDateBD } from '@/lib/formatters';
import { ERPStorage } from '@/lib/storage';
import { Project } from '@/lib/types';

export default function ProgressMilestonesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('prj-1');

  useEffect(() => {
    const list = ERPStorage.getProjects();
    setProjects(list);
    if (list.length > 0) setSelectedProjectId(list[0].id);
  }, []);

  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const milestones = [
    {
      id: 1,
      phase: 'Phase 1: Mobilization & Survey',
      title: 'Topographic Survey & Soil Investigation Boring (30m Deep)',
      targetDate: '2024-03-15',
      achievedDate: '2024-03-10',
      status: 'Achieved',
      weightage: 10,
      inspectionNotes: 'Soil report submitted by BUET geotechnical team. Approved by BBA consultant.'
    },
    {
      id: 2,
      phase: 'Phase 2: Substructure Civil Works',
      title: 'Piling Works & Precast Pile Caps Cast (48 Nos)',
      targetDate: '2024-09-30',
      achievedDate: '2024-10-05',
      status: 'Achieved',
      weightage: 25,
      inspectionNotes: 'All dynamic load tests passed (capacity 450 Tons each).'
    },
    {
      id: 3,
      phase: 'Phase 3: Superstructure Piers',
      title: 'Pier Shaft & Pier Cap Casting up to Level 3',
      targetDate: '2025-02-28',
      achievedDate: 'In Progress',
      status: 'In Progress',
      weightage: 30,
      inspectionNotes: '70% done. 500W rebar reinforcement certified by Resident Engineer.'
    },
    {
      id: 4,
      phase: 'Phase 4: Deck Girders & Slab',
      title: 'Pre-stressed Concrete Girder Launching & Deck Slab Pouring',
      targetDate: '2025-11-15',
      achievedDate: 'Scheduled',
      status: 'Upcoming',
      weightage: 25,
      inspectionNotes: 'Launching gantry mobilization planned for May 2025.'
    },
    {
      id: 5,
      phase: 'Phase 5: Finishing & Testing',
      title: 'Asphalt Wearing Course, Expansion Joints & Load Testing',
      targetDate: '2026-11-30',
      achievedDate: 'Scheduled',
      status: 'Upcoming',
      weightage: 10,
      inspectionNotes: 'Final joint inspection and municipal certificate.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Project Progress & Site Milestones</h1>
            <Badge variant="purple">Physical vs Financial Variance</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking execution milestones, PWD inspection signoffs, and critical path schedules across site packages.
          </p>
        </div>

        {/* Project Selector */}
        {projects.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Active Project:</span>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name.split('-')[0]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {activeProject && (
        <>
          {/* Progress Health Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Physical Progress</span>
                <div className="text-2xl font-extrabold text-[#6D28D9] mt-1">{activeProject.progressPercent}%</div>
                <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6D28D9] h-2 rounded-full"
                    style={{ width: `${activeProject.progressPercent}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Financial Progress (Billed)</span>
                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                  {Math.round((activeProject.spentBDT / activeProject.contractValueBDT) * 100)}%
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Expended: {formatBDT(activeProject.spentBDT, 'compact')} / {formatBDT(activeProject.contractValueBDT, 'compact')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule Health</span>
                <div className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>On Schedule</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Target End: {formatDateBD(activeProject.targetEndDate)}</p>
              </CardContent>
            </Card>
          </div>

          {/* Milestone Step Flow */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Milestone Breakdown for {activeProject.name}</CardTitle>
                <CardDescription>Independent engineering certification and site inspection audit trail</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-xl border transition-all ${
                    m.status === 'Achieved'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : m.status === 'In Progress'
                      ? 'border-purple-300 bg-[#F5F3FF]/40 ring-1 ring-purple-400/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                          m.status === 'Achieved'
                            ? 'bg-emerald-600 text-white'
                            : m.status === 'In Progress'
                            ? 'bg-[#6D28D9] text-white animate-pulse'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {m.status === 'Achieved' ? '✓' : idx + 1}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{m.phase}</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">{m.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-snug">{m.inspectionNotes}</p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 sm:text-right shrink-0">
                      <Badge
                        variant={
                          m.status === 'Achieved'
                            ? 'success'
                            : m.status === 'In Progress'
                            ? 'purple'
                            : 'default'
                        }
                      >
                        {m.status}
                      </Badge>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Target: {formatDateBD(m.targetDate)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
