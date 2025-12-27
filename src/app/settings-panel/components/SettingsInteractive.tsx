'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import SettingsSection from './SettingsSection';
import SettingItem from './SettingItem';
import ToggleSwitch from './ToggleSwitch';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import ButtonPrimary from './ButtonPrimary';
import ApiKeyCard from './ApiKeyCard';

interface Settings {
  theme: string;
  language: string;
  currency: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
    teamActivity: boolean;
    clientMessages: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: string;
  };
  company: {
    name: string;
    website: string;
    logo: string;
  };
  integrations: {
    cloudStorage: string;
    accounting: string;
    calendar: string;
  };
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

const SettingsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    language: 'pt-BR',
    currency: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    notifications: {
      email: true,
      push: true,
      projectUpdates: true,
      teamActivity: false,
      clientMessages: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
    },
    company: {
      name: 'RDJ Studio',
      website: 'https://rdjstudio.com.br',
      logo: '',
    },
    integrations: {
      cloudStorage: 'google-drive',
      accounting: 'none',
      calendar: 'google-calendar',
    },
  });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'API Principal',
      key: 'rdj_live_4f8a9b2c1d3e5f6g7h8i9j0k1l2m3n4o',
      createdAt: '15/12/2025',
      lastUsed: '27/12/2025 às 14:32',
    },
    {
      id: '2',
      name: 'API de Desenvolvimento',
      key: 'rdj_test_9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k',
      createdAt: '10/12/2025',
      lastUsed: '26/12/2025 às 09:15',
    },
  ]);

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'Geral', icon: 'Cog6ToothIcon' },
    { id: 'notifications', label: 'Notificações', icon: 'BellIcon' },
    { id: 'security', label: 'Segurança', icon: 'ShieldCheckIcon' },
    { id: 'company', label: 'Empresa', icon: 'BuildingOfficeIcon' },
    { id: 'integrations', label: 'Integrações', icon: 'PuzzlePieceIcon' },
    { id: 'api', label: 'API', icon: 'CodeBracketIcon' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Escuro' },
    { value: 'auto', label: 'Automático' },
  ];

  const languageOptions = [
    { value: 'pt-BR', label: 'Português (Brasil)' },
    { value: 'en-US', label: 'English (US)' },
    { value: 'es-ES', label: 'Español' },
  ];

  const currencyOptions = [
    { value: 'BRL', label: 'R$ (Real Brasileiro)' },
    { value: 'USD', label: '$ (Dólar Americano)' },
    { value: 'EUR', label: '€ (Euro)' },
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/AAAA' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/AAAA' },
    { value: 'YYYY-MM-DD', label: 'AAAA-MM-DD' },
  ];

  const sessionTimeoutOptions = [
    { value: '15', label: '15 minutos' },
    { value: '30', label: '30 minutos' },
    { value: '60', label: '1 hora' },
    { value: '120', label: '2 horas' },
  ];

  const cloudStorageOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'google-drive', label: 'Google Drive' },
    { value: 'dropbox', label: 'Dropbox' },
    { value: 'onedrive', label: 'OneDrive' },
  ];

  const accountingOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'quickbooks', label: 'QuickBooks' },
    { value: 'xero', label: 'Xero' },
    { value: 'conta-azul', label: 'Conta Azul' },
  ];

  const calendarOptions = [
    { value: 'none', label: 'Nenhum' },
    { value: 'google-calendar', label: 'Google Calendar' },
    { value: 'outlook', label: 'Outlook Calendar' },
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleRevokeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const handleGenerateApiKey = () => {
    const newKey: ApiKey = {
      id: String(apiKeys.length + 1),
      name: `Nova API Key ${apiKeys.length + 1}`,
      key: `rdj_live_${Math.random().toString(36).substring(2, 34)}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      lastUsed: 'Nunca',
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as preferências do sistema e personalize sua experiência
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-border overflow-x-auto">
          <nav className="flex space-x-1 min-w-max" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                }`}
              >
                <Icon name={tab.icon as any} size={18} variant="outline" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <SettingsSection
              title="Configurações Gerais"
              description="Personalize a aparência e o comportamento do sistema"
              icon="Cog6ToothIcon"
            >
              <SettingItem
                label="Tema"
                description="Escolha entre tema claro, escuro ou automático"
              >
                <SelectInput
                  value={settings.theme}
                  options={themeOptions}
                  onChange={(value) => setSettings({ ...settings, theme: value })}
                />
              </SettingItem>

              <SettingItem
                label="Idioma"
                description="Selecione o idioma da interface"
              >
                <SelectInput
                  value={settings.language}
                  options={languageOptions}
                  onChange={(value) => setSettings({ ...settings, language: value })}
                />
              </SettingItem>

              <SettingItem
                label="Moeda"
                description="Formato de exibição de valores monetários"
              >
                <SelectInput
                  value={settings.currency}
                  options={currencyOptions}
                  onChange={(value) => setSettings({ ...settings, currency: value })}
                />
              </SettingItem>

              <SettingItem
                label="Formato de Data"
                description="Como as datas serão exibidas no sistema"
              >
                <SelectInput
                  value={settings.dateFormat}
                  options={dateFormatOptions}
                  onChange={(value) => setSettings({ ...settings, dateFormat: value })}
                />
              </SettingItem>
            </SettingsSection>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <SettingsSection
              title="Notificações"
              description="Configure como e quando você deseja receber notificações"
              icon="BellIcon"
            >
              <SettingItem
                label="Notificações por E-mail"
                description="Receba atualizações importantes por e-mail"
              >
                <ToggleSwitch
                  enabled={settings.notifications.email}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Notificações Push"
                description="Receba notificações em tempo real no navegador"
              >
                <ToggleSwitch
                  enabled={settings.notifications.push}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, push: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Atualizações de Projetos"
                description="Notificações sobre mudanças de status e marcos"
              >
                <ToggleSwitch
                  enabled={settings.notifications.projectUpdates}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, projectUpdates: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Atividade da Equipe"
                description="Notificações sobre ações dos membros da equipe"
              >
                <ToggleSwitch
                  enabled={settings.notifications.teamActivity}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, teamActivity: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Mensagens de Clientes"
                description="Notificações quando clientes enviarem mensagens"
              >
                <ToggleSwitch
                  enabled={settings.notifications.clientMessages}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, clientMessages: value },
                    })
                  }
                />
              </SettingItem>
            </SettingsSection>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <SettingsSection
              title="Segurança"
              description="Proteja sua conta e dados com configurações avançadas"
              icon="ShieldCheckIcon"
            >
              <SettingItem
                label="Autenticação de Dois Fatores"
                description="Adicione uma camada extra de segurança à sua conta"
              >
                <ToggleSwitch
                  enabled={settings.security.twoFactorAuth}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, twoFactorAuth: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Tempo Limite de Sessão"
                description="Desconectar automaticamente após inatividade"
              >
                <SelectInput
                  value={settings.security.sessionTimeout}
                  options={sessionTimeoutOptions}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: value },
                    })
                  }
                />
              </SettingItem>

              <div className="pt-4 border-t border-border">
                <ButtonPrimary
                  onClick={() => {}}
                  icon="KeyIcon"
                  variant="secondary"
                >
                  Alterar Senha
                </ButtonPrimary>
              </div>
            </SettingsSection>
          )}

          {/* Company */}
          {activeTab === 'company' && (
            <SettingsSection
              title="Informações da Empresa"
              description="Configure os dados da sua empresa no sistema"
              icon="BuildingOfficeIcon"
            >
              <SettingItem
                label="Nome da Empresa"
                description="Nome oficial da sua empresa"
              >
                <TextInput
                  value={settings.company.name}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, name: value },
                    })
                  }
                  placeholder="Nome da empresa"
                />
              </SettingItem>

              <SettingItem
                label="Website"
                description="URL do site da empresa"
              >
                <TextInput
                  value={settings.company.website}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      company: { ...settings.company, website: value },
                    })
                  }
                  type="url"
                  placeholder="https://exemplo.com.br"
                />
              </SettingItem>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Logo da Empresa</p>
                    <p className="text-xs text-muted-foreground">
                      Imagem que aparecerá no portal do cliente
                    </p>
                  </div>
                  <ButtonPrimary
                    onClick={() => {}}
                    icon="ArrowUpTrayIcon"
                    variant="secondary"
                  >
                    Fazer Upload
                  </ButtonPrimary>
                </div>
              </div>
            </SettingsSection>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <SettingsSection
              title="Integrações"
              description="Conecte o RDJ Studio com suas ferramentas favoritas"
              icon="PuzzlePieceIcon"
            >
              <SettingItem
                label="Armazenamento em Nuvem"
                description="Sincronize arquivos com serviços de nuvem"
              >
                <SelectInput
                  value={settings.integrations.cloudStorage}
                  options={cloudStorageOptions}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      integrations: { ...settings.integrations, cloudStorage: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Software de Contabilidade"
                description="Integre com seu sistema de contabilidade"
              >
                <SelectInput
                  value={settings.integrations.accounting}
                  options={accountingOptions}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      integrations: { ...settings.integrations, accounting: value },
                    })
                  }
                />
              </SettingItem>

              <SettingItem
                label="Calendário"
                description="Sincronize eventos com seu calendário"
              >
                <SelectInput
                  value={settings.integrations.calendar}
                  options={calendarOptions}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      integrations: { ...settings.integrations, calendar: value },
                    })
                  }
                />
              </SettingItem>

              <div className="pt-4 border-t border-border">
                <div className="bg-muted/50 rounded-lg p-4 flex items-start space-x-3">
                  <Icon name="InformationCircleIcon" size={20} variant="outline" className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Conformidade com LGPD
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Todas as integrações seguem as diretrizes da Lei Geral de Proteção de Dados (LGPD) para garantir a segurança e privacidade dos seus dados.
                    </p>
                  </div>
                </div>
              </div>
            </SettingsSection>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <SettingsSection
              title="Gerenciamento de API"
              description="Crie e gerencie chaves de API para integrações personalizadas"
              icon="CodeBracketIcon"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {apiKeys.length} {apiKeys.length === 1 ? 'chave ativa' : 'chaves ativas'}
                  </p>
                  <ButtonPrimary
                    onClick={handleGenerateApiKey}
                    icon="PlusIcon"
                    variant="primary"
                  >
                    Gerar Nova Chave
                  </ButtonPrimary>
                </div>

                <div className="space-y-3">
                  {apiKeys.map((apiKey) => (
                    <ApiKeyCard
                      key={apiKey.id}
                      apiKey={apiKey}
                      onRevoke={handleRevokeApiKey}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="bg-muted/50 rounded-lg p-4 flex items-start space-x-3">
                    <Icon name="ExclamationTriangleIcon" size={20} variant="outline" className="text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Mantenha suas chaves seguras
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Nunca compartilhe suas chaves de API publicamente. Se uma chave for comprometida, revogue-a imediatamente e gere uma nova.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SettingsSection>
          )}

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
            <ButtonPrimary
              onClick={() => setSettings({
                theme: 'light',
                language: 'pt-BR',
                currency: 'BRL',
                dateFormat: 'DD/MM/YYYY',
                notifications: {
                  email: true,
                  push: true,
                  projectUpdates: true,
                  teamActivity: false,
                  clientMessages: true,
                },
                security: {
                  twoFactorAuth: false,
                  sessionTimeout: '30',
                },
                company: {
                  name: 'RDJ Studio',
                  website: 'https://rdjstudio.com.br',
                  logo: '',
                },
                integrations: {
                  cloudStorage: 'google-drive',
                  accounting: 'none',
                  calendar: 'google-calendar',
                },
              })}
              variant="secondary"
            >
              Restaurar Padrões
            </ButtonPrimary>
            <ButtonPrimary
              onClick={handleSave}
              icon={saveStatus === 'saved' ? 'CheckIcon' : 'ArrowDownTrayIcon'}
              variant="primary"
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' && 'Salvando...'}
              {saveStatus === 'saved' && 'Salvo!'}
              {saveStatus === 'idle' && 'Salvar Alterações'}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsInteractive;