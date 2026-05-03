# Personal Task Tracker — Part B

Node.js + Express + SQLite REST API.

## Build & Run

```bash
npm install
npm start
# → http://localhost:3000
```

Dev mode (auto-restart):
```bash
npm run dev
```

## Tests

```bash
npm test
```

Expected: 25+ tests, бүгд pass.

## Project Structure

```
src/
  index.js                  ← server entry point
  app.js                    ← express + middleware
  routes/
    task-routes.js          ← HTTP endpoints
  controllers/
    task-controller.js      ← request handling, validation
  db/
    database.js             ← SQLite connection, schema init
    task-model.js           ← CRUD queries
tests/
  setup.js                  ← in-memory DB config
  tasks.test.js             ← 25+ unit/integration tests
openapi.yaml                ← API spec (OpenAPI 3.0)
```

## API Reference

### Get all tasks
```
GET /api/tasks
GET /api/tasks?priority=high
GET /api/tasks?status=todo
GET /api/tasks?search=grocery
```

### Get task by ID
```
GET /api/tasks/1
```

### Create task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "priority": "high",
  "due_date": "2025-12-31"
}
```

### Update task
```
PUT /api/tasks/1
Content-Type: application/json

{
  "status": "done"
}
```

### Delete task
```
DELETE /api/tasks/1
```

## Data Model

| Field | Type | Values |
|---|---|---|
| id | integer | auto |
| title | string | required |
| description | string | optional |
| priority | string | low / medium / high |
| status | string | todo / in-progress / done |
| due_date | string | YYYY-MM-DD |
| created_at | string | auto |
| updated_at | string | auto |

## Environment Variables

| Var | Default | Тайлбар |
|---|---|---|
| PORT | 3000 | Server port |
| DB_PATH | ./tasks.db | SQLite file path |
