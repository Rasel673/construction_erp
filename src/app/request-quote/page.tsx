'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Send,
  Building2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  User,
  SlidersHorizontal,
  Info,
  ArrowLeft,
  X
} from 'lucide-react';
import { ERP_MODULES } from '@/lib/mock-data/erp-data';
import { ERPStorage } from '@/lib/storage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

// Zod Schema
const quoteFormSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  contactPerson: z.string().min(2, { message: 'Contact person name is required.' }),
  phone: z.string().min(10, { message: 'Please provide a valid Bangladeshi contact number (e.g. 017xxxxxxxx).' }),
  email: z.string().email({ message: 'Invalid email address.' }).optional().or(z.literal('')),
  companyType: z.enum([
    'General Contractor',
    'Real Estate Developer',
    'Subcontractor / Trade Specialist',
    'Infrastructure & Civil Eng'
  ]),
  selectedModules: z.array(z.string()).min(1, { message: 'Please select at least one module.' }),
  additionalRequirements: z.string().optional()
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export default function RequestQuotePage() {
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [submissionResult, setSubmissionResult] = useState<QuoteFormValues | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      companyType: 'General Contractor',
      selectedModules: [],
      additionalRequirements: ''
    }
  });

  const watchedSelectedModules = watch('selectedModules') || [];

  useEffect(() => {
    const saved = ERPStorage.getSelectedModules();
    setSelectedModuleIds(saved);
    setValue('selectedModules', saved);
  }, [setValue]);

  const toggleModuleSelection = (id: string) => {
    let next: string[];
    if (watchedSelectedModules.includes(id)) {
      next = watchedSelectedModules.filter(m => m !== id);
    } else {
      next = [...watchedSelectedModules, id];
    }
    setValue('selectedModules', next, { shouldValidate: true });
    ERPStorage.saveSelectedModules(next);
  };

  const onSubmit = (data: QuoteFormValues) => {
    // Demonstration simulation
    setSubmissionResult(data);
  };

  const totalMonthlyBDT = ERP_MODULES.filter(m =>
    watchedSelectedModules.includes(m.id)
  ).reduce((acc, m) => acc + m.indicativePriceBDTPerMonth, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Nirman<span className="text-[#6D28D9]">ERP</span>
            </span>
            <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded bg-purple-50 text-[#6D28D9] font-semibold border border-purple-200">
              Quotation
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/configure">
            <Button variant="ghost" size="sm">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Back to Configurator</span>
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="sm">
              <span>Interactive Dashboard</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="purple" className="px-3 py-1">
            Simulated Sales Demonstration Inquiry
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Request an Enterprise Proposal
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Specify your construction company information and selected software modules. Experience how NirmanERP captures and configures corporate client inquiries.
          </p>
        </div>

        {/* Notice alert */}
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-3">
          <Info className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Evaluation Mode Notice:</strong>
            <p className="mt-0.5 leading-relaxed">
              This form is an interactive frontend demo. Submitting it validates your inputs with React Hook Form and Zod, and renders a local quotation inquiry summary. No real emails or database records are transmitted.
            </p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Interactive Form (2 cols) */}
          <Card className="lg:col-span-2 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">1. Company & Contact Details</h3>
                <p className="text-slate-500 text-[11px]">Tell us about your contracting or engineering firm.</p>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company / Organization Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Padma Infrastructure & Builders Ltd"
                  {...register('companyName')}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 ${
                    errors.companyName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.companyName && (
                  <p className="text-rose-600 text-[11px] mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Engr. Tanvir Ahmed"
                    {...register('contactPerson')}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 ${
                      errors.contactPerson ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.contactPerson && (
                    <p className="text-rose-600 text-[11px] mt-1">{errors.contactPerson.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Company Type *</label>
                  <select
                    {...register('companyType')}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
                  >
                    <option value="General Contractor">General Contractor</option>
                    <option value="Real Estate Developer">Real Estate Developer</option>
                    <option value="Infrastructure & Civil Eng">Infrastructure & Civil Eng</option>
                    <option value="Subcontractor / Trade Specialist">Subcontractor / Trade Specialist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone Number (Bangladeshi Mobile) *</label>
                  <input
                    type="text"
                    placeholder="e.g. +880 1711-234567"
                    {...register('phone')}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 ${
                      errors.phone ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-rose-600 text-[11px] mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="e.g. info@padmainfra.com.bd"
                    {...register('email')}
                    className={`w-full px-3.5 py-2.5 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40 ${
                      errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-rose-600 text-[11px] mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <h3 className="text-base font-bold text-slate-900">2. Selected ERP Modules ({watchedSelectedModules.length})</h3>
                <p className="text-slate-500 text-[11px]">Click any module tag to include or exclude it from this quotation proposal.</p>
              </div>

              {errors.selectedModules && (
                <p className="text-rose-600 text-[11px]">{errors.selectedModules.message}</p>
              )}

              {/* Tag Cloud Selector */}
              <div className="flex flex-wrap gap-2 pt-1">
                {ERP_MODULES.map(mod => {
                  const isChecked = watchedSelectedModules.includes(mod.id);
                  return (
                    <button
                      type="button"
                      key={mod.id}
                      onClick={() => toggleModuleSelection(mod.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? 'bg-[#6D28D9] text-white border-[#6D28D9] shadow-2xs font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isChecked && <span className="mr-1">✓</span>}
                      {mod.name}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <h3 className="text-base font-bold text-slate-900">3. Specific Site Workflows & Requirements</h3>
                <p className="text-slate-500 text-[11px]">Describe any custom requirements (e.g., number of concurrent project sites, RA billing approval tiers, mobile app needs).</p>
              </div>

              <textarea
                rows={3}
                placeholder="e.g. We have 4 ongoing highway flyover projects in Dhaka and Sylhet. We need daily labor muster rolls and weighbridge cement integrations..."
                {...register('additionalRequirements')}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full text-sm font-bold shadow-md">
                  <Send className="w-4 h-4" />
                  <span>Submit Simulated Quote Request</span>
                </Button>
              </div>
            </form>
          </Card>

          {/* Right: Live Quote Summary (1 col) */}
          <div className="space-y-5">
            <Card className="border-purple-200 bg-gradient-to-b from-purple-50/40 to-white p-5 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider block">Scope Preview</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">Configuration Summary</h3>
                <p className="text-xs text-slate-500 mt-1">Based on current module selections</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-purple-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Modules Selected:</span>
                  <strong className="text-slate-800">{watchedSelectedModules.length} Modules</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Indicative Fee:</span>
                  <strong className="text-[#6D28D9] font-bold">~৳{totalMonthlyBDT.toLocaleString()}/mo</strong>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Billing Cycle:</span>
                  <span>Quarterly / Annual BDT</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Selected Capabilities:</span>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                  {ERP_MODULES.filter(m => watchedSelectedModules.includes(m.id)).map(m => (
                    <div key={m.id} className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
                      <span className="truncate">{m.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-5 space-y-2 text-xs text-slate-600">
              <h4 className="font-bold text-slate-800">Support & Implementation</h4>
              <p>• On-site staff training in Dhaka & Chattogram</p>
              <p>• Data migration from Excel/PWD schedules</p>
              <p>• Dedicated local technical support in Bangla & English</p>
            </Card>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {submissionResult && (
        <Modal
          isOpen={!!submissionResult}
          onClose={() => setSubmissionResult(null)}
          title="Demo Quotation Request Generated"
          description="Local Frontend Simulation Only"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 text-sm">Inquiry Validated Successfully!</h4>
                <p className="text-emerald-800 mt-1 leading-relaxed">
                  Notice: This was a local frontend demonstration. No actual email or backend API transmission occurred. In a live deployment, this form would deliver an enterprise proposal to the customer success team.
                </p>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Inquiry Summary</span>
              <p><strong>Company:</strong> {submissionResult.companyName} ({submissionResult.companyType})</p>
              <p><strong>Contact Person:</strong> {submissionResult.contactPerson}</p>
              <p><strong>Phone:</strong> {submissionResult.phone}</p>
              {submissionResult.email && <p><strong>Email:</strong> {submissionResult.email}</p>}
              <p><strong>Included Modules ({submissionResult.selectedModules.length}):</strong></p>
              <div className="flex flex-wrap gap-1 pt-1">
                {submissionResult.selectedModules.map(id => {
                  const mod = ERP_MODULES.find(m => m.id === id);
                  return (
                    <span key={id} className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-semibold">
                      {mod?.name || id}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link href="/demo">
                <Button variant="secondary" size="sm">
                  <span>Explore Interactive Dashboard</span>
                </Button>
              </Link>
              <Button variant="primary" size="sm" onClick={() => setSubmissionResult(null)}>
                Close Demo Result
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
