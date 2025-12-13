import type { TAnarchyLegalConfig, TRenderInput, TTemplateGeneratorOptions } from '@Anarchy/Legal/Models';

export type TLegalFilesUtilsService = Readonly<{
  generateAll: (renderInput: TRenderInput, options: TTemplateGeneratorOptions) => Promise<void>;
  readConfig: (wsDir: string) => Promise<TAnarchyLegalConfig> | never;
}>;
