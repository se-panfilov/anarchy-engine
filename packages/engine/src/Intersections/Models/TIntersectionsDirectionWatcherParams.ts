import type { TReadonlyVector3 } from '@Engine/ThreeLib';

import type { TAbstractIntersectionsWatcherParams } from './TAbstractIntersectionsWatcherParams';

export type TIntersectionsDirectionWatcherParams = TAbstractIntersectionsWatcherParams &
  Readonly<{
    origin: TReadonlyVector3;
    direction: TReadonlyVector3;
  }>;
