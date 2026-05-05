# Test Structure: 3A

All tests should follow the 3A pattern:

- Arrange
- Act
- Assert

## Rule

- Structure tests so setup is clearly separated from execution and verification.
- Keep the action under test focused and easy to identify.
- Keep assertions explicit and directly tied to the behavior being verified.
- Separate `Arrange`, `Act`, and `Assert` with explicit comments such as `// Arrange`, `// Act`, and `// Assert`.

## Goal

- tests are easier to read
- intent is easier to understand
- failures are easier to diagnose
