# ADR-001: Stack Selection — Node.js + Express + SQLite

**Date**: 2025-01-xx  
**Status**: Accepted  
**Deciders**: Оюутан + Claude (AI planning session)

---

## Context

Personal Task Tracker REST API-д stack сонгох шаардлага гарсан.  
Шалгуурууд: хурдан хөгжүүлэлт, энгийн setup, сайн test ecosystem, AI tooling support.

## Decision

**Node.js + Express + SQLite** stack сонгосон.

## Alternatives Considered

| Stack | Яагаад сонгоогүй |
|---|---|
| Python + FastAPI + SQLite | FastAPI шинэ, Python venv setup нэмэлт цаг |
| Node + Hono + PostgreSQL | PostgreSQL жижиг проектод хэт том, Hono танихгүй |

## Consequences

### Сайн тал
- Нэг командаар (`npm install`) setup дуусна
- SQLite — файл л, тусдаа DB сервер хэрэггүй
- Jest + supertest-ийг дотроо мэддэг
- Claude Express жишээг маш сайн мэддэг → hallucination бага

### Муу тал
- OpenAPI-г гараар бичих хэрэгтэй (FastAPI шиг автомат биш)
- Async-г хожим scale хийхэд дахин авч үзэх хэрэгтэй

## Notes

AI (Claude) stack харьцуулалтад оролцсон.  
Claude SQLite in-memory ашиглан тест бичих аргыг санал болгосон — энэ шийдвэрийг хүлээн зөвшөөрсөн.
