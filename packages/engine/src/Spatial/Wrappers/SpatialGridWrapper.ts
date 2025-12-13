import RBush from 'rbush';
import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { Group, Mesh, Object3D } from 'three';
import { Box3, Vector3 } from 'three';
import type { Line2 } from 'three/examples/jsm/lines/Line2';
import type { ColorRepresentation } from 'three/src/math/Color';

import type { TAbstractWrapper } from '@/Abstract';
import { AbstractWrapper, WrapperType } from '@/Abstract';
import type { TActor } from '@/Actor';
import type { TSceneWrapper } from '@/Scene';
import { entityToConfigSpatialGrid } from '@/Spatial/Adapters/EntityToConfig';
import type { TSpatialCellId, TSpatialCellParams, TSpatialCellWrapper, TSpatialGrid, TSpatialGridConfig, TSpatialGridParams, TSpatialGridWrapper } from '@/Spatial/Models';
import { createBoundingBox, createOutline } from '@/Spatial/Services/SpatialHelper';
import { SpatialCellWrapper } from '@/Spatial/Wrappers/SpatialCellWrapper';
import { isDefined, isNotDefined } from '@/Utils';

export function SpatialGridWrapper(params: TSpatialGridParams): TSpatialGridWrapper {
  const entity: TSpatialGrid = createEntity(params);
  let _debugOutlines: Array<Line2> = [];
  const _debugOutlinesIds: Array<number> = [];
  const update$: Subject<TSpatialCellWrapper> = new Subject<TSpatialCellWrapper>();

  function createEntity({ mapWidth, mapHeight, cellSize, centerX, centerZ }: TSpatialGridParams): TSpatialGrid {
    const startX: number = centerX - Math.floor(mapWidth / cellSize / 2) * cellSize;
    const startZ: number = centerZ - Math.floor(mapHeight / cellSize / 2) * cellSize;

    const grid: TSpatialGrid = new RBush();

    // eslint-disable-next-line functional/no-loop-statements
    for (let x: number = 0; x < mapWidth; x += cellSize) {
      // eslint-disable-next-line functional/no-loop-statements
      for (let z: number = 0; z < mapHeight; z += cellSize) {
        const cell: TSpatialCellParams = { minX: startX + x, minZ: startZ + z, maxX: startX + x + cellSize, maxZ: startZ + z + cellSize, x, z };
        const cellW: TSpatialCellWrapper = SpatialCellWrapper(cell);
        grid.insert(cellW);
      }
    }

    return grid;
  }

  const wrapper: TAbstractWrapper<TSpatialGrid> = AbstractWrapper(entity, WrapperType.SpatialGrid, params);

  function getBoundingBox(mesh: Mesh | Group | Object3D): Box3 {
    const box: Box3 = new Box3();
    box.setFromObject(mesh);
    return box;
  }

  function registerActorToGrid(actor: TActor, gridW: TSpatialGridWrapper): void {
    actor.spatial.setGrid(gridW);
  }

  function addActor(this: TSpatialGridWrapper, actor: TActor): void | never {
    if (isNotDefined(actor.spatial.getGrid())) registerActorToGrid(actor, this);

    const boundingBox: Box3 = getBoundingBox(actor.model3d.getRawModel3d());
    const min: Vector3 = boundingBox.min;
    const max: Vector3 = boundingBox.max;

    const cells: ReadonlyArray<TSpatialCellWrapper> = entity.search({ minX: min.x, minY: min.z, maxX: max.x, maxY: max.z });
    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      if (isNotDefined(cell.findObject(actor.id))) {
        cell.addObject(actor);
        update$.next(cell);
      }
    }
    actor.spatial.setSpatialCells(cells);
  }

  const getAllCells = (): ReadonlyArray<TSpatialCellWrapper> => entity.all();

  function getAllInCell(x: number, z: number): ReadonlyArray<TActor> {
    const cells: ReadonlyArray<TSpatialCellWrapper> = entity.search({ minX: x, minY: z, maxX: x, maxY: z });
    if (cells.length === 1) return cells[0].getObjects();
    if (cells.length > 1) return cells.flatMap((cell: TSpatialCellWrapper): ReadonlyArray<TActor> => cell.getObjects());
    return [];
  }

  const getCoordsFromGridId = (cellId: TSpatialCellId): Vector3 => {
    const [x, z] = cellId.split('_').slice(-2).map(Number);
    return new Vector3(x, 0, z);
  };

  function getAllInCellByCellId(cellId: TSpatialCellId): ReadonlyArray<TActor> {
    // const cells: ReadonlyArray<TSpatialCellWrapper> = entity.all().filter((cell) => cell.id === cellId);
    const { x, z } = getCoordsFromGridId(cellId);
    return getAllInCell(x, z);
  }

  function removeFromGrid(actor: TActor): void | never {
    const cells: ReadonlyArray<TSpatialCellWrapper> = actor.spatial.getSpatialCells();

    // eslint-disable-next-line functional/no-loop-statements
    for (const cell of cells) {
      cell.removeObject(actor);
      update$.next(cell);
    }

    actor.spatial.resetSpatialCells();
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

  function updateActorCell(this: TSpatialGridWrapper, actor: TActor): void {
    removeFromGrid(actor);
    addActor.call(this, actor);
  }

  const findCellsForPoint = (x: number, z: number): ReadonlyArray<TSpatialCellWrapper> => entity.search({ minX: x, minY: z, maxX: x, maxY: z });

  const findCellsForBox = ({
    minX,
    minZ,
    maxX,
    maxZ
  }: Readonly<{
    minX: number;
    minZ: number;
    maxX: number;
    maxZ: number;
  }>): ReadonlyArray<TSpatialCellWrapper> => entity.search({ minX, minY: minZ, maxX, maxY: maxZ });

  // TODO test this function
  function findCellsByActorBox(actor: TActor): ReadonlyArray<TSpatialCellWrapper> {
    const actorBox: Box3 = getBoundingBox(actor.model3d.getRawModel3d());
    return findCellsForBox({ minX: actorBox.min.x, minZ: actorBox.min.z, maxX: actorBox.max.x, maxZ: actorBox.max.z });
  }

  function findCellById(id: TSpatialCellId): TSpatialCellWrapper | undefined {
    return entity.all().filter((cell: TSpatialCellWrapper): boolean => cell.id === id)[0];
  }

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    // eslint-disable-next-line functional/immutable-data
    _debugOutlines.length = 0;
    // eslint-disable-next-line functional/immutable-data
    _debugOutlinesIds.length = 0;
    destroySub$.unsubscribe();

    update$.complete();
    getAllCells().forEach((cell: TSpatialCellWrapper): void => void cell.destroy$.next());
    entity.clear();
  });

  const _debugVisualizeCellsBoxList: Array<Mesh> = [];

  // this visualization is for debugging purposes only
  function _debugVisualizeCells(sceneW: TSceneWrapper, color: ColorRepresentation = '#00ff00', wireframe: boolean = true, height: number = 0.1): void {
    entity.all().forEach((cell: TSpatialCellWrapper): void => {
      const box: Mesh = createBoundingBox(cell.minX, cell.minY, cell.maxX, cell.maxY, color, wireframe, height);
      sceneW.entity.add(box);
      // eslint-disable-next-line functional/immutable-data
      _debugVisualizeCellsBoxList.push(box);
    });
  }

  function _removeDebugVisualizeCells(sceneW: TSceneWrapper): void {
    _debugVisualizeCellsBoxList.forEach((box: Mesh): void => {
      sceneW.entity.remove(box);
      box.geometry.dispose();
    });
    // eslint-disable-next-line functional/immutable-data
    _debugVisualizeCellsBoxList.length = 0;
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
    // eslint-disable-next-line functional/immutable-data
    _debugOutlinesIds.length = 0;

    const actorsList: ReadonlyArray<TActor> = getAllInCell(x, z);

    actorsList.forEach((actor: TActor): void => {
      const outline: Line2 = createOutline(actor, color, 0.1);
      sceneW.entity.add(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlines.push(outline);
      // eslint-disable-next-line functional/immutable-data
      _debugOutlinesIds.push(outline.id);
    });
  }

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, {
    entity,
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
    _removeDebugVisualizeCells,
    _debugHighlightObjects,
    updateActorCell,
    getParams: (): TSpatialGridParams => params,
    update$: update$.asObservable(),
    serialize: (): TSpatialGridConfig => entityToConfigSpatialGrid(result)
  });

  return result;
}
