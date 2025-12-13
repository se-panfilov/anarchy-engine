import type { TNoticeService } from '@Anarchy/Legal';

import { NoticeService } from '../Services/NoticeService.ts';

/**
 * Anarchy-legal — NOTICE generator
 * Builds NOTICE.md by parsing the workspace's attribution source (e.g. THIRD_PARTY_LICENSES.md).
 *
 * USAGE
 *   node packages/anarchy-legal/src/Generators/NoticeGenerator.ts \
 *     --workspace <name|path> \
 *     [--source <path>] \
 *     [--source-name <file>] \
 *     [--out <NOTICE.md>] \
 *     [--include-upstream-notices] \
 *     [--max-upstream-notice-kb <N>] \
 *     [--audit] [--strict] \
 *     [--debug]
 *
 * OPTIONS
 *   --workspace               (string, required)
 *                             Workspace name or path relative to monorepo root.
 *
 *   --source                  (string, optional)
 *                             Full/relative path to the input attribution file to parse.
 *                             If provided, overrides --source-name.
 *
 *   --source-name             (string, optional)  Default: THIRD_PARTY_LICENSES.md
 *                             File name inside the workspace to read when --source is not set.
 *
 *   --out                     (string, optional)  Default: <workspace>/NOTICE.md
 *                             Output path for the generated NOTICE.
 *
 *   --include-upstream-notices (boolean, optional) Default: false
 *                             If set, also read NOTICE/NOTICE.md/NOTICE.txt from dependency install paths
 *                             (when those paths are present in the source file).
 *
 *   --max-upstream-notice-kb  (number, optional)  Default: 128
 *                             Per-package size limit (in KB) when in --include-upstream-notices mode.
 *
 *   --audit                   (boolean, optional) Default: false
 *                             Print a diff between headings (name@version) in source and parsed entries.
 *
 *   --strict                  (boolean, optional) Default: false
 *                             With --audit, exit with code 2 if mismatches are found.
 *
 *   --debug                   (boolean, optional)
 *                             Verbose logs.
 *
 * EXIT CODES
 *   0  success
 *   1  source file not found / general error
 *   2  audit mismatch when --strict is used
 */

const noticeService: TNoticeService = NoticeService();

noticeService.generate().catch((e): void => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
