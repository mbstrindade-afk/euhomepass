'use client';

import Link from 'next/link';

type PaymentButtonProps = {
  plan?: 'quarterly' | 'annual';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
};

export default function PaymentButton({ 
  plan, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children,
  fullWidth = false
}: PaymentButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm hover:shadow-md',
    secondary: 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const href = plan ? `/payment?plan=${plan}` : '/payment';
  
  const defaultText = plan === 'quarterly' ? 'Get Quarterly Plan' : 
                     plan === 'annual' ? 'Get Annual Plan' : 
                     'Choose Plan';

  return (
    <Link 
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
    >
      {children || defaultText}
    </Link>
  );
}