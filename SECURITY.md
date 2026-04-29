# Security Policy

## Supported Versions

Security updates are handled on the default branch unless maintainers state otherwise.

## Reporting a Vulnerability

Please do not open a public issue for security vulnerabilities.

Report suspected vulnerabilities through GitHub Security Advisories or another channel explicitly designated by the maintainers. Include enough detail to help reproduce and assess the issue:

- Affected version, commit, or deployment context.
- Steps to reproduce or a proof of concept.
- Potential impact and affected users.
- Any relevant logs, screenshots, or traces with secrets removed.

## Sensitive Data

This project handles user-provided API keys in the browser. Contributors must not commit or disclose:

- API keys, access tokens, credentials, or private configuration.
- `.env` files or local secret stores.
- Logs, screenshots, fixtures, or examples containing real secrets.

If you accidentally expose a secret, revoke or rotate it immediately before reporting the incident.

## Scope

Security-relevant issues may include, but are not limited to:

- Exposure or persistence of API keys beyond intended browser-local storage.
- Cross-site scripting or injection vulnerabilities.
- Unsafe dependency, build, or client-side configuration behavior.
- Leaks of sensitive data through logs, telemetry, screenshots, or error reports.
