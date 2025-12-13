export type TWorkspaceInfo = Readonly<{
  name: string;
  dir: string; // absolute path
  pkgPath: string; // absolute path to package.json
  pkg: Readonly<{
    name: string;
    version?: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
  }>;
}>;
