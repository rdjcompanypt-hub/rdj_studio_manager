import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: 'month' | 'week' | 'day';
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewModeChange: (mode: 'month' | 'week' | 'day') => void;
}

const CalendarHeader = ({
  currentDate,
  viewMode,
  onPrevious,
  onNext,
  onToday,
  onViewModeChange,
}: CalendarHeaderProps) => {
  const formatDate = () => {
    const month = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
    const year = currentDate.getFullYear();
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Date Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToday}
            className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Hoje
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Mês anterior"
            >
              <Icon name="ChevronLeftIcon" size={20} variant="outline" />
            </button>
            <h2 className="text-lg font-semibold text-foreground min-w-[180px] text-center">
              {formatDate()}
            </h2>
            <button
              onClick={onNext}
              className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Próximo mês"
            >
              <Icon name="ChevronRightIcon" size={20} variant="outline" />
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-2 bg-muted rounded-md p-1">
          <button
            onClick={() => onViewModeChange('month')}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              viewMode === 'month' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => onViewModeChange('week')}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              viewMode === 'week' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => onViewModeChange('day')}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              viewMode === 'day' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Dia
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;