# /commit — Generate Conventional Commit Message

Generate a git commit message for the provided changes (diff or description).

## Format
```
type(scope): short description (max 72 chars)

[optional body: what changed and why, not how]

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Types
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `test` — adding or updating tests
- `refactor` — code change without feature/fix
- `chore` — build, config, dependency changes

## Scope (for this project)
- `tasks` — task CRUD operations
- `db` — database layer
- `routes` — HTTP routing
- `tests` — test files
- `docs` — documentation files
- `config` — configuration

## Rules
- Use imperative mood: "add" not "added" or "adds"
- No capital letter at start, no period at end
- If AI helped write this code, include Co-Authored-By line
- Body explains WHY, not WHAT (the diff shows what)

## Output
Provide only the commit message, ready to copy-paste.
