import path from 'node:path';
import fs from 'node:fs';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';

export function buildEnvChain(mode) {
  const chain = ['.env', '.env.local'];
  const tokens = String(mode).split('.').filter(Boolean);
  const first = tokens[0]?.toLowerCase();
  const firstAlias = first === 'dev' ? 'development' : first === 'prod' ? 'production' : undefined;

  const seqs = [tokens];
  if (firstAlias && firstAlias !== first) seqs.push([firstAlias, ...tokens.slice(1)]);

  for (const seq of seqs) {
    const accum = [];
    for (const p of seq) {
      accum.push(p);
      const key = accum.join('.');
      chain.push(`.env.${key}`);
      chain.push(`.env.${key}.local`);
    }
  }

  return Array.from(new Set(chain));
}

export function loadModeEnv(mode, cwd = process.cwd()) {
  const loadEnvFile = (file) => {
    const full = path.resolve(cwd, file);
    if (!fs.existsSync(full)) return false;
    const result = dotenvConfig({ path: full, override: true });
    if (result.parsed) dotenvExpand({ parsed: result.parsed });
    return true;
  };

  const chain = buildEnvChain(mode);
  for (const file of chain) loadEnvFile(file);
}

export function parseListEnv(val) {
  if (!val) return [];
  return String(val)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseBoolEnv(val, defaultValue = false) {
  if (val == null) return defaultValue;
  const s = String(val).trim().toLowerCase();
  if (s === '1' || s === 'true' || s === 'yes' || s === 'on') return true;
  if (s === '0' || s === 'false' || s === 'no' || s === 'off') return false;
  return defaultValue;
}
