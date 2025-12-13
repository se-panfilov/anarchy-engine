import type { TTransformDriveService } from '@/Engine/TransformDrive';

import type { TAudioLoop } from './TAudioLoop';

export type TAudioWrapperDependencies = Readonly<{
  audioLoop: TAudioLoop;
  transformDriveService: TTransformDriveService;
}>;
