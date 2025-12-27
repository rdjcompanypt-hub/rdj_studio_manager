import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { CalendarEvent } from './EventCard';

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const UpcomingEvents = ({ events, onEventClick }: UpcomingEventsProps) => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'shoot':
        return 'CameraIcon';
      case 'meeting':
        return 'UsersIcon';
      case 'deadline':
        return 'ClockIcon';
      case 'equipment':
        return 'WrenchIcon';
      default:
        return 'CalendarIcon';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'shoot':
        return 'text-blue-600';
      case 'meeting':
        return 'text-green-600';
      case 'deadline':
        return 'text-red-600';
      case 'equipment':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Próximos Eventos</h3>
      <div className="space-y-3">
        {events.slice(0, 5).map((event) => (
          <button
            key={event.id}
            onClick={() => onEventClick(event)}
            className="w-full flex items-start gap-3 p-3 rounded-md hover:bg-muted transition-colors text-left"
          >
            <div className={`p-2 rounded-md bg-muted ${getEventColor(event.type)}`}>
              <Icon name={getEventIcon(event.type) as any} size={20} variant="solid" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.project}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatEventDate(event.startTime)} • {event.startTime} - {event.endTime}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;