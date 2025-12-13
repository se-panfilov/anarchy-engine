import type { TPhysicalLoop, TPhysicsBodyService } from '@/Engine/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicsBodyService: TPhysicsBodyService;
  physicalLoop: TPhysicalLoop;
}>;
