# ADR-002: Partial Update vs Full Replace Strategy

**Date**: Build 3-р өдөр  
**Status**: Accepted  
**Deciders**: Оюутан + Claude (AI session)

---

## Context

`PUT /api/tasks/:id` endpoint-д шийдэх асуудал гарсан:  
Хэрэглэгч зөвхөн `{ "status": "done" }` дамжуулбал:

**Сонголт A — Full Replace:** Дамжуулаагүй field-уудыг `NULL` болгох  
**Сонголт B — Partial Update:** Зөвхөн дамжуулсан field-уудыг шинэчлэх, бусдыг хэвээр үлдээх

---

## AI-тай хийсэн ярилцлага (товч)

**Асуулт:** "What's the best approach for PUT endpoint — full replace or partial update? Consider REST semantics and developer experience."

**Claude-ийн хариу:**
- Strict REST-ийн дагуу `PUT` = full replace, `PATCH` = partial update
- Практик дээр жижиг API-д `PUT`-г partial update болгодог нь түгээмэл
- Full replace нь developer error-т хүргэдэг (field мартаад NULL болгочихно)

**Шийдвэр:** Partial update — лабораторын ажлын хамрах хүрээнд developer experience илүү чухал.

---

## Decision

**Partial Update** хэрэгжүүлсэн — `PUT /api/tasks/:id` нь зөвхөн дамжуулсан field-уудыг шинэчилнэ.

```js
const updated = {
  title: data.title !== undefined ? data.title : existing.title,
  priority: data.priority !== undefined ? data.priority : existing.priority,
  // ...
};
```

---

## Consequences

### Сайн тал
- Developer нэг field шинэчлэхэд бүх object дамжуулах шаардлагагүй
- Accidental data loss байхгүй
- Frontend-ийн ажил хялбар

### Муу тал
- Strict REST semantics дагаагүй (`PATCH` ашиглах ёстой байсан)
- Хожим `PATCH` нэмэх шаардлага гарвал confused байж болно

### Тэмдэглэл
Хэрэв API public болвол `PUT` (full replace) болон `PATCH` (partial) хоёуланг implement хийх нь зүйтэй.
