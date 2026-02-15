#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const COMMANDS = new Map([['anarchy-tracking-upload-sourcemaps', '../UploadSourcemaps.js']]);
const HELP = new Map([
  [
    'anarchy-tracking-upload-sourcemaps',
    `Usage: anarchy-tracking-upload-sourcemaps [options]

Uploads sourcemaps to the configured tracking provider.`
  ]
]);

const invoked = path.basename(process.argv[1] || '');
const relScript = COMMANDS.get(invoked);

if (!relScript) {
  console.error(`Unknown command: ${invoked}`);
  console.error('Available commands:');
  for (const name of COMMANDS.keys()) console.error(`  - ${name}`);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(HELP.get(invoked) || `Usage: ${invoked}`);
  process.exit(0);
}

const scriptPath = fileURLToPath(new URL(relScript, import.meta.url));
const result = spawnSync(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
