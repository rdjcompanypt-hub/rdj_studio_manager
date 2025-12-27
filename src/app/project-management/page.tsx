import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProjectManagementInteractive from './components/ProjectManagementInteractive';

export const metadata: Metadata = {
  title: 'Gerenciamento de Projetos - RDJ Studio Manager',
  description:
    'Gerencie todos os seus projetos audiovisuais com workflows baseados em estados, visualização de linha do tempo, gráficos de Gantt e quadros Kanban para máxima eficiência de produção.',
};

export default function ProjectManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProjectManagementInteractive />
    </div>
  );
}