# Personal Task Tracker — README (Draft)

> ⚠️ Энэ нь Part A-ийн draft. Part B дууссаны дараа бүрэн болно.

## Зорилго

Хувийн даалгаврын удирдлагын REST API. Таск үүсгэх, засах, устгах, хайх боломжтой.

## Tech Stack

- Node.js + Express
- SQLite (better-sqlite3)
- Jest (testing)

## Build & Run

```bash
cd partB
npm install
npm start
# → http://localhost:3000
```

## Tests

```bash
cd partB
npm test
```

## API (товч)

```
GET    /api/tasks          # бүх таск
POST   /api/tasks          # шинэ таск
GET    /api/tasks/:id      # нэг таск
PUT    /api/tasks/:id      # засах
DELETE /api/tasks/:id      # устгах
GET    /api/tasks?search=  # хайлт
GET    /api/tasks?priority=# шүүлт
```

## TODO (Part B дээр нэмнэ)

- [ ] Бүрэн API жишээнүүд
- [ ] Environment variables тайлбар
- [ ] Deployment заавар
