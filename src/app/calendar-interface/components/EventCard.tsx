import React from 'react';
import Icon from '@/components/ui/AppIcon';

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'shoot' | 'meeting' | 'deadline' | 'equipment';
  startTime: string;
  endTime: string;
  project: string;
  location?: string;
  attendees?: string[];
  equipment?: string[];
  status: 'confirmed' | 'pending' | 'completed';
}

interface EventCardProps {
  event: CalendarEvent;
  onClick: () => void;
}

const EventCard = ({ event, onClick }: EventCardProps) => {
  const getEventColor = () => {
    switch (event.type) {
      case 'shoot':
        return 'bg-blue-100 border-blue-500 text-blue-900';
      case 'meeting':
        return 'bg-green-100 border-green-500 text-green-900';
      case 'deadline':
        return 'bg-red-100 border-red-500 text-red-900';
      case 'equipment':
        return 'bg-purple-100 border-purple-500 text-purple-900';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-900';
    }
  };

  const getEventIcon = () => {
    switch (event.type) {
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

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-md border-l-4 ${getEventColor()} hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-start gap-2">
        <Icon name={getEventIcon() as any} size={16} variant="solid" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate">{event.title}</p>
          <p className="text-xs opacity-80">
            {event.startTime} - {event.endTime}
          </p>
          {event.location && (
            <p className="text-xs opacity-70 truncate">{event.location}</p>
          )}
        </div>
      </div>
    </button>
  );
};

export default EventCard;