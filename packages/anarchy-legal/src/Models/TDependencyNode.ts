export type TDependencyNode = Readonly<{
  name: string;
  version: string;
  path?: string;
  license?: unknown;
  repository?: unknown;
  dependencies?: Readonly<Record<string, TDependencyNode>>;
}>;
