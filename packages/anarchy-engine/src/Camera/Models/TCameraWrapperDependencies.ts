import type { TAudioService } from '@hellpig/anarchy-engine/Audio';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TCameraWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
  audioService: TAudioService;
}>;
