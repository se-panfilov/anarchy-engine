import type { Observable } from 'rxjs';

import type { TWrapper } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
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
    findObject: (id: string) => TActorWrapperAsync | undefined;
    addObject: (object: TActorWrapperAsync) => void;
    getObjects: () => ReadonlyArray<TActorWrapperAsync>;
    removeObject: (actorW: TActorWrapperAsync) => void;
    update$: Observable<TSpatialCell>;
  }>;
