import * as fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';

import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TDocsService } from '@Showcases/Desktop/Models';
import type { TLoadDocPayload } from '@Showcases/Shared';
import type { App } from 'electron';

// TODO DESKTOP: extract
const ALLOWED_DOCS = new Set<Readonly<string>>(['DISCLAIMER.md', 'EULA.md', 'INSTRUCTIONS.md', 'NOTICE.md', 'PRIVACY.md', 'SBOM_POINTER.md', 'SECURITY.md', 'SUPPORT.md', 'THIRD_PARTY_LICENSES.md']);

export function DocsService(app: App): TDocsService {
  function getDocsBaseDir(): string {
    return join(app.getAppPath(), 'assets', 'legal');
  }

  function resolveDocPath(name: string): string | undefined {
    if (!ALLOWED_DOCS.has(name) || !name.endsWith('.md')) return undefined;
    const base: string = getDocsBaseDir();
    const full = normalize(join(base, name));
    if (!full.startsWith(base)) return undefined;
    return full;
  }

  // TODO DESKTOP: Extract file reading/writing to a separate utility
  // TODO DESKTOP: Better to make all of this async
  function load({ name }: TLoadDocPayload): Promise<string> | never {
    const filePath: string | undefined = resolveDocPath(name);
    if (isNotDefined(filePath) || !fs.existsSync(filePath)) throw new Error(`[DESKTOP]: Document "${name}" does not found: ${filePath}`);

    const result = readFile(filePath, 'utf-8');
    // TODO DESKTOP: sanitize result
    return result;
  }

  return {
    load
  };
}
