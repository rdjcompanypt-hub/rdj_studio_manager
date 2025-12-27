import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'task' | 'review' | 'delivery';
  status: 'completed' | 'in-progress' | 'pending';
}

interface ProjectTimelineProps {
  events: TimelineEvent[];
}

const typeIcons = {
  milestone: 'FlagIcon',
  task: 'CheckCircleIcon',
  review: 'EyeIcon',
  delivery: 'TruckIcon',
};

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  pending: 'bg-gray-300',
};

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ events }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="ClockIcon" size={24} variant="outline" />
        Linha do Tempo do Projeto
      </h3>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Events */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="relative pl-14">
              {/* Timeline Dot */}
              <div
                className={`absolute left-4 w-5 h-5 rounded-full border-4 border-card ${
                  statusColors[event.status]
                }`}
              />

              {/* Event Content */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon
                      name={typeIcons[event.type] as any}
                      size={20}
                      variant="outline"
                      className="text-primary"
                    />
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                  </div>
                  <span className="text-xs text-muted-foreground">{event.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;