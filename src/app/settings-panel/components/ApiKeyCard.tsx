'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onRevoke: (id: string) => void;
}

const ApiKeyCard = ({ apiKey, onRevoke }: ApiKeyCardProps) => {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maskedKey = `${apiKey.key.substring(0, 8)}${'•'.repeat(24)}`;

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-semibold text-foreground">{apiKey.name}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Criada em {apiKey.createdAt}
          </p>
        </div>
        <button
          onClick={() => onRevoke(apiKey.id)}
          className="text-destructive hover:text-destructive/80 transition-colors"
          title="Revogar chave"
        >
          <Icon name="TrashIcon" size={18} variant="outline" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-2">
        <code className="flex-1 px-3 py-2 bg-muted rounded text-xs font-mono text-foreground">
          {showKey ? apiKey.key : maskedKey}
        </code>
        <button
          onClick={() => setShowKey(!showKey)}
          className="p-2 hover:bg-muted rounded transition-colors"
          title={showKey ? 'Ocultar' : 'Mostrar'}
        >
          <Icon name={showKey ? 'EyeSlashIcon' : 'EyeIcon'} size={18} variant="outline" />
        </button>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-muted rounded transition-colors"
          title="Copiar"
        >
          <Icon name={copied ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={18} variant="outline" />
        </button>
      </div>
      
      <p className="text-xs text-muted-foreground">
        Último uso: {apiKey.lastUsed}
      </p>
    </div>
  );
};

export default ApiKeyCard;