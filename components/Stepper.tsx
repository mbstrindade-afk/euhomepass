interface StepperProps {
  steps: { number: number; label: string; active?: boolean }[];
}

export default function Stepper({ steps }: StepperProps) {
  return (
    <div className="grid grid-cols-6 gap-2 mb-3">
      {steps.map((step) => (
        <div 
          key={step.number}
          className={`flex items-center gap-2 bg-white rounded-xl px-3 py-2 ${
            step.active 
              ? 'border-2 border-[#0ea5e9] shadow-[0_0_0_2px_rgba(14,165,233,0.15)]' 
              : 'border border-[#e5e7eb]'
          }`}
        >
          <strong>{step.number}.</strong> {step.label}
        </div>
      ))}
    </div>
  );
}