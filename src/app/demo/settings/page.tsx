'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  RotateCcw,
  Sparkles,
  Globe,
  Coins,
  Check,
  AlertTriangle,
  Save
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { COMPANY_PROFILES } from '@/lib/mock-data/erp-data';
import { ERPStorage } from '@/lib/storage';

export default function SettingsPage() {
  const [activeCompanyId, setActiveCompanyId] = useState(COMPANY_PROFILES[0].id);
  const [currency, setCurrency] = useState('BDT (৳) - Bangladeshi Taka');
  const [numberFormat, setNumberFormat] = useState('lakh-crore');
  const [language, setLanguage] = useState('en');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setActiveCompanyId(ERPStorage.getActiveCompanyId());
  }, []);

  const activeCompany = COMPANY_PROFILES.find(c => c.id === activeCompanyId) || COMPANY_PROFILES[0];

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    ERPStorage.setActiveCompanyId(activeCompanyId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetDemo = () => {
    if (confirm('Are you sure you want to reset all simulated ERP demo data back to factory defaults?')) {
      ERPStorage.resetAllDemoData();
      alert('Demo data restored to initial state.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Company & System Settings</h1>
            <Badge variant="purple">Configuration Simulation</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure enterprise organization profile, Bangladeshi currency preferences, and demo environment settings.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Company display preferences simulated and saved successfully!</span>
        </div>
      )}

      {/* Company Profile Form */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Fictional Construction Entity Profile</CardTitle>
            <CardDescription>Entity details used across contracts, billing challans and government tender forms</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSavePreferences} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Operating Enterprise Entity</label>
              <select
                value={activeCompanyId}
                onChange={e => setActiveCompanyId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/40"
              >
                {COMPANY_PROFILES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Business Identification Number (BIN)</label>
                <input
                  type="text"
                  readOnly
                  value={activeCompany.tin}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Trade License Number</label>
                <input
                  type="text"
                  readOnly
                  value={activeCompany.tradeLicense}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Corporate Head Office</label>
                <input
                  type="text"
                  readOnly
                  value={activeCompany.headOffice}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs text-slate-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Corporate Hotline / Phone</label>
                <input
                  type="text"
                  readOnly
                  value={activeCompany.phone}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs text-slate-700 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Regional Preferences */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Localization & Currency</h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Operating Currency</label>
                  <select
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="BDT (৳) - Bangladeshi Taka">BDT (৳) - Bangladeshi Taka</option>
                    <option value="USD ($) - US Dollar">USD ($) - International Packages</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Large Number Formatting</label>
                  <select
                    value={numberFormat}
                    onChange={e => setNumberFormat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="lakh-crore">Lakh & Crore (৳12.50 Cr / ৳45.00 Lakh)</option>
                    <option value="standard">Standard Millions (৳125,000,000)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Interface Language</label>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="en">English (Default)</option>
                    <option value="bn">Bangla / বাংলা (Experimental Preview)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="sm">
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Reset Demo Data Card */}
      <Card className="border-rose-200 bg-rose-50/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <CardTitle className="text-rose-900">Demo Environment State Management</CardTitle>
          </div>
          <CardDescription>
            You can restore all simulated records, projects, BOQ line items, and vouchers back to their pristine factory settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-0">
          <p className="text-xs text-slate-600">
            Resets local browser storage. Any custom items added during your evaluation session will be reset to default.
          </p>
          <Button variant="danger" size="sm" onClick={handleResetDemo} className="shrink-0">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
