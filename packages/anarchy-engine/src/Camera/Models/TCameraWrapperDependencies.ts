import type { TAudioService } from '@Anarchy/Engine/Audio';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';

export type TCameraWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
  audioService: TAudioService;
}>;
