import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CalendarInteractive from './components/CalendarInteractive';

export const metadata: Metadata = {
  title: 'Calendário - RDJ Studio Manager',
  description: 'Sistema unificado de agendamento para gravações, prazos, reuniões com clientes e reserva de equipamentos para produção audiovisual.',
};

export default function CalendarInterfacePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CalendarInteractive />
    </main>
  );
}