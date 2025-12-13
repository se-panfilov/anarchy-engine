import type { Vector3Like } from 'three';

import type { TAbstractIntersectionsWatcher } from './TAbstractIntersectionsWatcher';

export type TIntersectionsDirectionWatcher = TAbstractIntersectionsWatcher &
  Readonly<{
    setOrigin: (origin: Vector3Like) => void;
    getOrigin: () => Vector3Like;
    setDirection: (direction: Vector3Like) => void;
    getDirection: () => Vector3Like;
  }>;
