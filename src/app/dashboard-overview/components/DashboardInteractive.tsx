'use client';

import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import ActivityItem from './ActivityItem';
import StatCard from './StatCard';
import QuickActionButton from './QuickActionButton';
import UpcomingDeadlineItem from './UpcomingDeadlineItem';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';

interface Project {
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
}

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    avatarAlt: string;
  };
  action: string;
  project: string;
  timestamp: string;
  type: 'upload' | 'comment' | 'status' | 'approval' | 'assignment';
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}

interface Deadline {
  id: string;
  project: string;
  task: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  daysLeft: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    setNotifications(mockNotifications);
  }, []);

  const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Campanha Verão 2025',
    client: 'Moda Brasil',
    status: 'Editing',
    progress: 65,
    dueDate: '15/01/2025',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_12e1ded0b-1766609822778.png",
    thumbnailAlt: 'Professional fashion photoshoot with model in summer clothing against white studio background',
    team: [
    {
      name: 'Ana Silva',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
      avatarAlt: 'Professional headshot of woman with long brown hair smiling at camera'
    },
    {
      name: 'Carlos Santos',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_172fcd53a-1763299680950.png",
      avatarAlt: 'Professional headshot of man with short dark hair in business attire'
    },
    {
      name: 'Marina Costa',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f14b269-1763296498382.png",
      avatarAlt: 'Professional headshot of woman with blonde hair in casual attire'
    }],

    priority: 'high'
  },
  {
    id: '2',
    title: 'Vídeo Institucional Tech Corp',
    client: 'Tech Corporation',
    status: 'Capture',
    progress: 30,
    dueDate: '20/01/2025',
    thumbnail: "https://images.unsplash.com/photo-1558918152-e03aa713d3fd",
    thumbnailAlt: 'Corporate video production setup with professional camera equipment and lighting in modern office',
    team: [
    {
      name: 'Pedro Lima',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b964ed2f-1763293830172.png",
      avatarAlt: 'Professional headshot of man with glasses and beard in casual shirt'
    },
    {
      name: 'Julia Mendes',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_185da20dd-1763293742644.png",
      avatarAlt: 'Professional headshot of woman with curly hair smiling warmly'
    }],

    priority: 'medium'
  },
  {
    id: '3',
    title: 'Ensaio Fotográfico Produto',
    client: 'Cosméticos Naturais',
    status: 'Review',
    progress: 90,
    dueDate: '10/01/2025',
    thumbnail: "https://images.unsplash.com/photo-1615332250321-54c23d01c939",
    thumbnailAlt: 'Product photography of natural cosmetics with botanical elements on white marble surface',
    team: [
    {
      name: 'Roberto Alves',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17fc21307-1763293959943.png",
      avatarAlt: 'Professional headshot of man with short hair in blue shirt outdoors'
    }],

    priority: 'high'
  },
  {
    id: '4',
    title: 'Documentário Sustentabilidade',
    client: 'ONG Verde Futuro',
    status: 'Planning',
    progress: 15,
    dueDate: '30/01/2025',
    thumbnail: "https://images.unsplash.com/photo-1643651473537-6c7c70c70444",
    thumbnailAlt: 'Documentary filming setup in natural forest environment with camera crew',
    team: [
    {
      name: 'Fernanda Rocha',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1da6df2fa-1763297597959.png",
      avatarAlt: 'Professional headshot of woman with short dark hair in professional attire'
    },
    {
      name: 'Lucas Ferreira',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_191c0a6ac-1763295815369.png",
      avatarAlt: 'Professional headshot of man with beard in casual outdoor setting'
    },
    {
      name: 'Beatriz Souza',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1bb5d2cb2-1763294526193.png",
      avatarAlt: 'Professional headshot of woman with long hair smiling brightly'
    }],

    priority: 'low'
  }];


  const mockActivities: Activity[] = [
  {
    id: '1',
    user: {
      name: 'Ana Silva',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
      avatarAlt: 'Professional headshot of woman with long brown hair smiling at camera'
    },
    action: 'enviou novos arquivos para',
    project: 'Campanha Verão 2025',
    timestamp: 'há 15 minutos',
    type: 'upload'
  },
  {
    id: '2',
    user: {
      name: 'Carlos Santos',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_172fcd53a-1763299680950.png",
      avatarAlt: 'Professional headshot of man with short dark hair in business attire'
    },
    action: 'comentou em',
    project: 'Vídeo Institucional Tech Corp',
    timestamp: 'há 1 hora',
    type: 'comment'
  },
  {
    id: '3',
    user: {
      name: 'Roberto Alves',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17fc21307-1763293959943.png",
      avatarAlt: 'Professional headshot of man with short hair in blue shirt outdoors'
    },
    action: 'mudou o status de',
    project: 'Ensaio Fotográfico Produto',
    timestamp: 'há 2 horas',
    type: 'status'
  },
  {
    id: '4',
    user: {
      name: 'Marina Costa',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f14b269-1763296498382.png",
      avatarAlt: 'Professional headshot of woman with blonde hair in casual attire'
    },
    action: 'aprovou a entrega de',
    project: 'Campanha Verão 2025',
    timestamp: 'há 3 horas',
    type: 'approval'
  },
  {
    id: '5',
    user: {
      name: 'Pedro Lima',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b964ed2f-1763293830172.png",
      avatarAlt: 'Professional headshot of man with glasses and beard in casual shirt'
    },
    action: 'foi atribuído a',
    project: 'Documentário Sustentabilidade',
    timestamp: 'há 4 horas',
    type: 'assignment'
  }];


  const mockStats: Stat[] = [
  {
    label: 'Projetos Ativos',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: 'FolderIcon',
    color: 'bg-blue-600'
  },
  {
    label: 'Tarefas Pendentes',
    value: '28',
    change: '-5',
    trend: 'down',
    icon: 'ClipboardDocumentListIcon',
    color: 'bg-purple-600'
  },
  {
    label: 'Entregas Esta Semana',
    value: '5',
    change: '+2',
    trend: 'up',
    icon: 'CheckCircleIcon',
    color: 'bg-green-600'
  },
  {
    label: 'Horas Trabalhadas',
    value: '156',
    change: '+12',
    trend: 'up',
    icon: 'ClockIcon',
    color: 'bg-orange-600'
  }];


  const mockDeadlines: Deadline[] = [
  {
    id: '3',
    project: 'Ensaio Fotográfico Produto',
    task: 'Revisão Final',
    dueDate: '10/01/2025',
    priority: 'high',
    daysLeft: 1
  },
  {
    id: '1',
    project: 'Campanha Verão 2025',
    task: 'Edição de Vídeo',
    dueDate: '15/01/2025',
    priority: 'high',
    daysLeft: 6
  },
  {
    id: '2',
    project: 'Vídeo Institucional Tech Corp',
    task: 'Captação de Imagens',
    dueDate: '20/01/2025',
    priority: 'medium',
    daysLeft: 11
  },
  {
    id: '4',
    project: 'Documentário Sustentabilidade',
    task: 'Planejamento de Roteiro',
    dueDate: '30/01/2025',
    priority: 'low',
    daysLeft: 21
  }];


  const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo comentário',
    message: 'Carlos Santos comentou no projeto Vídeo Institucional Tech Corp',
    timestamp: 'há 15 minutos',
    read: false,
    type: 'info'
  },
  {
    id: '2',
    title: 'Prazo próximo',
    message: 'O projeto Ensaio Fotográfico Produto vence amanhã',
    timestamp: 'há 1 hora',
    read: false,
    type: 'warning'
  },
  {
    id: '3',
    title: 'Aprovação concluída',
    message: 'Marina Costa aprovou a entrega da Campanha Verão 2025',
    timestamp: 'há 3 horas',
    read: true,
    type: 'success'
  }];


  const quickActions = [
  {
    label: 'Novo Projeto',
    icon: 'PlusCircleIcon',
    color: 'bg-gradient-to-br from-blue-600 to-blue-700',
    onClick: () => {
      if (isHydrated) {
        alert('Criar novo projeto');
      }
    }
  },
  {
    label: 'Upload de Arquivo',
    icon: 'ArrowUpTrayIcon',
    color: 'bg-gradient-to-br from-purple-600 to-purple-700',
    onClick: () => {
      if (isHydrated) {
        alert('Upload de arquivo');
      }
    }
  },
  {
    label: 'Agendar Reunião',
    icon: 'CalendarIcon',
    color: 'bg-gradient-to-br from-green-600 to-green-700',
    onClick: () => {
      if (isHydrated) {
        alert('Agendar reunião');
      }
    }
  },
  {
    label: 'Convidar Membro',
    icon: 'UserPlusIcon',
    color: 'bg-gradient-to-br from-orange-600 to-orange-700',
    onClick: () => {
      if (isHydrated) {
        alert('Convidar membro da equipe');
      }
    }
  }];


  const handleSearch = (query: string) => {
    if (isHydrated) {
      console.log('Searching for:', query);
    }
  };

  const handleMarkAsRead = (id: string) => {
    if (isHydrated) {
      setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (isHydrated) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  };

  const filteredProjects = isHydrated ?
  selectedFilter === 'all' ?
  mockProjects :
  mockProjects.filter((p) => p.status === selectedFilter) :
  mockProjects;

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded-lg w-1/3" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-32 bg-muted rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 lg:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-2">
              Painel de Controle
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está o resumo dos seus projetos.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar onSearch={handleSearch} />
            <NotificationBell
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead} />

          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) =>
          <StatCard key={index} stat={stat} />
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-headline font-semibold text-foreground mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) =>
            <QuickActionButton key={index} action={action} />
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-headline font-semibold text-foreground">
                Projetos Ativos
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                  }>

                  Todos
                </button>
                <button
                  onClick={() => setSelectedFilter('Editing')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'Editing' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                  }>

                  Em Edição
                </button>
                <button
                  onClick={() => setSelectedFilter('Review')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilter === 'Review' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
                  }>

                  Em Revisão
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) =>
              <ProjectCard key={project.id} project={project} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Activity Feed */}
            <div className="bg-card rounded-lg shadow-card p-6">
              <h2 className="text-xl font-headline font-semibold text-foreground mb-4">
                Atividades Recentes
              </h2>
              <div className="space-y-2">
                {mockActivities.map((activity) =>
                <ActivityItem key={activity.id} activity={activity} />
                )}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-card rounded-lg shadow-card p-6">
              <h2 className="text-xl font-headline font-semibold text-foreground mb-4">
                Próximos Prazos
              </h2>
              <div className="space-y-2">
                {mockDeadlines.map((deadline) =>
                <UpcomingDeadlineItem key={deadline.id} deadline={deadline} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default DashboardInteractive;