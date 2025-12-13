import type { ColorRepresentation } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TSpatialCell, TSpatialCellId } from './TSpatialCell';
import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridService = Readonly<{
  createGrid: (mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number) => TSpatialGrid;
  addActorToCell: (x: number, y: number, actorW: TActorWrapperAsync, grid: TSpatialGrid) => void;
  addToGridBulk: (grid: TSpatialGrid, list: ReadonlyArray<TSpatialCell>) => TSpatialGrid;
  addActorToGrid: (grid: TSpatialGrid, actorW: TActorWrapperAsync) => void;
  getAllItems: (grid: TSpatialGrid) => ReadonlyArray<TSpatialCell>;
  getAllInCell: (grid: TSpatialGrid, x: number, z: number) => ReadonlyArray<TActorWrapperAsync>;
  getAllInCellByCellId: (grid: TSpatialGrid, cellId: TSpatialCellId) => ReadonlyArray<TActorWrapperAsync>;
  removeFromGrid: (actorW: TActorWrapperAsync) => void;
  clearGrid: (grid: TSpatialGrid) => TSpatialGrid;
  updateActorCell: (grid: TSpatialGrid, actorW: TActorWrapperAsync) => void;
  _debugVisualizeCells: (grid: TSpatialGrid, sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
  _debugHighlightObjects: (grid: TSpatialGrid, sceneW: TSceneWrapper, x: number, z: number) => void;
}>;
