# PROJECT.md — Personal Task Tracker

## Сэдэв

Personal Task Tracker — хувийн даалгаврын удирдлагын систем.

## Зорилго

Хэрэглэгч өдөр тутмын даалгавруудаа нэмж, засаж, устгаж, хайж, шүүж чаддаг  
энгийн REST API + минимал frontend систем бүтээх.

## Scope (юу хийх)

| Feature | Тайлбар |
|---|---|
| Task CRUD | Таск үүсгэх, харах, засах, устгах |
| Priority | low / medium / high гурван түвшин |
| Due date | Огноо тохируулах |
| Search | Гарчгаар хайлт |
| Filter | Priority болон status-аар шүүлт |

## Out of Scope (энэ удаа хийхгүй)

- User authentication / login
- Multi-user support
- File attachment
- Email notification

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (better-sqlite3)
- **Testing**: Jest + supertest
- **Docs**: OpenAPI 3.0

## Хугацааны төлөвлөгөө

| Өдөр | Хийх зүйл |
|---|---|
| 1 | Part A — план, архитектур, документ |
| 2 | Setup, DB schema, Task CRUD |
| 3 | Priority/due date feature, тест |
| 4 | Search/filter, OpenAPI, slash commands |
| 5 | Part C — Reflect, AI Usage Report |
