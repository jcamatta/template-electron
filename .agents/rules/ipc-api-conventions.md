# IPC API Conventions

Follow these conventions for the API contract between backend and frontend over IPC.

## Endpoint Naming

- IPC endpoint names must use `kebab-case`.
- IPC endpoints should follow the shape `<vertical>:<operation>`.

Examples:

- `user-profile:get-by-id`
- `invoice:create-draft`
- `ping:send`

## Response Shape

- Every IPC response must use the same result sum type shape.
- Success responses must be:

`{ ok: true, value: T }`

- Failure responses must be:

`{ ok: false, error: Err }`

Use this union shape:

`{ ok: true, value: T } | { ok: false, error: Err }`

## Error Shape

- Every error must use the same object shape.
- Errors must always include a `code`.
- Errors must always include a `message`.
- Errors may include an optional `context`.

Use this shape:

`{ code: string, message: string, context?: unknown }`

## Error Code Convention

- Error codes must be stable string identifiers.
- Error codes should use uppercase snake case.

Examples:

- `USER_NOT_FOUND`
- `INVOICE_ALREADY_PAID`
- `INVALID_SESSION`

## Goal

- frontend and backend share a predictable IPC contract
- success and error handling stay uniform across verticals
- error codes remain stable and machine-readable
