import type { TFilesService } from './TFilesService';

export type TDesktopServiceDependencies = Readonly<{
  filesService: TFilesService;
}>;
