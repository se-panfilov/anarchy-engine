import type { TAnarchyLegalConfig } from './TAnarchyLegalConfig';
import type { TLegalDocumentType } from './TLegalDocumentType';
import type { TWorkspaceInfo } from './TWorkspaceInfo';

export type TRenderInput = Readonly<{
  ws: TWorkspaceInfo;
  outDir: string;
  templatesDir: string;
  types: ReadonlySet<TLegalDocumentType>;
  config: TAnarchyLegalConfig;
}>;
