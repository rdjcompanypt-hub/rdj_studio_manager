import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}

const SettingsSection = ({ title, description, icon, children }: SettingsSectionProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={icon as any} size={24} variant="outline" className="text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground mb-1">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;