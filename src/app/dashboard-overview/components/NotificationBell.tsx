'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationBell = ({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationBellProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeConfig = {
    info: { color: 'text-blue-600', bg: 'bg-blue-100' },
    warning: { color: 'text-yellow-600', bg: 'bg-yellow-100' },
    success: { color: 'text-green-600', bg: 'bg-green-100' },
    error: { color: 'text-red-600', bg: 'bg-red-100' },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-300"
      >
        <Icon name="BellIcon" size={24} variant="outline" className="text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-96 bg-card rounded-lg shadow-card border border-border z-50 max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-headline font-semibold text-foreground">Notificações</h3>
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-sm text-primary hover:text-secondary transition-colors duration-300"
                >
                  Marcar todas como lidas
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-80">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="BellSlashIcon" size={48} variant="outline" className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Nenhuma notificação</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const typeStyle = typeConfig[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-muted transition-colors duration-300 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full ${typeStyle.bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon name="BellIcon" size={16} variant="solid" className={typeStyle.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;