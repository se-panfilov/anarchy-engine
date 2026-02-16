#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage:
  anarchy-legal-generate-licenses --workspace <name|path> --out <THIRD_PARTY_LICENSES.md>
  [--root <dir>] [--no-include-workspaces] [--include-workspace-self] [--debug]

Options:
  --workspace                (string, required)
                            Workspace name (package.json:name) or path relative to monorepo root.
  --out                      (string, required)
                            Output file path for THIRD_PARTY_LICENSES.md.
  --root                     (string, optional)
                            Starting directory for monorepo root discovery (fallbacks: INIT_CWD, cwd, script dir).
  --include-workspaces / --no-include-workspaces (boolean, optional) Default: include
                            Include licenses of internal workspaces reachable via production deps.
                            (Self is excluded by default; see --include-workspace-self.)
  --include-workspace-self   (boolean, optional) Default: false
                            Also include the license of the target workspace itself.
  --debug                    (boolean, optional)
                            Verbose diagnostics (graphs, seeds, resolution).`);
  process.exit(0);
}

const scriptPath = fileURLToPath(new URL('../dist/Generators/ThirdPartyLicensesGenerator.js', import.meta.url));
const result = spawnSync(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
