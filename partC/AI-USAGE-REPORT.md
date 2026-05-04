# AI Usage Report — Personal Task Tracker

**Лаборатори 13 — F.CSM311**  
**Хэрэгсэл**: Claude (claude.ai)

---

## 1. Юуг AI хийсэн, юуг өөрөө хийсэн?

### Part A — Plan

**AI хийсэн:**
- Stack харьцуулалтын хүснэгт үүсгэх — 3 stack-ийн давуу/сул талыг хурдан харьцуулсан
- Mermaid diagram-ын syntax бичих — layered architecture, sequence diagram, ER diagram
- ADR-001-ийн template дагуу бичих
- CLAUDE.md-ийн анхны draft үүсгэх

**Өөрөө хийсэн:**
- Эцсийн stack шийдвэр гаргах — Claude санал болгосон ч шалтгааныг өөрөө дүгнэсэн
- Scope тодорхойлох — юу хийх, юу хийхгүйг тодорхойлох
- Out of scope зүйлсийг шийдэх (authentication, multi-user)
- Diagrams-г бизнес logic-тай нийцүүлэх

### Part B — Build

**AI хийсэн:**
- `database.js` анхны scaffold — SQLite connection, schema CREATE TABLE
- `task-model.js` CRUD function-уудын бүтэц
- `task-controller.js` validation pattern-ийн анхны хувилбар
- Test файлын scaffold — describe/test блокуудын бүтэц
- OpenAPI YAML-ийн template

**Өөрөө хийсэн:**
- Hallucination-уудыг олж засах (доор дэлгэрэнгүй)
- `updateTask` function дахь partial update logic — Claude энгийн overwrite хийсэн, гэхдээ partial update (зөвхөн дамжуулсан field-уудыг шинэчлэх) logic-г өөрөө нэмсэн
- Test isolation сайжруулах — `createTask()` helper function үүсгэх
- `afterAll(() => closeDb())` нэмэх — Claude мартаж орхисон
- CLAUDE.md-ийг build явцад шинэчлэх

### Part C — Reflect

**AI хийсэн:**
- ADR-002-ийн template бүтэц
- Зарим хэсгийн outline санал болгох

**Өөрөө хийсэн:**
- AI Usage Report бүтэн бичих — туршлагаа бодитоор дүгнэх
- Self-evaluation хэсэг — үнэнч байдал чухал

---

## 2. Hallucination 2+ жишээ

### Жишээ 1: `better-sqlite3` буруу method нэр

**Тохиолдол:** Session 01-д task-model.js бичихэд Claude дараах кодыг санал болгосон:

```js
// Claude санал болгосон (буруу):
const stmt = db.prepare(query).bind(...params);
const rows = stmt.all();
```

**Асуудал:** `better-sqlite3` library-д `.bind()` method байхгүй. Зөвхөн `.all()`, `.get()`, `.run()` методууд байдаг бөгөөд параметрүүдийг шууд дамжуулна.

