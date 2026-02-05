import type { TAudioService } from '@hellpig/anarchy-engine/Audio';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TCameraServiceDependencies = Readonly<{
  audioService: TAudioService;
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
}>;
