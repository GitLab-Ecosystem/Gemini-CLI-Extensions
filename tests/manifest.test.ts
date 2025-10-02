import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('gemini-extension manifest', () => {
  const manifestPath = resolve('gemini-extension.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));

  it('uses npx mcp-remote with forced consent', () => {
    const gitlab = manifest.mcpServers?.gitlab;
    expect(gitlab).toBeDefined();
    expect(gitlab.command).toBe('npx');
    expect(gitlab.args[0]).toBe('--yes');
    expect(gitlab.args[1]).toBe('mcp-remote');
    expect(gitlab.args[2]).toBe('https://gitlab.com/api/v4/mcp');
  });

  it('configures static oauth scope for mcp', () => {
    const gitlab = manifest.mcpServers.gitlab;
    expect(gitlab.args).toContain('--static-oauth-client-metadata');
    expect(gitlab.args).toContain('{"scope": "mcp"}');
  });

  it('exposes GEMINI.md as context file', () => {
    expect(manifest.contextFileName).toBe('GEMINI.md');
  });
});
