# template-02

Electron desktop app template with an Effect backend and React frontend.

## Agent Guidance

Project-specific agent guidance lives in [.agents/AGENTS.md](/abs/path/c:/Users/camat/code/template-02/.agents/AGENTS.md).

Use it as the entry point for repository rules, reusable skills, and agent-specific Markdown definitions.

## Tech Stack

### Backend

- Electron
- Effect
- TypeScript
- Vite

### Frontend

- React
- React DOM
- TanStack Query
- i18next
- Tailwind CSS
- TypeScript
- Vite

## Package Manager

This project uses `pnpm`.

## Commands

- `pnpm start` - start the app in development mode
- `pnpm build` - package the app
- `pnpm package` - package the app
- `pnpm make` - create distributables
- `pnpm publish` - publish distributables
- `pnpm lint` - run ESLint
- `pnpm lint:fix` - run ESLint with automatic fixes
- `pnpm format` - run Prettier
- `pnpm typecheck` - run TypeScript type checking

## Linting

Linting is handled by ESLint with TypeScript support.

- Config: [eslint.config.mjs](/abs/path/c:/Users/camat/code/template-02/eslint.config.mjs:1)
- Run checks: `pnpm lint`
- Apply automatic fixes: `pnpm lint:fix`

## Formatting

Formatting is handled by Prettier.

- Config: [.prettierrc.json](/abs/path/c:/Users/camat/code/template-02/.prettierrc.json:1)
- Ignore rules: [.prettierignore](/abs/path/c:/Users/camat/code/template-02/.prettierignore:1)
- Format the repo: `pnpm format`

## Conventional Commits

Commit messages are validated with Husky using the Conventional Commits format:

```text
type(scope): description
```

Supported types:

- `build`
- `chore`
- `ci`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`

Rules:

- scope is optional
- `!` is allowed for breaking changes
- the description must be 100 characters or fewer

Examples:

```text
feat(ui): add sidebar layout
fix: handle missing preload bridge
refactor(api)!: simplify runtime contract
```

## Git Hooks

### Pre-commit

Before each commit, the project runs:

- Prettier
- ESLint with fixes
- TypeScript typecheck
- tests, only if a `test` script exists

### Pre-push

Before each push, the project runs:

- `pnpm build`
