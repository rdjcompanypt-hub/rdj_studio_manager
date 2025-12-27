import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatItem {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

interface QuickStatsGridProps {
  stats: StatItem[];
}

const QuickStatsGrid = ({ stats }: QuickStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg shadow-card border border-border p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon as any} size={24} variant="outline" className="text-white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${stat.change >= 0 ? 'text-success' : 'text-error'}`}>
              <Icon
                name={stat.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                size={16}
                variant="solid"
              />
              <span>{Math.abs(stat.change)}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;