import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    client: string;
    status: 'Planning' | 'Capture' | 'Editing' | 'Review' | 'Delivered';
    progress: number;
    dueDate: string;
    thumbnail: string;
    thumbnailAlt: string;
    team: Array<{
      name: string;
      avatar: string;
      avatarAlt: string;
    }>;
    priority: 'high' | 'medium' | 'low';
  };
}

const statusConfig = {
  Planning: { color: 'bg-blue-100 text-blue-800', icon: 'ClipboardDocumentListIcon' },
  Capture: { color: 'bg-purple-100 text-purple-800', icon: 'VideoCameraIcon' },
  Editing: { color: 'bg-yellow-100 text-yellow-800', icon: 'FilmIcon' },
  Review: { color: 'bg-orange-100 text-orange-800', icon: 'EyeIcon' },
  Delivered: { color: 'bg-green-100 text-green-800', icon: 'CheckCircleIcon' },
};

const priorityConfig = {
  high: { color: 'border-red-500', badge: 'bg-red-100 text-red-800' },
  medium: { color: 'border-yellow-500', badge: 'bg-yellow-100 text-yellow-800' },
  low: { color: 'border-green-500', badge: 'bg-green-100 text-green-800' },
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusStyle = statusConfig[project.status];
  const priorityStyle = priorityConfig[project.priority];

  return (
    <div className={`bg-card rounded-lg shadow-card border-l-4 ${priorityStyle.color} hover:shadow-lg transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link href={`/project-management?id=${project.id}`} className="group">
              <h3 className="text-lg font-headline font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">{project.client}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyle.badge}`}>
            {project.priority === 'high' ? 'Alta' : project.priority === 'medium' ? 'Média' : 'Baixa'}
          </span>
        </div>

        <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
          <AppImage
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusStyle.color}`}>
            <Icon name={statusStyle.icon as any} size={16} variant="solid" />
            <span className="text-xs font-medium">{project.status}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CalendarIcon" size={16} variant="outline" />
            <span>{project.dueDate}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium text-foreground">{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border-2 border-card overflow-hidden"
                title={member.name}
              >
                <AppImage
                  src={member.avatar}
                  alt={member.avatarAlt}
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
          <Link
            href={`/project-management?id=${project.id}`}
            className="text-sm font-medium text-primary hover:text-secondary transition-colors duration-300"
          >
            Ver Detalhes →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;