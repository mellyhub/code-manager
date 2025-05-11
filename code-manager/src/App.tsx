import { useState, useEffect } from 'react';
import { SnippetList } from './components/SnippetList';
import type { Snippet, SnippetFormValues } from './types';
import { api } from './services/api';
import { SnippetForm } from './components/SnippetForm';
import './styles/globals.css';

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load snippets either with search term or without
    const loadWithSearch = async () => {
      try {
        const data = await api.getSnippets(searchTerm);
        setSnippets(data);
      } catch (error) {
        console.error('Failed to load snippets:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    loadWithSearch();
  }, [searchTerm]);

  // Removed loadSnippets function since we're handling it directly in useEffect

  const handleSave = async (values: SnippetFormValues) => {
    try {
      if (selectedSnippet) {
        await api.updateSnippet(selectedSnippet.id, values);
      } else {
        await api.createSnippet(values);
      }
      // Reload snippets with current search term
      const data = await api.getSnippets(searchTerm);
      setSnippets(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save snippet:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteSnippet(id);
      const data = await api.getSnippets();
      setSnippets(data);
    } catch (error) {
      console.error('Failed to delete snippet:', error);
    }
  };

  const handleEdit = (snippet: Snippet) => {
    setSelectedSnippet(snippet);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedSnippet(undefined);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-4">Code Snippet Manager</h1>
            <div className="w-full max-w-2xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="Search snippets..."
                  className="w-full px-10 py-3 rounded-lg bg-surface-light border border-accent-200/50 hover:border-accent-200/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-200/10 border border-accent-200/50 hover:border-accent-200/70 transition-all duration-200 hover:bg-accent-200/20 text-text-heading font-medium text-sm tracking-tight"
            >
              <span className="text-accent-200">+</span>
              <span>Add Snippet</span>
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {isEditing && (
            <SnippetForm
              snippet={selectedSnippet}
              onSave={handleSave}
              onCancel={handleCancel}
              className="mb-6"
            />
          )}
          <SnippetList
            snippets={snippets}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
