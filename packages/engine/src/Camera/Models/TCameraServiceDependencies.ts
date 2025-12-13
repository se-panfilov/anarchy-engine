import type { TAudioService } from '@/Audio';
import type { TContainerDecorator } from '@/Global';
import type { TTransformDriveService } from '@/TransformDrive';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
}>;
