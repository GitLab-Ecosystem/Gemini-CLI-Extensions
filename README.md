# GitLab MCP Extension for Gemini CLI

This repository packages the GitLab-hosted Model Context Protocol (MCP) server as a Gemini CLI extension. It exposes custom `/gitlab:*` commands that map directly to GitLab's documented MCP tools for issues, merge requests, pipelines, and search.

## Features
- Connects Gemini CLI to `https://gitlab.com/api/v4/mcp` via `npx --yes mcp-remote` (no local Ruby runtime required).
- Includes reusable TOML commands aligned with the prompts in the [GitLab MCP server docs](https://docs.gitlab.com/user/gitlab_duo/model_context_protocol/mcp_server/).
- Ships a `GEMINI.md` context file with setup guidance, prerequisites, and troubleshooting tips.

## Installation
```bash
gemini extensions install benvenker/gitlab-gemini-extension
# or for local development
gemini extensions link /path/to/gitlab-gemini-extension
```

You will be prompted to confirm installation. Restart Gemini CLI after linking or installing.

## Prerequisites
- GitLab SaaS account with access to the GitLab MCP server. Ensure the `mcp_server` and `oauth_dynamic_client_generation` feature flags are enabled for your account or namespace.
- Gemini CLI v0.8.0 or later.
- Node.js 20+ so `npx` is available.

On first use, a browser window opens for device authorization. Approve the "MCP CLI Proxy" request to grant the `mcp` OAuth scope.

## Commands
The extension provides the following slash commands:

- `/gitlab:server-version`
- `/gitlab:issue`
- `/gitlab:create-issue`
- `/gitlab:mr`
- `/gitlab:mr-commits`
- `/gitlab:mr-changes`
- `/gitlab:mr-pipelines`
- `/gitlab:pipeline-jobs`
- `/gitlab:search`

Each command parses arguments in the format shown inside the TOML file and calls the corresponding MCP tool (`gitlab.get_issue`, `gitlab.gitlab_search`, etc.).

## Development
Install dependencies if you plan to edit TypeScript sources or run tests:
```bash
npm install
```

Linting/formatting mirrors the parent Gemini CLI repo:
```bash
npx prettier --write .
```

To reload the extension in a Gemini CLI checkout, use:
```bash
node /path/to/gemini-cli/bundle/gemini.js extensions link /path/to/gitlab-gemini-extension --overwrite
```

## Testing
- Unit tests are written with Vitest. Run them with `npm test`.
- Optional CLI integration tests: copy `.env.example` to `.env`, set `GEMINI_CLI_PATH` to your local `gemini-cli` checkout (build it so `bundle/gemini.js` exists), then run `npm test`. If the variable is unset, the integration suite is skipped automatically.


## Distribution
This repo follows the Gemini CLI [extension releasing](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension-releasing.md) guidelines. The `gemini-extension.json` manifest lives at the repository root so users can install directly with `gemini extensions install benvenker/gitlab-gemini-extension` or by referencing specific branches/tags using `--ref`.

## License
Apache 2.0
