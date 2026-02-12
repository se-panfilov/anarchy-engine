import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { BehaviorSubject, Observable } from 'rxjs';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialData } from './TSpatialData';
import type { TSpatialMethods } from './TSpatialMethods';

export type TWithSpatial = Readonly<{
  spatial: Readonly<{ data: TSpatialData }> &
    Readonly<{
      autoUpdate$: BehaviorSubject<boolean>;
      cellsChanged$: Observable<ReadonlyArray<TSpatialCellWrapper>>;
    }> &
    TSpatialMethods &
    TDestroyable;
}>;
