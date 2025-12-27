'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface KanbanTask {
  id: number;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
    alt: string;
  };
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onTaskMove: (taskId: number, fromColumn: string, toColumn: string) => void;
}

const priorityColors = {
  high: 'border-red-500',
  medium: 'border-yellow-500',
  low: 'border-green-500',
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onTaskMove }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ViewColumnsIcon" size={24} variant="outline" />
          Quadro Kanban
        </h3>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
          <Icon name="PlusIcon" size={16} variant="outline" />
          Nova Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">{column.title}</h4>
              <span className="text-xs bg-card px-2 py-1 rounded-full text-muted-foreground">
                {column.tasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-card rounded-lg p-3 border-l-4 ${priorityColors[task.priority]} hover:shadow-md transition-all duration-300 cursor-move`}
                >
                  <h5 className="font-medium text-foreground text-sm mb-2 line-clamp-1">
                    {task.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <AppImage
                          src={task.assignee.avatar}
                          alt={task.assignee.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="CalendarIcon" size={14} variant="outline" />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;