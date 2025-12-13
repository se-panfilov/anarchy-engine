import { isNotDefined } from '@Anarchy/Shared/Utils';
import { AllowedAppFolders } from '@Showcases/Desktop/Constants';
import type { TDocsService, TFilesService } from '@Showcases/Desktop/Models';
import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';
import { AllowedLegalDocNames } from '@Showcases/Shared';

export function DocsService(filesService: TFilesService): TDocsService {
  // TODO DESKTOP: rename load/save to read/write
  // TODO DESKTOP: Re-test this
  async function load({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    if (isNotDefined(AllowedLegalDocNames[name])) throw new Error(`[DESKTOP]: Invalid doc name. Name "${name}" is not allowed`);
    const content: string = await filesService.readFile(name + '.md', AllowedAppFolders.LegalDocs);
    return { name, content };
  }

  return {
    load
  };
}
