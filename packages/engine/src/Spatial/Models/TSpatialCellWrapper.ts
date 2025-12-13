import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Abstract';
import type { TActor } from '@/Actor';
import type { TWithName } from '@/Mixins';
import type { TSpatialCell } from '@/Spatial';

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
