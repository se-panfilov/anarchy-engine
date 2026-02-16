#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage:
  anarchy-legal-generate-files --workspace <name|path> --out <dir>
  [--templates <dir>] [--types DISCLAIMER,EULA,PRIVACY,SECURITY] [--debug]

Options:
  --workspace   (string, required)
                Workspace name (from package.json) or path relative to monorepo root.
  --out         (string, required)
                Output directory where DISCLAIMER.md / EULA.md / PRIVACY.md / SECURITY.md are written.
  --templates   (string, optional)
                Templates directory. If omitted, auto-detected (tries
                packages/anarchy-legal/src/templates and packages/anarchy-legal/templates).
  --types       (string, optional)
                Comma-separated list of docs to generate. Default: DISCLAIMER,EULA,PRIVACY,SECURITY.
  --debug       (boolean, optional)
                Verbose logs.

Notes:
  - Placeholders use {{NAME}}. PACKAGE_* are filled from the target workspace package.json.
  - Overrides and template selection come from .anarchy-legal.config.json in the workspace.`);
  process.exit(0);
}

const scriptPath = fileURLToPath(new URL('../dist/Generators/LegalFilesGenerator.js', import.meta.url));
const result = spawnSync(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
