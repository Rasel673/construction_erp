import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'purple' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200/90 font-medium',
    secondary: 'bg-purple-50 text-purple-700 border-purple-200/80 font-medium',
    purple: 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE] font-semibold shadow-2xs',
    success: 'bg-emerald-50/90 text-emerald-700 border-emerald-200/90 font-medium',
    warning: 'bg-amber-50/90 text-amber-700 border-amber-200/90 font-medium',
    destructive: 'bg-rose-50/90 text-rose-700 border-rose-200/90 font-medium',
    outline: 'bg-white/80 text-slate-700 border-slate-200 shadow-2xs font-medium'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] border tracking-tight transition-all duration-150',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
