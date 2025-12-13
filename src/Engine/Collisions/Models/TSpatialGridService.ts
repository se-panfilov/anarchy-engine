import type RBush from 'rbush';
import type { ColorRepresentation } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell, TSpatialCellId } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TSpatialGridService = Readonly<{
  createGrid: (mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number) => RBush<TSpatialCell>;
  addToCell: (x: number, y: number, actorW: TActorWrapperAsync, tree: RBush<TSpatialCell>) => void;
  addToGridBulk: (tree: RBush<TSpatialCell>, list: ReadonlyArray<TSpatialCell>) => RBush<TSpatialCell>;
  addActorToGrid: (tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync) => void;
  getAllItems: (tree: RBush<TSpatialCell>) => ReadonlyArray<TSpatialCell>;
  getAllInCell: (tree: RBush<TSpatialCell>, x: number, z: number) => ReadonlyArray<TActorWrapperAsync>;
  getAllInCellByCellId: (tree: RBush<TSpatialCell>, cellId: TSpatialCellId) => ReadonlyArray<TActorWrapperAsync>;
  removeFromCell: (actorW: TActorWrapperAsync) => void;
  clearGrid: (tree: RBush<TSpatialCell>) => RBush<TSpatialCell>;
  moveToNewCell: (x: number, y: number, tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync) => void;
  updateActorsCells: (actorsW: ReadonlyArray<TActorWrapperAsync>, tree: RBush<TSpatialCell>) => void;
  _debugVisualizeCells: (tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
  _debugHighlightObjects: (tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, x: number, z: number) => void;
}>;
