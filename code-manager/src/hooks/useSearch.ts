import { useState, useEffect } from 'react';
import type { Snippet } from '../types';

export function useSearch<T extends { title: string; code: string }>(initialItems: T[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<T[]>(initialItems);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(initialItems);
      return;
    }

    const normalizedSearch = searchTerm.toLowerCase();
    const filtered = initialItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.code.toLowerCase().includes(normalizedSearch)
      );
    });

    setFilteredItems(filtered);
  }, [searchTerm, initialItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    filteredItems,
    handleSearch,
  };
}
