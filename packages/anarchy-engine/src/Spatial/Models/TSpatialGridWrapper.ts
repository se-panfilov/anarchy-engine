import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TActor } from '@Anarchy/Engine/Actor';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import type { Observable } from 'rxjs';
import type { ColorRepresentation } from 'three';

import type { TSpatialCellId } from './TSpatialCellId';
import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialGrid } from './TSpatialGrid';
import type { TSpatialGridParams } from './TSpatialGridParams';

export type TSpatialGridWrapper = TWrapper<TSpatialGrid> &
  TDestroyable &
  Readonly<{
    addActor: (actor: TActor) => void | never;
    getAllCells: () => ReadonlyArray<TSpatialCellWrapper>;
    getAllInCell: (x: number, z: number) => ReadonlyArray<TActor>;
    getAllInCellByCellId: (cellId: TSpatialCellId) => ReadonlyArray<TActor>;
    findCellsForPoint: (x: number, z: number) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsForBox: (box: Readonly<{ minX: number; minZ: number; maxX: number; maxZ: number }>) => ReadonlyArray<TSpatialCellWrapper>;
    findCellsByActorBox: (actor: TActor) => ReadonlyArray<TSpatialCellWrapper>;
    findCellById: (id: TSpatialCellId) => TSpatialCellWrapper | undefined;
    removeFromGrid: (actor: TActor) => void;
    clearGrid: () => void;
    updateActorCell: (actor: TActor) => void;
    getParams: () => TSpatialGridParams;
    _debugVisualizeCells: (sceneW: TSceneWrapper, color?: ColorRepresentation, wireframe?: boolean) => void;
    _removeDebugVisualizeCells: (sceneW: TSceneWrapper) => void;
    _debugHighlightObjects: (sceneW: TSceneWrapper, x: number, z: number) => void;
    update$: Observable<TSpatialCellWrapper>;
  }>;
