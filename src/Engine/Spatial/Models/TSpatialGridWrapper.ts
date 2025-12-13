import type { Observable } from 'rxjs';
import type { ColorRepresentation } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActorWrapper } from '@/Engine/Actor';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TSpatialCellId, TSpatialCellWrapper } from '@/Engine/Spatial';

import type { TSpatialGrid } from './TSpatialGrid';

export type TSpatialGridWrapper = TWrapper<TSpatialGrid> &
  TDestroyable &
  Readonly<{
    addActor: (actorW: TActorWrapper) => void | never;
    getAllCells: () => ReadonlyArray<TSpatialCellWrapper>;
    getAllInCell: (x: number, z: number) => ReadonlyArray<TActorWrapper>;
    getAllInCellByCellId: (cellId: TSpatialCellId) => ReadonlyArray<TActorWrapper>;
    findCellsForPoint: (x: number, z: number) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsForBox: (box: Readonly<{ minX: number; minZ: number; maxX: number; maxZ: number }>) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsByActorBox: (actorW: TActorWrapper) => ReadonlyArray<TSpatialCellWrapper>;
    findCellById: (id: TSpatialCellId) => TSpatialCellWrapper | undefined;
    removeFromGrid: (actorW: TActorWrapper) => void;
    clearGrid: () => void;
    updateActorCell: (actorW: TActorWrapper) => void;
    _debugVisualizeCells: (sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
    _debugHighlightObjects: (sceneW: TSceneWrapper, x: number, z: number) => void;
    update$: Observable<TSpatialCellWrapper>;
  }>;
