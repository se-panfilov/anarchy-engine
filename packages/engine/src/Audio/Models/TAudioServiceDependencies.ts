import type { TTransformDriveService } from '@/TransformDrive';

export type TAudioServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
