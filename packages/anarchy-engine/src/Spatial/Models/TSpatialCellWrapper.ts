import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TActor } from '@Anarchy/Engine/Actor';
import type { TWithName } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TSpatialCell } from './TSpatialCell';

export type TSpatialCellWrapper = Omit<TWrapper<TSpatialCell>, 'name'> &
  Readonly<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    getVersion: () => number;
    findObject: (id: string) => TActor | undefined;
    addObject: (object: TActor) => void;
    getObjects: () => ReadonlyArray<TActor>;
    removeObject: (actor: TActor) => void;
    update$: Observable<TSpatialCell>;
  }> &
  TWithName;
