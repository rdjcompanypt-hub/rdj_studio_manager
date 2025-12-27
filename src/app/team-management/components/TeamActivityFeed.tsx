import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Activity {
  id: number;
  user: {
    name: string;
    avatar: string;
    alt: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'task' | 'project' | 'comment' | 'approval';
}

interface TeamActivityFeedProps {
  activities: Activity[];
}

const TeamActivityFeed = ({ activities }: TeamActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task':
        return 'CheckCircleIcon';
      case 'project':
        return 'FolderIcon';
      case 'comment':
        return 'ChatBubbleLeftIcon';
      case 'approval':
        return 'HandThumbUpIcon';
      default:
        return 'BellIcon';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'task':
        return 'bg-success/10 text-success';
      case 'project':
        return 'bg-primary/10 text-primary';
      case 'comment':
        return 'bg-accent/10 text-accent';
      case 'approval':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-headline font-semibold text-foreground mb-6">
        Atividades Recentes
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <AppImage
                  src={activity.user.avatar}
                  alt={activity.user.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getActivityColor(
                  activity.type
                )}`}
              >
                <Icon name={getActivityIcon(activity.type) as any} size={12} variant="solid" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user.name}</span>{' '}
                <span className="text-muted-foreground">{activity.action}</span>{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamActivityFeed;