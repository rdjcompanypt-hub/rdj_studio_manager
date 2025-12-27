import React from 'react';

interface SettingItemProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

const SettingItem = ({ label, description, children }: SettingItemProps) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 pr-4">
        <label className="text-sm font-medium text-foreground block mb-1">
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};

export default SettingItem;