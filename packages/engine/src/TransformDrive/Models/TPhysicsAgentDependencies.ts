import type { TPhysicsLoop } from '@/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicsLoop: TPhysicsLoop;
}>;
