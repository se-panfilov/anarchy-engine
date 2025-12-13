import * as fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';

import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TDocsService } from '@Showcases/Desktop/Models';
import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';
import type { App } from 'electron';

export function DocsService(app: App): TDocsService {
  function getDocsBaseDir(): string {
    return join(app.getAppPath(), 'assets', 'legal');
  }

  function resolveDocPath(name: keyof typeof AllowedLegalDocNames): string | never {
    if (isNotDefined(AllowedLegalDocNames[name])) throw new Error(`[DESKTOP]: Invalid doc name. Name "${name}" is not allowed`);
    const base: string = getDocsBaseDir();
    const ext = 'md' as const;
    const full: string = normalize(join(base, `${name}.${ext}`));
    if (!full.startsWith(base)) throw new Error(`[DESKTOP]: Invalid doc name. Resolved path is outside of docs base dir: ${full}`);
    return full;
  }

  // TODO DESKTOP: Extract file reading/writing to a separate utility
  // TODO DESKTOP: Better to make all of this async
  async function load({ name }: TLoadDocPayload): Promise<TLegalDoc> | never {
    const filePath: string = resolveDocPath(name);
    if (isNotDefined(filePath) || !fs.existsSync(filePath)) throw new Error(`[DESKTOP]: Document "${name}" does not found: ${filePath}`);

    // TODO DESKTOP: fix type of the result
    const result: string = await readFile(filePath, 'utf-8');
    // TODO DESKTOP: should sanitize result here
    return { name, content: result };
  }

  return {
    load
  };
}
