import type { TActor } from '@Anarchy/Engine/Actor';
import type { BBox } from 'rbush';

import type { TSpatialCellId } from './TSpatialCellId';

export type TSpatialCell = BBox &
  Readonly<{
    id: TSpatialCellId;
  }> & {
    objects: Array<TActor>;
    // version represents the version of the cell. It's used to invalidate the cache of the cell. (e.g. when an object is added or removed)
    version: number;
  };
