import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface BudgetData {
  totalBudget: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
}

interface BudgetOverviewCardProps {
  data: BudgetData;
}

const BudgetOverviewCard = ({ data }: BudgetOverviewCardProps) => {
  const getStatusColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-error';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Visão Geral do Orçamento
        </h3>
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="CurrencyDollarIcon" size={24} variant="outline" className="text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">Orçamento Total</span>
          <span className="text-2xl font-bold text-foreground">
            R$ {data.totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gasto</span>
            <span className="font-medium text-foreground">
              R$ {data.spent.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(data.percentageUsed)}`}
              style={{ width: `${Math.min(data.percentageUsed, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className={`font-medium ${getStatusColor(data.percentageUsed)}`}>
              {data.percentageUsed.toFixed(1)}% utilizado
            </span>
            <span className="text-muted-foreground">
              R$ {data.remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} restante
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewCard;