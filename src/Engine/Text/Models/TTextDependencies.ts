import type { TCameraService } from '@/Engine/Camera';
import type { TLoopService } from '@/Engine/Loop';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TTextDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  loopService: TLoopService;
  cameraService: TCameraService;
}>;