**Хэрхэн олсон:** Кодыг `npm test` ажиллуулахад `TypeError: stmt.bind is not a function` алдаа гарсан. `better-sqlite3` documentation (https://github.com/WiseLibs/better-sqlite3) шалгаж зөв syntax олсон.

**Засвар:**
```js
// Зөв:
const rows = db.prepare(query).all(...params);
```

**Сургамж:** AI-ийн санал болгосон library API-г үргэлж official documentation-аар шалгах хэрэгтэй. Ялангуяа method signature, return type-уудыг.

---

### Жишээ 2: SQLite-д `LIKE` query-ийн буруу concatenation

**Тохиолдол:** Search feature нэмэхэд Claude дараах кодыг санал болгосон:

```js
// Claude санал болгосон (тогтворгүй):
query += " AND title LIKE '%' || ? || '%'";
params.push(filters.search);
```

**Асуудал:** `'%' || ? || '%'` SQLite string concatenation нь зарим version болон driver-д буруу ажилладаг. `better-sqlite3`-д parameterized query дотор `||` concatenation ашиглах нь тогтворгүй.

**Хэрхэн олсон:** Тестийн явцад search буцааж байгаа мэт харагдсан ч empty result буцааж байсан. Debug хийхэд query-г хуулж SQLite Browser-т туршиж үзэхэд `||` concatenation буруу ажиллаж байгааг олсон.

**Засвар:**
```js
// Зөв — JavaScript-д % нэмж, энгийн ? ашиглах:
query += ' AND (title LIKE ? OR description LIKE ?)';
params.push(`%${filters.search}%`, `%${filters.search}%`);
```

**Сургамж:** SQL query-ийн тест realistic data-аар хийх хэрэгтэй — зөвхөн "ажиллах мэт харагдах" биш, бодит утга буцааж байгааг шалгах.

---

## 3. Security / License-ийн анхаарал

### Security жишээ: Whitespace-only title

**Тохиолдол:** Claude-ийн анхны validation код:

```js
if (!title) {
  return res.status(400).json({ error: 'title is required' });
}
```

**Асуудал:** `!title` нь `title = "   "` (зөвхөн space) тохиолдолд `false` буцаадаг — тиймээс `"   "` гэсэн утгатай таск үүсгэж болно. Энэ нь DB-д хоосон таск үүсгэж, UI-д харуулах боломжгүй болгоно.

**Засвар:**
```js
if (!title || typeof title !== 'string' || title.trim() === '') {
  return res.status(400).json({ error: 'title is required and must be a non-empty string' });
}
```

**Нэмэлт:** `/review` slash command ашиглан бүх validation-г шалгахад энэ асуудлыг Claude өөрөө олж зассан — гэхдээ зөвхөн review хийхийг хүссэний дараа. Анхнаасаа санал болгоогүй нь сонирхолтой.

### License анхаарал

`better-sqlite3` MIT license-тай — commercial use зөвшөөрнө.  
`express` MIT license-тай — проблемгүй.  
`jest` MIT license-тай — проблемгүй.

---

## 4. Юуг AI-аар хурдан хийсэн?

### Boilerplate код хурдан гаргах
Express + SQLite setup-г бүтнээр нь гаргах (app.js, routes, controllers, model) — энгийнээр 2-3 цаг шаардагдах ажлыг 20 минутад гарсан. Layered architecture-ийн шаблон маш сайн байсан.

### OpenAPI YAML
OpenAPI spec бичих нь маш уйтгартай, repeative ажил. Claude YAML бүтцийг schema, response, components бүрэнд нь гаргаж өгсөн — 30 минут хэмнэсэн.

### Test scaffold үүсгэх
25+ тестийн бүтцийг describe/test блокуудаар хурдан гаргасан. Edge case-уудыг санал болгосон нь useful байсан.

### Mermaid diagram
Architecture diagram, sequence diagram, ER diagram-ыг Mermaid syntax-аар бичих хэрэгтэй байсан. Claude syntax-г хурдан гаргасан.

---

## 5. Юуг AI-аар удаан хийсэн?

### Partial update logic
`updateTask` function-д Claude анхандаа бүх field-ийг overwrite хийдэг байсан — `undefined` тохиолдолд column-г `NULL` болгодог. Partial update (зөвхөн дамжуулсан field-уудыг өөрчлөх) хийхийн тулд дэлгэрэнгүй тайлбарлах шаардлагатай болсон. Хэдэн prompt-ын дараа зөв болсон.

### Test isolation
Claude-ийн тест-үүд shared state-д хамаарч байсан — нэг тест өмнөхийнхөөс үлдсэн өгөгдлийг ашиглах тохиолдол байсан. Isolation-г сайжруулахын тулд helper function бичих, beforeEach/afterEach нэмэх тайлбарлахад цаг зарцуулсан.

### Error message дизайн
"Хэрэглэгчид харуулах" болон "developer-т харуулах" error message-г ялгах хэрэгтэй байсан. Claude хэт technical error message санал болгодог байсан.

---

## 6. Skill Atrophy эрсдэлийг яаж зохицуулсан?

### "AI байхгүй" цаг гаргасан

Лабораторын ажлын явцад дараах зүйлсийг AI ашиглалгүйгээр хийсэн:
- `updateTask`-ийн partial update logic-г шинэ дэвтэрт бичиж, гар аргаар логикийг дүгнэсэн
- SQL query-ийг paper дээр бичиж, орлого, гаралт ямар байхыг бичсэн
- Test failure-уудыг AI-д асуухаас өмнө өөрөө debug хийхийг оролдсон (5-10 минут)

### Кодыг заавар ойлгосон

AI бичсэн бүх функц, ялангуяа database.js болон task-model.js-г мөр бүрийг уншиж, юу хийж байгааг тайлбарлаж чадах эсэхийг шалгасан. Ойлгоогүй мөрийг тайлбарлуулж, тайлбарыг comment-аар нэмсэн.

### Дахин бичих дасгал

`task-controller.js`-ийн `createTask` функцийг AI-д харуулалгүй өөрөө дахин бичиж, дараа нь AI-ийнхтай харьцуулсан. 80%-г зөвтгэж бичсэн — validation pattern-г санаж байсан.

### Шалгалтын бэлтгэл

"Шалгалт дээр энэ кодыг тайлбарлаж чадах уу?" гэж бодтол:
- SQLite parameterized query яагаад хэрэгтэй — ойлгосон
- Express middleware chain яаж ажилладаг — ойлгосон
- `better-sqlite3`-ийн `.prepare().all()` pattern — ойлгосон
- Layered architecture яагаад хэрэгтэй — ойлгосон

---

## Дүгнэлт

AI-тай ажиллах нь "хурдан бичих" биш, "хурдан prototype гаргаж, шалгаж, засах" workflow юм. Хамгийн чухал сургамж: **AI бичсэн кодыг ажиллуулж байгаа нь зөв гэсэн үг биш** — logic зөв эсэх, edge case бодолцсон эсэх, security эрсдэл байгаа эсэхийг хүн шалгах ёстой.
