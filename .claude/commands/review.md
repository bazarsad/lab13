# /review — Security & Robustness Review

Review the provided code for the following issues and provide a structured report:

## Security (OWASP Top 10)
- SQL Injection: Are all queries parameterized? No string concatenation in SQL?
- Input Validation: Is all user input validated before use?
- Error Handling: Do error responses leak stack traces or internal info?
- Sensitive Data: Are passwords, tokens, or secrets exposed?

## Robustness
- Are all edge cases handled? (empty string, null, undefined, negative numbers)
- Are HTTP status codes correct? (400 for validation, 404 for not found, 500 for server errors)
- Is there proper error handling for database failures?
- Are async errors caught?

## Code Quality
- Is there any dead code or unused variables?
- Are there any obvious performance issues?

## Output Format
Provide findings as:
- ✅ PASS: [what is good]
- ⚠️ WARNING: [potential issue] → [suggested fix]
- ❌ FAIL: [critical issue] → [required fix]
