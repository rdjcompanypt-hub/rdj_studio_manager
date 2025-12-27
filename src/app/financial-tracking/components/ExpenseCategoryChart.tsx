'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseCategoryChartProps {
  data: CategoryData[];
}

const ExpenseCategoryChart = ({ data }: ExpenseCategoryChartProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg shadow-card border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-headline font-semibold text-foreground">
            Despesas por Categoria
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
          <p className="font-medium text-foreground mb-1">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-card rounded-lg shadow-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Despesas por Categoria
        </h3>
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="ChartPieIcon" size={24} variant="outline" className="text-accent" />
        </div>
      </div>

      <div className="h-80" aria-label="Gráfico de Pizza de Despesas por Categoria">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 space-y-3">
        {data.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
              <span className="text-sm text-foreground">{category.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">
                R$ {category.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground">
                {((category.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCategoryChart;