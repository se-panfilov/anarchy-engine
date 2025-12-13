import { Raycaster } from 'three';

import type { TActorWrapper } from '@/Engine/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService } from '@/Engine/Collisions/Models';

import { BvhService } from './BvhService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();

  // The bigger "interpolationLengthMultiplier" then less chance the bullet won't fly through the target without a collision registration. But the too big value might lead to false positives registrations
  // i.g. bigger "interpolationLengthMultiplier" (2, 4, etc.) is safer (but better test it first)
  function checkCollisions(actorW: TActorWrapper, actorsToCheck: ReadonlyArray<TActorWrapper>, interpolationLengthMultiplier: number, delta: number): TCollisionCheckResult | undefined {
    const currentPosition = actorW.entity.position.clone();
    const direction = actorW.kinematic.getLinearDirection().normalize();
    const speed = actorW.kinematic.getLinearSpeed();

    const extendedDistance = speed * delta * interpolationLengthMultiplier;
    const previousPosition = currentPosition.clone().sub(direction.multiplyScalar(extendedDistance));

    const raycaster = new Raycaster();
    raycaster.set(previousPosition, direction); // Луч направлен от предыдущей позиции к текущей
    // eslint-disable-next-line functional/immutable-data
    raycaster.far = extendedDistance;
    // eslint-disable-next-line functional/immutable-data
    raycaster.firstHitOnly = true;

    // eslint-disable-next-line functional/no-loop-statements
    for (const object of actorsToCheck) {
      if (object.id === actorW.id) continue;

      const intersects = raycaster.intersectObject(object.entity, true);
      if (intersects.length > 0) {
        const intersection = intersects[0];
        if (intersection.distance <= extendedDistance) {
          return {
            object,
            distance: intersection.distance,
            collisionPoint: intersection.point,
            bulletPosition: currentPosition.clone()
          };
        }
      }
    }

    return undefined;
  }

  return {
    checkCollisions,
    bvh: bvhService
  };
}
