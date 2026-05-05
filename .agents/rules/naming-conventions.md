# Naming Conventions

Follow these naming conventions across the project.

## Frontend

- Components must use `PascalCase` filenames in the format `ComponentName.tsx`.
- Components may also use `index.tsx` when the parent folder uses `PascalCase`.
- Hooks must use the `use<HookName>` pattern.
- Hooks may also use `index.ts` or `index.tsx` when the parent folder uses the `use<HookName>` pattern.
- Other frontend files should use `kebab-case`.
- Other frontend files may also use `index.ts` when the parent folder uses `kebab-case`.

Examples:

- `UserCard.tsx`
- `UserCard/index.tsx`
- `use-user-preferences.ts`
- `useUserPreferences/index.ts`
- `user-profile-form.ts`
- `user-profile-form/index.ts`

## Backend

- All backend files must use `kebab-case`.
- Do not use `PascalCase` or other naming styles for backend filenames.
- IPC endpoints must also use `kebab-case`.
- Backend files may use `index.ts` when the parent folder uses `kebab-case`.
- Backend test files should use `kebab-case.test.ts` or `index.test.ts` when the parent folder uses `kebab-case`.

Examples:

- `create-user.ts`
- `create-user/index.ts`
- `create-user/index.test.ts`
- `session-repository.ts`
- `calculate-invoice-total.ts`
- `user-profile:get-by-id`
