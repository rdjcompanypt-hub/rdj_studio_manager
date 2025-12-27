import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import TeamManagementInteractive from './components/TeamManagementInteractive';

export const metadata: Metadata = {
  title: 'Gestão de Equipe - RDJ Studio Manager',
  description: 'Gerencie sua equipe de produção audiovisual com controle de funções, atribuição de tarefas, monitoramento de desempenho e integração de novos membros.',
};

export default function TeamManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-2">
            Gestão de Equipe
          </h1>
          <p className="text-muted-foreground">
            Coordene sua equipe, atribua tarefas e monitore o desempenho em tempo real
          </p>
        </div>

        <TeamManagementInteractive />
      </main>
    </div>
  );
}