import type { TTransformDriveService } from '@/TransformDrive';

export type TLightServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
