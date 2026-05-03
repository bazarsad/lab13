# AI Session 02 — Search & Filter Feature

**Огноо**: 3-р өдөр  
**Зорилго**: Search болон filter feature нэмэх

---

## Session агуулга (товч)

**Миний асуулт:**
> "Add search by title/description and filter by priority/status to the existing getAllTasks function. Use query parameters. Make sure SQL injection is prevented."

**Claude-ийн хийсэн зүйл:**
- `getAllTasks(filters)` function-д dynamic WHERE clause нэмсэн
- Query parameter validation controller-д нэмсэн
- `LIKE ?` pattern parameterized query-аар

---

## Hallucination олсон

**Асуудал:** Claude `LIKE '%' || ? || '%'` syntax санал болгосон — энэ нь зарим SQLite version-д ажилладаг ч `better-sqlite3`-д тогтвортой биш.

```js
// Claude санал болгосон (тогтворгүй):
query += ' AND title LIKE \'%\' || ? || \'%\'';
params.push(filters.search);

// Зөв (JavaScript template literal):
query += ' AND title LIKE ?';
params.push(`%${filters.search}%`);
```

**Засвар:** JavaScript дотор `%` нэмж, энгийн `?` placeholder ашигласан.

---

## Дүгнэлт

- Dynamic query building pattern ойлгомжтой байсан
- SQL syntax-ийн жижиг ялгааг өөрөө шалгах хэрэгтэй
