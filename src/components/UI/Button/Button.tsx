import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  onClick, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'flex items-center gap-1 font-medium transition-colors rounded-md';
  
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-green-500 hover:bg-green-600 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
  };

  const sizes: Record<ButtonSize, string> = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;