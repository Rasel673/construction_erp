import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] text-white shadow-xs font-medium',
      secondary: 'bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] font-medium border border-[#DDD6FE]',
      outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
      danger: 'bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-xs'
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1 text-xs rounded-md',
      md: 'px-3.5 py-2 text-sm rounded-lg',
      lg: 'px-5 py-2.5 text-base rounded-lg',
      icon: 'p-2 rounded-lg'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
