import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

interface OnboardingChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: number) => void;
}

const OnboardingChecklist = ({ items, onToggleItem }: OnboardingChecklistProps) => {
  const completedCount = items.filter((item) => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-headline font-semibold text-foreground">
          Checklist de Integração
        </h3>
        <span className="text-sm font-medium text-muted-foreground">
          {completedCount} de {items.length} concluídos
        </span>
      </div>

      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 bg-success rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg border transition-all duration-300 ${
              item.completed
                ? 'bg-success/5 border-success/20' :'bg-muted/50 border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => onToggleItem(item.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                  item.completed
                    ? 'bg-success border-success' :'border-muted-foreground hover:border-primary'
                }`}
              >
                {item.completed && (
                  <Icon name="CheckIcon" size={16} variant="solid" className="text-white" />
                )}
              </button>
              <div className="flex-1">
                <h4
                  className={`text-sm font-medium mb-1 ${
                    item.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="CalendarIcon" size={14} variant="outline" />
                  <span>Prazo: {item.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingChecklist;