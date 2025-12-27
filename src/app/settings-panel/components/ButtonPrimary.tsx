'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ButtonPrimaryProps {
  children: React.ReactNode;
  onClick: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonPrimary = ({ 
  children, 
  onClick, 
  icon,
  variant = 'primary',
  disabled = false,
  fullWidth = false
}: ButtonPrimaryProps) => {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {icon && <Icon name={icon as any} size={18} variant="outline" />}
      <span>{children}</span>
    </button>
  );
};

export default ButtonPrimary;