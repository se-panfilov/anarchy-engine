import type { AllowedAppFolders, AllowedSystemFolders } from '@Showcases/Desktop/Constants';

export type TFilesService = {
  getPathToFile: (fileName: string, dir: AllowedSystemFolders | AllowedAppFolders) => string | never;
  readFile: (fileName: string, dir: AllowedSystemFolders | AllowedAppFolders) => Promise<string> | never;
  readFileAsJson: <T>(filePath: string, dir: AllowedSystemFolders | AllowedAppFolders, validator?: (v: unknown) => v is T) => Promise<T> | never;
  writeFile: (fileName: string, dir: AllowedSystemFolders, content: string) => Promise<boolean> | never;
};
