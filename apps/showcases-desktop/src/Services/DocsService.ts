import { isNotDefined } from '@Anarchy/Shared/Utils';
import { AllowedAppFolders } from '@Showcases/Desktop/Constants';
import type { TDocsService, TFilesService } from '@Showcases/Desktop/Models';
import type { TLegalDoc, TLoadDocPayload } from '@Showcases/Shared';
import { AllowedLegalDocNames, sanitizeMarkDown } from '@Showcases/Shared';

export function DocsService(filesService: TFilesService): TDocsService {
  async function get({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    if (isNotDefined(AllowedLegalDocNames[name])) throw new Error(`[DESKTOP] Invalid doc name. Name "${name}" is not allowed`);
    const content: string = await filesService.readFile(name + '.md', AllowedAppFolders.LegalDocs);
    const cleanContent: string = await sanitizeMarkDown(content);
    return { name, content: cleanContent };
  }

  return {
    get
  };
}
