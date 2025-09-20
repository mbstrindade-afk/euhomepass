import React from 'react';

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  help?: string;
}

const Toggle: React.FC<ToggleProps> = ({ label, help, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" {...props} />
      <span>{label}</span>
      {help && <span className="text-xs text-gray-500">{help}</span>}
    </label>
  );
};

export default Toggle;
