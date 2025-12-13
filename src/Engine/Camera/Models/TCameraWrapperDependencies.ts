import type { TContainerDecorator } from '@/Engine/Global';
import type { TTransformDriveService } from '@/Engine/TransformDrive';

export type TCameraWrapperDependencies = Readonly<{
  container: TContainerDecorator;
  transformDriveService: TTransformDriveService;
}>;
