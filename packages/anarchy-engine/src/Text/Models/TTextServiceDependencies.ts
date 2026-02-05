import type { TCameraService } from '@hellpig/anarchy-engine/Camera';
import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import type { TPhysicsBodyService } from '@hellpig/anarchy-engine/Physics';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export type TTextServiceDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
  cameraService: TCameraService;
  transformDriveService: TTransformDriveService;
}>;
