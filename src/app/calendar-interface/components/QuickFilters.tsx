import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface QuickFiltersProps {
  activeFilters: string[];
  onFilterToggle: (filter: string) => void;
}

const QuickFilters = ({ activeFilters, onFilterToggle }: QuickFiltersProps) => {
  const filters = [
    { id: 'shoot', label: 'Gravações', icon: 'CameraIcon', color: 'blue' },
    { id: 'meeting', label: 'Reuniões', icon: 'UsersIcon', color: 'green' },
    { id: 'deadline', label: 'Prazos', icon: 'ClockIcon', color: 'red' },
    { id: 'equipment', label: 'Equipamentos', icon: 'WrenchIcon', color: 'purple' },
  ];

  const getFilterColor = (color: string, isActive: boolean) => {
    if (!isActive) return 'bg-muted text-muted-foreground hover:bg-muted/80';

    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-900 border-blue-500';
      case 'green':
        return 'bg-green-100 text-green-900 border-green-500';
      case 'red':
        return 'bg-red-100 text-red-900 border-red-500';
      case 'purple':
        return 'bg-purple-100 text-purple-900 border-purple-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground mr-2">Filtros:</span>
        {filters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => onFilterToggle(filter.id)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                isActive ? `border-l-4 ${getFilterColor(filter.color, true)}` : getFilterColor(filter.color, false)
              }`}
            >
              <Icon name={filter.icon as any} size={16} variant={isActive ? 'solid' : 'outline'} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickFilters;