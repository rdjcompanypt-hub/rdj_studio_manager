'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', href: '/dashboard-overview', icon: 'ChartBarIcon' },
    { label: 'Projetos', href: '/project-management', icon: 'FolderIcon' },
    { label: 'Equipe', href: '/team-management', icon: 'UsersIcon' },
    { label: 'Calendário', href: '/calendar-interface', icon: 'CalendarIcon' },
  ];

  const secondaryNavItems = [
    { label: 'Financeiro', href: '/financial-tracking', icon: 'CurrencyDollarIcon' },
    { label: 'Configurações', href: '/settings-panel', icon: 'CogIcon' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`bg-card shadow-subtle border-b border-border ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link href="/dashboard-overview" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-foreground"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 10L12 14L16 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-headline font-bold text-foreground hidden sm:block">
              RDJ Studio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-300"
              >
                <Icon name={item.icon as any} size={20} variant="outline" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-300"
              >
                <Icon name="EllipsisHorizontalIcon" size={20} variant="outline" />
                <span>Mais</span>
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-card border border-border z-50">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all duration-300 first:rounded-t-md last:rounded-b-md"
                    >
                      <Icon name={item.icon as any} size={20} variant="outline" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-all duration-300"
            aria-label="Toggle menu"
          >
            <Icon
              name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
              size={24}
              variant="outline"
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-card border-t border-border">
            <nav className="px-4 py-4 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-all duration-300"
                >
                  <Icon name={item.icon as any} size={20} variant="outline" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;