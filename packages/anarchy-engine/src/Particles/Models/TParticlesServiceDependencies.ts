import type { TMaterialService } from '@Anarchy/Engine/Material';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';

export type TParticlesServiceDependencies = Readonly<{
  materialService: TMaterialService;
  transformDriveService: TTransformDriveService;
}>;
