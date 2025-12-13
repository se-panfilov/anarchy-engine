import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  physicsLoopService: TPhysicsLoopService;
}>;
