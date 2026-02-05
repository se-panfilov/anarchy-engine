import type { TPhysicsLoop } from '@hellpig/anarchy-engine/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicsLoop: TPhysicsLoop;
}>;
