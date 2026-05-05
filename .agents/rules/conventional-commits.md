# Conventional Commits

Use the Conventional Commits format for every commit message:

`<type>(<scope>): <description>`

Reference:

- Official specification: `https://www.conventionalcommits.org/en/v1.0.0/#specification`

Rules:

- Use one of these types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Keep the description short, imperative, and lowercase when possible.
- Use a scope when it clarifies the area changed, for example: `feat(auth): add refresh token flow`.
- Do not end the subject line with a period.
- If the change is breaking, add `!` after the type or scope, for example: `feat(api)!: remove v1 endpoints`.
- Add a body only when more context is needed, especially for rationale or migration notes.
- Keep the body concise and focused on the essential context.
- Add a footer for breaking changes or linked issues when relevant, for example: `BREAKING CHANGE:` or `Refs: #123`.
- Never add `Co-authored-by` lines or co-author footers.

Examples:

- `feat(ui): add empty state for invoices`
- `fix(api): handle null user id in session lookup`
- `docs(readme): clarify local setup steps`
- `chore(deps): upgrade vite to latest stable version`
