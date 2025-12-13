import type { TPhysicsService } from '@/Engine/Physics/Models';
import { PhysicsDebugRenderer } from '@/Engine/Physics/Utils';

export function PhysicsService(scene): TPhysicsService {
  // TODO (S.Panfilov)

  const getDebugRenderer = PhysicsDebugRenderer(scene, world);

  return {
    getDebugRenderer
  };
}
