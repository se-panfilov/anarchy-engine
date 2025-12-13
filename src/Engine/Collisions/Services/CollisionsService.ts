import type { Intersection, Mesh, Object3D, Vector3 } from 'three';
import { Box3, Raycaster } from 'three';

export function checkCollision(bullet: Mesh, radius: number): { object: Object3D; distance: number; collisionPoint: Vector3; bulletPosition: Vector3 } | null {
  const bulletBox = new Box3().setFromObject(bullet);
  const queryBox = {
    minX: bulletBox.min.x - radius,
    minY: bulletBox.min.y - radius,
    minZ: bulletBox.min.z - radius,
    maxX: bulletBox.max.x + radius,
    maxY: bulletBox.max.y + radius,
    maxZ: bulletBox.max.z + radius
  };

  const candidates = spatialGrid.search(queryBox);
  // eslint-disable-next-line functional/no-loop-statements
  for (const candidate of candidates) {
    if (candidate.object !== bullet) {
      const raycaster = new Raycaster();
      raycaster.set(bullet.position, bullet.direction);

      const intersects: Intersection[] = [];
      raycastWithBVH(candidate.object as Mesh, raycaster, intersects);

      if (intersects.length > 0) {
        const intersect = intersects[0];
        return {
          object: candidate.object,
          distance: intersect.distance,
          collisionPoint: intersect.point,
          bulletPosition: bullet.position.clone()
        };
      }
    }
  }
  return null;
}
