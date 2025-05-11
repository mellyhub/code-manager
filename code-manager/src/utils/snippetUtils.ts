import type { Snippet, SnippetLanguage } from '../types';

const STORAGE_KEY = "codeSnippets";

export const getSnippets = (): Snippet[] => {
  const storedSnippets = localStorage.getItem(STORAGE_KEY);
  return storedSnippets ? JSON.parse(storedSnippets) : [];
};

export const saveSnippets = (snippets: Snippet[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
};



export const createSnippet = (values: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Snippet => {
  return {
    ...values,
    id: `snippet-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const addSnippet = (snippet: Omit<Snippet, 'id'>): Snippet => {
  const snippets = getSnippets();
  const newSnippet = createSnippet(snippet);
  saveSnippets([...snippets, newSnippet]);
  return newSnippet;
};

export const updateSnippet = (updatedSnippet: Snippet): void => {
  const snippets = getSnippets();
  const updatedSnippets = snippets.map(snippet => 
    snippet.id === updatedSnippet.id ? { ...snippet, ...updatedSnippet, updatedAt: new Date().toISOString() } : snippet
  );
  saveSnippets(updatedSnippets);
};

export const deleteSnippet = (id: string): void => {
  const snippets = getSnippets();
  const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
  saveSnippets(updatedSnippets);
};

export const getLanguageOptions = (): { value: SnippetLanguage; label: string }[] => {
  return [
    { value: 'Javascript', label: 'JavaScript' },
    { value: 'Typescript', label: 'TypeScript' },
    { value: 'Csharp', label: 'C#' }
  ];
};
