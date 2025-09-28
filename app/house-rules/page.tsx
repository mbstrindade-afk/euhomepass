'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer';

interface HouseRulesData {
  smoking: string;
  parties: string;
  quietHoursFrom: string;
  quietHoursTo: string;
  visitors: string;
  pets: string;
  petRules: string;
  utilities: string;
  cleaningExpectations: string;
  offLimits: string;
  buildingRules: string;
  safetyNotes: string;
  valuables: string;
  confirmations: {
    valuablesRemoved: boolean;
    homeEmpty: boolean;
    platformRules: boolean;
  };
}

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, title: 'Basics' },
    { number: 2, title: 'Details' },
    { number: 3, title: 'Photos' },
    { number: 4, title: 'Availability' },
    { number: 5, title: 'House rules' },
    { number: 6, title: 'Verify & Publish' },
  ];

  return (
    <div className="grid grid-cols-6 gap-2 mb-3">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex items-center gap-2 bg-white border rounded-xl px-3 py-2 text-sm ${
            step.number === currentStep
              ? 'border-sky-500 shadow-md ring-2 ring-sky-100'
              : 'border-gray-200'
          }`}
        >
          <strong>{step.number}.</strong>
          <span className="hidden sm:inline">{step.title}</span>
        </div>
      ))}
    </div>
  );
};

interface RulesSummaryProps {
  data: HouseRulesData;
}

const RulesSummary: React.FC<RulesSummaryProps> = ({ data }) => {
  const formatQuietHours = () => {
    if (data.quietHoursFrom && data.quietHoursTo) {
      return `${data.quietHoursFrom}–${data.quietHoursTo}`;
    }
    return 'Not specified';
  };

  const summaryItems = [
    { label: 'Smoking', value: data.smoking || 'Not specified' },
    { label: 'Parties', value: data.parties || 'Not specified' },
    { label: 'Quiet hours', value: formatQuietHours() },
    { label: 'Visitors', value: data.visitors || 'Not specified' },
    { label: 'Pets', value: data.pets || 'Not specified' },
    { label: 'Utilities', value: data.utilities || 'Not specified' },
    { label: 'Cleaning', value: data.cleaningExpectations || 'Tidy-up + trash out' },
    { label: 'Off-limits', value: data.offLimits || 'Storage, wardrobe (locked)' },
    { label: 'Valuables', value: data.valuables || 'Not specified' },
  ];

  return (
    <aside className="bg-white border border-gray-200 rounded-2xl p-5 h-fit">
      <h2 className="text-lg font-semibold mb-3">Rules summary</h2>
      <div className="space-y-0">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between gap-2 text-sm py-2 border-b border-dashed border-gray-200 last:border-b-0"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="text-gray-900 text-right font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-3 pt-3">
        <h3 className="font-semibold mb-2 text-base">Utility Coverage</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Excess utility coverage: up to €200/month. Coverage applies only when excess exceeds €30 above normal usage (proven with 6 months of previous bills). 
          Pet-related issues are excluded.
        </p>
      </div>

      <div className="border-t border-gray-200 mt-3 pt-3">
        <h3 className="font-semibold mb-2 text-base">Tips</h3>
        <ul className="text-sm text-gray-600 space-y-0 list-none pl-0">
          <li>• Be specific on quiet hours and visitors.</li>
          <li>• List any building rules and recycling notes.</li>
          <li>• Upload your House Guide in the next step.</li>
        </ul>
      </div>
    </aside>
  );
};

export default function HouseRulesPage() {
  const [formData, setFormData] = useState<HouseRulesData>({
    smoking: 'Not allowed',
    parties: 'Not allowed',
    quietHoursFrom: '22:00',
    quietHoursTo: '08:00',
    visitors: 'Allowed with building rules',
    pets: 'Not allowed',
    petRules: '',
    utilities: 'Excess utility coverage applies (up to €200/month)',
    cleaningExpectations: '',
    offLimits: '',
    buildingRules: '',
    safetyNotes: '',
    valuables: 'Remove/lock all valuables (required)',
    confirmations: {
      valuablesRemoved: true,
      homeEmpty: true,
      platformRules: true,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field: keyof HouseRulesData['confirmations']) => {
    setFormData(prev => ({
      ...prev,
      confirmations: {
        ...prev.confirmations,
        [field]: !prev.confirmations[field]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              HP
            </div>
            <span className="font-bold text-lg">HomePass</span>
          </div>
          <nav className="ml-auto hidden md:flex gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-sky-600 font-semibold">
              Dashboard
            </Link>
            <Link href="/listing/create" className="text-sky-600 font-semibold">
              List your home
            </Link>
            <Link href="/listings" className="text-gray-600 hover:text-sky-600 font-semibold">
              My listings
            </Link>
            <Link href="/bookings" className="text-gray-600 hover:text-sky-600 font-semibold">
              Bookings
            </Link>
            <Link href="/fund" className="text-gray-600 hover:text-sky-600 font-semibold">
              Fund
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* Main Content */}
          <section className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold">House Rules</h1>
              <span className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold">
                Entire homes only · Host not present
              </span>
            </div>

            <Stepper currentStep={5} />

            <div className="bg-blue-50 border border-dashed border-blue-200 rounded-xl p-3 mb-3">
              <strong>Clear rules = better matches.</strong> Guests must follow your rules. 
              Your exact address stays hidden until a booking is confirmed.
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <form className="space-y-6">
              {/* Smoking & Parties */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Smoking & Parties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Smoking
                    </label>
                    <select
                      name="smoking"
                      value={formData.smoking}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Not allowed">Not allowed</option>
                      <option value="Balcony only">Balcony only</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Parties/events
                    </label>
                    <select
                      name="parties"
                      value={formData.parties}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Not allowed">Not allowed</option>
                      <option value="Small gatherings (on request)">Small gatherings (on request)</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Quiet hours & Visitors */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Quiet hours & Visitors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Quiet hours
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="time"
                        name="quietHoursFrom"
                        value={formData.quietHoursFrom}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-40"
                        style={{ width: '160px' }}
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        name="quietHoursTo"
                        value={formData.quietHoursTo}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-40"
                        style={{ width: '160px' }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      Local building rules may apply.
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Visitors
                    </label>
                    <select
                      name="visitors"
                      value={formData.visitors}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Allowed with building rules">Allowed with building rules</option>
                      <option value="On request">On request</option>
                      <option value="Not allowed">Not allowed</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Pets */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Pets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pets policy
                    </label>
                    <select
                      name="pets"
                      value={formData.pets}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Not allowed">Not allowed</option>
                      <option value="Allowed (Host rules apply)">Allowed (Host rules apply)</option>
                    </select>
                    <span className="text-xs text-gray-500">
                      If allowed, you define the house rules below.
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Pet rules (if allowed)
                    </label>
                    <input
                      type="text"
                      name="petRules"
                      value={formData.petRules}
                      onChange={handleInputChange}
                      placeholder="e.g., max 1, no sofa, not left alone >4h"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>
                <div className="bg-blue-50 border border-dashed border-blue-200 rounded-xl p-3 mt-2">
                  <strong>Important:</strong> Pet-related issues (damage, cleaning, odors) are handled privately between Host & Guest.
                  HomePass does not mediate, process payments, or cover these under utility coverage.
                </div>
              </section>

              {/* Utilities & Cleaning */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Utilities & Cleaning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Utilities — Coverage
                    </label>
                    <select
                      name="utilities"
                      value={formData.utilities}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Excess utility coverage applies (up to €200/month)">Excess utility coverage applies (up to €200/month)</option>
                      <option value="Custom note">Custom note</option>
                    </select>
                    <span className="text-xs text-gray-500">
                      Excess consumption over €30 can be claimed (with 6 months of bills).
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cleaning expectations
                    </label>
                    <input
                      type="text"
                      name="cleaningExpectations"
                      value={formData.cleaningExpectations}
                      onChange={handleInputChange}
                      placeholder="e.g., basic tidy-up; take trash out; return keys"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>
              </section>

              {/* Off-limits & Building rules */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Off-limits & Building rules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Off-limits areas (optional)
                    </label>
                    <input
                      type="text"
                      name="offLimits"
                      value={formData.offLimits}
                      onChange={handleInputChange}
                      placeholder="e.g., storage room, owner's wardrobe (locked)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Building rules (optional)
                    </label>
                    <input
                      type="text"
                      name="buildingRules"
                      value={formData.buildingRules}
                      onChange={handleInputChange}
                      placeholder="e.g., no noise after 22:00; recycling on level -1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                </div>
              </section>

              {/* Safety & Valuables */}
              <section>
                <h2 className="text-lg font-semibold mb-3">Safety & Valuables</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Safety notes (optional)
                    </label>
                    <input
                      type="text"
                      name="safetyNotes"
                      value={formData.safetyNotes}
                      onChange={handleInputChange}
                      placeholder="e.g., gas shutoff under sink; emergency numbers in House Guide"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Valuables policy
                    </label>
                    <select
                      name="valuables"
                      value={formData.valuables}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-inherit bg-white"
                    >
                      <option value="Remove/lock all valuables (required)">Remove/lock all valuables (required)</option>
                    </select>
                    <span className="text-xs text-gray-500">
                      Cash, jewellery, fine art, documents, high-value electronics must be locked or removed.
                    </span>
                  </div>
                </div>
              </section>

              <div className="border-t border-gray-200 pt-4">
                {/* Confirmations */}
                <h2 className="text-lg font-semibold mb-3">Confirmations</h2>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmations.valuablesRemoved}
                      onChange={() => handleCheckboxChange('valuablesRemoved')}
                      className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">
                      I confirm I will remove/lock valuables. I understand valuables are not covered by utility coverage.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmations.homeEmpty}
                      onChange={() => handleCheckboxChange('homeEmpty')}
                      className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">
                      I confirm the home will be empty (host not present) and cleaned before guest arrival.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmations.platformRules}
                      onChange={() => handleCheckboxChange('platformRules')}
                      className="mt-1 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">
                      I agree to the platform rules: Entire homes; Max 3 months/home; Utility coverage available; No off-platform payments.
                    </span>
                  </label>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-sky-700 transition-colors"
                  >
                    Save & Continue
                  </button>
                  <button
                    type="button"
                    className="text-sky-600 font-bold hover:text-sky-700 transition-colors bg-transparent border-0 px-0"
                  >
                    Save draft
                  </button>
                </div>
              </div>
            </form>
          </section>

          {/* Sidebar */}
          <RulesSummary data={formData} />
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-6">
        House Rules preview · Not interactive
      </div>
      
      <Footer />
    </div>
  );
}