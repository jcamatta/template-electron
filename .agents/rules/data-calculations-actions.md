# Data, Calculations, and Actions

Organize both backend and frontend code around three distinct categories:

- `data`
- `calculations` (pure functions)
- `actions`

The goal is to make code easier to test, reason about, and refactor by keeping side effects isolated and business logic pure whenever possible.

## Categories

### Data

`data` represents values, state shapes, payloads, schemas, DTOs, config objects, and domain models.

Rules:

- Keep data structures simple and explicit.
- Prefer immutable data and avoid hidden mutation.
- Data modules should not perform I/O or trigger side effects.
- Validation and decoding can live close to data definitions when they describe the structure of the data.

Examples:

- TypeScript types and interfaces
- Zod or Schema definitions
- API payload shapes
- View model objects

### Calculations

`calculations` are pure functions. They receive data, return data, and do not perform side effects.

Rules:

- A calculation must be deterministic for the same input.
- A calculation must not read from global state, network, filesystem, database, clock, random generator, or environment variables directly.
- Calls such as `randomUUID`, `Date.now`, `new Date`, or similar time/random APIs are side effects and must not appear inside calculations.
- Calculations must stay pure and always return the same result for the same input.
- Avoid implicit inputs and implicit outputs.
- A calculation should depend only on its explicit function inputs and return its result explicitly.
- Do not let values enter from outside the function interface through global state, mutable module state, hidden singletons, ambient context, or other implicit dependencies.
- A calculation must not mutate its inputs.
- Business rules, derived values, transformations, formatting decisions, and decision trees should prefer this layer.
- Calculations should be easy to unit test without mocks.

Examples:

- totals, aggregates, and pricing logic
- validation rules that return errors instead of throwing side effects
- mapping API data to domain or UI data
- permission and feature decision logic

### Actions

`actions` are effectful operations. They interact with the outside world or orchestrate side effects.

Rules:

- Actions may call APIs, databases, storage, frameworks, logs, clocks, random generators, or other runtime services.
- Actions should be thin orchestration layers around pure calculations and explicit data models.
- Keep business logic out of actions when it can be expressed as pure calculations.
- Actions should assemble dependencies, execute effects, and map results back into data.

Examples:

- HTTP handlers
- repository calls
- persistence
- event publishing
- UI event handlers that trigger navigation, requests, or storage

## Backend Guidance

In the backend, use `Effect` to model actions and side effects explicitly.

Rules:

- Treat `Effect`-based workflows as `actions`, not `calculations`.
- Keep pure domain logic outside `Effect` when no side effect is required.
- Use `Effect` to sequence I/O, dependency access, error handling, and orchestration.
- Use `Effect` requirements to make dependencies explicit instead of relying on hidden globals or implicit ambient state.
- Call pure calculations from inside `Effect` pipelines instead of embedding all logic directly in the effect.
- Prefer a structure where `data` defines shapes, `calculations` implement domain rules, and `actions` expose `Effect` programs.

Preferred split:

- `data`: entities, schemas, command/query payloads, domain value objects
- `calculations`: domain rules, derivations, transforms, decision logic
- `actions`: `Effect` programs, handlers, repositories, integrations

## Frontend Guidance

Apply the same separation in frontend code.

Rules:

- Keep components focused on rendering and wiring user interactions.
- Move derived state, mapping, filtering, sorting, and business decisions into pure calculations.
- Keep network requests, storage access, navigation, timers, and framework side effects in actions.
- Prefer passing plain data into views instead of mixing data fetching and business logic deep inside components.

Preferred split:

- `data`: props shapes, view models, form state models, API response types
- `calculations`: selectors, derived UI state, transforms, formatting rules, validation logic
- `actions`: fetch calls, mutations, event handlers, router actions, persistence

## Testing Guidance

- Test `calculations` with direct unit tests and no mocks.
- Test `data` with validation or structural expectations when needed.
- Test `actions` with integration tests or focused mocks around external dependencies.
- When code is hard to test, first check whether responsibilities from `actions` can be moved into pure `calculations`.
