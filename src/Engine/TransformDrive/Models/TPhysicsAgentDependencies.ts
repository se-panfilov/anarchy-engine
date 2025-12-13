import type { TPhysicalLoop } from '@/Engine/Physics';

export type TPhysicsAgentDependencies = Readonly<{
  physicalLoop: TPhysicalLoop;
}>;
