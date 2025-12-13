import type { World } from '@dimforge/rapier3d';

import type { TWithCoordsXYZ } from '@/Engine/Mixins';
import type { TPhysicsDebugRenderer, TPhysicsService } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Utils';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TVector3Wrapper } from '@/Engine/Vector';

// TODO (S.Panfilov) TWorld instead of World
export function PhysicsService(scene: TSceneWrapper, world: World): TPhysicsService {
  // TODO (S.Panfilov)

  const getDebugRenderer = (): TPhysicsDebugRenderer => PhysicsDebugRenderer(scene.entity, world);

  function setGravity(vector: TVector3Wrapper): void {
    // Earth's gravity is 9.81 m/s^2 or { x: 0.0, y: -9.81, z: 0.0 };
    const gravity: TWithCoordsXYZ = vector.getCoords();
    // eslint-disable-next-line functional/immutable-data
    world.gravity = gravity;
  }

  return {
    getDebugRenderer,
    setGravity
  };
}
