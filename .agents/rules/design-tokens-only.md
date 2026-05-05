# Design Tokens Only

All styling must use the design tokens defined by the project. This is a strict rule.

## Rule

- Only use tokens that already exist in the project.
- Do not introduce raw utility values, raw hex colors, arbitrary spacing values, or one-off semantic names if they are not already defined.
- Do not use classes like `bg-red-500`, `text-blue-600`, arbitrary Tailwind values, or direct style values when the project expects tokens.
- Always prefer the project token equivalent, for example `bg-destruction-50` or another defined semantic token.

## Applies To

- colors
- background colors
- text colors
- border colors
- spacing
- sizing
- radius
- shadows
- typography
- z-index
- motion values
- any other tokenized design primitive used by the project

## Required Behavior

- Before adding or changing styles, use the tokens already defined in the codebase or design system.
- If the needed token does not exist, do not invent a new raw value in code.
- If the project is missing a token for the intended use, ask the user to define or approve a new token.
- Keep semantic naming aligned with the project conventions instead of introducing personal naming choices.

## Prohibited Examples

- `bg-red-500`
- `text-[#ff0000]`
- `p-[13px]`
- `style={{ background: "#f00" }}`
- introducing a new token-like class name that is not defined by the project

## Preferred Outcome

- UI code stays consistent with the project design language.
- Tokens remain the single source of truth for styling decisions.
- When the token set is insufficient, expand the token system intentionally instead of bypassing it.
