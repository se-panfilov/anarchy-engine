import type { TCameraService } from '@/Camera';
import type { TLoopService } from '@/Loop';
import type { TPhysicsBodyService } from '@/Physics';
import type { TTransformDriveService } from '@/TransformDrive';

export type TTextServiceDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
  cameraService: TCameraService;
  transformDriveService: TTransformDriveService;
}>;
