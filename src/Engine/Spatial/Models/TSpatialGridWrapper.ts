import type { ColorRepresentation } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCell, TSpatialCellId } from '@/Engine/Spatial';

import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridWrapper = TWrapper<TSpatialGrid> &
  TWithTagsMixin &
  TDestroyable &
  Readonly<{
    addActorToCell: (x: number, y: number, actorW: TActorWrapperAsync) => void;
    addToGridBulk: (list: ReadonlyArray<TSpatialCell>) => TSpatialGrid;
    addActorToGrid: (actorW: TActorWrapperAsync) => void;
    getAllItems: () => ReadonlyArray<TSpatialCell>;
    getAllInCell: (x: number, z: number) => ReadonlyArray<TActorWrapperAsync>;
    getAllInCellByCellId: (cellId: TSpatialCellId) => ReadonlyArray<TActorWrapperAsync>;
    findCells: (x: number, z: number) => ReadonlyArray<TSpatialCell>;
    findCellById: (id: TSpatialCellId) => TSpatialCell | undefined;
    removeFromGrid: (actorW: TActorWrapperAsync) => void;
    clearGrid: () => TSpatialGrid;
    updateActorCell: (actorW: TActorWrapperAsync) => void;
    _debugVisualizeCells: (sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
    _debugHighlightObjects: (sceneW: TSceneWrapper, x: number, z: number) => void;
  }>;
