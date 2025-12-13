import RBush from 'rbush';
import { Subject } from 'rxjs';
import type { Mesh, Object3D, Vector3 } from 'three';
import { Box3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TWithCoordsXZ } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCellId, TSpatialCellParams, TSpatialCellWrapper, TSpatialGrid, TSpatialGridParams, TSpatialGridWrapper } from '@/Engine/Spatial/Models';
import { createBoundingBox, createOutline } from '@/Engine/Spatial/Services/SpatialHelper';
import { SpatialCellWrapper } from '@/Engine/Spatial/Wrappers/SpatialCellWrapper';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function SpatialGridWrapper(params: TSpatialGridParams): TSpatialGridWrapper {
  const entity: TSpatialGrid = createEntity(params);
  let _debugOutlines: Array<Line2> = [];
  let _debugOutlinesIds: Array<number> = [];
  const update$: Subject<TSpatialCellWrapper> = new Subject<TSpatialCellWrapper>();

  function createEntity({ mapWidth, mapHeight, cellSize, centerX, centerZ }: TSpatialGridParams): TSpatialGrid {
    const startX: number = centerX - Math.floor(mapWidth / cellSize / 2) * cellSize;
    const startZ: number = centerZ - Math.floor(mapHeight / cellSize / 2) * cellSize;

    const grid: TSpatialGrid = new RBush();

    // eslint-disable-next-line functional/no-loop-statements
    for (let x = 0; x < mapWidth; x += cellSize) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let z = 0; z < mapHeight; z += cellSize) {
        const cell: TSpatialCellParams = { minX: startX + x, minZ: startZ + z, maxX: startX + x + cellSize, maxZ: startZ + z + cellSize, x, z };
        const cellW: TSpatialCellWrapper = SpatialCellWrapper(cell);
        grid.insert(cellW);
      }
    }

    return grid;
  }

  const wrapper: TWrapper<TSpatialGrid> = AbstractWrapper(entity, WrapperType.SpatialGrid, params);

  function getBoundingBox(mesh: Mesh): Box3 {
    const box: Box3 = new Box3();
    box.setFromObject(mesh);
    return box;
  }

  function registerActorToGrid(actorW: TActorWrapperAsync, gridW: TSpatialGridWrapper): void {
    actorW.spatial.setGrid(gridW);
  }

  function addActor(this: TSpatialGridWrapper, actorW: TActorWrapperAsync): void | never {
    if (isNotDefined(actorW.spatial.getGrid())) registerActorToGrid(actorW, this);

    const boundingBox: Box3 = getBoundingBox(actorW.entity);
    const min: Vector3 = boundingBox.min;
    const max: Vector3 = boundingBox.max;

    const cells: ReadonlyArray<TSpatialCellWrapper> = entity.search({ minX: min.x, minY: min.z, maxX: max.x, maxY: max.z });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.findObject(actorW.id))) {
        cell.addObject(actorW);
        update$.next(cell);
      }
    }
    actorW.spatial.setSpatialCells(cells);
  }

  const getAllCells = (): ReadonlyArray<TSpatialCellWrapper> => entity.all();

  function getAllInCell(x: number, z: number): ReadonlyArray<TActorWrapperAsync> {
    const cells: ReadonlyArray<TSpatialCellWrapper> = entity.search({ minX: x, minY: z, maxX: x, maxY: z });
    if (cells.length === 1) return cells[0].getObjects();
    if (cells.length > 1) return cells.flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActorWrapperAsync> => cell.getObjects());
    return [];
  }

  const getCoordsFromGridId = (cellId: TSpatialCellId): TWithCoordsXZ => {
    const [x, z] = cellId.split('_').slice(-2).map(Number);
    return { x, z };
  };

  function getAllInCellByCellId(cellId: TSpatialCellId): ReadonlyArray<TActorWrapperAsync> {
    // const cells: ReadonlyArray<TSpatialCellWrapper> = entity.all().filter((cell) => cell.id === cellId);
    const { x, z } = getCoordsFromGridId(cellId);
    return getAllInCell(x, z);
  }

  function removeFromGrid(actorW: TActorWrapperAsync): void | never {
    const cells: ReadonlyArray<TSpatialCellWrapper> = actorW.spatial.getSpatialCells();

    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      cell.removeObject(actorW);
      update$.next(cell);
    }

    actorW.spatial.resetSpatialCells();
  }

  function clearGrid(): void {
    // TODO should be tested before usage
    throw new Error('SpatialGrid clearGrid not implemented, just a placeholder: test and fix before usage');
    // entity.clear();
    // getAllCells().forEach((cell: TSpatialCellWrapper): void => {
    //   // eslint-disable-next-line functional/immutable-data
    //   cell.version++;
    //   update$.next(cell);
    // });
  }

  function updateActorCell(this: TSpatialGridWrapper, actorW: TActorWrapperAsync): void {
    removeFromGrid(actorW);
    addActor.call(this, actorW);
  }

  const findCellsForPoint = (x: number, z: number): ReadonlyArray<TSpatialCellWrapper> => entity.search({ minX: x, minY: z, maxX: x, maxY: z });

  const findCellsForBox = ({ minX, minZ, maxX, maxZ }: Readonly<{ minX: number; minZ: number; maxX: number; maxZ: number }>): ReadonlyArray<TSpatialCellWrapper> =>
    entity.search({ minX, minY: minZ, maxX, maxY: maxZ });

  // TODO test this function
  function findCellsByActorBox(actorW: TActorWrapperAsync): ReadonlyArray<TSpatialCellWrapper> {
    const actorBox: Box3 = getBoundingBox(actorW.entity);
    return findCellsForBox({ minX: actorBox.min.x, minZ: actorBox.min.z, maxX: actorBox.max.x, maxZ: actorBox.max.z });
  }

  function findCellById(id: TSpatialCellId): TSpatialCellWrapper | undefined {
    return entity.all().filter((cell: TSpatialCellWrapper): boolean => cell.id === id)[0];
  }

  function destroy(): void {
    update$.complete();
    wrapper.destroy();
    // getAllCells().forEach((cell: TSpatialCellWrapper): void => void cell.destroy());
    entity.clear();

    // TODO DESTROY: implement destroy
    throw new Error('SpatialGrid destroy not implemented');
  }

  // this visualization is for debugging purposes only
  function _debugVisualizeCells(sceneW: TSceneWrapper, color: ColorRepresentation = '#00ff00', wireframe: boolean = true): void {
    entity.all().forEach((cell: TSpatialCellWrapper): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY, color, wireframe);
      sceneW.entity.add(box);
    });
  }

  // this highlight is for debugging purposes only (only adds outlines to scene, might not remove them afterward!!!).
  // Also doesn't represent actor's rotation, so the outline might not be accurate for rotated objects
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
    addActor,
    getAllCells,
    getAllInCell,
    getAllInCellByCellId,
    findCellsForPoint,
    findCellsForBox,
    findCellsByActorBox,
    findCellById,
    removeFromGrid,
    clearGrid,
    _debugVisualizeCells,
    _debugHighlightObjects,
    updateActorCell,
    update$: update$.asObservable()
  };
}
