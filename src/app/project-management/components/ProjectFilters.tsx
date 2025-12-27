'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProjectFiltersProps {
  activeStatus: string;
  activePriority: string;
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onSearchChange: (query: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  activeStatus,
  activePriority,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}) => {
  const statuses = [
    { value: 'all', label: 'Todos', icon: 'ViewColumnsIcon' },
    { value: 'Planning', label: 'Planejamento', icon: 'LightBulbIcon' },
    { value: 'Capture', label: 'Captura', icon: 'VideoCameraIcon' },
    { value: 'Editing', label: 'Edição', icon: 'FilmIcon' },
    { value: 'Review', label: 'Revisão', icon: 'EyeIcon' },
    { value: 'Delivered', label: 'Entregue', icon: 'CheckCircleIcon' },
  ];

  const priorities = [
    { value: 'all', label: 'Todas Prioridades' },
    { value: 'high', label: 'Alta' },
    { value: 'medium', label: 'Média' },
    { value: 'low', label: 'Baixa' },
  ];

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          variant="outline"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Buscar projetos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Status Filters */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Status</label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                activeStatus === status.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={status.icon as any} size={16} variant="outline" />
              <span>{status.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Priority Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Prioridade</label>
        <select
          value={activePriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {priorities.map((priority) => (
            <option key={priority.value} value={priority.value}>
              {priority.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProjectFilters;