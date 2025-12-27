import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
}

interface ProjectStatsProps {
  stats: Stat[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <Icon name={stat.icon as any} size={24} variant="outline" className={stat.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;