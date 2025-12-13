import type { ColorRepresentation, Intersection } from 'three';
import { ArrowHelper, BufferGeometry, LineBasicMaterial, LineSegments, Raycaster, Vector3 } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService } from '@/Engine/Collisions/Models';

import { BvhService } from './BvhService';

function createCapsule(start: Vector3, end: Vector3, radius: number) {
  const startToEnd = new Vector3().subVectors(end, start);
  const startToEndLengthSq = startToEnd.lengthSq();

  function containsPoint(point: Vector3): boolean {
    const startToPoint = new Vector3().subVectors(point, start);
    const projection = startToPoint.dot(startToEnd) / startToEndLengthSq;
    const closestPoint = new Vector3().copy(start).add(startToEnd.clone().multiplyScalar(projection));
    return closestPoint.distanceTo(point) <= radius;
  }

  return {
    start,
    end,
    radius,
    containsPoint
  };
}

export function CollisionsService(): TCollisionsService {
  const bvhService: TBvhService = BvhService();

  // TODO debug box
  let box: any;

  let arrowHelper: ArrowHelper;

  function _debugVisualizeRaycaster(raycaster: Raycaster, length: number, color: ColorRepresentation = 0x0000ff): ArrowHelper {
    const direction = raycaster.ray.direction.clone().normalize();
    const origin = raycaster.ray.origin.clone();

    const arrowHelper = new ArrowHelper(direction, origin, length, color);

    // TODO debug (window as any).sceneW
    (window as any).sceneW.entity.add(arrowHelper);
    return arrowHelper;
  }

  function _debugVisualizeInterpolatedPositions(previousPosition: Vector3, currentPosition: Vector3, steps: number, color: ColorRepresentation = 0xff0000): LineSegments {
    const stepVector = currentPosition.clone().sub(previousPosition).divideScalar(steps);
    const points: Vector3[] = [];

    for (let i = 0; i < steps; i++) {
      const start = previousPosition.clone().add(stepVector.clone().multiplyScalar(i));
      const end = previousPosition.clone().add(stepVector.clone().multiplyScalar(i + 1));
      points.push(start, end);
    }

    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({ color });
    const lineSegments = new LineSegments(geometry, material);

    // TODO debug (window as any).sceneW
    (window as any).sceneW.entity.add(lineSegments);
    return lineSegments;
  }

  const interpolatedPositions = [];

  // TODO should be possible to check collisions against another grid
  function checkCollisions(actorW: TActorWrapperAsync, radius: number, actorsToCheck: ReadonlyArray<TActorWrapperAsync>): TCollisionCheckResult | undefined {
    const previousPosition = actorW.entity.position.clone();
    const currentPosition = previousPosition.clone().add(actorW.kinematic.getLinearDirection().multiplyScalar(radius));

    const steps = 10;
    const stepVector = currentPosition.clone().sub(previousPosition).divideScalar(steps);
    const interpolatedPosition = new Vector3();
    const nextInterpolatedPosition = new Vector3();

    // eslint-disable-next-line functional/no-loop-statements
    for (let i = 0; i < steps; i++) {
      interpolatedPosition.copy(previousPosition).add(stepVector.clone().multiplyScalar(i));
      nextInterpolatedPosition.copy(previousPosition).add(stepVector.clone().multiplyScalar(i + 1));

      // eslint-disable-next-line functional/no-loop-statements
      for (const object of actorsToCheck) {
        if (object.id !== actorW.id) {
          const raycaster: Raycaster = new Raycaster();
          raycaster.firstHitOnly = true;
          raycaster.set(interpolatedPosition, actorW.kinematic.getLinearDirection());

          const capsule = createCapsule(interpolatedPosition, nextInterpolatedPosition, radius);
          const intersects: Array<Intersection> = [];
          bvhService.raycastWithBvh(object, raycaster, intersects);

          // eslint-disable-next-line functional/no-loop-statements
          for (const intersect of intersects) {
            if (capsule.containsPoint(intersect.point)) {
              return {
                object,
                distance: intersect.distance,
                collisionPoint: intersect.point,
                bulletPosition: nextInterpolatedPosition.clone()
              };
            }
          }
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
