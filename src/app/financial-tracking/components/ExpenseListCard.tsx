import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  project: string;
  submittedBy: string;
  submittedByImage: string;
  submittedByImageAlt: string;
  status: 'approved' | 'pending' | 'rejected';
  receipt: boolean;
}

interface ExpenseListCardProps {
  expenses: Expense[];
}

const ExpenseListCard = ({ expenses }: ExpenseListCardProps) => {
  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      rejected: 'bg-error/10 text-error',
    };

    const labels = {
      approved: 'Aprovado',
      pending: 'Pendente',
      rejected: 'Rejeitado',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Equipamento': 'CameraIcon',
      'Transporte': 'TruckIcon',
      'Alimentação': 'ShoppingBagIcon',
      'Locação': 'HomeIcon',
      'Outros': 'EllipsisHorizontalIcon',
    };
    return icons[category] || 'DocumentIcon';
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Despesas Recentes
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300">
          <Icon name="PlusIcon" size={20} variant="outline" />
          <span className="text-sm font-medium">Nova Despesa</span>
        </button>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getCategoryIcon(expense.category) as any} size={20} variant="outline" className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{expense.description}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{expense.project}</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="text-lg font-bold text-foreground mb-1">
                  R$ {expense.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                {getStatusBadge(expense.status)}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <AppImage
                    src={expense.submittedByImage}
                    alt={expense.submittedByImageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{expense.submittedBy}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">{expense.date}</span>
                {expense.receipt && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="DocumentCheckIcon" size={16} variant="solid" />
                    <span className="text-xs font-medium">Recibo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseListCard;