---
name: technology-selector
description: Clarify requirements for a new service, select the best fit from the bundled web-lite, ts-platform, and ai-platform scaffolds, create the project, and explain the resulting stack and tradeoffs. Use when the user wants a new project selected and instantiated from this three-template kit; do not use for generic comparisons or modifications to an existing project.
---

# Technology Selector

Turn an initial product idea into a verified starter project without choosing a stack from keywords alone.

Before interviewing the user or selecting a template, read [references/scaffold-catalog.md](references/scaffold-catalog.md). It is the source of truth for the available templates and generator contract.

## Understand the project

Use facts already supplied by the user. Ask only questions whose answers can change the scaffold, architecture, or generated project. If the request is shallow, interview the user in focused batches and wait for each response; do not send a long questionnaire at once.

Cover the relevant dimensions:

- target users, business outcome, core user journeys, and acceptance criteria;
- Web/mobile/API surfaces, authentication, roles, admin, billing, and integrations;
- authoritative data, important relationships, expected volume, privacy, and compliance;
- scheduled work, queues, crawling, AI/data workloads, model providers, and retry requirements;
- traffic, concurrency, latency, availability, deployment target, budget, and team language skills;
- MVP boundaries, explicit non-goals, project name, and parent output directory.

Continue until no unanswered question could reasonably change the template selection or initial project boundary. Do not ask for details that can safely remain feature-level decisions after creation. Summarize the understood requirements and call out material assumptions before selecting.

## Select the scaffold

Apply the decision rules in the catalog. Consider workload shape, team ecosystem, operational needs, and likely near-term evolution together. A mention of AI does not automatically require `ai-platform` when the product only makes simple external LLM API calls; substantial Python, crawling, data, or long-running workloads do.

If two templates remain genuinely plausible, explain the deciding tradeoff and ask the user rather than silently choosing. If the requirements conflict with all three templates, identify the gap and request direction instead of inventing a fourth scaffold.

## Resolve creation details

Resolve the plugin root from this installed Skill instead of assuming a user-specific path. Starting at `skills/technology-selector/SKILL.md`, move up through `technology-selector` and `skills`; the next directory is the plugin root. Verify that its `plugin.json`, `package.json`, `create.mjs`, and selected template directory exist. Never hard-code a home directory or the original author's checkout path.

The generator requires a lowercase kebab-case slug. If the requested name uses spaces, capitals, or underscores, propose the normalized slug and mention the change before creation. Resolve the parent output directory; use the current working directory only when that location is clearly appropriate.

Inspect the exact destination before writing. Never overwrite a non-empty directory. Use `--force` only when the user explicitly requests it and the destination has been verified empty. Honor requests to skip dependency installation or Git initialization.

Once the user has asked for project creation and all material choices are resolved, creation itself needs no redundant confirmation. Run the bundled generator from any working directory:

```bash
pnpm --dir <plugin-root> scaffold <web-lite|ts-platform|ai-platform> <project-slug> --output <parent-directory>
```

Do not start Docker services, apply database migrations, deploy, push, or create remote resources unless the user separately requests those actions.

## Verify and hand off

After generation:

1. Confirm the destination and expected scaffold files exist.
2. Run `pnpm check`; also run `pnpm build` when dependencies were installed.
3. If verification cannot run, state exactly why rather than calling the project ready.

Report:

- the selected template and absolute project path;
- the frontend, backend, database, ORM/migration, authentication, queue/worker, validation, testing, and delivery stack actually included;
- requirement-specific reasons for the selection and why the other two templates were not chosen;
- deliberate omissions or follow-up decisions;
- the exact next commands for local development, without running them unless requested.
