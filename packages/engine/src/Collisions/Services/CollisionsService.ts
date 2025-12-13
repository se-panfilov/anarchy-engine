import type { Vector3 } from 'three';
import { Raycaster } from 'three';

import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TActor } from '@/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService } from '@/Collisions/Models';
import type { TReadonlyVector3 } from '@/ThreeLib';

import { BvhService } from './BvhService';

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();
  const abstractService: TAbstractService = AbstractService([bvhService]);

  // The bigger "interpolationLengthMultiplier" then less chance the bullet won't fly through the target without a collision registration. But the too big value might lead to false positives registrations
  // i.g. bigger "interpolationLengthMultiplier" (2, 4, etc.) is safer (but better test it first)
  function checkCollisions(actor: TActor, actorsToCheck: ReadonlyArray<TActor>, interpolationLengthMultiplier: number, delta: number): TCollisionCheckResult | undefined {
    const currentPosition: TReadonlyVector3 = actor.drive.position$.value;
    const direction: Vector3 = actor.drive.kinematic.getLinearDirection().clone().normalize();
    const speed: number = actor.drive.kinematic.getLinearSpeed();

    const extendedDistance: number = speed * delta * interpolationLengthMultiplier;
    const previousPosition: Vector3 = currentPosition.clone().sub(direction.multiplyScalar(extendedDistance));

    // TODO we could reuse raycaster instead of creating a new one every time
    const raycaster = new Raycaster();
    raycaster.set(previousPosition, direction);
    // eslint-disable-next-line functional/immutable-data
    raycaster.far = extendedDistance;
    // eslint-disable-next-line functional/immutable-data
    raycaster.firstHitOnly = true;

    // eslint-disable-next-line functional/no-loop-statements
    for (const object of actorsToCheck) {
      if (object.id === actor.id) continue;

      const intersects = raycaster.intersectObject(object.model3d.getRawModel3d(), true);
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

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    checkCollisions,
    bvh: bvhService
  });
}
