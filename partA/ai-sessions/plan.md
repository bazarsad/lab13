# AI Planning Session — Part A

**Огноо**: 1-р өдөр  
**Хэрэгсэл**: Claude (claude.ai)  
**Зорилго**: Stack сонголт, архитектур төлөвлөлт

---

## Session 1: Stack харьцуулалт

**Миний асуулт:**
> "Compare these 3 stacks for a personal task tracker REST API: 1) Node.js + Express + SQLite, 2) Python + FastAPI + SQLite, 3) Node.js + Hono + PostgreSQL. Focus on: setup speed, learning curve, testing, AI tool support."

**Claude-ийн хариу (товч):**
- FastAPI нь built-in OpenAPI үүсгэдэг давуу талтай
- Express + SQLite хамгийн хурдан prototype гаргахад тохиромжтой
- PostgreSQL жижиг проектод хэт том (overhead их)
- Express ecosystem-д Jest + supertest сайн нэгдсэн

**Миний шийдвэр:** Node.js + Express + SQLite — хурдан, энгийн, тест бичихэд хялбар.

---

## Session 2: Архитектур төлөвлөлт

**Миний асуулт:**
> "Design a clean layered architecture for this task tracker. I want: routes, controllers, models, db. Show me the folder structure and explain each layer's responsibility."

**Claude-ийн хариу (товч):**
```
src/
  index.js          ← entry point
  app.js            ← express setup
  routes/
    task-routes.js  ← HTTP layer
  controllers/
    task-controller.js ← business logic
  db/
    database.js     ← SQLite connection
    task-model.js   ← SQL queries
```
- Routes нь validation хийж, controller руу дамжуулна
- Controller нь HTTP-г мэдэхгүй, зөвхөн logic
- Model нь SQL query-нуудыг агуулна

**Хүлээн зөвшөөрсөн** — энэ бүтцийг ашиглах болсон.

---

## Session 3: Database Schema

**Миний асуулт:**
> "Design SQLite schema for tasks with: title, description, priority (low/medium/high), status (todo/in-progress/done), due_date, timestamps."

**Claude-ийн хариу (товч):**
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK(priority IN ('low','medium','high')),
  status TEXT DEFAULT 'todo' CHECK(status IN ('todo','in-progress','done')),
  due_date TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

**Анхаарах зүйл олсон:** Claude эхэндээ `CURRENT_TIMESTAMP` ашигласан боловч  
`better-sqlite3`-д `datetime('now')` илүү тохиромжтой. Баримт бичгийг шалгаж зассан.

---

## Дүгнэлт

- Stack сонгоход AI маш хэрэгтэй байсан — харьцуулалтыг хурдан гаргасан
- Архитектурыг Claude санал болгосон, миний хэрэгцээнд тааруулж засав
- DB schema-д нэг hallucination олсон (`CURRENT_TIMESTAMP` vs `datetime('now')`)
