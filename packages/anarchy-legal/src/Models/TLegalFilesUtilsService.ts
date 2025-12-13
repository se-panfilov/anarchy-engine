import type { TAnarchyLegalConfig, TLegalDocumentType, TRenderInput, TTemplateGeneratorOptions } from '@Anarchy/Legal/Models';

export type TLegalFilesUtilsService = Readonly<{
  assertTemplatesPresent: (config: TAnarchyLegalConfig, types: ReadonlySet<TLegalDocumentType>) => void | never;
  generateAll: (renderInput: TRenderInput, options: TTemplateGeneratorOptions) => Promise<void>;
  getConfiguredDocTypes: (config: TAnarchyLegalConfig) => ReadonlySet<TLegalDocumentType>;
  readConfig: (wsDir: string) => Promise<TAnarchyLegalConfig> | never;
}>;
