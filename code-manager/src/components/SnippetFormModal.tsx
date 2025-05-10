import { useState, useEffect } from 'react';
import { SnippetForm } from './SnippetForm';
import type { Snippet, SnippetFormValues } from '../types';
import { Button } from './ui/Button';

interface SnippetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSnippet?: Snippet;
  onSave: (values: SnippetFormValues) => void;
  className?: string;
}

export function SnippetFormModal({ isOpen, onClose, initialSnippet, onSave, className }: SnippetFormModalProps) {
  const [editingSnippet, setEditingSnippet] = useState<Snippet | undefined>(initialSnippet);

  useEffect(() => {
    setEditingSnippet(initialSnippet);
  }, [initialSnippet]);

  const handleSave = (values: SnippetFormValues) => {
    onSave(values);
  };

  const handleCancel = onClose;

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 ${className} flex items-center justify-center z-50`}>
      <div className="bg-surface-dark border border-accent-300 rounded-2xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            {editingSnippet ? 'Edit Snippet' : 'Add New Snippet'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <SnippetForm
          snippet={editingSnippet}
          onSave={onSave}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
