# Project Architecture

Follow these project organization rules for backend and frontend code.

## Backend

The backend follows a vertical slice onion architecture.

### Vertical Slices

- Organize backend code by `verticals`.
- A vertical groups code that shares the same language, domain, and APIs.
- Prefer keeping related inbound, core, and outbound code together inside the same vertical.
- A vertical is close to a bounded context.
- Keep code in the same vertical when it operates on the same concept, talks the same language, uses the same main objects, and belongs to the same user area.
- Split code into different verticals when it represents a different domain, uses different language, has different rules, or depends on different integrations.

Good rule:

- same vertical if they operate on the same concept and belong to the same user area
- different vertical if they represent a different domain with different language, rules, and integrations

### Layers

Inside each vertical, distinguish these three file types:

- `inbound`
- `core`
- `outbound`

Use shared backend modules for cross-vertical contracts:

- `src/backend/common/core` for shared core-level types or interfaces
- `src/backend/common/inbound` for shared inbound IPC contracts such as result and error shapes

Use `src/shared` only for contracts that are shared between backend and frontend:

- `src/shared` is for true cross-boundary contracts such as IPC endpoint contracts
- do not put frontend-backend shared contracts inside `src/backend/common`

#### Inbound

- inbound files are entry points such as IPC handlers
- inbound can import `core`
- inbound can import IPC contracts from `src/shared`
- inbound must not contain domain logic that belongs in `core`

#### Core

- core contains domain logic and business rules
- core must be independent from inbound and outbound details
- core must not depend directly on HTTP, database, framework, IPC, or third-party API details
- `Effect` is allowed in core and can be used there
- When a core module groups multiple concerns in one file, keep this order:
  data first, then errors, then services or interfaces, then calculations, then actions, and finally the function that orchestrates everything
- Separate those sections with clear comments such as `== DATA ==`, `== ERRORS ==`, `== SERVICES ==`, `== CALCULATIONS ==`, and `== ACTIONS ==`

#### Outbound

- outbound files contain integrations such as database access or third-party APIs
- outbound can import `core` when needed
- outbound must keep infrastructure details outside of core

### Dependency Direction

Dependency direction must be respected.

- `inbound` can depend on `core`
- `inbound` can depend on `src/shared` contracts
- `outbound` can depend on `core`
- `core` must not depend on `inbound`
- `core` must not depend on `outbound`
- `core` must not depend on `src/shared` IPC contracts
- `src/shared` contracts must not depend on backend inbound, backend core, backend outbound, or frontend implementation code

For IPC contracts:

- `ipc-contract` is the shared source of truth for endpoint names and request/response types
- backend inbound or module code may import from `ipc-contract`
- preload may import from `ipc-contract`
- frontend code may consume types that come from preload or shared wrappers built on `ipc-contract`
- `ipc-contract` must stay dumb and independent
- `ipc-contract` must not import from backend handler files such as `backend/<vertical>/inbound/create-user`

This is a hard rule of the onion architecture.

### Typical Feature Flow

When adding a typical feature that crosses backend and frontend, follow this flow:

1. Add the shared IPC contract in `src/shared/ipc-contract/<feature>.ts`.
2. Define the endpoint contract there:
   endpoint, request type, success response type, and error union type.
3. Add backend `core` code inside the vertical folder.
4. Keep backend `core` independent from `src/shared`.
5. Add backend `handler` code in the same vertical.
6. In the handler, import the IPC contract types, map request data into core input, call core, and map the core result back to the IPC response shape.
7. Register the handler in `src/backend/register-handlers.ts` using the endpoint from the shared IPC contract.
8. Expose the typed IPC call through `src/backend/preload.ts` using `window.api.invoke(...)`.
9. Add a frontend `lib/<feature>.ts` function that calls the shared endpoint through `window.api`.
10. Add a frontend hook only if the UI needs orchestration such as loading state, translations, React Query, retries, or stateful composition.
11. Use the hook or the lib function from a Base UI component.

Example:

- `src/shared/ipc-contract/ping.ts`
- `src/backend/ping/core.ts`
- `src/backend/ping/handler.ts`
- `src/backend/register-handlers.ts`
- `src/frontend/lib/ping.ts`
- `src/frontend/hooks/usePing.ts`
- `src/frontend/components/PingPanel.tsx`

Responsibility split:

- `src/shared/ipc-contract/*` defines the transport contract
- backend `core` defines domain logic
- backend `handler` adapts IPC input/output to core
- `register-handlers.ts` binds Electron IPC to handlers
- frontend `lib` calls the endpoint
- frontend `hooks` add UI behavior
- frontend `components` render the UI

## Frontend

The frontend is organized around:

- `hooks`
- `components`
- `lib`

### Hooks

- hooks contain reusable UI behavior and stateful orchestration
- different components should be able to solve similar UI needs by reusing the same hooks when appropriate

### Components

- components contain Base UI and React components
- components can be organized by `screens`
- each screen can contain its own local components
- shared or root components can exist when they are reused across screens or across other components

### Lib

- lib contains library-specific setup and integration code
- use `lib` for things such as `i18n`, React Query, and other library-specific concerns

### Goal

- backend code stays isolated by domain and dependency direction
- frontend code stays reusable and easier to compose
- business logic remains easier to test and evolve
