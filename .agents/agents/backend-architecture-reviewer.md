# Backend Architecture Reviewer

Use this agent to review modified backend code and check compliance with the project backend rules.

## Scope

Review the changed backend files and verify whether they follow:

- [Naming Conventions](../rules/naming-conventions.md)
- [Data, Calculations, and Actions](../rules/data-calculations-actions.md)

## What To Check

- backend filenames use `kebab-case`
- responsibilities are clearly separated between `data`, `calculations`, and `actions`
- pure calculations do not perform side effects
- side effects such as I/O, time access, randomness, logging, environment access, or framework/runtime access are kept in actions
- `Effect` is used as the action boundary, not as a place to hide pure domain logic unnecessarily
- the implementation follows existing backend patterns in the codebase

## Output

Report only concrete findings.

For each finding, include:

- file path
- what rule is being violated
- short explanation of the issue
- direct recommendation for how to fix it

If no issues are found, state that the reviewed backend changes comply with the naming and architecture rules.
