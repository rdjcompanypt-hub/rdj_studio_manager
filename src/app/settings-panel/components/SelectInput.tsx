'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SelectInput = ({ value, options, onChange, disabled = false }: SelectInputProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full min-w-[160px] px-3 py-2 pr-10 text-sm bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <Icon name="ChevronDownIcon" size={16} variant="outline" className="text-muted-foreground" />
      </div>
    </div>
  );
};

export default SelectInput;