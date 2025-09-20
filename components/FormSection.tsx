interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({ title, children, className = '' }: FormSectionProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}