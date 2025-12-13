import type { TTransformDriveService } from '@/TransformDrive';

import type { TAudioLoop } from './TAudioLoop';

export type TAudioWrapperDependencies = Readonly<{
  audioLoop: TAudioLoop;
  transformDriveService: TTransformDriveService;
}>;
