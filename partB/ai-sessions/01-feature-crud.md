# AI Session 01 — Task CRUD Feature

**Огноо**: 2-р өдөр  
**Зорилго**: Task CRUD endpoint, DB schema, layered architecture үүсгэх

---

## Session агуулга (товч)

**Миний асуулт:**
> "I need a layered Express + SQLite task tracker. Create: database.js with schema init, task-model.js with CRUD, task-controller.js with validation, and task-routes.js. Use better-sqlite3. Make it production quality."

**Claude-ийн хийсэн зүйл:**
- `database.js` — SQLite холболт, schema init
- `task-model.js` — parameterized query бүхий CRUD
- `task-controller.js` — input validation, error handling
- `task-routes.js` — clean routing

---

## Hallucination олсон

**Асуудал:** Claude `db.prepare().bind()` method ашигласан — `better-sqlite3`-д ийм method байхгүй.

```js
// Claude санал болгосон (буруу):
const stmt = db.prepare(query).bind(...params);
stmt.all();

// Зөв (баримт бичгийг шалгасан):
db.prepare(query).all(...params);
```

**Засвар:** `better-sqlite3` documentation-г шалгаж, `.all(...params)` syntax-г ашигласан.

---

## Security шалгалт

`/review` slash command ашигласан хариу:
- SQL injection: ✅ parameterized queries ашиглаж байна
- Input validation: ⚠️ `title` whitespace-only байж болно → `title.trim() === ''` шалгалт нэмсэн
- Error messages: ✅ stack trace гарахгүй байна

---

## Дүгнэлт

- CRUD scaffold маш хурдан гарсан (~10 мин)
- Нэг method нэрийн алдаа олсон — баримт бичиг шалгах чухал
- Validation-г AI санал болгосон ч бүх edge case шалгасан
