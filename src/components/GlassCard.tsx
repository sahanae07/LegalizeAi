import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div className={cn("glass-card p-6", className)} {...props}>
      {children}
    </div>
  );
};
