# /test — Generate Tests (Testing Pyramid)

Generate Jest unit/integration tests for the provided code.

## Test Coverage Requirements

### Happy Path
- Normal inputs that should succeed
- Verify correct response status codes
- Verify response body structure and values

### Edge Cases
- Empty strings, null, undefined values
- Boundary values (very long strings, zero, negative numbers)
- Special characters in inputs
- Missing optional fields

### Error Cases
- Invalid input types
- Non-existent IDs (404)
- Duplicate data (if applicable)
- Database/server errors (mock if needed)

## Format Rules
- Use `describe()` blocks to group related tests
- Each `test()` should test ONE thing
- Use meaningful test names: "returns 400 when title is empty"
- Use `expect().toMatchObject()` for partial matching
- Add `afterAll(() => closeDb())` for cleanup

## Output
Provide complete, runnable Jest test code using supertest for HTTP testing.
