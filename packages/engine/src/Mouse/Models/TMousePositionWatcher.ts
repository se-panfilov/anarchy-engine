import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TMultitonWatcherWithState } from '@/Abstract';

type TWithNormalizedVector2 = Readonly<{ valueNormalized$: Observable<Vector2Like> }>;

export type TMousePositionWatcher = TMultitonWatcherWithState<Vector2Like> & TWithNormalizedVector2;
