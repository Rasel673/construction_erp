'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  HardHat,
  Calculator,
  ShoppingCart,
  Boxes,
  Truck,
  Users,
  UserCheck,
  Wrench,
  Receipt,
  PieChart,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  SlidersHorizontal,
  Send,
  PhoneCall,
  Check
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ERP_MODULES } from '@/lib/mock-data/erp-data';

export default function LandingPage() {
  const coreModulesPreview = ERP_MODULES.slice(0, 9);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col selection:bg-purple-200 selection:text-purple-900">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/25">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              Nirman<span className="text-[#6D28D9]">ERP</span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-[#F5F3FF] text-[#6D28D9] rounded border border-[#DDD6FE]">BD</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Construction Cloud Suite</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/demo/modules" className="hover:text-[#6D28D9] transition-colors">
            All 19 Modules
          </Link>
          <Link href="#preview" className="hover:text-[#6D28D9] transition-colors">
            Live Preview
          </Link>
          <Link href="#benefits" className="hover:text-[#6D28D9] transition-colors">
            Bangladesh Value
          </Link>
          <Link href="/configure" className="hover:text-[#6D28D9] transition-colors">
            Configurator
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              <span>Open Demo (No Login)</span>
            </Button>
          </Link>
          <Link href="/request-quote">
            <Button variant="primary" size="sm">
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* 2. Hero Section with Somikoron-inspired floating badges and clean purple depth */}
      <section className="relative overflow-hidden pt-14 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F3FF]/70 via-[#F8FAFC] to-[#F8FAFC]">
        {/* Soft Background Blur Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-purple-200/50 via-indigo-100/40 to-pink-100/30 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Interactive Micro-Cards (Desktop) */}
        <div className="hidden xl:block absolute left-8 top-32 z-20 animate-float pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-xl shadow-purple-900/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5 text-[#6D28D9]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-800">Seven Rings Cement</span>
              </div>
              <p className="text-[10px] text-slate-500">Banani Central Yard: 1,850 Bags</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute right-8 top-28 z-20 animate-float [animation-delay:2s] pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-xl shadow-purple-900/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold text-slate-800">Muster Roll Verified</span>
              </div>
              <p className="text-[10px] text-slate-500">310 Shramik & Rajmistri Today</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200/90 shadow-xs text-xs font-semibold text-[#6D28D9]">
            <Sparkles className="w-3.5 h-3.5 text-[#6D28D9] animate-pulse" />
            <span>Modern Construction ERP for Bangladeshi Contractors & Builders</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            One Platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#4C1D95]">
              Every Construction Operation.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Eliminate project delays, material pilferage, and chaotic site spreadsheets. Unify BOQ estimations, cement & rebar stocks, daily labor wages, RA billing, and financial health into a state-of-the-art enterprise system.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="text-base px-7 py-3.5 font-bold shadow-lg shadow-purple-600/30 hover:shadow-purple-600/40 w-full sm:w-auto">
                <HardHat className="w-5 h-5" />
                <span>Explore Interactive Demo</span>
              </Button>
            </Link>

            <Link href="/demo/modules">
              <Button variant="secondary" size="lg" className="text-base px-7 py-3.5 font-semibold border border-purple-200 w-full sm:w-auto hover:bg-purple-100/70">
                <Layers className="w-5 h-5 text-[#6D28D9]" />
                <span>Explore All 19 Modules</span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Login Required for Evaluation</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>BDT Lakh & Crore Standard</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Live Interactive Mock Data</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. Interactive Product Preview Cockpit */}
      <section id="preview" className="px-4 sm:px-6 lg:px-8 -mt-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-4 sm:p-6 space-y-6 overflow-hidden">
            {/* Top Preview Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                  https://nirmanerp.bd/demo (Open Interactive Evaluation)
                </span>
              </div>
              <Link href="/demo">
                <Badge variant="purple" className="hover:bg-purple-100 cursor-pointer">
                  Click to Test Live ERP Dashboard →
                </Badge>
              </Link>
            </div>

            {/* Simulated Live Cockpit UI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Active Sites</span>
                <p className="text-2xl font-black text-slate-900 mt-1">6 Mega Projects</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Dhaka, CTG, Sylhet, Pabna</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Contract Sum</span>
                <p className="text-2xl font-black text-slate-900 mt-1">৳505.50 Cr</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Civil & Structural Packages</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Direct Cost Expended</span>
                <p className="text-2xl font-black text-[#6D28D9] mt-1">৳283.60 Cr</p>
                <p className="text-[11px] text-slate-500 mt-0.5">56.1% Budget Utilization</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                <span className="text-[10px] font-bold text-amber-700 uppercase">Client Receivables Due</span>
                <p className="text-2xl font-black text-amber-700 mt-1">৳53.50 Cr</p>
                <p className="text-[11px] text-amber-800 font-medium mt-0.5">Certified Running Bills</p>
              </div>
            </div>

            {/* Quick Demo Links Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <Link href="/demo/projects" className="p-3 rounded-lg border border-slate-200 hover:border-[#6D28D9] hover:bg-[#F5F3FF] transition-all">
                <HardHat className="w-4 h-4 text-[#6D28D9] mb-1" />
                <p className="text-xs font-bold text-slate-800">Project Management</p>
                <p className="text-[10px] text-slate-500">6 Projects, Viaducts & Towers</p>
              </Link>
              <Link href="/demo/estimation" className="p-3 rounded-lg border border-slate-200 hover:border-[#6D28D9] hover:bg-[#F5F3FF] transition-all">
                <Calculator className="w-4 h-4 text-[#6D28D9] mb-1" />
                <p className="text-xs font-bold text-slate-800">Estimation & BOQ</p>
                <p className="text-[10px] text-slate-500">Auto Line & Grand Totals</p>
              </Link>
              <Link href="/demo/inventory" className="p-3 rounded-lg border border-slate-200 hover:border-[#6D28D9] hover:bg-[#F5F3FF] transition-all">
                <Boxes className="w-4 h-4 text-[#6D28D9] mb-1" />
                <p className="text-xs font-bold text-slate-800">Inventory & Materials</p>
                <p className="text-[10px] text-slate-500">Cement & Rebar Thresholds</p>
              </Link>
              <Link href="/demo/workforce" className="p-3 rounded-lg border border-slate-200 hover:border-[#6D28D9] hover:bg-[#F5F3FF] transition-all">
                <UserCheck className="w-4 h-4 text-[#6D28D9] mb-1" />
                <p className="text-xs font-bold text-slate-800">Site Labor & Wages</p>
                <p className="text-[10px] text-slate-500">Daily Rajmistri Muster Roll</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Module Overview Section (Inspired by Somikoron business modules) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
              Somikoron-Inspired Modular Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Modular Construction Intelligence
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Activate only what your contracting business requires. Every single module below is fully functional in this frontend demonstration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreModulesPreview.map(m => (
              <Card key={m.id} className="hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">{m.category}</span>
                    <Badge variant={m.isCore ? 'purple' : 'outline'}>{m.banglaName}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
                </CardContent>
                <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Fully Functional</span>
                  <Link href={m.href} className="text-xs font-bold text-[#6D28D9] hover:underline flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link href="/demo/modules">
              <Button variant="secondary" size="lg" className="border border-purple-200 font-bold">
                <span>View Full 19-Module Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Benefits for Bangladeshi Construction Companies */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="purple" className="px-3 py-1">Bangladesh Localization</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Bangladeshi Construction Realities
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generic global ERPs fail on Bangladeshi project sites. NirmanERP is built around how civil contracting genuinely works in Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                ৳
              </div>
              <h3 className="text-base font-bold text-slate-900">Native BDT Lakh & Crore Display</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seamless financial summaries formatted in South Asian numerical notation. Multi-crore bridge viaducts and 50-lakh site petty cash vouchers render naturally for local directors and quantity surveyors.
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <Boxes className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Local Raw Material Specs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-configured item libraries for Seven Rings / Crown Portland Composite Cement (PCC), BSRM 500W deformed rebar, coarse Sylhet Sand (FM 2.5), gas-burned red bricks, and stone aggregates.
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Muster Rolls & Daily Cash Wages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track daily headcounts for Rajmistri, rod binders, shuttering carpenters, and general helpers. Log overtime hours, site Sardar disbursements, and enterprise bKash or site petty cash payouts.
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">RA Bills & Retention Clauses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage Running Account (RA) bills, VAT and AIT government withholding taxes, and 5% to 10% retention money held for the contractual Defect Liability Period (DLP).
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Bank Guarantees & Tender Bonds</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track Performance Guarantee (PG) expiries, earnest money deposits, mobilization advances, and compliance certificates for BBA, RHD, CPA and private developer contracts.
              </p>
            </Card>

            <Card className="p-6 space-y-3 hover:border-purple-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6D28D9] flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Heavy Plant & Diesel Consumption</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log fuel consumption per operating hour on SANY excavators, Zoomlion tower cranes, and Schwing Stetter transit mixers with scheduled preventive maintenance reminders.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. Configure Your ERP Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">Interactive Configurator</span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Select Only the Modules Your Company Needs
            </h2>
            <p className="text-sm text-purple-100 leading-relaxed">
              Don&apos;t pay for monolithic bloated software. Use our live interactive configurator to pick the exact modules you need, view estimated pricing, and continue to an instant quotation preview.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/configure">
              <Button variant="secondary" size="lg" className="bg-white text-[#6D28D9] hover:bg-purple-50 font-bold border-none shadow-lg">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Configure My ERP</span>
              </Button>
            </Link>
            <Link href="/request-quote">
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 font-bold">
                <Send className="w-4 h-4" />
                <span>Get Quotation Demo</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6D28D9] flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">
                Nirman<span className="text-[#6D28D9]">ERP</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-md leading-relaxed">
              Bangladesh&apos;s premier modern enterprise Construction ERP frontend demonstration. Designed to inspire high-performance digital operations for civil, infrastructure and commercial engineering contractors.
            </p>
            <p className="text-[11px] text-slate-400">
              Interactive evaluation platform • No login required • Local mock data simulation
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5">
              <li><Link href="/demo" className="hover:text-[#6D28D9]">Executive Dashboard</Link></li>
              <li><Link href="/demo/modules" className="hover:text-[#6D28D9]">All 19 Modules Directory</Link></li>
              <li><Link href="/demo/projects" className="hover:text-[#6D28D9]">Project Management</Link></li>
              <li><Link href="/demo/estimation" className="hover:text-[#6D28D9]">Estimation & BOQ</Link></li>
              <li><Link href="/demo/inventory" className="hover:text-[#6D28D9]">Materials Inventory</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Commercial Demo</h4>
            <ul className="space-y-1.5">
              <li><Link href="/configure" className="hover:text-[#6D28D9]">Module Configurator</Link></li>
              <li><Link href="/request-quote" className="hover:text-[#6D28D9]">Simulated Request a Quote</Link></li>
              <li><Link href="/demo/licensing" className="hover:text-[#6D28D9]">Licensing & Pricing</Link></li>
              <li><Link href="/demo/settings" className="hover:text-[#6D28D9]">Company Settings & Reset</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p>© 2026 NirmanERP Bangladesh. All demo interactions and fictional data simulated locally.</p>
          <p>Inspired by Somikoron ERP Architecture</p>
        </div>
      </footer>
    </div>
  );
}
