import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Painel de Controle - RDJ Studio Manager',
  description: 'Visão geral em tempo real dos projetos ativos, atividades da equipe e métricas de desempenho com linhas do tempo visuais de projetos para gerenciamento de produção audiovisual.',
};

export default function DashboardOverviewPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <DashboardInteractive />
    </main>
  );
}