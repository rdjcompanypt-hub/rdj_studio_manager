import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { CalendarEvent } from './EventCard';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  if (!isOpen || !event) return null;

  const getEventTypeLabel = () => {
    switch (event.type) {
      case 'shoot':
        return 'Gravação';
      case 'meeting':
        return 'Reunião';
      case 'deadline':
        return 'Prazo';
      case 'equipment':
        return 'Equipamento';
      default:
        return 'Evento';
    }
  };

  const getStatusLabel = () => {
    switch (event.status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      default:
        return event.status;
    }
  };

  const getStatusColor = () => {
    switch (event.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {getEventTypeLabel()}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
                {getStatusLabel()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Fechar"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Time */}
          <div className="flex items-start gap-3">
            <Icon name="ClockIcon" size={20} variant="outline" className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Horário</p>
              <p className="text-sm text-muted-foreground">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>

          {/* Project */}
          <div className="flex items-start gap-3">
            <Icon name="FolderIcon" size={20} variant="outline" className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Projeto</p>
              <p className="text-sm text-muted-foreground">{event.project}</p>
            </div>
          </div>

          {/* Location */}
          {event.location && (
            <div className="flex items-start gap-3">
              <Icon name="MapPinIcon" size={20} variant="outline" className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Local</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          )}

          {/* Attendees */}
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-start gap-3">
              <Icon name="UsersIcon" size={20} variant="outline" className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Participantes</p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  {event.attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Equipment */}
          {event.equipment && event.equipment.length > 0 && (
            <div className="flex items-start gap-3">
              <Icon name="WrenchIcon" size={20} variant="outline" className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Equipamentos</p>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  {event.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            Fechar
          </button>
          <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors">
            Editar Evento
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;