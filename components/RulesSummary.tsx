import React from 'react';

interface RulesSummaryProps {
  formData: {
    smoking?: string;
    parties?: string;
    quietHoursFrom?: string;
    quietHoursTo?: string;
    visitors?: string;
    pets?: string;
    utilities?: string;
    cleaningExpectations?: string;
    offLimitsAreas?: string;
    valuables?: string;
  };
}

const RulesSummary: React.FC<RulesSummaryProps> = ({ formData }) => {
  const formatQuietHours = () => {
    if (formData.quietHoursFrom && formData.quietHoursTo) {
      return `${formData.quietHoursFrom}–${formData.quietHoursTo}`;
    }
    return 'Not specified';
  };

  const summaryItems = [
    { label: 'Smoking', value: formData.smoking || 'Not specified' },
    { label: 'Parties', value: formData.parties || 'Not specified' },
    { label: 'Quiet hours', value: formatQuietHours() },
    { label: 'Visitors', value: formData.visitors || 'Not specified' },
    { label: 'Pets', value: formData.pets || 'Not specified' },
    { label: 'Utilities', value: formData.utilities || 'Not specified' },
    { label: 'Cleaning', value: formData.cleaningExpectations || 'Not specified' },
    { label: 'Off-limits', value: formData.offLimitsAreas || 'None specified' },
    { label: 'Valuables', value: formData.valuables || 'Not specified' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Rules summary</h2>
      <div className="space-y-2">
        {summaryItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 text-sm py-2 border-b border-dashed border-gray-200 last:border-b-0"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="text-gray-900 text-right font-medium truncate">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="font-semibold mb-2">Insurance & Fund</h3>
        <p className="text-sm text-gray-600 mb-4">
          Included: up to €1,000/stay; €25 deductible. Annual: first approved claim each year €0 (min €50). 
          Pet-related issues are excluded.
        </p>
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <h3 className="font-semibold mb-2">Tips</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Be specific on quiet hours and visitors.</li>
          <li>• List any building rules and recycling notes.</li>
          <li>• Upload your House Guide in the next step.</li>
        </ul>
      </div>
    </div>
  );
};

export default RulesSummary;
