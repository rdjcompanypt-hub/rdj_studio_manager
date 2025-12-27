import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  alt: string;
  status: 'active' | 'busy' | 'offline';
  skills: string[];
  currentProjects: number;
  completedTasks: number;
  availability: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
  onViewProfile: (id: number) => void;
  onAssignTask: (id: number) => void;
}

const TeamMemberCard = ({ member, onViewProfile, onAssignTask }: TeamMemberCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'busy':
        return 'bg-warning';
      case 'offline':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Disponível';
      case 'busy':
        return 'Ocupado';
      case 'offline':
        return 'Offline';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-card transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <AppImage
                src={member.avatar}
                alt={member.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(member.status)}`}
              title={getStatusText(member.status)}
            />
          </div>
          <div>
            <h3 className="text-lg font-headline font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <button
          onClick={() => onViewProfile(member.id)}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Ver perfil"
        >
          <Icon name="EllipsisVerticalIcon" size={20} variant="outline" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="EnvelopeIcon" size={16} variant="outline" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="PhoneIcon" size={16} variant="outline" />
          <span>{member.phone}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Habilidades</p>
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted rounded-md text-xs font-medium text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-headline font-bold text-foreground">{member.currentProjects}</p>
          <p className="text-xs text-muted-foreground">Projetos Ativos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-headline font-bold text-foreground">{member.completedTasks}</p>
          <p className="text-xs text-muted-foreground">Tarefas Concluídas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-headline font-bold text-foreground">{member.availability}%</p>
          <p className="text-xs text-muted-foreground">Disponibilidade</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">Capacidade</p>
          <p className="text-xs font-medium text-foreground">{member.availability}%</p>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              member.availability >= 70
                ? 'bg-success'
                : member.availability >= 40
                ? 'bg-warning' :'bg-error'
            }`}
            style={{ width: `${member.availability}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onAssignTask(member.id)}
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
      >
        <Icon name="PlusIcon" size={16} variant="outline" />
        <span>Atribuir Tarefa</span>
      </button>
    </div>
  );
};

export default TeamMemberCard;