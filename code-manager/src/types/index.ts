export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export type SnippetLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'html'
  | 'css'
  | 'sql'
  | 'bash';

export interface SnippetFormValues {
  title: string;
  description: string;
  language: SnippetLanguage;
  code: string;
}

export interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}

export interface SnippetFormProps {
  onSave: (values: SnippetFormValues) => void;
  snippet?: Snippet;
}
