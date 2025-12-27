import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ActivityItemProps {
  activity: {
    id: string;
    user: {
      name: string;
      avatar: string;
      avatarAlt: string;
    };
    action: string;
    project: string;
    timestamp: string;
    type: 'upload' | 'comment' | 'status' | 'approval' | 'assignment';
  };
}

const activityTypeConfig = {
  upload: { icon: 'ArrowUpTrayIcon', color: 'text-blue-600' },
  comment: { icon: 'ChatBubbleLeftIcon', color: 'text-purple-600' },
  status: { icon: 'ArrowPathIcon', color: 'text-yellow-600' },
  approval: { icon: 'CheckCircleIcon', color: 'text-green-600' },
  assignment: { icon: 'UserPlusIcon', color: 'text-orange-600' },
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const typeConfig = activityTypeConfig[activity.type];

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-colors duration-300">
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <AppImage
            src={activity.user.avatar}
            alt={activity.user.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-card rounded-full flex items-center justify-center ${typeConfig.color}`}>
          <Icon name={typeConfig.icon as any} size={12} variant="solid" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          <span className="font-medium">{activity.user.name}</span>{' '}
          <span className="text-muted-foreground">{activity.action}</span>{' '}
          <span className="font-medium">{activity.project}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityItem;