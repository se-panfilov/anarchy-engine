import type { ColorRepresentation } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TSpatialCell, TSpatialCellId } from './TSpatialCell';
import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridService = Readonly<{
  createGrid: (mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number) => TSpatialGrid;
  addActorToCell: (x: number, y: number, actorW: TActorWrapperAsync, tree: TSpatialGrid) => void;
  addToGridBulk: (tree: TSpatialGrid, list: ReadonlyArray<TSpatialCell>) => TSpatialGrid;
  addActorToGrid: (tree: TSpatialGrid, actorW: TActorWrapperAsync) => void;
  getAllItems: (tree: TSpatialGrid) => ReadonlyArray<TSpatialCell>;
  getAllInCell: (tree: TSpatialGrid, x: number, z: number) => ReadonlyArray<TActorWrapperAsync>;
  getAllInCellByCellId: (tree: TSpatialGrid, cellId: TSpatialCellId) => ReadonlyArray<TActorWrapperAsync>;
  removeFromGrid: (actorW: TActorWrapperAsync) => void;
  clearGrid: (tree: TSpatialGrid) => TSpatialGrid;
  updateActorCell: (tree: TSpatialGrid, actorW: TActorWrapperAsync) => void;
  _debugVisualizeCells: (tree: TSpatialGrid, sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
  _debugHighlightObjects: (tree: TSpatialGrid, sceneW: TSceneWrapper, x: number, z: number) => void;
}>;
