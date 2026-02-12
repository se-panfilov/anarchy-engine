import type { TCameraService } from '@Anarchy/Engine/Camera';
import type { TLoopService } from '@Anarchy/Engine/Loop';
import type { TPhysicsBodyService } from '@Anarchy/Engine/Physics';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';

export type TTextServiceDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
  cameraService: TCameraService;
  transformDriveService: TTransformDriveService;
}>;
