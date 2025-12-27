import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import FinancialInteractive from './components/FinancialInteractive';

export const metadata: Metadata = {
  title: 'Controle Financeiro - RDJ Studio Manager',
  description: 'Gerencie orçamentos, despesas, faturas e acompanhe a lucratividade dos projetos audiovisuais com análises financeiras detalhadas e fluxo de caixa.',
};

export default function FinancialTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full px-4 lg:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-foreground mb-2">
            Controle Financeiro
          </h1>
          <p className="text-muted-foreground">
            Gerencie orçamentos, despesas e acompanhe a lucratividade dos seus projetos
          </p>
        </div>

        <FinancialInteractive />
      </main>
    </div>
  );
}