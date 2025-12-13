import type { TAnarchyLegalConfig, TRenderInput, TTemplateGeneratorOptions, TWorkspaceInfo } from '@Anarchy/Legal/Models';

export type TLegalFilesUtilsService = Readonly<{
  generateAll: (renderInput: TRenderInput, options: TTemplateGeneratorOptions) => Promise<void>;
  loadWorkspaces: (rootDir: string) => Promise<ReadonlyMap<string, TWorkspaceInfo>>;
  readConfig: (wsDir: string) => Promise<TAnarchyLegalConfig> | never;
}>;
