import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: number[];
  assignee: string;
}

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const calculatePosition = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { duration };
  };

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ChartBarIcon" size={24} variant="outline" />
          Gráfico de Gantt
        </h3>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-300">
          Exportar
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 mb-4 pb-2 border-b border-border">
            <div className="col-span-3 text-sm font-medium text-muted-foreground">Tarefa</div>
            <div className="col-span-2 text-sm font-medium text-muted-foreground">Responsável</div>
            <div className="col-span-7 text-sm font-medium text-muted-foreground">Cronograma</div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.map((task) => {
              const { duration } = calculatePosition(task.startDate, task.endDate);
              return (
                <div key={task.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{task.name}</p>
                    {task.dependencies.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Depende de: {task.dependencies.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">{task.assignee}</p>
                  </div>
                  <div className="col-span-7">
                    <div className="relative h-8 bg-muted rounded">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary rounded flex items-center justify-center"
                        style={{ width: `${(duration / 30) * 100}%` }}
                      >
                        <span className="text-xs text-primary-foreground font-medium">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{task.startDate}</span>
                      <span className="text-xs text-muted-foreground">{task.endDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;