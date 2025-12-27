import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface TeamStatsProps {
  stats: Stat[];
}

const TeamStats = ({ stats }: TeamStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={stat.icon as any} size={24} variant="outline" className="text-primary" />
            </div>
            {stat.trend && (
              <div
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend.isPositive
                    ? 'bg-success/10 text-success' :'bg-error/10 text-error'
                }`}
              >
                <Icon
                  name={stat.trend.isPositive ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                  size={12}
                  variant="solid"
                />
                <span>{Math.abs(stat.trend.value)}%</span>
              </div>
            )}
          </div>
          <p className="text-3xl font-headline font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TeamStats;