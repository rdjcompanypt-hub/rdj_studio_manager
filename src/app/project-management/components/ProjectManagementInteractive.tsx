'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import ProjectStats from './ProjectStats';
import ProjectTimeline from './ProjectTimeline';
import GanttChart from './GanttChart';
import KanbanBoard from './KanbanBoard';
import ProjectDetailsModal from './ProjectDetailsModal';

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

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
}

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'task' | 'review' | 'delivery';
  status: 'completed' | 'in-progress' | 'pending';
}

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: number[];
  assignee: string;
}

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

const ProjectManagementInteractive: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'timeline' | 'gantt' | 'kanban'>('grid');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activePriority, setActivePriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Campanha Institucional Banco Nacional',
    client: 'Banco Nacional S.A.',
    status: 'Editing',
    progress: 65,
    dueDate: '15/01/2026',
    startDate: '01/12/2025',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f8200080-1764810668855.png",
    thumbnailAlt: 'Professional video production setup with camera equipment and lighting in modern studio',
    team: [
    {
      id: 1,
      name: 'Carlos Silva',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
      alt: 'Professional headshot of Hispanic man with short black hair in navy suit',
      role: 'Diretor de Fotografia'
    },
    {
      id: 2,
      name: 'Ana Santos',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1438c87e8-1763295755784.png",
      alt: 'Professional portrait of Asian woman with long dark hair in white blouse',
      role: 'Editora'
    },
    {
      id: 3,
      name: 'Roberto Lima',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_102bfeb28-1763292242987.png",
      alt: 'Business portrait of African American man with beard in gray blazer',
      role: 'Produtor'
    }],

    priority: 'high',
    budget: 150000,
    spent: 97500,
    description:
    'Produção de vídeo institucional de 3 minutos para campanha de fim de ano do Banco Nacional. Inclui captação em 4K, edição avançada, motion graphics e trilha sonora original.'
  },
  {
    id: 2,
    title: 'Documentário Sustentabilidade EcoTech',
    client: 'EcoTech Soluções',
    status: 'Capture',
    progress: 40,
    dueDate: '28/01/2026',
    startDate: '10/12/2025',
    thumbnail: "https://images.unsplash.com/photo-1600200546752-0733fe812a04",
    thumbnailAlt: 'Documentary filmmaker with professional camera filming nature scene in forest',
    team: [
    {
      id: 4,
      name: 'Marina Costa',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e302a8d6-1764682088910.png",
      alt: 'Portrait of young woman with curly brown hair in casual blue shirt',
      role: 'Diretora'
    },
    {
      id: 5,
      name: 'Pedro Oliveira',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2d80967-1763294891607.png",
      alt: 'Professional photo of man with glasses and short hair in business attire',
      role: 'Cinegrafista'
    }],

    priority: 'medium',
    budget: 200000,
    spent: 80000,
    description:
    'Documentário de 20 minutos sobre práticas sustentáveis na indústria tecnológica. Captação em múltiplas locações, entrevistas com especialistas e drone footage.'
  },
  {
    id: 3,
    title: 'Vídeo Produto Linha Premium Cosméticos',
    client: 'Beleza Natural Ltda.',
    status: 'Review',
    progress: 90,
    dueDate: '05/01/2026',
    startDate: '15/11/2025',
    thumbnail: "https://images.unsplash.com/photo-1580680639238-a2c842c18a26",
    thumbnailAlt: 'Luxury cosmetic product photography setup with elegant lighting and white background',
    team: [
    {
      id: 6,
      name: 'Julia Ferreira',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179d264c2-1763294988724.png",
      alt: 'Headshot of blonde woman with professional makeup in black top',
      role: 'Fotógrafa'
    },
    {
      id: 7,
      name: 'Lucas Martins',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f3021db-1763299854851.png",
      alt: 'Portrait of young man with short dark hair in casual gray shirt',
      role: 'Editor'
    }],

    priority: 'high',
    budget: 80000,
    spent: 72000,
    description:
    'Vídeo comercial de 60 segundos para lançamento de linha premium de cosméticos. Produção em estúdio com iluminação especial e pós-produção avançada.'
  },
  {
    id: 4,
    title: 'Cobertura Evento Tech Summit 2026',
    client: 'Tech Summit Brasil',
    status: 'Planning',
    progress: 15,
    dueDate: '20/02/2026',
    startDate: '05/01/2026',
    thumbnail: "https://images.unsplash.com/photo-1625638877505-b7a3fc705b67",
    thumbnailAlt: 'Large technology conference hall with stage lighting and audience seating',
    team: [
    {
      id: 8,
      name: 'Rafael Souza',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3b6fd0a-1763294621577.png",
      alt: 'Business portrait of man with short hair and beard in dark suit',
      role: 'Coordenador'
    },
    {
      id: 9,
      name: 'Camila Rocha',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_166ba33cc-1763293362153.png",
      alt: 'Professional photo of woman with long dark hair in white blazer',
      role: 'Produtora'
    }],

    priority: 'medium',
    budget: 300000,
    spent: 45000,
    description:
    'Cobertura completa de evento de tecnologia de 3 dias. Inclui transmissão ao vivo, entrevistas, highlights diários e vídeo resumo final.'
  },
  {
    id: 5,
    title: 'Série Web Inovação Startups',
    client: 'StartHub Aceleradora',
    status: 'Delivered',
    progress: 100,
    dueDate: '20/12/2025',
    startDate: '01/10/2025',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1e0a94e10-1766514923495.png",
    thumbnailAlt: 'Modern startup office with creative team working on innovative project',
    team: [
    {
      id: 10,
      name: 'Fernanda Alves',
      avatar: "https://images.unsplash.com/photo-1722835617351-e178ca6924b8",
      alt: 'Portrait of woman with red hair and glasses in casual attire',
      role: 'Diretora'
    },
    {
      id: 11,
      name: 'Thiago Mendes',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11ba4e980-1763293085562.png",
      alt: 'Professional headshot of man with short hair in blue shirt',
      role: 'Editor'
    }],

    priority: 'low',
    budget: 180000,
    spent: 175000,
    description:
    'Série de 6 episódios sobre histórias de sucesso de startups brasileiras. Cada episódio com 15 minutos, incluindo entrevistas e b-roll.'
  },
  {
    id: 6,
    title: 'Vídeo Treinamento Corporativo',
    client: 'Corporação Global Brasil',
    status: 'Editing',
    progress: 55,
    dueDate: '10/01/2026',
    startDate: '20/11/2025',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_142574221-1764639474930.png",
    thumbnailAlt: 'Corporate training video production with professional presenter in modern office',
    team: [
    {
      id: 12,
      name: 'Gustavo Pires',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2d80967-1763294891607.png",
      alt: 'Business photo of man with short dark hair in formal suit',
      role: 'Produtor'
    }],

    priority: 'medium',
    budget: 95000,
    spent: 52250,
    description:
    'Série de vídeos de treinamento corporativo sobre novos processos internos. Total de 10 módulos com 5 minutos cada.'
  }];


  const mockStats: Stat[] = [
  {
    label: 'Projetos Ativos',
    value: 12,
    icon: 'FolderIcon',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    label: 'Em Edição',
    value: 5,
    icon: 'FilmIcon',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    label: 'Entregues Este Mês',
    value: 8,
    icon: 'CheckCircleIcon',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    label: 'Taxa de Conclusão',
    value: '94%',
    icon: 'ChartBarIcon',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }];


  const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Kickoff Meeting',
    description: 'Reunião inicial com cliente para alinhamento de expectativas',
    date: '01/12/2025',
    type: 'milestone',
    status: 'completed'
  },
  {
    id: 2,
    title: 'Pré-produção Completa',
    description: 'Roteiro aprovado, locações definidas e equipe escalada',
    date: '10/12/2025',
    type: 'task',
    status: 'completed'
  },
  {
    id: 3,
    title: 'Captação Dia 1',
    description: 'Filmagem em estúdio com entrevistas principais',
    date: '15/12/2025',
    type: 'task',
    status: 'in-progress'
  },
  {
    id: 4,
    title: 'Primeira Revisão',
    description: 'Apresentação do primeiro corte para aprovação do cliente',
    date: '05/01/2026',
    type: 'review',
    status: 'pending'
  },
  {
    id: 5,
    title: 'Entrega Final',
    description: 'Entrega de todos os arquivos finais e materiais complementares',
    date: '15/01/2026',
    type: 'delivery',
    status: 'pending'
  }];


  const mockGanttTasks: Task[] = [
  {
    id: 1,
    name: 'Pré-produção',
    startDate: '01/12/2025',
    endDate: '10/12/2025',
    progress: 100,
    dependencies: [],
    assignee: 'Roberto Lima'
  },
  {
    id: 2,
    name: 'Captação',
    startDate: '11/12/2025',
    endDate: '20/12/2025',
    progress: 80,
    dependencies: [1],
    assignee: 'Carlos Silva'
  },
  {
    id: 3,
    name: 'Edição',
    startDate: '21/12/2025',
    endDate: '10/01/2026',
    progress: 45,
    dependencies: [2],
    assignee: 'Ana Santos'
  },
  {
    id: 4,
    name: 'Revisão Cliente',
    startDate: '11/01/2026',
    endDate: '13/01/2026',
    progress: 0,
    dependencies: [3],
    assignee: 'Roberto Lima'
  },
  {
    id: 5,
    name: 'Finalização',
    startDate: '14/01/2026',
    endDate: '15/01/2026',
    progress: 0,
    dependencies: [4],
    assignee: 'Ana Santos'
  }];


  const mockKanbanColumns: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'A Fazer',
    tasks: [
    {
      id: 1,
      title: 'Criar roteiro para vídeo institucional',
      description: 'Desenvolver roteiro completo com narrativa e cenas',
      assignee: {
        name: 'Marina Costa',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e302a8d6-1764682088910.png",
        alt: 'Portrait of young woman with curly brown hair in casual blue shirt'
      },
      priority: 'high',
      dueDate: '02/01/2026'
    },
    {
      id: 2,
      title: 'Agendar locações para captação',
      description: 'Confirmar disponibilidade de locações externas',
      assignee: {
        name: 'Pedro Oliveira',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a2d80967-1763294891607.png",
        alt: 'Professional photo of man with glasses and short hair in business attire'
      },
      priority: 'medium',
      dueDate: '03/01/2026'
    }]

  },
  {
    id: 'in-progress',
    title: 'Em Progresso',
    tasks: [
    {
      id: 3,
      title: 'Edição do primeiro corte',
      description: 'Montagem inicial com todas as cenas captadas',
      assignee: {
        name: 'Ana Santos',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1438c87e8-1763295755784.png",
        alt: 'Professional portrait of Asian woman with long dark hair in white blouse'
      },
      priority: 'high',
      dueDate: '05/01/2026'
    },
    {
      id: 4,
      title: 'Color grading das cenas principais',
      description: 'Correção de cor e gradação das cenas principais',
      assignee: {
        name: 'Lucas Martins',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18f3021db-1763299854851.png",
        alt: 'Portrait of young man with short dark hair in casual gray shirt'
      },
      priority: 'medium',
      dueDate: '06/01/2026'
    }]

  },
  {
    id: 'review',
    title: 'Em Revisão',
    tasks: [
    {
      id: 5,
      title: 'Aprovação do cliente - Vídeo produto',
      description: 'Aguardando feedback do cliente sobre o corte final',
      assignee: {
        name: 'Julia Ferreira',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_179d264c2-1763294988724.png",
        alt: 'Headshot of blonde woman with professional makeup in black top'
      },
      priority: 'high',
      dueDate: '04/01/2026'
    }]

  },
  {
    id: 'done',
    title: 'Concluído',
    tasks: [
    {
      id: 6,
      title: 'Captação externa finalizada',
      description: 'Todas as cenas externas foram captadas com sucesso',
      assignee: {
        name: 'Carlos Silva',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_143b978a3-1763294952544.png",
        alt: 'Professional headshot of Hispanic man with short black hair in navy suit'
      },
      priority: 'low',
      dueDate: '20/12/2025'
    },
    {
      id: 7,
      title: 'Trilha sonora aprovada',
      description: 'Composição original aprovada pelo cliente',
      assignee: {
        name: 'Thiago Mendes',
        avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11ba4e980-1763293085562.png",
        alt: 'Professional headshot of man with short hair in blue shirt'
      },
      priority: 'low',
      dueDate: '18/12/2025'
    }]

  }];


  const filteredProjects = mockProjects.filter((project) => {
    const matchesStatus = activeStatus === 'all' || project.status === activeStatus;
    const matchesPriority = activePriority === 'all' || project.priority === activePriority;
    const matchesSearch =
    searchQuery === '' ||
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleViewDetails = (projectId: number) => {
    const project = mockProjects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleTaskMove = (taskId: number, fromColumn: string, toColumn: string) => {
    console.log(`Moving task ${taskId} from ${fromColumn} to ${toColumn}`);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) =>
              <div key={i} className="h-24 bg-muted rounded" />
              )}
            </div>
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Gerenciamento de Projetos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus projetos audiovisuais em um único lugar
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <ProjectStats stats={mockStats} />
        </div>

        {/* View Switcher */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeView === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
              }>

              <Icon name="Squares2X2Icon" size={20} variant="outline" />
              Grade
            </button>
            <button
              onClick={() => setActiveView('timeline')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeView === 'timeline' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
              }>

              <Icon name="ClockIcon" size={20} variant="outline" />
              Linha do Tempo
            </button>
            <button
              onClick={() => setActiveView('gantt')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeView === 'gantt' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
              }>

              <Icon name="ChartBarIcon" size={20} variant="outline" />
              Gantt
            </button>
            <button
              onClick={() => setActiveView('kanban')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeView === 'kanban' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`
              }>

              <Icon name="ViewColumnsIcon" size={20} variant="outline" />
              Kanban
            </button>
          </div>

          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">
            <Icon name="PlusIcon" size={20} variant="outline" />
            Novo Projeto
          </button>
        </div>

        {/* Content */}
        {activeView === 'grid' &&
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <ProjectFilters
              activeStatus={activeStatus}
              activePriority={activePriority}
              searchQuery={searchQuery}
              onStatusChange={setActiveStatus}
              onPriorityChange={setActivePriority}
              onSearchChange={setSearchQuery} />

            </div>

            {/* Projects Grid */}
            <div className="lg:col-span-3">
              {filteredProjects.length === 0 ?
            <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
                  <Icon
                name="FolderIcon"
                size={48}
                variant="outline"
                className="mx-auto text-muted-foreground mb-4" />

                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum projeto encontrado
                  </h3>
                  <p className="text-muted-foreground">
                    Tente ajustar os filtros ou criar um novo projeto
                  </p>
                </div> :

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects.map((project) =>
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails} />

              )}
                </div>
            }
            </div>
          </div>
        }

        {activeView === 'timeline' && <ProjectTimeline events={mockTimelineEvents} />}

        {activeView === 'gantt' && <GanttChart tasks={mockGanttTasks} />}

        {activeView === 'kanban' &&
        <KanbanBoard columns={mockKanbanColumns} onTaskMove={handleTaskMove} />
        }

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)} />

      </div>
    </div>);

};

export default ProjectManagementInteractive;