import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Invoice {
  id: number;
  invoiceNumber: string;
  client: string;
  project: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface InvoiceManagementCardProps {
  invoices: Invoice[];
}

const InvoiceManagementCard = ({ invoices }: InvoiceManagementCardProps) => {
  const getStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      overdue: 'bg-error/10 text-error',
    };

    const labels = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Atrasado',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Faturas
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300">
          <Icon name="DocumentPlusIcon" size={20} variant="outline" />
          <span className="text-sm font-medium">Nova Fatura</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Número</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Projeto</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Vencimento</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-300">
                <td className="py-4 px-4">
                  <span className="font-medium text-foreground">{invoice.invoiceNumber}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-foreground">{invoice.client}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-muted-foreground text-sm">{invoice.project}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-foreground">
                    R$ {invoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{invoice.dueDate}</span>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(invoice.status)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-300" title="Visualizar">
                      <Icon name="EyeIcon" size={18} variant="outline" className="text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-300" title="Baixar">
                      <Icon name="ArrowDownTrayIcon" size={18} variant="outline" className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceManagementCard;