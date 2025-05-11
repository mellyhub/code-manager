import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();

// Middleware
// Configure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

// Initialize database
const db = new sqlite3.Database('mydata.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      language TEXT NOT NULL,
      code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Get all snippets
app.get('/api/snippets', (req, res) => {
  const { search } = req.query;
  
  if (search) {
    db.all(
      'SELECT * FROM snippets WHERE title LIKE ? OR language LIKE ? OR code LIKE ? ORDER BY created_at DESC',
      [`%${search}%`, `%${search}%`, `%${search}%`],
      (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(rows);
      }
    );
  } else {
    db.all('SELECT * FROM snippets ORDER BY created_at DESC', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  }
});

// Get a single snippet
app.get('/api/snippets/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM snippets WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Create a new snippet
app.post('/api/snippets', (req, res) => {
  const { title, language, code } = req.body;
  
  db.run(
    'INSERT INTO snippets (title, language, code) VALUES (?, ?, ?)',
    [title, language, code],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Update a snippet
app.put('/api/snippets/:id', (req, res) => {
  const { id } = req.params;
  const { title, language, code } = req.body;
  
  db.run(
    'UPDATE snippets SET title = ?, language = ?, code = ? WHERE id = ?',
    [title, language, code, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id });
    }
  );
});

// Delete a snippet
app.delete('/api/snippets/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'DELETE FROM snippets WHERE id = ?',
    [parseInt(id)],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: parseInt(id) });
    }
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
