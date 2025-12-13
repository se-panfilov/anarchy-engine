import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActorWrapper } from '@/Engine/Actor';
import type { TDestroyable, TWithTagsMixin } from '@/Engine/Mixins';
import type { TSpatialCell } from '@/Engine/Spatial';

export type TSpatialCellWrapper = TWrapper<TSpatialCell> &
  TWithTagsMixin &
  TDestroyable &
  Readonly<{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    findObject: (id: string) => TActorWrapper | undefined;
    addObject: (object: TActorWrapper) => void;
    getObjects: () => ReadonlyArray<TActorWrapper>;
    removeObject: (actorW: TActorWrapper) => void;
    update$: Observable<TSpatialCell>;
  }>;
