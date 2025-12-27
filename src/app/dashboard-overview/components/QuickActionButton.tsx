import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickActionButtonProps {
  action: {
    label: string;
    icon: string;
    color: string;
    onClick: () => void;
  };
}

const QuickActionButton = ({ action }: QuickActionButtonProps) => {
  return (
    <button
      onClick={action.onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-lg ${action.color} hover:opacity-90 transition-all duration-300 group`}
    >
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        <Icon name={action.icon as any} size={24} variant="outline" className="text-white" />
      </div>
      <span className="text-sm font-medium text-white">{action.label}</span>
    </button>
  );
};

export default QuickActionButton;