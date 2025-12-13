import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TMultitonWatcher } from '@/Engine/Abstract';

export type TMousePositionWatcher = TMultitonWatcher<Vector2Like> &
  Readonly<{
    valueNormalized$: Observable<Vector2Like>;
  }>;
