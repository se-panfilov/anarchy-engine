import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TSpatialCellWrapper } from './TSpatialCellWrapper';
import type { TSpatialData } from './TSpatialData';
import type { TSpatialMethods } from './TSpatialMethods';

export type TWithSpatial = Readonly<{
  spatial: Readonly<{ data: TSpatialData }> &
    Readonly<{
      cellsChanged$: Observable<ReadonlyArray<TSpatialCellWrapper>>;
    }> &
    TSpatialMethods &
    TDestroyable;
}>;
