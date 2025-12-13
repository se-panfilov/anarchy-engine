import type { TThirdPartyLicensesService } from '@Anarchy/Legal/Models';

import { ThirdPartyLicensesService } from '../Services/ThirdPartyLicensesService.ts';

/**
 * Anarchy-legal — Third-party licenses generator (cli.ts)
 * Produces THIRD_PARTY_LICENSES.md for a target workspace.
 *
 * USAGE
 *   node packages/anarchy-legal/src/cli.ts \
 *     --workspace <name|path> \
 *     --out <THIRD_PARTY_LICENSES.md> \
 *     [--root <dir>] \
 *     [--no-include-workspaces] \
 *     [--include-workspace-self] \
 *     [--debug]
 *
 * OPTIONS
 *   --workspace               (string, required)
 *                             Workspace name (package.json:name) or path relative to monorepo root.
 *
 *   --out                     (string, required)
 *                             Output file path for THIRD_PARTY_LICENSES.md.
 *
 *   --root                    (string, optional)
 *                             Starting directory for monorepo root discovery (fallbacks: INIT_CWD, cwd, script dir).
 *
 *   --include-workspaces / --no-include-workspaces (boolean, optional)  Default: include
 *                             Include licenses of internal workspaces reachable via production deps.
 *                             (Self is excluded by default; see --include-workspace-self.)
 *
 *   --include-workspace-self  (boolean, optional)  Default: false
 *                             Also include the license of the target workspace itself.
 *
 *   --debug                   (boolean, optional)
 *                             Verbose diagnostics (graphs, seeds, resolution).
 *
 * NOTES
 *   - External deps are derived from prod dependency “seeds” of the workspace closure (avoids hoisted/peer noise).
 *   - Cycles between workspaces are detected and reported as errors.
 *   - When no third-party deps are found, the file is still created with a short explanatory note.
 */

const thirdPartyLicensesService: TThirdPartyLicensesService = ThirdPartyLicensesService();

thirdPartyLicensesService.generate().catch((e): void => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
