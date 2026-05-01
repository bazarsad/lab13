const { getDb } = require('./database');

/**
 * Get all tasks with optional filtering
 * @param {Object} filters - { priority, status, search }
 * @returns {Array} list of tasks
 */
function getAllTasks(filters = {}) {
  const db = getDb();
  let query = 'SELECT * FROM tasks WHERE 1=1';
  const params = [];

  if (filters.priority) {
    query += ' AND priority = ?';
    params.push(filters.priority);
  }

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters.search) {
    query += ' AND (title LIKE ? OR description LIKE ?)';
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  query += ' ORDER BY created_at DESC';

  return db.prepare(query).all(...params);
}

/**
 * Get single task by ID
 * @param {number} id
 * @returns {Object|undefined} task or undefined
 */
function getTaskById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

/**
 * Create new task
 * @param {Object} data - { title, description, priority, status, due_date }
 * @returns {Object} created task
 */
function createTask(data) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, status, due_date)
    VALUES (@title, @description, @priority, @status, @due_date)
  `);

  const result = stmt.run({
    title: data.title,
    description: data.description || null,
    priority: data.priority || 'medium',
    status: data.status || 'todo',
    due_date: data.due_date || null,
  });

  return getTaskById(result.lastInsertRowid);
}

/**
 * Update existing task
 * @param {number} id
 * @param {Object} data - fields to update
 * @returns {Object|null} updated task or null if not found
 */
function updateTask(id, data) {
  const db = getDb();

  const existing = getTaskById(id);
  if (!existing) return null;

  const updated = {
    title: data.title !== undefined ? data.title : existing.title,
    description: data.description !== undefined ? data.description : existing.description,
    priority: data.priority !== undefined ? data.priority : existing.priority,
    status: data.status !== undefined ? data.status : existing.status,
    due_date: data.due_date !== undefined ? data.due_date : existing.due_date,
  };

  db.prepare(`
    UPDATE tasks
    SET title = @title,
        description = @description,
        priority = @priority,
        status = @status,
        due_date = @due_date,
        updated_at = datetime('now')
    WHERE id = @id
  `).run({ ...updated, id });

  return getTaskById(id);
}

/**
 * Delete task by ID
 * @param {number} id
 * @returns {boolean} true if deleted, false if not found
 */
function deleteTask(id) {
  const db = getDb();
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return result.changes > 0;
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
