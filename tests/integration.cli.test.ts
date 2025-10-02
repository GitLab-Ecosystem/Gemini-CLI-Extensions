import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

function loadEnvFile(): void {
  if (process.env['GEMINI_CLI_PATH']) {
    return;
  }
  const envPath = resolve('.env');
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, 'utf-8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const [key, ...rest] = trimmed.split('=');
    const value = rest.join('=').trim();
    if (!process.env[key] && value) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const cliPath = process.env['GEMINI_CLI_PATH'];
const extensionRoot = resolve('.');

function runGemini(args: string[], input?: string) {
  if (!cliPath) {
    throw new Error('GEMINI_CLI_PATH unset');
  }
  const geminiBin = join(cliPath, 'bundle', 'gemini.js');
  const result = spawnSync('node', [geminiBin, ...args], {
    cwd: cliPath,
    encoding: 'utf-8',
    input,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function tryUninstall() {
  if (!cliPath) return;
  runGemini(['extensions', 'uninstall', 'gitlab']);
}

const describeFn = cliPath ? describe : describe.skip;

describeFn('gemini cli integration', () => {
  beforeAll(() => {
    const geminiBin = join(cliPath!, 'bundle', 'gemini.js');
    if (!existsSync(geminiBin)) {
      throw new Error(`Gemini CLI bundle not found at ${geminiBin}. Run npm run build in the CLI repo.`);
    }
  });

  afterAll(() => {
    try {
      tryUninstall();
    } catch {
      // ignore cleanup failures
    }
  });

  it('links the extension and lists it', () => {
    try {
      tryUninstall();
    } catch {
      /* ignore missing extension */
    }
    const link = runGemini(['extensions', 'link', extensionRoot], 'y\n');
    expect(link.status).toBe(0);
    const list = runGemini(['extensions', 'list']);
    expect(list.stdout).toContain('gitlab (0.1.0)');
  });
});
