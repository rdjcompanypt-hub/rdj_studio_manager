import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SettingsInteractive from './components/SettingsInteractive';

export const metadata: Metadata = {
  title: 'Configurações - RDJ Studio Manager',
  description: 'Configure preferências do sistema, notificações, segurança, integrações e gerencie chaves de API para personalizar sua experiência no RDJ Studio Manager.',
};

export default function SettingsPanelPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SettingsInteractive />
    </div>
  );
}