import { Raycaster } from 'three';

import type { TActor } from '@/Engine/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService } from '@/Engine/Collisions/Models';

import { BvhService } from './BvhService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();

  // The bigger "interpolationLengthMultiplier" then less chance the bullet won't fly through the target without a collision registration. But the too big value might lead to false positives registrations
  // i.g. bigger "interpolationLengthMultiplier" (2, 4, etc.) is safer (but better test it first)
  function checkCollisions(actor: TActor, actorsToCheck: ReadonlyArray<TActor>, interpolationLengthMultiplier: number, delta: number): TCollisionCheckResult | undefined {
    const currentPosition = actor.getPosition().clone();
    const direction = actor.drive.kinematic.getLinearDirection().normalize();
    const speed = actor.drive.kinematic.getLinearSpeed();

    const extendedDistance = speed * delta * interpolationLengthMultiplier;
    const previousPosition = currentPosition.clone().sub(direction.multiplyScalar(extendedDistance));

    const raycaster = new Raycaster();
    raycaster.set(previousPosition, direction);
    // eslint-disable-next-line functional/immutable-data
    raycaster.far = extendedDistance;
    // eslint-disable-next-line functional/immutable-data
    raycaster.firstHitOnly = true;

    // eslint-disable-next-line functional/no-loop-statements
    for (const object of actorsToCheck) {
      if (object.id === actor.id) continue;

      const intersects = raycaster.intersectObject(object.model3d.model3d.getRawModel3d(), true);
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
