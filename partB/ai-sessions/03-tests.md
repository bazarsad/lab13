# AI Session 03 — Unit Tests

**Огноо**: 4-р өдөр  
**Зорилго**: Jest + supertest тестүүд бичих

---

## Session агуулга (товч)

**Миний асуулт:**
> "Write comprehensive Jest tests for this Express task tracker API using supertest. Cover: happy path, edge cases (empty title, invalid priority, non-existent ID), and error cases. Use in-memory SQLite via DB_PATH=':memory:'."

**Claude-ийн хийсэн зүйл:**
- `tests/setup.js` — `process.env.DB_PATH = ':memory:'`
- 25+ тест: create, read, update, delete, search, filter
- Edge case бүрийг тусдаа `test()` блок

---

## Өөрийн review (хийсэн зүйл)

Claude-ийн тестүүдийг унших явцад дараах зүйлийг өөрчилсөн:

1. **afterAll cleanup** — `closeDb()` дуудах нэмсэн, эс тэгвэл Jest "open handle" warning өгдөг
2. **Test isolation** — зарим тест өмнөх тестийн мэдээлэлд хамаардаг байсан → helper function `createTask()` үүсгэж isolation сайжруулсан
3. **Assertion нарийвчлал** — `expect(res.body).toBeDefined()` биш `expect(res.body.task.id).toBeDefined()` болгосон

---

## /test slash command ашигласан

```
/test — edge cases нэмэхийг хүссэн:
- Whitespace-only title → 400
- Title хоосон string → 400  
- Invalid date format → 400
```

Claude эдгээр тестүүдийг хурдан нэмсэн — ажиллаж байна.

---

## Дүгнэлт

- AI тестийн scaffold-г хурдан гаргасан
- Гэхдээ test isolation болон cleanup-г хүн шалгах ёстой
- `afterAll` мартаж болдог — анхаарах
