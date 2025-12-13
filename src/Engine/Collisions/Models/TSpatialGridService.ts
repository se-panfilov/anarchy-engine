import type RBush from 'rbush';
import type { ColorRepresentation, Vector2 } from 'three';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCameraWrapper } from '@/Engine/Camera';
import type { TSpatialCell } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TSpatialGridService = Readonly<{
  createSpatialGrid: (mapWidth: number, mapHeight: number, cellSize: number, centerX: number, centerZ: number) => RBush<TSpatialCell>;
  addToSpatialCell: (x: number, y: number, actorW: TActorWrapperAsync, tree: RBush<TSpatialCell>) => void;
  removeFromSpatialCell: (actorW: TActorWrapperAsync) => void;
  removeAllFromGrid: (tree: RBush<TSpatialCell>) => RBush<TSpatialCell>;
  moveToNewSpatialCell: (x: number, y: number, tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync) => void;
  updateActorsSpatialCells: (actorsW: ReadonlyArray<TActorWrapperAsync>, tree: RBush<TSpatialCell>) => void;
  _debugVisualizeSpatialCells: (tree: RBush<TSpatialCell>, sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
  _debugHighlightCellObjects: (position: Vector2, camera: TCameraWrapper, scene: TSceneWrapper, tree: RBush<TSpatialCell>) => void;
}>;
