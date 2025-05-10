export interface Snippet {
  id: string;
  title: string;
  language: SnippetLanguage;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export type SnippetLanguage = 'javascript' | 'typescript' | 'cs';

export interface SnippetFormValues {
  title: string;
  language: SnippetLanguage;
  code: string;
}

export interface SnippetFormProps {
  snippet?: Snippet;
  onSave: (values: SnippetFormValues) => void;
  onCancel?: () => void;
}

export interface SnippetListProps {
  snippets: Snippet[];
  onEdit: (snippet: Snippet) => void;
  onDelete: (id: string) => void;
}
