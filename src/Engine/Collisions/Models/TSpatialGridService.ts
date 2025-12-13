import type RBush from 'rbush';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSpatialCell } from '@/Engine/Collisions/Models';
import type { TSceneWrapper } from '@/Engine/Scene';

export type TSpatialGridService = Readonly<{
  createSpatialGrid: (mapWidth: number, mapHeight: number, cellSize: number) => RBush<TSpatialCell>;
  addObjectToSpatialCell: (x: number, y: number, object: TActorWrapperAsync, tree: RBush<TSpatialCell>) => void;
  visualizeSpatialCells: (tree: RBush<TSpatialCell>, scene: TSceneWrapper) => void;
}>;
