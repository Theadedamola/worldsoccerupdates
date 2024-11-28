import express from 'express';
import cors from 'cors';
import initSqlJs from 'sql.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
let db;

app.use(cors());
app.use(express.json());

// Initialize SQL.js database
const initDb = async () => {
  const SQL = await initSqlJs();
  db = new SQL.Database();

  // Initialize database tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY
    );

    CREATE TABLE IF NOT EXISTS nominees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      nominee_id INTEGER NOT NULL,
      username TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(category, username)
    );
  `);

  // Seed initial data
  const users = ['john', 'jane', 'bob', 'alice', 'charlie'];
  users.forEach(user => {
    try {
      db.run('INSERT INTO users (username) VALUES (?)', [user]);
    } catch (e) {
      // Ignore duplicate key errors
    }
  });

  const nominees = [
    { category: 'most-active', name: 'John Doe', description: 'Consistently contributes to discussions' },
    { category: 'most-active', name: 'Jane Smith', description: 'Regular participant in community events' },
    { category: 'best-contributor', name: 'Bob Wilson', description: 'Quality code contributions' },
    { category: 'best-contributor', name: 'Alice Brown', description: 'Innovative solution provider' },
    { category: 'best-helper', name: 'Charlie Davis', description: 'Always helps newcomers' },
    { category: 'best-helper', name: 'Eva Martinez', description: 'Detailed problem solver' },
    { category: 'rising-star', name: 'David Kim', description: 'Rapid growth in contributions' },
    { category: 'rising-star', name: 'Sarah Johnson', description: 'Emerging community leader' }
  ];

  nominees.forEach(({ category, name, description }) => {
    try {
      db.run('INSERT INTO nominees (category, name, description) VALUES (?, ?, ?)',
        [category, name, description]);
    } catch (e) {
      // Ignore duplicate key errors
    }
  });
};

// Initialize database before starting server
initDb().then(() => {
  // Authentication endpoint
  app.post('/api/auth', (req, res) => {
    const { username } = req.body;
    const stmt = db.prepare('SELECT username FROM users WHERE username = ?');
    const result = stmt.get([username]);
    stmt.free();
    
    if (result) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'User not found' });
    }
  });

  // Get nominees by category
  app.get('/api/nominees/:category', (req, res) => {
    const { category } = req.params;
    const stmt = db.prepare('SELECT * FROM nominees WHERE category = ?');
    const nominees = stmt.all([category]);
    stmt.free();
    res.json(nominees);
  });

  // Submit vote
  app.post('/api/vote', (req, res) => {
    const { category, nomineeId, username } = req.body;
    
    try {
      // Check if user has already voted
      const checkStmt = db.prepare('SELECT id FROM votes WHERE category = ? AND username = ?');
      const existingVote = checkStmt.get([category, username]);
      checkStmt.free();

      if (existingVote) {
        return res.status(409).json({ message: 'Already voted in this category' });
      }

      // Record the vote
      const insertStmt = db.prepare(
        'INSERT INTO votes (category, nominee_id, username) VALUES (?, ?, ?)'
      );
      insertStmt.run([category, nomineeId, username]);
      insertStmt.free();

      res.json({ success: true });
    } catch (error) {
      console.error('Error recording vote:', error);
      res.status(500).json({ message: 'Failed to record vote' });
    }
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});