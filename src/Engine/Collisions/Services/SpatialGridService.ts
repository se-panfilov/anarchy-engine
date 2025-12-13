import RBush from 'rbush';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialGridService } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined, isNotDefined } from '@/Engine/Utils';

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
  function visualizeSpatialCells(tree: RBush<TSpatialCell>, sceneW: TSceneWrapper): void {
    tree.all().forEach((cell: TSpatialCell): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY);
      sceneW.entity.add(box);
    });
  }

  function addToSpatialCell(x: number, y: number, actorW: TActorWrapperAsync, tree: RBush<TSpatialCell>): void {
    const cells: ReadonlyArray<TSpatialCell> = tree.search({ minX: x, minY: y, maxX: x, maxY: y });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.objects.find((o: TActorWrapperAsync): boolean => o.id === actorW.id))) {
        // eslint-disable-next-line functional/immutable-data
        cell.objects.push(actorW);
        actorW.setSpatialCell(cell);
      }
    }
  }

  function removeFromSpatialCell(actorW: TActorWrapperAsync): void {
    const cell: TSpatialCell | undefined = actorW.getSpatialCell();
    if (isDefined(cell)) {
      const index: number = cell.objects.indexOf(actorW);
      if (index !== -1) {
        // eslint-disable-next-line functional/immutable-data
        cell.objects.splice(index, 1);
        actorW.resetSpatialCell();
      }
    }
  }

  function moveToNewSpatialCell(x: number, y: number, tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync): void {
    removeFromSpatialCell(actorW);
    addToSpatialCell(x, y, actorW, tree);
  }

  function updateActorsSpatialCells(actorsW: ReadonlyArray<TActorWrapperAsync>, tree: RBush<TSpatialCell>): void {
    // eslint-disable-next-line functional/no-loop-statements
    for (const actorW of actorsW) {
      const { x, y } = actorW.getPosition().getCoords();
      const cell: TSpatialCell = tree.search({ minX: x, minY: y, maxX: x, maxY: y })[0];
      if (!cell || cell !== actorW.getSpatialCell()) moveToNewSpatialCell(x, y, tree, actorW);
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
    addToSpatialCell,
    removeFromSpatialCell,
    moveToNewSpatialCell,
    updateActorsSpatialCells,
    visualizeSpatialCells
  };
}
