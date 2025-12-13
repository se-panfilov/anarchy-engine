import type { World } from '@dimforge/rapier3d';

export type TPhysicsDependencies = Readonly<{
  world: World;
}>;
