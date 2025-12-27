import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  alt: string;
  role: string;
}

interface Project {
  id: number;
  title: string;
  client: string;
  status: 'Planning' | 'Capture' | 'Editing' | 'Review' | 'Delivered';
  progress: number;
  dueDate: string;
  thumbnail: string;
  thumbnailAlt: string;
  team: TeamMember[];
  priority: 'high' | 'medium' | 'low';
  budget: number;
  spent: number;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: number) => void;
}

const statusColors = {
  Planning: 'bg-blue-100 text-blue-800 border-blue-200',
  Capture: 'bg-purple-100 text-purple-800 border-purple-200',
  Editing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Review: 'bg-orange-100 text-orange-800 border-orange-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
};

const priorityColors = {
  high: 'text-red-600',
  medium: 'text-yellow-600',
  low: 'text-green-600',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewDetails }) => {
  const budgetPercentage = (project.spent / project.budget) * 100;

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <AppImage
          src={project.thumbnail}
          alt={project.thumbnailAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <Icon
            name="FlagIcon"
            size={20}
            variant="solid"
            className={priorityColors[project.priority]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title & Client */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Icon name="BuildingOfficeIcon" size={16} variant="outline" />
            {project.client}
          </p>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium text-foreground">{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground">Orçamento</span>
            <span className="text-xs font-medium text-foreground">
              R$ {project.spent.toLocaleString('pt-BR')} / R$ {project.budget.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                budgetPercentage > 90 ? 'bg-error' : budgetPercentage > 75 ? 'bg-warning' : 'bg-success'
              }`}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Team & Due Date */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                title={member.name}
              >
                <AppImage
                  src={member.avatar}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{project.team.length - 3}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="CalendarIcon" size={16} variant="outline" />
            <span>{project.dueDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(project.id)}
          className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>Ver Detalhes</span>
          <Icon name="ArrowRightIcon" size={16} variant="outline" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;