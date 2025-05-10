import { useSnippets } from './hooks/useSnippets';
import { useSearch } from './hooks/useSearch';
import { useSnippetForm } from './hooks/useSnippetForm';
import { SnippetList } from './components/SnippetList';
import { SnippetFormModal } from './components/SnippetFormModal';
import type { Snippet } from './types';
import { Button } from './components/ui/Button';
import './styles/globals.css';

function App() {
  const { snippets, loading, error, deleteSnippet, addSnippet, updateSnippet } = useSnippets();
  const { searchTerm, filteredItems: filteredSnippets, handleSearch } = useSearch<Snippet>(snippets);
  const { 
    isFormOpen, 
    editingSnippet, 
    handleNewSnippet, 
    handleEdit, 
    handleCloseForm, 
    handleSave 
  } = useSnippetForm(addSnippet, updateSnippet);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="dark min-h-screen bg-background-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary tracking-tight">Code Snippet Manager</h1>
          <Button variant="primary" size="lg" onClick={handleNewSnippet}>
            <span className="mr-2">+</span>
            Add New Snippet
          </Button>
        </div>
        <div className="card p-6 rounded-2xl border border-accent-300 bg-surface-dark">
          <div className="card-header mb-4">
            <h2 className="text-2xl font-semibold text-text-primary tracking-tight">Your Snippets</h2>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search snippets..."
              className="w-full px-4 py-3 border border-accent-300 rounded-lg bg-surface-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="card-body space-y-4">
            <SnippetList
              snippets={filteredSnippets}
              onEdit={handleEdit}
              onDelete={deleteSnippet}
            />
            <SnippetFormModal
              isOpen={isFormOpen}
              onClose={handleCloseForm}
              initialSnippet={editingSnippet}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
