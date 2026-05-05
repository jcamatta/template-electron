# Base UI Primitives Only

All UI components must be created using Base UI primitives. This is a strict rule.

Reference:

- Base UI LLM reference: `https://base-ui.com/llms.txt`

## Rule

- Always use Base UI primitives when building interactive UI components.
- Do not use raw HTML controls such as `<button>`, `<input>`, `<select>`, `<textarea>`, or similar elements directly when a Base UI primitive exists for that purpose.
- Prefer the corresponding Base UI primitive, for example `Button` instead of a raw HTML `button`.
- Use Base UI composition patterns instead of recreating component behavior manually.

## Required Behavior

- Always check the Base UI documentation before creating a new component or using an existing Base UI component.
- Use the docs to confirm the correct primitive, composition pattern, accessibility behavior, and supported API.
- If a needed primitive exists in Base UI, use it.
- If the needed primitive does not exist or the correct usage is unclear, stop and ask the user before implementing a custom solution.

## Applies To

- buttons
- inputs
- selects
- dialogs
- popovers
- menus
- tooltips
- tabs
- switches
- checkboxes
- radios
- sliders
- toasts
- form controls
- any other interactive or accessible UI building block covered by Base UI

## Prohibited Patterns

- raw `<button>` usage when a Base UI `Button` should be used
- hand-rolled dialog, popover, menu, tooltip, or select behavior when a Base UI primitive exists
- bypassing Base UI accessibility and composition APIs for convenience
- creating a custom component first and checking Base UI later

## Preferred Outcome

- UI behavior stays consistent and accessible.
- Component APIs follow the same primitive system across the project.
- Accessibility and interaction logic come from Base UI instead of ad hoc implementations.
