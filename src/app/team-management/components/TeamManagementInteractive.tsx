'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import TeamMemberCard from './TeamMemberCard';
import RoleFilter from './RoleFilter';
import TeamStats from './TeamStats';
import OnboardingChecklist from './OnboardingChecklist';
import TeamActivityFeed from './TeamActivityFeed';
import PerformanceMetrics from './PerformanceMetrics';
import AddTeamMemberModal from './AddTeamMemberModal';

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

interface Role {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

interface Activity {
  id: number;
  user: {
    name: string;
    avatar: string;
    alt: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'task' | 'project' | 'comment' | 'approval';
}

interface PerformanceData {
  name: string;
  tarefasConcluidas: number;
  tarefasAtrasadas: number;
  horasTrabalhadas: number;
}

const TeamManagementInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeRole, setActiveRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
  {
    id: 1,
    name: 'Ana Silva',
    role: 'Gerente de Projeto',
    email: 'ana.silva@rdjstudio.com',
    phone: '(11) 98765-4321',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_152eed935-1763301844909.png",
    alt: 'Mulher profissional com cabelo castanho longo sorrindo em ambiente de escritório moderno',
    status: 'active',
    skills: ['Gestão de Projetos', 'Scrum', 'Comunicação'],
    currentProjects: 5,
    completedTasks: 127,
    availability: 75
  },
  {
    id: 2,
    name: 'Carlos Mendes',
    role: 'Fotógrafo',
    email: 'carlos.mendes@rdjstudio.com',
    phone: '(11) 97654-3210',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10a1046ff-1763293865191.png",
    alt: 'Homem profissional com barba curta e camisa azul em estúdio fotográfico',
    status: 'busy',
    skills: ['Fotografia Comercial', 'Retrato', 'Iluminação'],
    currentProjects: 3,
    completedTasks: 89,
    availability: 45
  },
  {
    id: 3,
    name: 'Mariana Costa',
    role: 'Editor de Vídeo',
    email: 'mariana.costa@rdjstudio.com',
    phone: '(11) 96543-2109',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19bbcf4e1-1766801682710.png",
    alt: 'Mulher criativa com óculos e cabelo preto em sala de edição com monitores',
    status: 'active',
    skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
    currentProjects: 4,
    completedTasks: 156,
    availability: 80
  },
  {
    id: 4,
    name: 'Roberto Lima',
    role: 'Cinegrafista',
    email: 'roberto.lima@rdjstudio.com',
    phone: '(11) 95432-1098',
    avatar: "https://images.unsplash.com/photo-1582760415703-43e15384a4b2",
    alt: 'Homem profissional com cabelo curto segurando câmera em locação externa',
    status: 'offline',
    skills: ['Cinematografia', 'Drone', 'Steadicam'],
    currentProjects: 2,
    completedTasks: 73,
    availability: 30
  },
  {
    id: 5,
    name: 'Juliana Santos',
    role: 'Designer Gráfico',
    email: 'juliana.santos@rdjstudio.com',
    phone: '(11) 94321-0987',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e9f7a797-1765107320838.png",
    alt: 'Mulher criativa com cabelo loiro trabalhando em tablet digital em escritório moderno',
    status: 'active',
    skills: ['Photoshop', 'Illustrator', 'Branding'],
    currentProjects: 6,
    completedTasks: 201,
    availability: 90
  },
  {
    id: 6,
    name: 'Pedro Oliveira',
    role: 'Administrador',
    email: 'pedro.oliveira@rdjstudio.com',
    phone: '(11) 93210-9876',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112193a91-1763294779964.png",
    alt: 'Homem executivo com terno cinza e gravata em escritório corporativo',
    status: 'active',
    skills: ['Gestão de Equipe', 'Estratégia', 'Finanças'],
    currentProjects: 8,
    completedTasks: 342,
    availability: 65
  }]
  );

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
  {
    id: 1,
    title: 'Configurar conta de e-mail',
    description: 'Criar e configurar conta de e-mail corporativo',
    completed: true,
    dueDate: '20/12/2025'
  },
  {
    id: 2,
    title: 'Treinamento de ferramentas',
    description: 'Completar treinamento das principais ferramentas do estúdio',
    completed: true,
    dueDate: '22/12/2025'
  },
  {
    id: 3,
    title: 'Conhecer a equipe',
    description: 'Reunião de apresentação com todos os membros da equipe',
    completed: false,
    dueDate: '28/12/2025'
  },
  {
    id: 4,
    title: 'Revisar processos',
    description: 'Estudar documentação de processos e workflows',
    completed: false,
    dueDate: '30/12/2025'
  }]
  );

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>);

  }

  const roles: Role[] = [
  { id: 'all', name: 'Todos', count: teamMembers.length, icon: 'UsersIcon' },
  {
    id: 'admin',
    name: 'Administrador',
    count: teamMembers.filter((m) => m.role === 'Administrador').length,
    icon: 'ShieldCheckIcon'
  },
  {
    id: 'manager',
    name: 'Gerente de Projeto',
    count: teamMembers.filter((m) => m.role === 'Gerente de Projeto').length,
    icon: 'BriefcaseIcon'
  },
  {
    id: 'photographer',
    name: 'Fotógrafo',
    count: teamMembers.filter((m) => m.role === 'Fotógrafo').length,
    icon: 'CameraIcon'
  },
  {
    id: 'videographer',
    name: 'Cinegrafista',
    count: teamMembers.filter((m) => m.role === 'Cinegrafista').length,
    icon: 'VideoCameraIcon'
  },
  {
    id: 'editor',
    name: 'Editor',
    count: teamMembers.filter((m) => m.role.includes('Editor')).length,
    icon: 'FilmIcon'
  },
  {
    id: 'designer',
    name: 'Designer',
    count: teamMembers.filter((m) => m.role === 'Designer Gráfico').length,
    icon: 'PaintBrushIcon'
  }];


  const stats: Stat[] = [
  {
    label: 'Total de Membros',
    value: teamMembers.length,
    icon: 'UsersIcon',
    trend: { value: 12, isPositive: true }
  },
  {
    label: 'Projetos Ativos',
    value: teamMembers.reduce((sum, m) => sum + m.currentProjects, 0),
    icon: 'FolderIcon',
    trend: { value: 8, isPositive: true }
  },
  {
    label: 'Tarefas Concluídas',
    value: teamMembers.reduce((sum, m) => sum + m.completedTasks, 0),
    icon: 'CheckCircleIcon',
    trend: { value: 15, isPositive: true }
  },
  {
    label: 'Disponibilidade Média',
    value: `${Math.round(teamMembers.reduce((sum, m) => sum + m.availability, 0) / teamMembers.length)}%`,
    icon: 'ClockIcon',
    trend: { value: 5, isPositive: false }
  }];


  const activities: Activity[] = [
  {
    id: 1,
    user: {
      name: 'Ana Silva',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_152eed935-1763301844909.png",
      alt: 'Mulher profissional com cabelo castanho longo sorrindo em ambiente de escritório moderno'
    },
    action: 'concluiu a tarefa',
    target: 'Edição Final - Projeto XYZ',
    timestamp: 'Há 15 minutos',
    type: 'task'
  },
  {
    id: 2,
    user: {
      name: 'Carlos Mendes',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10a1046ff-1763293865191.png",
      alt: 'Homem profissional com barba curta e camisa azul em estúdio fotográfico'
    },
    action: 'foi atribuído ao projeto',
    target: 'Campanha Verão 2026',
    timestamp: 'Há 1 hora',
    type: 'project'
  },
  {
    id: 3,
    user: {
      name: 'Mariana Costa',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19bbcf4e1-1766801682710.png",
      alt: 'Mulher criativa com óculos e cabelo preto em sala de edição com monitores'
    },
    action: 'comentou em',
    target: 'Revisão de Cor - Cliente ABC',
    timestamp: 'Há 2 horas',
    type: 'comment'
  },
  {
    id: 4,
    user: {
      name: 'Pedro Oliveira',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_112193a91-1763294779964.png",
      alt: 'Homem executivo com terno cinza e gravata em escritório corporativo'
    },
    action: 'aprovou',
    target: 'Orçamento Q1 2026',
    timestamp: 'Há 3 horas',
    type: 'approval'
  }];


  const performanceData: PerformanceData[] = [
  { name: 'Ana Silva', tarefasConcluidas: 127, tarefasAtrasadas: 3, horasTrabalhadas: 168 },
  { name: 'Carlos Mendes', tarefasConcluidas: 89, tarefasAtrasadas: 5, horasTrabalhadas: 152 },
  { name: 'Mariana Costa', tarefasConcluidas: 156, tarefasAtrasadas: 2, horasTrabalhadas: 175 },
  { name: 'Roberto Lima', tarefasConcluidas: 73, tarefasAtrasadas: 8, horasTrabalhadas: 140 },
  { name: 'Juliana Santos', tarefasConcluidas: 201, tarefasAtrasadas: 1, horasTrabalhadas: 180 }];


  const filteredMembers = teamMembers.filter((member) => {
    const matchesRole =
    activeRole === 'all' ||
    activeRole === 'admin' && member.role === 'Administrador' ||
    activeRole === 'manager' && member.role === 'Gerente de Projeto' ||
    activeRole === 'photographer' && member.role === 'Fotógrafo' ||
    activeRole === 'videographer' && member.role === 'Cinegrafista' ||
    activeRole === 'editor' && member.role.includes('Editor') ||
    activeRole === 'designer' && member.role === 'Designer Gráfico';

    const matchesSearch =
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const handleViewProfile = (id: number) => {
    console.log('Ver perfil do membro:', id);
  };

  const handleAssignTask = (id: number) => {
    console.log('Atribuir tarefa ao membro:', id);
  };

  const handleToggleChecklistItem = (id: number) => {
    setChecklistItems(
      checklistItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddTeamMember = (newMember: any) => {
    const member: TeamMember = {
      id: teamMembers.length + 1,
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      phone: newMember.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      alt: `Foto de perfil profissional de ${newMember.name}`,
      status: 'active',
      skills: newMember.skills,
      currentProjects: 0,
      completedTasks: 0,
      availability: 100
    };
    setTeamMembers([...teamMembers, member]);
  };

  return (
    <div className="space-y-6">
      <TeamStats stats={stats} />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex-1 w-full lg:w-auto">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              variant="outline"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Buscar por nome, e-mail ou função..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />

          </div>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full lg:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2">

          <Icon name="PlusIcon" size={20} variant="outline" />
          <span>Adicionar Membro</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <RoleFilter roles={roles} activeRole={activeRole} onRoleChange={setActiveRole} />
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMembers.map((member) =>
            <TeamMemberCard
              key={member.id}
              member={member}
              onViewProfile={handleViewProfile}
              onAssignTask={handleAssignTask} />

            )}
          </div>

          {filteredMembers.length === 0 &&
          <div className="bg-card rounded-lg border border-border p-12 text-center">
              <Icon
              name="UserGroupIcon"
              size={48}
              variant="outline"
              className="text-muted-foreground mx-auto mb-4" />

              <h3 className="text-lg font-headline font-semibold text-foreground mb-2">
                Nenhum membro encontrado
              </h3>
              <p className="text-sm text-muted-foreground">
                Tente ajustar os filtros ou adicionar novos membros à equipe.
              </p>
            </div>
          }
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OnboardingChecklist items={checklistItems} onToggleItem={handleToggleChecklistItem} />
        <TeamActivityFeed activities={activities} />
      </div>

      <PerformanceMetrics data={performanceData} />

      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTeamMember} />

    </div>);

};

export default TeamManagementInteractive;