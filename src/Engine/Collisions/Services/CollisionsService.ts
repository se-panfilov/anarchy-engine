import type { ColorRepresentation, Intersection, Line, Vector3 } from 'three';
import { ArrowHelper, Box3, BufferGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Raycaster, SphereGeometry } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor/Models';
import type { TBvhService, TCollisionCheckResult, TCollisionsService } from '@/Engine/Collisions/Models';
import { createBoundingBox } from '@/Engine/Spatial/Services/SpatialHelper';

import { BvhService } from './BvhService';

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
    const actorBox: Box3 = new Box3().setFromObject(actorW.entity);
    const queryBox = {
      minX: actorBox.min.x - radius,
      minY: actorBox.min.y - radius,
      minZ: actorBox.min.z - radius,
      maxX: actorBox.max.x + radius,
      maxY: actorBox.max.y + radius,
      maxZ: actorBox.max.z + radius
    };

    // TODO debug (window as any).sceneW
    if (box) (window as any).sceneW.entity.remove(box);
    box = createBoundingBox(queryBox.minX, queryBox.minZ, queryBox.maxX, queryBox.maxZ, 'red');
    (window as any).sceneW.entity.add(box);

    // eslint-disable-next-line functional/no-loop-statements
    for (const object of actorsToCheck) {
      if (object.id !== actorW.id) {
        const raycaster: Raycaster = new Raycaster();
        // eslint-disable-next-line functional/immutable-data
        raycaster.firstHitOnly = true;
        raycaster.set(actorW.entity.position, actorW.kinematic.getLinearDirection());

        const intersects: Array<Intersection> = [];
        bvhService.raycastWithBvh(object, raycaster, intersects);

        if (intersects.length > 0) {
          const intersect = intersects[0];
          if (intersect.distance <= radius) {
            return {
              object,
              distance: intersect.distance,
              collisionPoint: intersect.point,
              bulletPosition: actorW.entity.position.clone()
            };
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
