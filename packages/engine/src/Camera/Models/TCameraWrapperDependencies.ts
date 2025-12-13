import type { TAudioService } from '@/Audio';
import type { TContainerDecorator } from '@/Global';
import type { TTransformDriveService } from '@/TransformDrive';

export type TCameraWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
  audioService: TAudioService;
}>;
