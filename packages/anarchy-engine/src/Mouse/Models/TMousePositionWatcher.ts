import type { TMultitonWatcherWithState } from '@hellpig/anarchy-engine/Abstract';
import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

type TWithNormalizedVector2 = Readonly<{ valueNormalized$: Observable<Vector2Like> }>;

export type TMousePositionWatcher = TMultitonWatcherWithState<Vector2Like> & TWithNormalizedVector2;
