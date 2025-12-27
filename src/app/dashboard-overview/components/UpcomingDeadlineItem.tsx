import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface UpcomingDeadlineItemProps {
  deadline: {
    id: string;
    project: string;
    task: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    daysLeft: number;
  };
}

const UpcomingDeadlineItem = ({ deadline }: UpcomingDeadlineItemProps) => {
  const priorityConfig = {
    high: { color: 'text-red-600', bg: 'bg-red-100' },
    medium: { color: 'text-yellow-600', bg: 'bg-yellow-100' },
    low: { color: 'text-green-600', bg: 'bg-green-100' },
  };

  const priorityStyle = priorityConfig[deadline.priority];
  const isUrgent = deadline.daysLeft <= 2;

  return (
    <Link
      href={`/project-management?id=${deadline.id}`}
      className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors duration-300 group"
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className={`w-10 h-10 rounded-full ${priorityStyle.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon name="ClockIcon" size={20} variant="outline" className={priorityStyle.color} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 truncate">
            {deadline.project}
          </h4>
          <p className="text-xs text-muted-foreground truncate">{deadline.task}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0">
        <div className="text-right">
          <p className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-foreground'}`}>
            {deadline.daysLeft === 0 ? 'Hoje' : deadline.daysLeft === 1 ? 'Amanhã' : `${deadline.daysLeft} dias`}
          </p>
          <p className="text-xs text-muted-foreground">{deadline.dueDate}</p>
        </div>
        <Icon name="ChevronRightIcon" size={20} variant="outline" className="text-muted-foreground" />
      </div>
    </Link>
  );
};

export default UpcomingDeadlineItem;