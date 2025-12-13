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
  async function load({ name }: TLoadDocPayload): Promise<TLegalDoc> | never {
    const filePath: string = resolveDocPath(name);
    if (isNotDefined(filePath)) throw new Error(`[DESKTOP]: Failed to load a document "${name}". Path: ${filePath}`);

    try {
      const content: string = await readFile(filePath, 'utf-8');
      return { name, content };
    } catch (err: any) {
      const code = err?.code;
      if (code === 'ENOENT' || code === 'ENOTDIR') throw new Error(`[DESKTOP] Document "${name}" not found`);
      if (code === 'EACCES') throw new Error(`[DESKTOP] Permission denied for "${name}"`);
      throw new Error(`[DESKTOP] Read failed for "${name}": ${err?.message ?? 'unknown'}`);
    }
  }

  return {
    load
  };
}
