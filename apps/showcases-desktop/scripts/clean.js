#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const targets = args.length ? args : ['dist'];

async function rmSafe(p) {
  try {
    const stat = await fs.lstat(p).catch(() => null);
    if (!stat) return;
    await fs.rm(p, { recursive: true, force: true });
    console.log(`[clean] removed: ${p}`);
  } catch (e) {
    console.warn(`[clean] failed to remove ${p}: ${e?.message || e}`);
  }
}

(async () => {
  await Promise.all(targets.map((t) => rmSafe(path.resolve(process.cwd(), t))));
})();
