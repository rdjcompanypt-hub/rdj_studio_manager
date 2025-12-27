'use client';

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
  description: string;
  startDate: string;
}

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors = {
  Planning: 'bg-blue-100 text-blue-800 border-blue-200',
  Capture: 'bg-purple-100 text-purple-800 border-purple-200',
  Editing: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Review: 'bg-orange-100 text-orange-800 border-orange-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
};

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-all duration-300"
          >
            <Icon name="XMarkIcon" size={24} variant="outline" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          <div className="relative h-64 overflow-hidden rounded-lg">
            <AppImage
              src={project.thumbnail}
              alt={project.thumbnailAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  statusColors[project.status]
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Cliente</h3>
              <p className="text-foreground flex items-center gap-2">
                <Icon name="BuildingOfficeIcon" size={20} variant="outline" />
                {project.client}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Período</h3>
              <p className="text-foreground flex items-center gap-2">
                <Icon name="CalendarIcon" size={20} variant="outline" />
                {project.startDate} - {project.dueDate}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Orçamento</h3>
              <p className="text-foreground">
                R$ {project.spent.toLocaleString('pt-BR')} / R${' '}
                {project.budget.toLocaleString('pt-BR')}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Progresso</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{project.progress}%</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
            <p className="text-foreground">{project.description}</p>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Equipe</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                      src={member.avatar}
                      alt={member.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
              <Icon name="PencilIcon" size={16} variant="outline" />
              Editar Projeto
            </button>
            <button className="flex-1 px-4 py-2 bg-muted text-foreground rounded-md text-sm font-medium hover:bg-muted/80 transition-all duration-300 flex items-center justify-center gap-2">
              <Icon name="ShareIcon" size={16} variant="outline" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;