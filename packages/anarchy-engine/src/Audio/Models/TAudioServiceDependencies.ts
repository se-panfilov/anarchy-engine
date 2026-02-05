import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TAudioServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
