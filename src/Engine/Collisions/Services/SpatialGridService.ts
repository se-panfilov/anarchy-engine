import RBush from 'rbush';
import type { ColorRepresentation, LineSegments, Vector2, Vector3 } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, Raycaster } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TSpatialCell, TSpatialGridService } from '@/Engine/Collisions/Models';
import { createOutline } from '@/Engine/Collisions/Services/SpatialHelper';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined, isNotDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) CWP we need factories and registries for trees, perhaps.
export function SpatialGridService(): TSpatialGridService {
  function createBoundingBox(minX: number, minY: number, maxX: number, maxY: number, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): Mesh {
    const geometry: BoxGeometry = new BoxGeometry(maxX - minX, 1, maxY - minY);
    const material: MeshBasicMaterial = new MeshBasicMaterial({ color, wireframe });
    const box: Mesh = new Mesh(geometry, material);
    box.position.set((minX + maxX) / 2, 0.5, (minY + maxY) / 2);
    return box;
  }

  //this visualization is for debugging purposes only
  function _debugVisualizeSpatialCells(tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): void {
    tree.all().forEach((cell: TSpatialCell): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY, color, wireframe);
      sceneW.entity.add(box);
    });
  }

  let outlines: LineSegments[] = [];

  //this highlight is for debugging purposes only
  function _debugHighlightCellObjects(position: Vector2, camera: TCameraWrapper, scene: TSceneWrapper, tree: RBush<TSpatialCell>): void {
    // eslint-disable-next-line functional/no-loop-statements
    for (const outline of outlines) {
      scene.entity.remove(outline);
    }

    outlines = [];

    if (position) {
      const raycaster: Raycaster = new Raycaster();
      raycaster.setFromCamera(position, camera.entity);
      const intersects = raycaster.intersectObject(scene.entity, true);
      if (intersects.length > 0) {
        const point: Vector3 = intersects[0].point;
        const cells: ReadonlyArray<TSpatialCell> = tree.search({ minX: point.x, minY: point.z, maxX: point.x, maxY: point.z });
        // eslint-disable-next-line functional/no-loop-statements
        for (const cell of cells) {
          // eslint-disable-next-line functional/no-loop-statements
          for (const object of cell.objects) {
            const outline = createOutline(object);
            scene.entity.add(outline);
            // eslint-disable-next-line functional/immutable-data
            outlines.push(outline);
          }
        }
      }
    }
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

  function createSpatialGrid(mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number): RBush<TSpatialCell> {
    const startX: number = centerX - Math.floor(mapWidth / cellSize / 2) * cellSize;
    const startZ: number = centerZ - Math.floor(mapHeight / cellSize / 2) * cellSize;

    const tree: RBush<TSpatialCell> = new RBush();

    // eslint-disable-next-line functional/no-loop-statements
    for (let x = 0; x < mapWidth; x += cellSize) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let z = 0; z < mapHeight; z += cellSize) {
        const cell: TSpatialCell = {
          minX: startX + x,
          minY: startZ + z,
          maxX: startX + x + cellSize,
          maxY: startZ + z + cellSize,
          objects: []
        };
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
    _debugVisualizeSpatialCells,
    _debugHighlightCellObjects
  };
}
