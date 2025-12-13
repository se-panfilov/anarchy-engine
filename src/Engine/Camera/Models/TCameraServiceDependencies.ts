import type { TAudioService } from '@/Engine/Audio';
import type { TScreenService } from '@/Engine/Screen';
import type { TTransformDriveService } from '@/Engine/TransformDrive';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
  screenService: TScreenService;
  transformDriveService: TTransformDriveService;
}>;
