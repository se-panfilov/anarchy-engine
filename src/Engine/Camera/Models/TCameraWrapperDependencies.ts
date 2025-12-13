import type { TScreenService } from '@/Engine/Screen';
import type { TTransformDriveService } from '@/Engine/TransformDrive';

export type TCameraWrapperDependencies = Readonly<{
  screenService: TScreenService;
  transformDriveService: TTransformDriveService;
}>;
