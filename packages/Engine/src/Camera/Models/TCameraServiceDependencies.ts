import type { TAudioService } from '@/Engine/Audio';
import type { TContainerDecorator } from '@/Engine/Global';
import type { TTransformDriveService } from '@/Engine/TransformDrive';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
}>;
