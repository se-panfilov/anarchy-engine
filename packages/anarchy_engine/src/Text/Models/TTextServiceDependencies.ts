import type { TCameraService } from '@Engine/Camera';
import type { TLoopService } from '@Engine/Loop';
import type { TPhysicsBodyService } from '@Engine/Physics';
import type { TTransformDriveService } from '@Engine/TransformDrive';

export type TTextServiceDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
  cameraService: TCameraService;
  transformDriveService: TTransformDriveService;
}>;
