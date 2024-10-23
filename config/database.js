// config/database.js
const sqlite3 = require('sqlite3');
const path = require('path');

// Create a new SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, '../expense_tracker.db'), (err) => {
  if (err) {
    console.error('Failed to connect to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Initialize database tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
      category_id INTEGER,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);
});

module.exports = db;
