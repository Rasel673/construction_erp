import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-[#6D28D9] hover:bg-[#5B21B6] active:bg-[#4C1D95] text-white shadow-xs hover:shadow-md hover:shadow-purple-500/20 font-semibold',
      secondary: 'bg-[#F5F3FF] hover:bg-[#EDE9FE] text-[#6D28D9] font-semibold border border-[#DDD6FE] hover:border-purple-300',
      outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-medium shadow-2xs',
      ghost: 'bg-transparent hover:bg-slate-100/80 text-slate-700 font-medium',
      danger: 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold shadow-xs hover:shadow-rose-600/20'
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs rounded-lg',
      md: 'px-4 py-2 text-sm rounded-xl',
      lg: 'px-5 py-2.5 text-base rounded-xl',
      icon: 'p-2 rounded-xl'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/50',
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
