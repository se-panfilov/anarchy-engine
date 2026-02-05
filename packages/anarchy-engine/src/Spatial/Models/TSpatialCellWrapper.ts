import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TActor } from '@hellpig/anarchy-engine/Actor';
import type { TWithName } from '@hellpig/anarchy-engine/Mixins';
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
