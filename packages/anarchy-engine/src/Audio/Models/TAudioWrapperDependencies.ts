import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

import type { TAudioLoop } from './TAudioLoop';

export type TAudioWrapperDependencies = Readonly<{
  audioLoop: TAudioLoop;
  transformDriveService: TTransformDriveService;
}>;
