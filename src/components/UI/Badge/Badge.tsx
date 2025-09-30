import React, { ReactNode } from 'react';

export type BadgeVariant = 'popular' | 'premium' | 'default';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  popular: 'bg-gray-100 text-gray-800',
  premium: 'bg-gray-100 text-gray-800',
  default: 'bg-blue-100 text-blue-800',
};

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  return (
    <div className={`px-2 py-1 rounded-md text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Badge;