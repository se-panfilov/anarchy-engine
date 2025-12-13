import type { TPhysicsLoop } from '@/Engine/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicsLoop: TPhysicsLoop;
}>;
