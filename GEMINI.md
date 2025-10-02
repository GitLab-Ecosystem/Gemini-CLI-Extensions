# GitLab MCP Extension

## Overview

This extension connects Gemini CLI to GitLab's hosted Model Context Protocol (MCP) server at `https://gitlab.com/api/v4/mcp`. It exposes GitLab-native tools for issues, merge requests, pipelines, and search. No local Ruby runtime is required—the server is operated by GitLab.

## Prerequisites

- GitLab SaaS account with access to GitLab Duo Chat + MCP (feature flags `mcp_server` and `oauth_dynamic_client_generation` must be enabled by your administrator).
- Gemini CLI 0.8.0 or later.
- Optional: `GITLAB_HOST` environment variable if you later adapt the manifest for a self-managed instance.

## Installation & Auth Flow

1. Install the extension locally: `gemini extensions link ./extensions/gitlab` and restart Gemini CLI.
2. On first use, the CLI spawns `npx mcp-remote https://gitlab.com/api/v4/mcp` and opens a device-code flow in your browser. Approve the OAuth request and grant the `mcp` scope.
3. After authorization completes, the CLI caches credentials in your user settings; subsequent sessions reuse the token.
4. Run `/mcp desc` to confirm the `gitlab` server is connected and review available tools.

## Custom Commands

This extension ships `/gitlab:*` commands that translate the GitLab documentation prompts into reusable shortcuts. Arguments follow the GitLab examples:

- Issue & merge request commands accept either a numeric project ID or `namespace/project` path followed by the IID.
- Pipeline commands require `project_id pipeline_id`.
- `create-issue` accepts `project_id | title | description` (description optional).
- `search` expects `scope query` (e.g., `merge_requests "fix login"`).

If the command prompts for missing data, rerun it with the noted format. All commands instruct Gemini to call the documented MCP tools rather than raw REST APIs.

## Troubleshooting

- Use `/mcp schema gitlab get_issue` to inspect parameter schemas if validation fails.
- If authentication fails, rerun any `/gitlab:*` command and complete the device-code flow again; tokens can be cleared via `~/.gemini/settings.json`.
- The manifest targets GitLab.com; for self-managed instances, update the MCP endpoint and add `--api-root` arguments as described in the GitLab MCP docs.
