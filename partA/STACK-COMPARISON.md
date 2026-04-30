# STACK-COMPARISON.md — 3 Stack харьцуулалт

## Харьцуулсан Stack-ууд

### Stack 1: Node.js + Express + SQLite
### Stack 2: Python + FastAPI + SQLite  
### Stack 3: Node.js + Hono + PostgreSQL

---

## Харьцуулалтын хүснэгт

| Шалгуур | Node + Express + SQLite | Python + FastAPI + SQLite | Node + Hono + PostgreSQL |
|---|---|---|---|
| **Суралцах хугацаа** | Богино (Express сайн мэдэх) | Дунд (FastAPI шинэ) | Дунд (Hono шинэ) |
| **Setup хурд** | Хурдан — `npm init` л хангалттай | Дунд — venv, pip setup | Удаан — Postgres сервер хэрэгтэй |
| **DB setup** | Маш хялбар — файл л үүснэ | Хялбар | Хэцүү — Docker эсвэл install |
| **Performance** | Сайн | Маш сайн (async native) | Сайн |
| **Testing** | Jest + supertest (сайн ecosystem) | pytest (сайн) | Jest + supertest |
| **Documentation** | Гараар бичих хэрэгтэй | Auto OpenAPI (built-in) | Гараар бичих |
| **Production ready** | Тийм | Тийм | Тийм |
| **AI tooling support** | Маш сайн (хамгийн их жишээ) | Сайн | Дунд |
| **Хамаарал тоо** | Бага | Дунд | Их |

---

## AI-тай хийсэн харьцуулалтын дүгнэлт

Claude-аас асуусан: *"Compare 3 stacks for a personal task tracker REST API focused on simplicity and fast development"*

**Claude-ийн санал:**
- FastAPI автоматаар OpenAPI үүсгэдэг нь давуу
- Гэхдээ Python virtual environment setup нэмэлт алхам шаарддаг
- PostgreSQL нь жижиг проектод хэт том (overkill)
- Express + SQLite хамгийн хурдан prototype хийхэд тохиромжтой

---

## Сонгосон Stack: **Node.js + Express + SQLite**

### Шалтгаан

1. **Хялбар setup** — `npm init`, `npm install express better-sqlite3` л хангалттай, өөр сервер хэрэггүй
2. **SQLite давуу тал** — нэг `.db` файл, deploy хялбар, бие даалтад хангалттай
3. **Сайн мэддэг** — Express-ийн middleware, router загварыг урьд нь ашиглаж байсан
4. **Jest ecosystem** — `supertest`-ээр HTTP integration test хялбархан бичдэг
5. **AI жишээ их** — Claude Express/Node жишээг хамгийн нарийн мэддэг тул hallucination бага

### Сул тал (мэдэж авсан)

- FastAPI шиг автомат OpenAPI байхгүй — гараар `openapi.yaml` бичих хэрэгтэй
- Python-оос бага async support (гэхдээ энэ проектод async чухал биш)
