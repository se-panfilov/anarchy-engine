import type { TAnarchyLegalConfig } from './TAnarchyLegalConfig';
import type { TWorkspaceInfo } from './TWorkspaceInfo';

export type TRenderInput = Readonly<{
  ws: TWorkspaceInfo;
  outDir: string;
  templatesDir: string;
  keys: ReadonlySet<string>;
  config: TAnarchyLegalConfig;
}>;
