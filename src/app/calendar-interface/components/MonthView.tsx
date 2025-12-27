import React from 'react';
import EventCard, { CalendarEvent } from './EventCard';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

const MonthView = ({ currentDate, events, onEventClick, onDateClick }: MonthViewProps) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const days = getDaysInMonth();
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 bg-muted border-b border-border">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b border-border p-2 ${
                date ? 'bg-card hover:bg-muted/50 cursor-pointer' : 'bg-muted/30'
              } ${index % 7 === 6 ? 'border-r-0' : ''}`}
              onClick={() => date && onDateClick(date)}
            >
              {date && (
                <div className="h-full flex flex-col">
                  <div
                    className={`text-sm font-medium mb-2 ${
                      isTodayDate
                        ? 'bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center'
                        : 'text-foreground'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  <div className="flex-1 space-y-1 overflow-y-auto">
                    {dayEvents.slice(0, 3).map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => onEventClick(event)}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center">
                        +{dayEvents.length - 3} mais
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;