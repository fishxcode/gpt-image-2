# Contributing

Thanks for your interest in contributing. This project is MIT-licensed and welcomes focused, practical improvements.

## Project Overview

This is a frontend project built with TanStack Start, React, and TypeScript. User-provided API keys are handled in the browser and must never be committed to the repository.

## Getting Started

1. Fork and clone the repository.
2. Install dependencies with your package manager of choice.
3. Start local development:

```bash
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

Use formatting when needed:

```bash
npm run format
```

## Contribution Guidelines

- Keep changes small, focused, and easy to review.
- Prefer simple implementations over broad abstractions.
- Avoid unrelated refactors in feature or bug-fix pull requests.
- Keep TypeScript types explicit where they improve readability or safety.
- Match the existing code style and project structure.
- Update documentation when behavior, setup, or usage changes.

## Security and Secrets

- Do not commit API keys, tokens, credentials, `.env` files, or generated secrets.
- Treat user-provided API keys as sensitive data.
- Store keys only in browser-local storage mechanisms already used by the project.
- Remove sensitive values from screenshots, logs, test fixtures, and issue reports.

## Issues

Before creating an issue:

- Search existing issues to avoid duplicates.
- Include clear reproduction steps for bugs.
- Explain the user problem and expected behavior for feature requests.
- Keep reports concise and actionable.

## Pull Requests

Pull requests should include:

- A concise summary of the change.
- Related issue links, if any.
- Screenshots or recordings for visible UI changes.
- Notes about testing performed.
- Any known limitations or follow-up work.

By contributing, you agree that your contribution will be licensed under the project's MIT license.
