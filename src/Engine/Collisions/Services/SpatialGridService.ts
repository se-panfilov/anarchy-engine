import RBush from 'rbush';
import type { ColorRepresentation, Object3D } from 'three';
import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialCellId, TSpatialGridService } from '@/Engine/Collisions/Models';
import { createOutline } from '@/Engine/Collisions/Services/SpatialHelper';
import type { TWithCoordsXZ } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isDefined, isNotDefined } from '@/Engine/Utils';

// TODO (S.Panfilov) CWP we need factories and registries for grids, perhaps.
export function SpatialGridService(): TSpatialGridService {
  function createBoundingBox(minX: number, minY: number, maxX: number, maxY: number, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): Mesh {
    const geometry: PlaneGeometry = new PlaneGeometry(maxX - minX, maxY - minY);
    const material: MeshBasicMaterial = new MeshBasicMaterial({ color, wireframe });
    const plane: Mesh = new Mesh(geometry, material);
    plane.position.set((minX + maxX) / 2, 0, (minY + maxY) / 2);
    // eslint-disable-next-line functional/immutable-data
    plane.rotation.x = -Math.PI / 2;
    return plane;
  }

  //this visualization is for debugging purposes only
  function _debugVisualizeCells(tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): void {
    tree.all().forEach((cell: TSpatialCell): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY, color, wireframe);
      sceneW.entity.add(box);
    });
  }

  let _debugOutlines: Array<Line2> = [];
  let _debugOutlinesIds: Array<number> = [];

  //this highlight is for debugging purposes only (only adds outlines to scene, might not remove them afterward!!!)
  function _debugHighlightObjects(tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, x: number, z: number, color: ColorRepresentation = '#0000ff'): void {
    _debugOutlines.forEach((outline: Line2): void => void sceneW.entity.remove(outline));
    _debugOutlines = [];
    _debugOutlinesIds.forEach((id: number): void => {
      const obj: Object3D | undefined = sceneW.entity.getObjectById(id);
      if (isDefined(obj)) sceneW.entity.remove(obj);
    });
    _debugOutlinesIds = [];

    const actorsWrapperList: ReadonlyArray<TActorWrapperAsync> = getAllInCell(tree, x, z);

    actorsWrapperList.forEach((actorW: TActorWrapperAsync): void => {
      const outline: Line2 = createOutline(actorW, color, 0.1);
      sceneW.entity.add(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlines.push(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlinesIds.push(outline.id);
    });
  }

  const addToGridBulk = (tree: RBush<TSpatialCell>, list: ReadonlyArray<TSpatialCell>): RBush<TSpatialCell> => tree.load(list);

  function addToCell(x: number, z: number, actorW: TActorWrapperAsync, tree: RBush<TSpatialCell>): void {
    const cells: ReadonlyArray<TSpatialCell> = tree.search({ minX: x, minY: z, maxX: x, maxY: z });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.objects.find((o: TActorWrapperAsync): boolean => o.id === actorW.id))) {
        // eslint-disable-next-line functional/immutable-data
        cell.objects.push(actorW);
        actorW.setSpatialCell(cell);
      }
    }
  }

  function addActorToGrid(tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync): void {
    const { x, z } = actorW.getPosition().getCoords();
    addToCell(x, z, actorW, tree);
  }

  const getAllItems = (tree: RBush<TSpatialCell>): ReadonlyArray<TSpatialCell> => tree.all();

  function getAllInCell(tree: RBush<TSpatialCell>, x: number, z: number): ReadonlyArray<TActorWrapperAsync> {
    const cells: ReadonlyArray<TSpatialCell> = tree.search({ minX: x, minY: z, maxX: x, maxY: z });
    if (cells.length > 0) return cells[0].objects;
    return [];
  }

  const getCoordsFromGridId = (cellId: TSpatialCellId): TWithCoordsXZ => {
    const [x, z] = cellId.split('_').slice(-2).map(Number);
    return { x, z };
  };

  function getAllInCellByCellId(tree: RBush<TSpatialCell>, cellId: TSpatialCellId): ReadonlyArray<TActorWrapperAsync> {
    // const cells: ReadonlyArray<TSpatialCell> = tree.all().filter((cell) => cell.id === cellId);
    const { x, z } = getCoordsFromGridId(cellId);
    return getAllInCell(tree, x, z);
  }

  function removeFromCell(actorW: TActorWrapperAsync): void {
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

  const clearGrid = (tree: RBush<TSpatialCell>): RBush<TSpatialCell> => tree.clear();

  function moveToNewCell(x: number, y: number, tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync): void {
    removeFromCell(actorW);
    addToCell(x, y, actorW, tree);
  }

  function updateActorsCells(actorsW: ReadonlyArray<TActorWrapperAsync>, tree: RBush<TSpatialCell>): void {
    // eslint-disable-next-line functional/no-loop-statements
    for (const actorW of actorsW) {
      const { x, y } = actorW.getPosition().getCoords();
      const cell: TSpatialCell = tree.search({ minX: x, minY: y, maxX: x, maxY: y })[0];
      if (!cell || cell !== actorW.getSpatialCell()) moveToNewCell(x, y, tree, actorW);
    }
  }

  function createGrid(mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number): RBush<TSpatialCell> {
    const startX: number = centerX - Math.floor(mapWidth / cellSize / 2) * cellSize;
    const startZ: number = centerZ - Math.floor(mapHeight / cellSize / 2) * cellSize;

    const tree: RBush<TSpatialCell> = new RBush();

    // eslint-disable-next-line functional/no-loop-statements
    for (let x = 0; x < mapWidth; x += cellSize) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let z = 0; z < mapHeight; z += cellSize) {
        const cell: TSpatialCell = {
          id: `spatial_grid_${x}_${z}`,
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
    createGrid,
    addToCell,
    addActorToGrid,
    addToGridBulk,
    getAllItems,
    getAllInCell,
    getAllInCellByCellId,
    removeFromCell,
    clearGrid,
    moveToNewCell,
    updateActorsCells,
    _debugVisualizeCells,
    _debugHighlightObjects
  };
}
