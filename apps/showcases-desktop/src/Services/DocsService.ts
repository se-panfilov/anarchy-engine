import * as fs from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, normalize } from 'node:path';

import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TDocsService } from '@Showcases/Desktop/Models';
import type { TLoadDocPayload } from '@Showcases/Shared';
import type { App } from 'electron';

// TODO DESKTOP: extract
enum AllowedDocNames {
  DISCLAIMER = 'DISCLAIMER',
  EULA = 'EULA',
  INSTRUCTIONS = 'INSTRUCTIONS',
  NOTICE = 'NOTICE',
  PRIVACY = 'PRIVACY',
  SBOM_POINTER = 'SBOM_POINTER',
  SECURITY = 'SECURITY',
  SUPPORT = 'SUPPORT',
  THIRD_PARTY_LICENSES = 'THIRD_PARTY_LICENSES'
}

export function DocsService(app: App): TDocsService {
  function getDocsBaseDir(): string {
    return join(app.getAppPath(), 'assets', 'legal');
  }

  function resolveDocPath(name: string): string | never {
    //Error: Element implicitly has an any type because expression of type string can't be used to index type typeof AllowedDocName
    if (!isNotDefined(AllowedDocNames[name])) throw new Error(`[DESKTOP]: Invalid doc name. Name "${name}" is not allowed`);
    const base: string = getDocsBaseDir();
    const full: string = normalize(join(base, name));
    if (!full.startsWith(base)) throw new Error(`[DESKTOP]: Invalid doc name. Resolved path is outside of docs base dir: ${full}`);
    return full;
  }

  // TODO DESKTOP: Extract file reading/writing to a separate utility
  // TODO DESKTOP: Better to make all of this async
  function load({ name }: TLoadDocPayload): Promise<string> | never {
    const filePath: string = resolveDocPath(name);
    // TODO CWP debug this
    if (isNotDefined(filePath) || !fs.existsSync(filePath)) throw new Error(`[DESKTOP]: Document "${name}" does not found: ${filePath}`);

    const result = readFile(filePath, 'utf-8');
    // TODO DESKTOP: sanitize result
    return result;
  }

  return {
    load
  };
}
