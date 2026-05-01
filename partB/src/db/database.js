const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../tasks.db');

let db;

/**
 * Get or create database connection
 * @returns {Database} SQLite database instance
 */
function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initSchema(db);
  }
  return db;
}

/**
 * Initialize database schema
 * @param {Database} database
 */
function initSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      description TEXT,
      priority    TEXT DEFAULT 'medium'
                  CHECK(priority IN ('low', 'medium', 'high')),
      status      TEXT DEFAULT 'todo'
                  CHECK(status IN ('todo', 'in-progress', 'done')),
      due_date    TEXT,
      created_at  TEXT DEFAULT (datetime('now')),
      updated_at  TEXT DEFAULT (datetime('now'))
    );
  `);
}

/**
 * Close database connection (for testing)
 */
function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

module.exports = { getDb, closeDb };
