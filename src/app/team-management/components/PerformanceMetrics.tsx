import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PerformanceData {
  name: string;
  tarefasConcluidas: number;
  tarefasAtrasadas: number;
  horasTrabalhadas: number;
}

interface PerformanceMetricsProps {
  data: PerformanceData[];
}

const PerformanceMetrics = ({ data }: PerformanceMetricsProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-headline font-semibold text-foreground mb-6">
        Métricas de Desempenho da Equipe
      </h3>
      <div className="w-full h-80" aria-label="Gráfico de barras de desempenho da equipe">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#718096" style={{ fontSize: '12px' }} />
            <YAxis stroke="#718096" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="tarefasConcluidas" fill="#38A169" name="Tarefas Concluídas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tarefasAtrasadas" fill="#E53E3E" name="Tarefas Atrasadas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="horasTrabalhadas" fill="#4A5568" name="Horas Trabalhadas" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceMetrics;