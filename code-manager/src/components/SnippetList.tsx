import { useState } from 'react';
import { DocumentDuplicateIcon as DuplicateIcon, PencilIcon, TrashIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import type { Snippet, SnippetLanguage } from '../types';
import { getLanguageOptions } from '../utils/snippetUtils';
import { CodeBlock } from './CodeBlock';

interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function SnippetList({ snippets, onEdit, onDelete, className }: SnippetListProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SnippetLanguage | 'all'>('all');
  const languageOptions = getLanguageOptions();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-text-heading">Filter by Language:</label>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as SnippetLanguage | 'all')}
              className="px-3 py-1.5 text-sm bg-surface-light border rounded-lg text-text-heading focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 pr-8"
            >
              <option value="all">All Languages</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-subtle pointer-events-none" />
          </div>
        </div>
      </div>
      {snippets
        .filter((snippet) => selectedLanguage === 'all' || snippet.language === selectedLanguage)
        .map((snippet) => (
          <div
            key={snippet.id}
            className="card p-6 transition-shadow duration-300 hover:shadow-[0_0_8px_rgba(102,217,255,0.1)]"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-text-heading">{snippet.title}</h3>
                  <span className="px-2 py-1 text-xs font-medium text-[#070707] bg-[#aabefe] rounded-full border border-accent-200/50">
                    {snippet.language}
                  </span>
                </div>
                <div className="bg-surface-dark rounded-xl p-4 text-text-subtle">
                  <CodeBlock code={snippet.code} language={snippet.language} />
                </div>
              </div>
              <div className="flex space-x-3 mt-3">
                <button
                  onClick={() => handleCopy(snippet.code)}
                  className="p-2 rounded-md hover:bg-accent-200 transition-colors"
                  title="Copy code"
                >
                  {copied === snippet.code ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <DuplicateIcon className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => onEdit(snippet)}
                  className="p-2 rounded-md hover:bg-accent-200 transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(snippet.id)}
                  className="p-2 rounded-md hover:bg-accent-200 transition-colors"
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
