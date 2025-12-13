import type { TMaterialService } from '@Engine/Material';
import type { TTransformDriveService } from '@Engine/TransformDrive';

export type TParticlesServiceDependencies = Readonly<{
  materialService: TMaterialService;
  transformDriveService: TTransformDriveService;
}>;
