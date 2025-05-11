import type { Snippet, SnippetFormValues } from '../types';

const API_URL = 'http://localhost:3001/api';

export const api = {
  getSnippets: async (searchTerm?: string): Promise<Snippet[]> => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    const response = await fetch(`${API_URL}/snippets?${params.toString()}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch snippets');
    return response.json();
  },

  getSnippet: async (id: string): Promise<Snippet> => {
    const response = await fetch(`${API_URL}/snippets/${id}`, {
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch snippet');
    return response.json();
  },

  createSnippet: async (snippet: SnippetFormValues): Promise<Snippet> => {
    const response = await fetch(`${API_URL}/snippets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: snippet.title,
        language: snippet.language,
        code: snippet.code
      }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to create snippet');
    return response.json();
  },

  updateSnippet: async (id: number, snippet: SnippetFormValues): Promise<Snippet> => {
    const response = await fetch(`${API_URL}/snippets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: snippet.title,
        language: snippet.language,
        code: snippet.code
      }),
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to update snippet');
    return response.json();
  },

  deleteSnippet: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/snippets/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete snippet');
  },
};
