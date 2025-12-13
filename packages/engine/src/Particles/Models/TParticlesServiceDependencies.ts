import type { TMaterialService } from '@/Material';
import type { TTransformDriveService } from '@/TransformDrive';

export type TParticlesServiceDependencies = Readonly<{
  materialService: TMaterialService;
  transformDriveService: TTransformDriveService;
}>;
