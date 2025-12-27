'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className={`relative flex items-center transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <Icon
          name="MagnifyingGlassIcon"
          size={20}
          variant="outline"
          className="absolute left-4 text-muted-foreground"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Buscar projetos, arquivos, clientes ou membros da equipe..."
          className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Icon name="XMarkIcon" size={20} variant="outline" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;