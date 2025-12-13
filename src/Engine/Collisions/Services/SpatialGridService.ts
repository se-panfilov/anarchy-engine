import RBush from 'rbush';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialGridService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) CWP we need factories and registries for trees, perhaps.
export function SpatialGridService(): TSpatialGridService {
  function createBoundingBox(minX: number, minY: number, maxX: number, maxY: number): Mesh {
    const geometry: BoxGeometry = new BoxGeometry(maxX - minX, 1, maxY - minY);
    const material: MeshBasicMaterial = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const box: Mesh = new Mesh(geometry, material);
    box.position.set((minX + maxX) / 2, 0.5, (minY + maxY) / 2);
    return box;
  }

  //this visualization is for debugging purposes only
  function visualizeSpatialCells(tree: RBush<TSpatialCell>, scene: TSceneWrapper): void {
    tree.all().forEach((cell: TSpatialCell): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY);
      scene.entity.add(box);
    });
  }

  function addObjectToSpatialCell(x: number, y: number, object: TActorWrapperAsync, tree: RBush<TSpatialCell>): void {
    const cells: ReadonlyArray<TSpatialCell> = tree.search({ minX: x, minY: y, maxX: x, maxY: y });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.objects.find((o: TActorWrapperAsync): boolean => o.id === object.id))) {
        // eslint-disable-next-line functional/immutable-data
        cell.objects.push(object);
      }
    }
  }

  function createSpatialGrid(mapWidth: number, mapHeight: number, cellSize: number): RBush<TSpatialCell> {
    const tree: RBush<TSpatialCell> = new RBush();

    // eslint-disable-next-line functional/no-loop-statements
    for (let x: number = 0; x < mapWidth; x += cellSize) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let y: number = 0; y < mapHeight; y += cellSize) {
        const cell: TSpatialCell = { minX: x, minY: y, maxX: x + cellSize, maxY: y + cellSize, objects: [] };
        tree.insert(cell);
      }
    }

    return tree;
  }

  return {
    createSpatialGrid,
    addObjectToSpatialCell,
    visualizeSpatialCells
  };
}
