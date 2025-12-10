# GitLab MCP Extension for Gemini CLI

Connects Gemini CLI to the GitLab-hosted Model Context Protocol (MCP) server (`https://gitlab.com/api/v4/mcp`). Exposes tools for issues, MRs, pipelines, and search without a local Ruby runtime.

## Installation

```bash
gemini extensions install https://github.com/GitLab-Ecosystem/Gemini-CLI-Extensions
# or for local development: gemini extensions link .
```
*Restart Gemini CLI after installing/linking.*

## Prerequisites
- **GitLab SaaS** account with `mcp_server` and `oauth_dynamic_client_generation` flags enabled.
- **Gemini CLI** v0.8.0+.
- **Node.js** 20+ (for `npx`).

*First run requires browser authorization for the "MCP CLI Proxy" app.*

## Commands
Maps custom commands to MCP tools (defined in `commands/*.toml`):

- `/gitlab:issue <project> <iid>`
- `/gitlab:create-issue <project> | <title> | [desc]`
- `/gitlab:mr <project> <iid>`
- `/gitlab:mr-changes`, `/gitlab:mr-commits`, `/gitlab:mr-pipelines`
- `/gitlab:pipeline-jobs <project> <id>`
- `/gitlab:search <scope> <query>`
- `/gitlab:server-version`

## Development

- **Manifest**: `gemini-extension.json` (defines `npx mcp-remote`).
- **Commands**: `commands/*.toml`.
- **Build**: `npm install && npm run build` (required for standard structure compliance).
- **Test**: `npm test`.


## Distribution
This repo follows the Gemini CLI [extension releasing](https://github.com/google-gemini/gemini-cli/blob/main/docs/extension-releasing.md) guidelines. The `gemini-extension.json` manifest lives at the repository root so users can install directly with `gemini extensions install benvenker/gitlab-gemini-extension` or by referencing specific branches/tags using `--ref`.

## License
Apache 2.0
