import type { TTransformDriveService } from '@Engine/TransformDrive';

export type TLightServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
