import type { TLegalFilesService } from '@Anarchy/Legal';

import { LegalFilesService } from '../Services/LegalFilesService.ts';

/**
 * Anarchy-legal — Legal docs generator.
 *
 * USAGE
 *   node packages/anarchy-legal/src/Generators/LegalFilesGenerator.ts \
 *     --workspace <name|path> \
 *     --out <dir> \
 *     [--templates <dir>] \
 *     [--types DISCLAIMER,EULA,PRIVACY,SECURITY] \
 *     [--debug]
 *
 * OPTIONS
 *   --workspace   (string, required)
 *                 Workspace name (from package.json) or path relative to monorepo root.
 *
 *   --out         (string, required)
 *                 Output directory where DISCLAIMER.md / EULA.md / PRIVACY.md / SECURITY.md are written.
 *
 *   --templates   (string, optional)
 *                 Templates directory. If omitted, auto-detected (tries
 *                 packages/anarchy-legal/src/templates and packages/anarchy-legal/templates).
 *
 *   --types       (string, optional)
 *                 Comma-separated list of docs to generate. Default: DISCLAIMER,EULA,PRIVACY,SECURITY.
 *
 *   --debug       (boolean, optional)
 *                 Verbose logs.
 *
 * NOTES
 *   - Placeholders use {{NAME}}. PACKAGE_* are filled from the target workspace package.json.
 *   - Overrides and template selection come from .anarchy-legal.config.json in the workspace.
 */

const legalFilesService: TLegalFilesService = LegalFilesService();

legalFilesService.generate().catch((e): void => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
