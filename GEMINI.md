# GitLab MCP Extension

## Quick Start
1.  **Authorize**: First run spawns a browser for OAuth. Approve `mcp` scope.
2.  **Use**: `/gitlab:issue <project> <issue_id>`.

## Commands
Wrappers for GitLab MCP tools. If prompted, re-run with missing args.

- **Issues/MRs**: `project_id` OR `namespace/project` + `IID`.
    - `/gitlab:issue`, `/gitlab:mr`, `/gitlab:create-issue`
- **Pipelines**: `project_id` + `pipeline_id`.
    - `/gitlab:pipeline-jobs`
- **Search**: `scope` + `query`.
    - `/gitlab:search merge_requests "login fix"`

## Troubleshooting
- **Auth Failures**: Re-run command to trigger new device flow. Clear tokens via `~/.gemini/settings.json` if needed.
- **Schemas**: Check params with `/mcp schema gitlab <tool_name>`.
- **Self-Managed**: Update `gemini-extension.json` URL and add `--api-root`.
