import type { Observable } from 'rxjs';
import type { ColorRepresentation } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCellId, TSpatialCellWrapper } from '@/Engine/Spatial';

import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridWrapper = TWrapper<TSpatialGrid> &
  TWithTagsMixin &
  TDestroyable &
  Readonly<{
    addActor: (actorW: TActorWrapperAsync) => void | never;
    getAllCells: () => ReadonlyArray<TSpatialCellWrapper>;
    getAllInCell: (x: number, z: number) => ReadonlyArray<TActorWrapperAsync>;
    getAllInCellByCellId: (cellId: TSpatialCellId) => ReadonlyArray<TActorWrapperAsync>;
    findCellsForPoint: (x: number, z: number) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsForBox: (box: Readonly<{ minX: number; minZ: number; maxX: number; maxZ: number }>) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsByActorBox: (actorW: TActorWrapperAsync) => ReadonlyArray<TSpatialCellWrapper>;
    findCellById: (id: TSpatialCellId) => TSpatialCellWrapper | undefined;
    removeFromGrid: (actorW: TActorWrapperAsync) => void;
    clearGrid: () => void;
    updateActorCell: (actorW: TActorWrapperAsync) => void;
    _debugVisualizeCells: (sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
    _debugHighlightObjects: (sceneW: TSceneWrapper, x: number, z: number) => void;
    update$: Observable<TSpatialCellWrapper>;
  }>;
