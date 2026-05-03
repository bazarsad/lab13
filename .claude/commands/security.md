# /security — OWASP Top 10 Security Check

Perform a security audit of the provided code against OWASP Top 10.

## Checks

**A01 — Broken Access Control**
- Are there any unprotected admin endpoints?
- Can users access other users' data?

**A02 — Cryptographic Failures**
- Are any passwords stored in plain text?
- Is sensitive data transmitted without encryption?

**A03 — Injection (SQL, NoSQL, Command)**
- Are all SQL queries parameterized?
- Is user input used directly in queries?
- Is there any `eval()` or dynamic code execution?

**A04 — Insecure Design**
- Are there rate limiting considerations?
- Is there any missing business logic validation?

**A05 — Security Misconfiguration**
- Are default credentials used?
- Are error messages too verbose (stack traces)?

**A06 — Vulnerable Components**
- Check `package.json` for known vulnerable packages

**A07 — Identification & Auth Failures**
- Are there any authentication bypasses?

**A09 — Logging & Monitoring**
- Are security events logged?
- Are logs storing sensitive data?

## Output Format
For each check:
- ✅ Secure: [what is protected]
- ⚠️ Risk: [issue] → [mitigation]
- ❌ Vulnerable: [critical issue] → [fix required]
