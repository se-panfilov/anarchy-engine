import type { TCollected, TDependencyNode, TLicenseEntry, TRootInfo, TWorkspaceInfo } from '@Anarchy/Legal/Models';

export type TRepoUtilsService = Readonly<{
  assertNoCycles: (graph: ReadonlyMap<string, ReadonlySet<string>>, start: string) => void;
  buildLicenseEntries: (collected: ReadonlyMap<string, TCollected>) => Promise<ReadonlyArray<TLicenseEntry>>;
  buildWorkspaceLicenseEntries: (names: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, excludeName?: string) => Promise<ReadonlyArray<TLicenseEntry>>;
  buildWsGraph: (ws: ReadonlyMap<string, TWorkspaceInfo>) => ReadonlyMap<string, ReadonlySet<string>>;
  collectExternalSeedNames: (closure: ReadonlySet<string>, wsMap: ReadonlyMap<string, TWorkspaceInfo>, wsNames: ReadonlySet<string>) => ReadonlySet<string>;
  collectThirdPartyMap: (root: TDependencyNode | undefined, wsNames: ReadonlySet<string>, seedNames: ReadonlySet<string>) => ReadonlyMap<string, TCollected>;
  collectWorkspaceClosure: (graph: ReadonlyMap<string, ReadonlySet<string>>, start: string) => ReadonlySet<string>;
  debugLog: (isDebug: boolean, message: string, ...args: any[]) => void;
  fillMissingInstallPaths: (collected: Map<string, TCollected>, wsDir: string, rootDir: string) => void;
  findMonorepoRoot: (startDir: string) => Promise<string>;
  loadRoot: (rootDir: string) => Promise<TRootInfo>;
  npmLsJson: (rootDir: string, workspace: string) => Promise<TDependencyNode | undefined>;
  renderMarkdown: (workspaceLabel: string, items: ReadonlyArray<TLicenseEntry>, emptyNote?: string) => string;
  resolveWorkspaceFromArg: (arg: string, workspaces: ReadonlyMap<string, TWorkspaceInfo>, rootDir: string) => Readonly<{ wsName: string; wsDir: string }>;
  setDebugMode: (isDebug: boolean) => void;
}>;
