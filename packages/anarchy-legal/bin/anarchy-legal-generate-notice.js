#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`Usage:
  anarchy-legal-generate-notice --workspace <name|path>
  [--source <path>] [--source-name <file>] [--out <NOTICE.md>]
  [--include-upstream-notices] [--max-upstream-notice-kb <N>]
  [--audit] [--strict] [--debug]

Options:
  --workspace                (string, required)
                            Workspace name or path relative to monorepo root.
  --source                   (string, optional)
                            Full/relative path to the input attribution file to parse.
                            If provided, overrides --source-name.
  --source-name              (string, optional) Default: THIRD_PARTY_LICENSES.md
                            File name inside the workspace to read when --source is not set.
  --out                      (string, optional) Default: <workspace>/NOTICE.md
                            Output path for the generated NOTICE.
  --include-upstream-notices (boolean, optional) Default: false
                            If set, also read NOTICE/NOTICE.md/NOTICE.txt from dependency install paths
                            (when those paths are present in the source file).
  --max-upstream-notice-kb   (number, optional) Default: 128
                            Per-package size limit (in KB) when in --include-upstream-notices mode.
  --audit                    (boolean, optional) Default: false
                            Print a diff between headings (name@version) in source and parsed entries.
  --strict                   (boolean, optional) Default: false
                            With --audit, exit with code 2 if mismatches are found.
  --debug                    (boolean, optional)
                            Verbose logs.

Exit codes:
  0  success
  1  source file not found / general error
  2  audit mismatch when --strict is used`);
  process.exit(0);
}

const scriptPath = fileURLToPath(new URL('../dist/Generators/NoticeGenerator.js', import.meta.url));
const result = spawnSync(process.execPath, [scriptPath, ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
