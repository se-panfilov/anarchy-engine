import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActor } from '@/Engine/Actor';
import type { TWithName } from '@/Engine/Mixins';
import type { TSpatialCell } from '@/Engine/Spatial';

export type TSpatialCellWrapper = Omit<TWrapper<TSpatialCell>, 'name'> &
  Readonly<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    findObject: (id: string) => TActor | undefined;
    addObject: (object: TActor) => void;
    getObjects: () => ReadonlyArray<TActor>;
    removeObject: (actor: TActor) => void;
    update$: Observable<TSpatialCell>;
  }> &
  TWithName;
