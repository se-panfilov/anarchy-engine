import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TLightServiceDependencies = Readonly<{
  transformDriveService: TTransformDriveService;
}>;
