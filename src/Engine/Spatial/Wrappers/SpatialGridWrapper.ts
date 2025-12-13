import RBush from 'rbush';
import type { Mesh, Object3D } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TWithCoordsXZ } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCell, TSpatialCellId, TSpatialGrid, TSpatialGridParams, TSpatialGridWrapper } from '@/Engine/Spatial/Models';
import { createBoundingBox, createOutline } from '@/Engine/Spatial/Services/SpatialHelper';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function SpatialGridWrapper(params: TSpatialGridParams): TSpatialGridWrapper {
  const entity: TSpatialGrid = createEntity(params);
  let _debugOutlines: Array<Line2> = [];
  let _debugOutlinesIds: Array<number> = [];

  function createEntity({ mapWidth, mapHeight, cellSize, centerX, centerZ }: TSpatialGridParams): TSpatialGrid {
    const startX: number = centerX - Math.floor(mapWidth / cellSize / 2) * cellSize;
    const startZ: number = centerZ - Math.floor(mapHeight / cellSize / 2) * cellSize;

    const grid: TSpatialGrid = new RBush();

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

        grid.insert(cell);
      }
    }

    return grid;
  }

  const wrapper: TWrapper<TSpatialGrid> = AbstractWrapper(entity, WrapperType.SpatialGrid, params);

  const addToGridBulk = (list: ReadonlyArray<TSpatialCell>): TSpatialGrid => entity.load(list);

  function addActorToCell(x: number, z: number, actorW: TActorWrapperAsync): void {
    const cells: ReadonlyArray<TSpatialCell> = entity.search({ minX: x, minY: z, maxX: x, maxY: z });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.objects.find((aw: TActorWrapperAsync): boolean => aw.id === actorW.id))) {
        // eslint-disable-next-line functional/immutable-data
        cell.objects.push(actorW);
        actorW.spatial.setSpatialCell(cell);
      }
    }
  }

  function addActorToGrid(actorW: TActorWrapperAsync): void {
    const { x, z } = actorW.getPosition().getCoords();
    addActorToCell(x, z, actorW);
  }

  const getAllItems = (): ReadonlyArray<TSpatialCell> => entity.all();

  function getAllInCell(x: number, z: number): ReadonlyArray<TActorWrapperAsync> {
    const cells: ReadonlyArray<TSpatialCell> = entity.search({ minX: x, minY: z, maxX: x, maxY: z });
    if (cells.length === 1) return cells[0].objects;
    if (cells.length > 1) return cells.flatMap((cell: TSpatialCell): ReadonlyArray<TActorWrapperAsync> => cell.objects);
    return [];
  }

  const getCoordsFromGridId = (cellId: TSpatialCellId): TWithCoordsXZ => {
    const [x, z] = cellId.split('_').slice(-2).map(Number);
    return { x, z };
  };

  function getAllInCellByCellId(cellId: TSpatialCellId): ReadonlyArray<TActorWrapperAsync> {
    // const cells: ReadonlyArray<TSpatialCell> = entity.all().filter((cell) => cell.id === cellId);
    const { x, z } = getCoordsFromGridId(cellId);
    return getAllInCell(x, z);
  }

  function removeFromGrid(actorW: TActorWrapperAsync): void | never {
    const cell: TSpatialCell | undefined = actorW.spatial.getSpatialCell();
    if (isNotDefined(cell)) throw new Error(`Cannot remove actor (id: "${actorW.id}") from spatial grid, such actor is not in the grid`);
    const index: number = cell.objects.indexOf(actorW);
    if (index === -1) throw new Error(`Cannot remove actor (id: "${actorW.id}") from spatial grid, such actor is not in the grid`);

    // eslint-disable-next-line functional/immutable-data
    cell.objects.splice(index, 1);
    actorW.spatial.resetSpatialCell();
  }

  const clearGrid = (): TSpatialGrid => entity.clear();

  function updateActorCell(actorW: TActorWrapperAsync): void {
    removeFromGrid(actorW);
    addActorToGrid(actorW);
  }

  function findCells(x: number, z: number): ReadonlyArray<TSpatialCell> {
    return entity.search({ minX: x, minY: z, maxX: x, maxY: z });
  }

  function findCellById(id: TSpatialCellId): TSpatialCell | undefined {
    return entity.all().filter((cell: TSpatialCell): boolean => cell.id === id)[0];
  }

  function destroy(): void {
    // TODO (S.Panfilov) DESTROY: implement destroy
    throw new Error('SpatialGrid destroy not implemented');
  }

  //this visualization is for debugging purposes only
  function _debugVisualizeCells(sceneW: TSceneWrapper, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): void {
    entity.all().forEach((cell: TSpatialCell): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY, color, wireframe);
      sceneW.entity.add(box);
    });
  }

  //this highlight is for debugging purposes only (only adds outlines to scene, might not remove them afterward!!!)
  function _debugHighlightObjects(sceneW: TSceneWrapper, x: number, z: number, color: ColorRepresentation = '#0000ff'): void {
    _debugOutlines.forEach((outline: Line2): void => void sceneW.entity.remove(outline));
    _debugOutlines = [];
    _debugOutlinesIds.forEach((id: number): void => {
      const obj: Object3D | undefined = sceneW.entity.getObjectById(id);
      if (isDefined(obj)) sceneW.entity.remove(obj);
    });
    _debugOutlinesIds = [];

    const actorsWrapperList: ReadonlyArray<TActorWrapperAsync> = getAllInCell(x, z);

    actorsWrapperList.forEach((actorW: TActorWrapperAsync): void => {
      const outline: Line2 = createOutline(actorW, color, 0.1);
      sceneW.entity.add(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlines.push(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlinesIds.push(outline.id);
    });
  }

  return {
    ...wrapper,
    entity,
    destroy,
    addToGridBulk,
    addActorToCell,
    addActorToGrid,
    getAllItems,
    getAllInCell,
    getAllInCellByCellId,
    findCells,
    findCellById,
    removeFromGrid,
    clearGrid,
    _debugVisualizeCells,
    _debugHighlightObjects,
    updateActorCell
  };
}
