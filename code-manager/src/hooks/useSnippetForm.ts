import { useState } from 'react';
import type { Snippet, SnippetFormValues } from '../types';
import { createSnippet } from '../utils/snippetUtils';

export function useSnippetForm(
  addSnippet: (snippet: Snippet) => void,
  updateSnippet: (snippet: Snippet) => void
) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | undefined>();

  const handleNewSnippet = () => {
    setEditingSnippet(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSnippet(undefined);
  };

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
    handleCloseForm();
  };

  return {
    isFormOpen,
    editingSnippet,
    handleNewSnippet,
    handleEdit,
    handleCloseForm,
    handleSave,
  };
}
