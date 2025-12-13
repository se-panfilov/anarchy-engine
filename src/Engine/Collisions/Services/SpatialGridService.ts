import RBush from 'rbush';
import type { Object3D, Scene } from 'three';
import { Box3, Box3Helper, Vector3 } from 'three';

import type { TBoundingBox, TSpatialGridService } from '@/Engine/Collisions/Models';

export function SpatialGridService(): TSpatialGridService {
  const spatialGrid = new RBush<TBoundingBox>();

  function toBoundingBox(object: Object3D): TBoundingBox {
    const box: Box3 = new Box3().setFromObject(object);
    return {
      minX: box.min.x,
      minY: box.min.y,
      minZ: box.min.z,
      maxX: box.max.x,
      maxY: box.max.y,
      maxZ: box.max.z,
      object: object
    };
  }

  const addObjectToGrid = (object: Object3D): void => spatialGrid.insert(toBoundingBox(object));

  const removeObjectFromGrid = (object: Object3D): void => spatialGrid.remove(toBoundingBox(object), (a, b): boolean => a.object === b.object);

  function updateObjectInGrid(object: Object3D): void {
    removeObjectFromGrid(object);
    addObjectToGrid(object);
  }

  function visualizeRBush(grid: RBush<TBoundingBox>, scene: Scene): void {
    const items = grid.all();
    items.forEach((item): void => {
      const box: Box3 = new Box3(new Vector3(item.minX, item.minY, item.minZ), new Vector3(item.maxX, item.maxY, item.maxZ));

      const helper: Box3Helper = new Box3Helper(box, 0xffff00);
      scene.add(helper);
    });
  }

  return {
    addObjectToGrid,
    removeObjectFromGrid,
    updateObjectInGrid,
    visualizeRBush,
    getSpatialGrid: (): RBush<TBoundingBox> => spatialGrid
  };
}
