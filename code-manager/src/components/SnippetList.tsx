import { useState } from 'react';
import { ClipboardDocumentIcon as CopyIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Snippet } from '../types';
import { CodeBlock } from './CodeBlock';

interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function SnippetList({ snippets, onEdit, onDelete, className }: SnippetListProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-surface-light rounded-2xl p-6 border border-accent-300 hover:border-primary hover:shadow-lg transition-all duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{snippet.title}</h3>
              <div className="bg-surface-dark rounded-xl p-4">
                <CodeBlock code={snippet.code} language={snippet.language} />
              </div>
            </div>
            <div className="flex space-x-3 mt-3">
              <button
                onClick={() => handleCopy(snippet.code)}
                className="p-2 rounded-md text-accent-300 hover:bg-accent-200 transition-colors"
                title="Copy code"
              >
                {copied === snippet.code ? (
                  <span className="text-sm">✓</span>
                ) : (
                  <CopyIcon className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => onEdit(snippet)}
                className="p-2 rounded-md text-accent-300 hover:bg-accent-200 transition-colors"
                title="Edit"
              >
                <PencilIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(snippet.id)}
                className="p-2 rounded-md text-error hover:bg-error/10 transition-colors"
                title="Delete"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
