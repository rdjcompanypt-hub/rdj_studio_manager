import React from 'react';
import EventCard, { CalendarEvent } from './EventCard';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const DayView = ({ currentDate, events, onEventClick }: DayViewProps) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const formatDate = () => {
    return currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Day Header */}
      <div className="bg-muted border-b border-border p-4">
        <h3 className="text-lg font-semibold text-foreground capitalize">
          {formatDate()}
        </h3>
      </div>

      {/* Time Grid */}
      <div className="overflow-y-auto max-h-[600px]">
        {hours.map((hour) => {
          const hourEvents = getEventsForHour(hour);
          const timeStr = `${hour.toString().padStart(2, '0')}:00`;

          return (
            <div
              key={hour}
              className="flex border-b border-border hover:bg-muted/30 transition-colors"
            >
              <div className="w-20 flex-shrink-0 p-3 text-sm font-medium text-muted-foreground border-r border-border">
                {timeStr}
              </div>
              <div className="flex-1 p-3 min-h-[80px]">
                <div className="space-y-2">
                  {hourEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick(event)}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayView;