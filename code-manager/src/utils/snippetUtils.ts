import { v4 as uuidv4 } from 'uuid';
import type { Snippet, SnippetLanguage } from '../types';

const STORAGE_KEY = 'codeSnippets';

export const getSnippets = (): Snippet[] => {
  const storedSnippets = localStorage.getItem(STORAGE_KEY);
  return storedSnippets ? JSON.parse(storedSnippets) : [];
};

export const saveSnippet = (snippet: Snippet): void => {
  const snippets = getSnippets();
  const updatedSnippets = [...snippets, snippet];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
};

export const updateSnippet = (updatedSnippet: Snippet): void => {
  const snippets = getSnippets();
  const updatedSnippets = snippets.map(snippet => 
    snippet.id === updatedSnippet.id ? updatedSnippet : snippet
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
};

export const deleteSnippet = (id: string): void => {
  const snippets = getSnippets();
  const updatedSnippets = snippets.filter(snippet => snippet.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
};

export const createSnippet = (values: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Snippet => {
  return {
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...values
  };
};

export const getLanguageOptions = (): { value: SnippetLanguage; label: string }[] => {
  return [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];
};
