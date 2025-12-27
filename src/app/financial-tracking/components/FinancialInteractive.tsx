'use client';

import React, { useState, useEffect } from 'react';
import BudgetOverviewCard from './BudgetOverviewCard';
import ProjectProfitabilityCard from './ProjectProfitabilityCard';
import ExpenseListCard from './ExpenseListCard';
import InvoiceManagementCard from './InvoiceManagementCard';
import CashFlowChart from './CashFlowChart';
import ExpenseCategoryChart from './ExpenseCategoryChart';
import QuickStatsGrid from './QuickStatsGrid';

interface BudgetData {
  totalBudget: number;
  spent: number;
  remaining: number;
  percentageUsed: number;
}

interface ProjectProfit {
  id: number;
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
  status: 'positive' | 'neutral' | 'negative';
}

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

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface StatItem {
  label: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const FinancialInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const budgetData: BudgetData = {
    totalBudget: 500000.00,
    spent: 387500.00,
    remaining: 112500.00,
    percentageUsed: 77.5
  };

  const projectProfits: ProjectProfit[] = [
  {
    id: 1,
    name: "Campanha Institucional - TechCorp",
    revenue: 85000.00,
    expenses: 52000.00,
    profit: 33000.00,
    margin: 38.8,
    status: 'positive'
  },
  {
    id: 2,
    name: "Vídeo Corporativo - StartupXYZ",
    revenue: 45000.00,
    expenses: 38000.00,
    profit: 7000.00,
    margin: 15.6,
    status: 'neutral'
  },
  {
    id: 3,
    name: "Cobertura de Evento - Festival 2024",
    revenue: 62000.00,
    expenses: 41000.00,
    profit: 21000.00,
    margin: 33.9,
    status: 'positive'
  },
  {
    id: 4,
    name: "Sessão Fotográfica - Moda Verão",
    revenue: 28000.00,
    expenses: 26500.00,
    profit: 1500.00,
    margin: 5.4,
    status: 'negative'
  }];


  const expenses: Expense[] = [
  {
    id: 1,
    description: "Aluguel de Câmera RED Komodo",
    category: "Equipamento",
    amount: 4500.00,
    date: "22/12/2025",
    project: "Campanha TechCorp",
    submittedBy: "Carlos Silva",
    submittedByImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18b6f5f35-1763296280847.png",
    submittedByImageAlt: "Professional headshot of Hispanic man with short black hair wearing navy blue shirt",
    status: 'approved',
    receipt: true
  },
  {
    id: 2,
    description: "Transporte de Equipe - Van",
    category: "Transporte",
    amount: 850.00,
    date: "21/12/2025",
    project: "Vídeo StartupXYZ",
    submittedBy: "Ana Costa",
    submittedByImage: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
    submittedByImageAlt: "Professional portrait of young woman with long brown hair in white blouse smiling",
    status: 'pending',
    receipt: true
  },
  {
    id: 3,
    description: "Catering para Equipe de Produção",
    category: "Alimentação",
    amount: 1200.00,
    date: "20/12/2025",
    project: "Festival 2024",
    submittedBy: "Roberto Lima",
    submittedByImage: "https://images.unsplash.com/photo-1624799027443-b21da9f4f677",
    submittedByImageAlt: "Casual photo of bearded man with glasses wearing gray t-shirt outdoors",
    status: 'approved',
    receipt: true
  },
  {
    id: 4,
    description: "Locação de Estúdio - 2 dias",
    category: "Locação",
    amount: 3200.00,
    date: "19/12/2025",
    project: "Moda Verão",
    submittedBy: "Juliana Santos",
    submittedByImage: "https://img.rocket.new/generatedImages/rocket_gen_img_121bf37ac-1763295990383.png",
    submittedByImageAlt: "Professional headshot of woman with curly hair in black blazer",
    status: 'approved',
    receipt: false
  },
  {
    id: 5,
    description: "Licença de Música para Vídeo",
    category: "Outros",
    amount: 680.00,
    date: "18/12/2025",
    project: "Campanha TechCorp",
    submittedBy: "Pedro Oliveira",
    submittedByImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1219eacec-1763294869102.png",
    submittedByImageAlt: "Friendly portrait of young man with short hair in casual blue shirt",
    status: 'pending',
    receipt: true
  }];


  const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-2025-001",
    client: "TechCorp Brasil",
    project: "Campanha Institucional",
    amount: 85000.00,
    issueDate: "15/12/2025",
    dueDate: "15/01/2026",
    status: 'pending'
  },
  {
    id: 2,
    invoiceNumber: "INV-2025-002",
    client: "StartupXYZ",
    project: "Vídeo Corporativo",
    amount: 45000.00,
    issueDate: "10/12/2025",
    dueDate: "10/01/2026",
    status: 'paid'
  },
  {
    id: 3,
    invoiceNumber: "INV-2025-003",
    client: "Festival Produções",
    project: "Cobertura de Evento",
    amount: 62000.00,
    issueDate: "05/12/2025",
    dueDate: "05/01/2026",
    status: 'pending'
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-098",
    client: "Moda Verão Ltda",
    project: "Sessão Fotográfica",
    amount: 28000.00,
    issueDate: "20/11/2025",
    dueDate: "20/12/2025",
    status: 'overdue'
  }];


  const cashFlowData: CashFlowData[] = [
  { month: 'Jul', income: 125000, expenses: 98000, profit: 27000 },
  { month: 'Ago', income: 142000, expenses: 105000, profit: 37000 },
  { month: 'Set', income: 138000, expenses: 112000, profit: 26000 },
  { month: 'Out', income: 165000, expenses: 128000, profit: 37000 },
  { month: 'Nov', income: 158000, expenses: 135000, profit: 23000 },
  { month: 'Dez', income: 172000, expenses: 142000, profit: 30000 }];


  const categoryData: CategoryData[] = [
  { name: 'Equipamento', value: 45000, color: '#4A9EFF' },
  { name: 'Transporte', value: 28000, color: '#38A169' },
  { name: 'Alimentação', value: 18000, color: '#D69E2E' },
  { name: 'Locação', value: 35000, color: '#E53E3E' },
  { name: 'Outros', value: 12000, color: '#718096' }];


  const stats: StatItem[] = [
  {
    label: 'Receita Total',
    value: 'R$ 900.000,00',
    change: 12.5,
    icon: 'CurrencyDollarIcon',
    color: 'bg-success'
  },
  {
    label: 'Despesas Totais',
    value: 'R$ 620.000,00',
    change: 8.3,
    icon: 'ArrowTrendingDownIcon',
    color: 'bg-error'
  },
  {
    label: 'Lucro Líquido',
    value: 'R$ 280.000,00',
    change: 18.7,
    icon: 'ChartBarIcon',
    color: 'bg-primary'
  },
  {
    label: 'Margem Média',
    value: '31,1%',
    change: 5.2,
    icon: 'CalculatorIcon',
    color: 'bg-accent'
  }];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-32 bg-muted rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="w-full space-y-8">
      <QuickStatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetOverviewCard data={budgetData} />
        <ProjectProfitabilityCard projects={projectProfits} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CashFlowChart data={cashFlowData} />
        </div>
        <div>
          <ExpenseCategoryChart data={categoryData} />
        </div>
      </div>

      <ExpenseListCard expenses={expenses} />

      <InvoiceManagementCard invoices={invoices} />
    </div>);

};

export default FinancialInteractive;