'use client';

import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventModal from './EventModal';
import QuickFilters from './QuickFilters';
import UpcomingEvents from './UpcomingEvents';
import { CalendarEvent } from './EventCard';

const CalendarInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 27));
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['shoot', 'meeting', 'deadline', 'equipment']);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Gravação Comercial Natura',
      type: 'shoot',
      startTime: '09:00',
      endTime: '17:00',
      project: 'Campanha Verão 2025',
      location: 'Estúdio Principal - Rua Augusta, 1500',
      attendees: ['Carlos Silva', 'Ana Santos', 'Pedro Costa'],
      equipment: ['Câmera RED Dragon', 'Kit de Iluminação LED', 'Steadicam'],
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Reunião com Cliente - Ambev',
      type: 'meeting',
      startTime: '14:00',
      endTime: '15:30',
      project: 'Projeto Skol Beats',
      location: 'Escritório Ambev - Av. Paulista, 2000',
      attendees: ['Mariana Lima', 'Roberto Alves'],
      status: 'confirmed',
    },
    {
      id: '3',
      title: 'Prazo Final - Edição Documentário',
      type: 'deadline',
      startTime: '18:00',
      endTime: '18:00',
      project: 'Documentário Amazônia',
      status: 'pending',
    },
    {
      id: '4',
      title: 'Reserva Drone DJI Inspire',
      type: 'equipment',
      startTime: '08:00',
      endTime: '20:00',
      project: 'Filmagem Aérea - Litoral',
      equipment: ['Drone DJI Inspire 2', 'Baterias Extras', 'Case de Transporte'],
      status: 'confirmed',
    },
    {
      id: '5',
      title: 'Gravação Institucional Bradesco',
      type: 'shoot',
      startTime: '10:00',
      endTime: '16:00',
      project: 'Vídeo Corporativo 2025',
      location: 'Sede Bradesco - Cidade de Deus',
      attendees: ['Juliana Ferreira', 'Marcos Oliveira'],
      equipment: ['Câmera Sony A7S III', 'Microfone Boom', 'Tripé Profissional'],
      status: 'confirmed',
    },
    {
      id: '6',
      title: 'Reunião Planejamento - Magazine Luiza',
      type: 'meeting',
      startTime: '11:00',
      endTime: '12:00',
      project: 'Campanha Black Friday',
      location: 'Online - Google Meet',
      attendees: ['Fernanda Costa', 'Lucas Martins', 'Patricia Souza'],
      status: 'pending',
    },
    {
      id: '7',
      title: 'Prazo Entrega - Motion Graphics',
      type: 'deadline',
      startTime: '23:59',
      endTime: '23:59',
      project: 'Abertura Programa TV',
      status: 'pending',
    },
    {
      id: '8',
      title: 'Manutenção Equipamentos',
      type: 'equipment',
      startTime: '09:00',
      endTime: '12:00',
      project: 'Manutenção Preventiva',
      equipment: ['Todas as Câmeras', 'Lentes', 'Estabilizadores'],
      status: 'confirmed',
    },
  ];

  const filteredEvents = mockEvents.filter((event) => activeFilters.includes(event.type));

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date(2025, 11, 27));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
    setViewMode('day');
  };

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-4 p-6">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Main Calendar Area */}
        <div className="flex-1 space-y-4">
          <CalendarHeader
            currentDate={currentDate}
            viewMode={viewMode}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onToday={handleToday}
            onViewModeChange={setViewMode}
          />

          <QuickFilters activeFilters={activeFilters} onFilterToggle={handleFilterToggle} />

          {viewMode === 'month' && (
            <MonthView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
            />
          )}

          {viewMode === 'week' && (
            <WeekView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
            />
          )}

          {viewMode === 'day' && (
            <DayView
              currentDate={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-4">
          <UpcomingEvents events={filteredEvents} onEventClick={handleEventClick} />
        </div>
      </div>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CalendarInteractive;