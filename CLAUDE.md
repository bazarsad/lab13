# CLAUDE.md

AI coding assistant-д зориулсан заавар. Энэ файлыг үргэлж уншаад ажилла.

## Project Overview

Personal Task Tracker — Node.js + Express + SQLite REST API.

## Build Commands

```bash
cd partB
npm install        # dependencies суулгах
npm start          # сервер эхлүүлэх (port 3000)
npm test           # бүх тест ажиллуулах
npm run dev        # nodemon-оор dev mode
```

## Conventions

- **Language**: JavaScript (ES6+), CommonJS (`require`)
- **Naming**: camelCase variables/functions, PascalCase classes
- **Files**: kebab-case (`task-routes.js`, `db-helper.js`)
- **Commits**: Conventional Commits (`feat`, `fix`, `docs`, `test`, `refactor`, `chore`)
- **Error handling**: try/catch бүх async function-д, HTTP status code зөв ашиглах
- **Validation**: input бүрийг routes дээр шалгах

## Architecture

```
routes/ → controllers/ → db/
```

- Routes: HTTP layer зөвхөн, logic байхгүй
- Controllers: business logic
- DB: SQLite query-нууд

## No-Go Zones

- `eval()` ашиглахгүй
- `.env` файлыг commit хийхгүй
- Raw SQL string concatenation хийхгүй (SQL injection) — parameterized query ашиглана
- `node_modules/` commit хийхгүй
- Test файлуудыг шууд өөрчлөхгүй — test helper ашиглана
- `console.log` production код-д үлдээхгүй

## Testing

- Framework: Jest
- Test файлууд: `tests/*.test.js`
- Mock: SQLite in-memory database ашиглана
- Coverage: happy path + edge cases + error cases

## Security Rules

- SQL injection: parameterized queries заавал
- Input validation: title хоосон байж болохгүй, priority зөвхөн low/medium/high
- HTTP методыг зөв ашиглах (GET мэдээлэл авахад, DELETE устгахад)
