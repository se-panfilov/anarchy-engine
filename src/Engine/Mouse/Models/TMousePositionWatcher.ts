import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TMultitonWatcher } from '@/Engine/Abstract';

type TWithNormalizedVector2 = Readonly<{ valueNormalized$: Observable<Vector2Like> }>;

export type TMousePositionWatcher = Omit<TMultitonWatcher<Vector2Like>, 'start' | 'stop'> &
  Readonly<{
    start: () => TMousePositionWatcher;
    stop: () => TMousePositionWatcher;
  }> &
  TWithNormalizedVector2;
