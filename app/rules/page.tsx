'use client';

import { useState } from 'react';
import Link from 'next/link';
import Stepper from '../../components/Stepper';
import FormSection from '../../components/FormSection';
import RulesSummary from '../../components/RulesSummary';
import Footer from '../../components/Footer';

export default function HouseRules() {
  const [formData, setFormData] = useState({
    smoking: 'Not allowed',
    parties: 'Not allowed',
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    visitors: 'Allowed with building rules',
    pets: 'Not allowed',
    petRules: '',
    utilities: 'Excess utility coverage applies (up to €200/month)',
    cleaning: '',
    offLimits: '',
    buildingRules: '',
    safety: '',
    valuables: 'Remove/lock all valuables (required)',
    confirmValuables: true,
    confirmEmpty: true,
    confirmPlatformRules: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { number: 1, label: 'Basics' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Photos' },
    { number: 4, label: 'Availability' },
    { number: 5, label: 'House rules', active: true },
    { number: 6, label: 'Verify & Publish' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.confirmValuables) {
      newErrors.confirmValuables = 'You must confirm you will remove/lock valuables';
    }
    
    if (!formData.confirmEmpty) {
      newErrors.confirmEmpty = 'You must confirm the home will be empty and cleaned';
    }
    
    if (!formData.confirmPlatformRules) {
      newErrors.confirmPlatformRules = 'You must agree to the platform rules';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Here you would typically save to your API
      console.log('Saving house rules:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step (you would implement routing here)
      alert('Rules saved successfully! Redirecting to next step...');
      
    } catch (error) {
      console.error('Error saving rules:', error);
      alert('Error saving rules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      // Save as draft - less validation required
      console.log('Saving draft:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alert('Draft saved successfully!');
      
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9fb] font-[Nunito,system-ui,sans-serif] text-[#0f172a]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#e5e7eb] flex items-center gap-4 px-5 py-4 z-10">
        <div className="flex items-center gap-3 font-extrabold">
          <div className="w-7 h-7 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white font-extrabold text-sm">
            HP
          </div>
          <span>EU HomePass</span>
        </div>
        <nav className="ml-auto flex gap-4">
          <Link href="/dashboard" className="text-[#334155] no-underline font-semibold">Dashboard</Link>
          <Link href="/listing" className="text-[#0ea5e9] no-underline font-semibold">List your home</Link>
          <Link href="/my-listings" className="text-[#334155] no-underline font-semibold">My listings</Link>
          <Link href="/bookings" className="text-[#334155] no-underline font-semibold">Bookings</Link>
          <Link href="/fund" className="text-[#334155] no-underline font-semibold">Fund</Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto my-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Main Content */}
          <section className="bg-white border border-[#e5e7eb] rounded-2xl p-5 shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
            <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
              <h1 className="text-2xl font-bold mb-3">House Rules</h1>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6fb] text-[#0369a1] px-3 py-2 text-xs font-bold">
                Entire homes only · Host not present
              </span>
            </div>

            {/* Stepper */}
            <Stepper steps={steps} />

            <div className="border border-dashed border-[#c7d2fe] bg-[#f8fafc] rounded-xl p-3 mb-6">
              <strong>Clear rules = better matches.</strong> Guests must follow your rules. Your exact address stays hidden until a booking is confirmed.
            </div>

            <div className="h-px bg-[#e5e7eb] mx-[-20px] my-3"></div>

            {/* Smoking & Parties */}
            <FormSection title="Smoking & Parties">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Smoking</label>
                  <select 
                    value={formData.smoking}
                    onChange={(e) => handleInputChange('smoking', e.target.value)}
                    className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                  >
                    <option>Not allowed</option>
                    <option>Balcony only</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-medium">Parties/events</label>
                  <select 
                    value={formData.parties}
                    onChange={(e) => handleInputChange('parties', e.target.value)}
                    className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                  >
                    <option>Not allowed</option>
                    <option>Small gatherings (on request)</option>
                  </select>
                </div>
              </div>
            </FormSection>

            {/* Quiet hours & Visitors */}
            <h2 className="text-lg font-semibold mb-3">Quiet hours & Visitors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Quiet hours</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="time" 
                    value={formData.quietHoursStart}
                    onChange={(e) => handleInputChange('quietHoursStart', e.target.value)}
                    className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white w-40"
                  />
                  <span className="text-[#64748b]">to</span>
                  <input 
                    type="time" 
                    value={formData.quietHoursEnd}
                    onChange={(e) => handleInputChange('quietHoursEnd', e.target.value)}
                    className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white w-40"
                  />
                </div>
                <span className="text-xs text-[#64748b]">Local building rules may apply.</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Visitors</label>
                <select 
                  value={formData.visitors}
                  onChange={(e) => handleInputChange('visitors', e.target.value)}
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                >
                  <option>Allowed with building rules</option>
                  <option>On request</option>
                  <option>Not allowed</option>
                </select>
              </div>
            </div>

            {/* Pets */}
            <h2 className="text-lg font-semibold mb-3">Pets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Pets policy</label>
                <select 
                  value={formData.pets}
                  onChange={(e) => handleInputChange('pets', e.target.value)}
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                >
                  <option>Not allowed</option>
                  <option>Allowed (Host rules apply)</option>
                </select>
                <span className="text-xs text-[#64748b]">If allowed, you define the house rules below.</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Pet rules (if allowed)</label>
                <input 
                  type="text"
                  value={formData.petRules}
                  onChange={(e) => handleInputChange('petRules', e.target.value)}
                  placeholder="e.g., max 1, no sofa, not left alone >4h"
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                />
              </div>
            </div>
            <div className="border border-dashed border-[#c7d2fe] bg-[#f8fafc] rounded-xl p-3 mb-6">
              <strong>Important:</strong> Pet-related issues (damage, cleaning, odors) are handled privately between Host & Guest.
              EU HomePass does not mediate, process payments, or cover these under community fund.
            </div>

            {/* Utilities & Cleaning */}
            <h2 className="text-lg font-semibold mb-3">Utilities & Cleaning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Utilities — Coverage</label>
                <select 
                  value={formData.utilities}
                  onChange={(e) => handleInputChange('utilities', e.target.value)}
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                >
                  <option>Excess utility coverage applies (up to €200/month)</option>
                  <option>Custom note</option>
                </select>
                <span className="text-xs text-[#64748b]">Abnormal usage can be claimed (per rules). No off-platform payments.</span>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Cleaning expectations</label>
                <input 
                  type="text"
                  value={formData.cleaning}
                  onChange={(e) => handleInputChange('cleaning', e.target.value)}
                  placeholder="e.g., basic tidy-up; take trash out; return keys"
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                />
              </div>
            </div>

            {/* Off-limits & Building rules */}
            <h2 className="text-lg font-semibold mb-3">Off-limits & Building rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Off-limits areas (optional)</label>
                <input 
                  type="text"
                  value={formData.offLimits}
                  onChange={(e) => handleInputChange('offLimits', e.target.value)}
                  placeholder="e.g., storage room, owner's wardrobe (locked)"
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Building rules (optional)</label>
                <input 
                  type="text"
                  value={formData.buildingRules}
                  onChange={(e) => handleInputChange('buildingRules', e.target.value)}
                  placeholder="e.g., no noise after 22:00; recycling on level -1"
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                />
              </div>
            </div>

            {/* Safety & Valuables */}
            <h2 className="text-lg font-semibold mb-3">Safety & Valuables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Safety notes (optional)</label>
                <input 
                  type="text"
                  value={formData.safety}
                  onChange={(e) => handleInputChange('safety', e.target.value)}
                  placeholder="e.g., gas shutoff under sink; emergency numbers in House Guide"
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Valuables policy</label>
                <select 
                  value={formData.valuables}
                  onChange={(e) => handleInputChange('valuables', e.target.value)}
                  className="border border-[#e5e7eb] rounded-lg px-3 py-3 bg-white"
                >
                  <option>Remove/lock all valuables (required)</option>
                </select>
                <span className="text-xs text-[#64748b]">Cash, jewellery, fine art, documents, high-value electronics must be locked or removed.</span>
              </div>
            </div>

            <div className="h-px bg-[#e5e7eb] mx-[-20px] my-3"></div>

            {/* Confirmations */}
            <FormSection title="Confirmations">
              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmValuables}
                    onChange={(e) => handleInputChange('confirmValuables', e.target.checked)}
                    className="mt-1"
                  />
                  <span>I confirm I will remove/lock valuables. I understand valuables are not covered by community fund.</span>
                </label>
                {errors.confirmValuables && (
                  <p className="text-red-600 text-sm ml-7">{errors.confirmValuables}</p>
                )}
                
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmEmpty}
                    onChange={(e) => handleInputChange('confirmEmpty', e.target.checked)}
                    className="mt-1"
                  />
                  <span>I confirm the home will be empty (host not present) and cleaned before guest arrival.</span>
                </label>
                {errors.confirmEmpty && (
                  <p className="text-red-600 text-sm ml-7">{errors.confirmEmpty}</p>
                )}
                
                <label className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    checked={formData.confirmPlatformRules}
                    onChange={(e) => handleInputChange('confirmPlatformRules', e.target.checked)}
                    className="mt-1"
                  />
                  <span>I agree to the platform rules: Entire homes; Max 3 months/home; Utility coverage available; No off-platform payments.</span>
                </label>
                {errors.confirmPlatformRules && (
                  <p className="text-red-600 text-sm ml-7">{errors.confirmPlatformRules}</p>
                )}
              </div>
            </FormSection>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleSaveAndContinue}
                disabled={isLoading}
                className="inline-flex items-center gap-2 bg-[#0ea5e9] text-white border-0 rounded-xl px-4 py-3 font-extrabold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0284c7] transition-colors"
              >
                {isLoading ? 'Saving...' : 'Save & Continue'}
              </button>
              <button 
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="bg-transparent text-[#0ea5e9] border-0 cursor-pointer font-extrabold hover:text-[#0284c7] transition-colors disabled:opacity-50"
              >
                Save draft
              </button>
            </div>
          </section>

          {/* Sidebar */}
          <RulesSummary formData={formData} />
        </div>
        
        <div className="text-center text-xs text-slate-500 pt-6">
          House Rules preview · Not interactive
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
