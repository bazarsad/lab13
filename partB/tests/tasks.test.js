require('./setup');

const request = require('supertest');
const app = require('../src/app');
const { closeDb } = require('../src/db/database');

afterAll(() => {
  closeDb();
});

// ─── Helper ───────────────────────────────────────────────────────────────────
async function createTask(overrides = {}) {
  const defaults = { title: 'Test Task', priority: 'medium', status: 'todo' };
  const res = await request(app)
    .post('/api/tasks')
    .send({ ...defaults, ...overrides });
  return res.body.task;
}

// ─── Health check ─────────────────────────────────────────────────────────────
describe('Health', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

// ─── CREATE ───────────────────────────────────────────────────────────────────
describe('POST /api/tasks', () => {
  test('creates task with valid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Buy groceries', priority: 'high', due_date: '2025-12-31' });

    expect(res.status).toBe(201);
    expect(res.body.task).toMatchObject({
      title: 'Buy groceries',
      priority: 'high',
      status: 'todo',
    });
    expect(res.body.task.id).toBeDefined();
  });

  test('creates task with only title (minimal)', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Minimal task' });

    expect(res.status).toBe(201);
    expect(res.body.task.priority).toBe('medium');
    expect(res.body.task.status).toBe('todo');
  });

  test('rejects empty title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/);
  });

  test('rejects missing title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'high' });

    expect(res.status).toBe(400);
  });

  test('rejects invalid priority', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task', priority: 'urgent' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/priority/);
  });

  test('rejects invalid due_date', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task', due_date: 'not-a-date' });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/due_date/);
  });
});

// ─── READ ─────────────────────────────────────────────────────────────────────
describe('GET /api/tasks', () => {
  test('returns list of tasks', async () => {
    await createTask({ title: 'List task 1' });
    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.tasks)).toBe(true);
    expect(res.body.count).toBeGreaterThan(0);
  });

  test('filters by priority', async () => {
    await createTask({ title: 'Low priority task', priority: 'low' });
    const res = await request(app).get('/api/tasks?priority=low');

    expect(res.status).toBe(200);
    res.body.tasks.forEach(t => expect(t.priority).toBe('low'));
  });

  test('filters by status', async () => {
    await createTask({ title: 'Done task', status: 'done' });
    const res = await request(app).get('/api/tasks?status=done');

    expect(res.status).toBe(200);
    res.body.tasks.forEach(t => expect(t.status).toBe('done'));
  });

  test('searches by title keyword', async () => {
    await createTask({ title: 'Unique keyword ZZZXXX' });
    const res = await request(app).get('/api/tasks?search=ZZZXXX');

    expect(res.status).toBe(200);
    expect(res.body.tasks.length).toBeGreaterThan(0);
    expect(res.body.tasks[0].title).toContain('ZZZXXX');
  });

  test('returns empty array when search finds nothing', async () => {
    const res = await request(app).get('/api/tasks?search=IMPOSSIBLE_QUERY_99999');

    expect(res.status).toBe(200);
    expect(res.body.tasks).toEqual([]);
    expect(res.body.count).toBe(0);
  });

  test('rejects invalid priority filter', async () => {
    const res = await request(app).get('/api/tasks?priority=invalid');
    expect(res.status).toBe(400);
  });
});

describe('GET /api/tasks/:id', () => {
  test('returns single task by id', async () => {
    const task = await createTask({ title: 'Single task' });
    const res = await request(app).get(`/api/tasks/${task.id}`);

    expect(res.status).toBe(200);
    expect(res.body.task.id).toBe(task.id);
    expect(res.body.task.title).toBe('Single task');
  });

  test('returns 404 for non-existent id', async () => {
    const res = await request(app).get('/api/tasks/999999');
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  test('returns 400 for non-numeric id', async () => {
    const res = await request(app).get('/api/tasks/abc');
    expect(res.status).toBe(400);
  });
});

// ─── UPDATE ───────────────────────────────────────────────────────────────────
describe('PUT /api/tasks/:id', () => {
  test('updates task title', async () => {
    const task = await createTask({ title: 'Old title' });
    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .send({ title: 'New title' });

    expect(res.status).toBe(200);
    expect(res.body.task.title).toBe('New title');
  });

  test('updates priority', async () => {
    const task = await createTask({ priority: 'low' });
    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .send({ priority: 'high' });

    expect(res.status).toBe(200);
    expect(res.body.task.priority).toBe('high');
  });

  test('updates status to done', async () => {
    const task = await createTask();
    const res = await request(app)
      .put(`/api/tasks/${task.id}`)
      .send({ status: 'done' });

    expect(res.status).toBe(200);
    expect(res.body.task.status).toBe('done');
  });

  test('returns 404 for non-existent task', async () => {
    const res = await request(app)
      .put('/api/tasks/999999')
      .send({ title: 'Ghost' });

    expect(res.status).toBe(404);
  });
});

// ─── DELETE ───────────────────────────────────────────────────────────────────
describe('DELETE /api/tasks/:id', () => {
  test('deletes existing task', async () => {
    const task = await createTask({ title: 'To be deleted' });
    const res = await request(app).delete(`/api/tasks/${task.id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  test('returns 404 after deleting same task again', async () => {
    const task = await createTask({ title: 'Delete twice' });
    await request(app).delete(`/api/tasks/${task.id}`);
    const res = await request(app).delete(`/api/tasks/${task.id}`);

    expect(res.status).toBe(404);
  });

  test('returns 404 for non-existent task', async () => {
    const res = await request(app).delete('/api/tasks/999999');
    expect(res.status).toBe(404);
  });
});
