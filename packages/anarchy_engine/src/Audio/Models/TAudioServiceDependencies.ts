import type { TTransformDriveService } from '@Engine/TransformDrive';

export type TAudioServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
