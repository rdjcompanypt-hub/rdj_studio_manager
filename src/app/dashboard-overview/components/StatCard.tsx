import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatCardProps {
  stat: {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
    color: string;
  };
}

const StatCard = ({ stat }: StatCardProps) => {
  const trendConfig = {
    up: { icon: 'ArrowTrendingUpIcon', color: 'text-green-600' },
    down: { icon: 'ArrowTrendingDownIcon', color: 'text-red-600' },
    neutral: { icon: 'MinusIcon', color: 'text-gray-600' },
  };

  const trendStyle = trendConfig[stat.trend];

  return (
    <div className="bg-card rounded-lg shadow-card p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
          <Icon name={stat.icon as any} size={24} variant="outline" className="text-white" />
        </div>
        <div className={`flex items-center space-x-1 ${trendStyle.color}`}>
          <Icon name={trendStyle.icon as any} size={16} variant="solid" />
          <span className="text-sm font-medium">{stat.change}</span>
        </div>
      </div>
      <h3 className="text-3xl font-headline font-bold text-foreground mb-1">{stat.value}</h3>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
};

export default StatCard;