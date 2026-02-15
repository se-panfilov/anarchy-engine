#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const COMMANDS = new Map([
  ['anarchy-shared-sanitize-assets', '../SanitizeAssets.js'],
  ['anarchy-shared-copy-dir', '../CopyDir.js'],
  ['anarchy-shared-copy-files', '../CopyFiles.js'],
  ['anarchy-shared-gen-versions', '../GenerateVersionsFile.js'],
  ['anarchy-shared-inject-metadata', '../InjectMetadata.js'],
  ['anarchy-shared-mk-ico', '../MakeIcoFromPng.js'],
  ['anarchy-shared-postprocess-screenshots', '../PostprocessScreenshots.js'],
  ['anarchy-shared-rename-file', '../RenameFile.js']
]);

const HELP = new Map([
  [
    'anarchy-shared-sanitize-assets',
    `Usage: anarchy-shared-sanitize-assets [targetDir]

Cleans metadata from assets in targetDir (default: ./public).`
  ],
  [
    'anarchy-shared-copy-dir',
    `Usage: anarchy-shared-copy-dir from=<source> to=<destination>

Copies a directory recursively.`
  ],
  [
    'anarchy-shared-copy-files',
    `Usage: anarchy-shared-copy-files <file1> <file2> ... to=<destination>

Copies one or more files into the destination folder.`
  ],
  [
    'anarchy-shared-gen-versions',
    `Usage: anarchy-shared-gen-versions [--pkg=package.json] [--out=versions.ts]

Generates a versions file from the package.json version.`
  ],
  [
    'anarchy-shared-inject-metadata',
    `Usage: anarchy-shared-inject-metadata

Test helper that injects PNG metadata into ./test.png.`
  ],
  [
    'anarchy-shared-mk-ico',
    `Usage: anarchy-shared-mk-ico --in <png|dir>[,<png>...] --out <out.ico> [--size <px>]

Creates an .ico file from PNG inputs.`
  ],
  [
    'anarchy-shared-postprocess-screenshots',
    `Usage: anarchy-shared-postprocess-screenshots

Strips PNG metadata under ./src recursively.`
  ],
  [
    'anarchy-shared-rename-file',
    `Usage: anarchy-shared-rename-file <input> <output>

Renames a file, preserving directory resolution.`
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
