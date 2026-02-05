import type { TMaterialService } from '@hellpig/anarchy-engine/Material';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TParticlesServiceDependencies = Readonly<{
  materialService: TMaterialService;
  transformDriveService: TTransformDriveService;
}>;
