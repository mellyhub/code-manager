import React from 'react';
import type { Snippet, SnippetLanguage, SnippetFormValues } from '../types';

interface SnippetFormProps {
  snippet?: Snippet;
  onSave: (values: SnippetFormValues) => void;
  onCancel: () => void;
  className?: string;
}

export const SnippetForm = ({ snippet, onSave, onCancel, className }: SnippetFormProps) => {
  const [formValues, setFormValues] = React.useState<SnippetFormValues>({
    title: snippet?.title || '',
    language: snippet?.language ? (snippet.language as SnippetLanguage) : 'javascript',
    code: snippet?.code || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev: SnippetFormValues) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-accent-300 rounded-lg bg-surface-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          required
        />
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-text-primary mb-1">
          Language
        </label>
        <select
          id="language"
          name="language"
          value={formValues.language}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-accent-300 rounded-lg bg-surface-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div>
        <label htmlFor="code" className="block text-sm font-medium text-text-primary mb-1">
          Code
        </label>
        <textarea
          id="code"
          name="code"
          value={formValues.code}
          onChange={handleChange}
          className="mt-2 block w-full rounded-md border border-accent-300 bg-accent-100 text-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight min-h-[200px]"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary"
        >
          {snippet ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
};;
