# /docs — Generate Documentation

Generate documentation for the provided code.

## JSDoc Comments
Add JSDoc comments to all functions:
```js
/**
 * Brief description of what the function does
 * @param {Type} paramName - description
 * @returns {Type} description of return value
 * @throws {Error} when does it throw
 * @example
 * functionName(arg1, arg2) // → expected result
 */
```

## README Section
Generate a markdown section for README.md:
- Function/endpoint name as heading
- Purpose in one sentence
- Parameters/request body with types
- Response/return value
- Example usage (curl for APIs, code for functions)

## Rules
- Be concise — one line per param is enough
- Include example with realistic values
- Note any side effects or important behaviors
