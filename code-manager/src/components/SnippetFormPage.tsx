import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnippets } from '../hooks/useSnippets';
import { SnippetForm } from './SnippetForm';
import type { Snippet, SnippetFormValues } from '../types';
import { createSnippet } from '../utils/snippetUtils';
import { Button } from './ui/Button';

export function SnippetFormPage() {
  const navigate = useNavigate();
  const { snippets, addSnippet, updateSnippet } = useSnippets();
  const [editingSnippet, setEditingSnippet] = useState<Snippet | undefined>();

  const handleSave = (values: SnippetFormValues) => {
    if (editingSnippet) {
      const updatedSnippet = {
        ...editingSnippet,
        ...values,
        updatedAt: new Date().toISOString()
      };
      updateSnippet(updatedSnippet);
    } else {
      const newSnippet = createSnippet(values);
      addSnippet(newSnippet);
    }
    navigate('/');
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
  };

  const handleCancel = () => {
    setEditingSnippet(undefined);
    navigate('/');
  };

  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary">
            {editingSnippet ? 'Edit Snippet' : 'Add New Snippet'}
          </h1>
          <Button onClick={handleCancel}>Back</Button>
        </div>
        <div className="card p-6 rounded-xl border bg-accent-100">
          <SnippetForm
            snippet={editingSnippet}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
