import React from 'react';
import EventCard, { CalendarEvent } from './EventCard';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const WeekView = ({ currentDate, events, onEventClick }: WeekViewProps) => {
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDays: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDays.push(date);
    }
    return weekDays;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter((event) => {
      const eventDate = new Date(event.startTime).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const weekDays = getWeekDays();
  const weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 bg-muted border-b border-border">
        {weekDays.map((date, index) => {
          const isTodayDate = isToday(date);
          return (
            <div
              key={index}
              className={`p-4 text-center border-r border-border last:border-r-0 ${
                isTodayDate ? 'bg-primary/10' : ''
              }`}
            >
              <p className="text-xs font-medium text-muted-foreground">
                {weekDayNames[index]}
              </p>
              <p
                className={`text-lg font-semibold mt-1 ${
                  isTodayDate
                    ? 'bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto'
                    : 'text-foreground'
                }`}
              >
                {date.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7">
        {weekDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          return (
            <div
              key={index}
              className="min-h-[400px] border-r border-border last:border-r-0 p-3 bg-card"
            >
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;