import { useState, useEffect } from 'react';
import type { Snippet } from '../types';
import { getSnippets, saveSnippet, updateSnippet, deleteSnippet } from '../utils/snippetUtils';

export const useSnippets = () => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedSnippets = getSnippets();
      setSnippets(storedSnippets);
      setLoading(false);
    } catch (err) {
      setError('Failed to load snippets');
      setLoading(false);
    }
  }, []);

  const addSnippet = (newSnippet: Snippet) => {
    saveSnippet(newSnippet);
    setSnippets(prev => [...prev, newSnippet]);
  };

  const updateSnippetById = (updatedSnippet: Snippet) => {
    updateSnippet(updatedSnippet);
    setSnippets(prev => 
      prev.map(snippet => 
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      )
    );
  };

  const deleteSnippetById = (id: string) => {
    deleteSnippet(id);
    setSnippets(prev => prev.filter(snippet => snippet.id !== id));
  };

  return {
    snippets,
    loading,
    error,
    addSnippet,
    updateSnippet: updateSnippetById,
    deleteSnippet: deleteSnippetById
  };
};
