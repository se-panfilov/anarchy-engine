import type { AllowedFolders } from '@Showcases/Desktop/Constants';

export type TFilesService = {
  getPathToFile: (dir: AllowedFolders, fileName: string) => string | never;
  readTextFile: (filePath: string) => Promise<string> | never;
  readJsonFile: <T>(filePath: string, validator?: (v: unknown) => v is T) => Promise<T> | never;
  writeFile: (dir: AllowedFolders, fileName: string, content: string) => Promise<boolean> | never;
};
