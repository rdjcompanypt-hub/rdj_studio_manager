import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ProjectProfit {
  id: number;
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  status: 'positive' | 'neutral' | 'negative';
}

interface ProjectProfitabilityCardProps {
  projects: ProjectProfit[];
}

const ProjectProfitabilityCard = ({ projects }: ProjectProfitabilityCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'positive':
        return <Icon name="ArrowTrendingUpIcon" size={20} variant="solid" className="text-success" />;
      case 'negative':
        return <Icon name="ArrowTrendingDownIcon" size={20} variant="solid" className="text-error" />;
      default:
        return <Icon name="MinusIcon" size={20} variant="solid" className="text-warning" />;
    }
  };

  const getMarginColor = (margin: number): string => {
    if (margin >= 30) return 'text-success';
    if (margin >= 15) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Lucratividade por Projeto
        </h3>
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="ChartBarIcon" size={24} variant="outline" className="text-success" />
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{project.name}</h4>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(project.status)}
                  <span className={`text-sm font-semibold ${getMarginColor(project.margin)}`}>
                    {project.margin.toFixed(1)}% margem
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">Receita</span>
                <span className="font-medium text-foreground">
                  R$ {project.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Despesas</span>
                <span className="font-medium text-foreground">
                  R$ {project.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Lucro</span>
                <span className={`font-semibold ${project.profit >= 0 ? 'text-success' : 'text-error'}`}>
                  R$ {project.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProfitabilityCard;