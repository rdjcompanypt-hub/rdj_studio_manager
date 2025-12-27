import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Role {
  id: string;
  name: string;
  count: number;
  icon: string;
}

interface RoleFilterProps {
  roles: Role[];
  activeRole: string;
  onRoleChange: (roleId: string) => void;
}

const RoleFilter = ({ roles, activeRole, onRoleChange }: RoleFilterProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-sm font-headline font-semibold text-foreground mb-4">Filtrar por Função</h3>
      <div className="space-y-2">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`w-full flex items-center justify-between p-3 rounded-md transition-all duration-300 ${
              activeRole === role.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon
                name={role.icon as any}
                size={20}
                variant={activeRole === role.id ? 'solid' : 'outline'}
              />
              <span className="text-sm font-medium">{role.name}</span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                activeRole === role.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-foreground'
              }`}
            >
              {role.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleFilter;