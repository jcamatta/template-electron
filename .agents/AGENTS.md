# Agent Rules

This directory contains project-specific guidance, reusable instructions, and agent definitions for code assistants working in this repository.

Repository reference:

- [README.md](../README.md)
- Effect LLM reference: `https://effect.website/llms.txt`
- Tailwind CSS documentation reference: use the latest official Tailwind CSS documentation before assuming syntax or behavior

## Required Startup Context

At the start of every session in this repository, read these files before making changes:

1. `README.md`
2. `.agents/AGENTS.md`
3. every file in `.agents/rules/`

Treat those files as mandatory project context for the session.

Do not defer reading rule files based on task relevance.

## Communication

Communicate with the user directly, briefly, and without unnecessary detail.

Keep responses short, concise, and focused on the point under discussion. Avoid long explanations and avoid bullet points unless structure is necessary.

Do not assume business rules or business behavior. If they are not explicit in the code or the request, ask the user.

Analyze the user's indications against the project rules. When a request has tradeoffs, conflicts with the rules, or creates important consequences, state that clearly and provide recommendations or suggestions the user should notice before implementation.

Explain things in simpler, natural language. Prefer clarity over formal or abstract wording.

When proposing a solution or explaining how something works, include at least one concrete example so the user can see how it works in practice.

When discussing an idea, use this frame:

problem, types of solutions, tradeoffs of each solution, recommendation

When writing code:

- follow the rules in this directory
- use the existing codebase as the reference for patterns and implementation style
- do not assume how Tailwind CSS works in this project
- this project uses Tailwind CSS v4
- always check the latest Tailwind CSS documentation before using or explaining Tailwind features, utilities, or theme behavior

## Structure

### `rules/`

The `rules/` folder contains project rules that agents must follow while making changes.

It is used for conventions such as:

- commit message rules
- architecture and code organization rules
- UI and design-system rules
- other mandatory implementation constraints

### `skills/`

The `skills/` folder contains reusable skills, commands, or prompt-like instructions that can be invoked by an agent.

These are intended for repeatable workflows, reusable prompts, or task-specific operating instructions that should not be rewritten every time.

### `agents/`

The `agents/` folder contains Markdown files for specific agent types that Claude Code or Codex can invoke.

Each file can define the role, behavior, scope, or specialization of a given agent so it can be used consistently for a specific kind of task.

This folder can also contain review agents that inspect modified code for compliance with project rules.

Agent references:

- [Frontend Rules Reviewer](./agents/frontend-rules-reviewer.md)
- [Backend Architecture Reviewer](./agents/backend-architecture-reviewer.md)

## Rule Index

References:

- [Conventional Commits](./rules/conventional-commits.md)
- [Data, Calculations, and Actions](./rules/data-calculations-actions.md)
- [Design Tokens Only](./rules/design-tokens-only.md)
- [Base UI Primitives Only](./rules/base-ui-primitives-only.md)
- [Naming Conventions](./rules/naming-conventions.md)
- [Test Structure: 3A](./rules/test-3a.md)
- [Project Architecture](./rules/project-architecture.md)
- [IPC API Conventions](./rules/ipc-api-conventions.md)
