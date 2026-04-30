# ARCHITECTURE.md — Personal Task Tracker

## Системийн архитектур

### Layer Diagram

```mermaid
graph TD
    Client["Client (curl / Browser)"]
    Router["Express Router\n/api/tasks"]
    Controller["Task Controller\nbusiness logic"]
    DB["SQLite Database\ntasks.db"]

    Client -->|HTTP Request| Router
    Router -->|validated params| Controller
    Controller -->|SQL query| DB
    DB -->|rows| Controller
    Controller -->|JSON response| Router
    Router -->|HTTP Response| Client
```

### Module бүтэц

```mermaid
graph LR
    subgraph partB/src
        index["index.js\napp entry point"]
        app["app.js\nexpress setup"]
        subgraph routes
            TR["task-routes.js"]
        end
        subgraph controllers
            TC["task-controller.js"]
        end
        subgraph db
            DB["database.js\nSQLite init"]
            TM["task-model.js\nCRUD queries"]
        end
    end

    index --> app
    app --> TR
    TR --> TC
    TC --> TM
    TM --> DB
```

### Data Flow — Task үүсгэх

```mermaid
sequenceDiagram
    participant C as Client
    participant R as Router
    participant Ctrl as Controller
    participant M as Model
    participant DB as SQLite

    C->>R: POST /api/tasks {title, priority, dueDate}
    R->>R: validate input
    R->>Ctrl: createTask(data)
    Ctrl->>M: insert(data)
    M->>DB: INSERT INTO tasks ...
    DB-->>M: lastInsertRowid
    M-->>Ctrl: {id, title, ...}
    Ctrl-->>R: task object
    R-->>C: 201 Created {task}
```

### Database Schema

```mermaid
erDiagram
    TASKS {
        integer id PK
        text title
        text description
        text priority
        text status
        text due_date
        text created_at
        text updated_at
    }
```

## Module тайлбар

| Module | Үүрэг |
|---|---|
| `index.js` | Сервер эхлүүлэх, port listen |
| `app.js` | Express middleware, router холбох |
| `task-routes.js` | HTTP endpoints тодорхойлох |
| `task-controller.js` | Request боловсруулах, хариу буцаах |
| `task-model.js` | SQLite CRUD операцууд |
| `database.js` | DB холболт, schema init |

## API Endpoints

| Method | Path | Тайлбар |
|---|---|---|
| GET | /api/tasks | Бүх таск жагсаах (filter боломжтой) |
| GET | /api/tasks/:id | Нэг таск харах |
| POST | /api/tasks | Шинэ таск үүсгэх |
| PUT | /api/tasks/:id | Таск засах |
| DELETE | /api/tasks/:id | Таск устгах |
| GET | /api/tasks/search | Хайлт |
