import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';

import type { TAudioLoop } from './TAudioLoop';

export type TAudioWrapperDependencies = Readonly<{
  audioLoop: TAudioLoop;
  transformDriveService: TTransformDriveService;
}>;
