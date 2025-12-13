import type RBush from 'rbush';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TSpatialGridService = Readonly<{
  createSpatialGrid: (mapWidth: number, mapHeight: number, cellSize: number) => RBush<TSpatialCell>;
  addToSpatialCell: (x: number, y: number, actorW: TActorWrapperAsync, tree: RBush<TSpatialCell>) => void;
  removeFromSpatialCell: (actorW: TActorWrapperAsync) => void;
  moveToNewSpatialCell: (x: number, y: number, tree: RBush<TSpatialCell>, actorW: TActorWrapperAsync) => void;
  updateActorsSpatialCells: (actorsW: ReadonlyArray<TActorWrapperAsync>, tree: RBush<TSpatialCell>) => void;
  visualizeSpatialCells: (tree: RBush<TSpatialCell>, sceneW: TSceneWrapper) => void;
}>;
