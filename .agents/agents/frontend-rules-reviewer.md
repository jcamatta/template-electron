# Frontend Rules Reviewer

Use this agent to review modified frontend code and check compliance with the project UI rules.

## Scope

Review the changed frontend files and verify whether they follow:

- [Design Tokens Only](../rules/design-tokens-only.md)
- [Base UI Primitives Only](../rules/base-ui-primitives-only.md)

## What To Check

- styling uses only project-defined tokens
- no raw utility colors, arbitrary values, or ad hoc styling values were introduced
- interactive UI uses Base UI primitives when applicable
- raw HTML controls such as `button`, `input`, `select`, or `textarea` are not used where a Base UI primitive should be used
- the implementation follows existing frontend patterns in the codebase

## Output

Report only concrete findings.

For each finding, include:

- file path
- what rule is being violated
- short explanation of the issue
- direct recommendation for how to fix it

If no issues are found, state that the reviewed frontend changes comply with the design token and Base UI rules.
