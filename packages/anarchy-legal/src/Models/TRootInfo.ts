import type { TWorkspaceInfo } from '@hellpig/anarchy-legal/Models/TWorkspaceInfo';

export type TRootInfo = Readonly<{
  rootDir: string;
  rootPkgPath: string;
  rootPkg: Readonly<{
    name?: string;
    workspaces?: Readonly<{ packages?: ReadonlyArray<string> } | ReadonlyArray<string>>;
  }>;
  workspaces: ReadonlyMap<string, TWorkspaceInfo>;
}>;
