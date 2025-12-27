'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface CashFlowData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

interface CashFlowChartProps {
  data: CashFlowData[];
}

const CashFlowChart = ({ data }: CashFlowChartProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-headline font-semibold text-foreground">
            Fluxo de Caixa
          </h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando gráfico...</div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-card p-4">
          <p className="font-medium text-foreground mb-2">{payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Fluxo de Caixa
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-300">
            <Icon name="ArrowPathIcon" size={20} variant="outline" className="text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors duration-300">
            <Icon name="ArrowDownTrayIcon" size={20} variant="outline" className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="h-80" aria-label="Gráfico de Fluxo de Caixa Mensal">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#718096" style={{ fontSize: '12px' }} />
            <YAxis stroke="#718096" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#38A169"
              strokeWidth={2}
              name="Receita"
              dot={{ fill: '#38A169', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#E53E3E"
              strokeWidth={2}
              name="Despesas"
              dot={{ fill: '#E53E3E', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="#4A9EFF"
              strokeWidth={2}
              name="Lucro"
              dot={{ fill: '#4A9EFF', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CashFlowChart;