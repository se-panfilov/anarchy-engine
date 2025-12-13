import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TDocsService, TFilesService } from '@Showcases/Desktop/Models';
import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';

export function DocsService(filesService: TFilesService): TDocsService {
  // TODO DESKTOP: rename load/save to read/write
  // TODO DESKTOP: Re-test this
  async function load({ name }: TLoadDocPayload): Promise<TLegalDoc> | never {
    if (isNotDefined(AllowedLegalDocNames[name])) throw new Error(`[DESKTOP]: Invalid doc name. Name "${name}" is not allowed`);
    return filesService.readTextFile(name);
  }

  return {
    load
  };
}
