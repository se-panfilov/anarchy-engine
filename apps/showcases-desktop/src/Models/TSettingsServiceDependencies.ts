import type { TFilesService } from './TFilesService';
import type { TWindowService } from './TWindowService';

export type TSettingsServiceDependencies = Readonly<{
  filesService: TFilesService;
  windowService: TWindowService;
}>;
