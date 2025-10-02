import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse as parseToml } from '@iarna/toml';

const COMMANDS_DIR = resolve('commands', 'gitlab');

const TOOL_BY_FILE: Record<string, string> = {
  'server-version.toml': 'gitlab.get_mcp_server_version',
  'issue.toml': 'gitlab.get_issue',
  'create-issue.toml': 'gitlab.create_issue',
  'mr.toml': 'gitlab.get_merge_request',
  'mr-commits.toml': 'gitlab.get_merge_request_commits',
  'mr-changes.toml': 'gitlab.get_merge_request_changes',
  'mr-pipelines.toml': 'gitlab.get_merge_request_pipelines_service',
  'pipeline-jobs.toml': 'gitlab.get_pipeline_jobs',
  'search.toml': 'gitlab.gitlab_search',
};

describe('custom commands', () => {
  const files = readdirSync(COMMANDS_DIR);

  it('has coverage for every expected command file', () => {
    expect(new Set(files)).toEqual(new Set(Object.keys(TOOL_BY_FILE)));
  });

  for (const file of files) {
    const promptFile = join(COMMANDS_DIR, file);
    const parsed = parseToml(readFileSync(promptFile, 'utf-8')) as {
      prompt: string;
    };

    it(`${file} references the documented MCP tool`, () => {
      expect(parsed.prompt).toContain(TOOL_BY_FILE[file]);
    });

    it(`${file} accepts command arguments via {{args}}`, () => {
      expect(parsed.prompt).toContain('{{args}}');
    });
  }
});
