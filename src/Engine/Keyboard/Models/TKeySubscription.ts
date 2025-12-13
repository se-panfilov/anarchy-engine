import type { Observable } from 'rxjs';

import type { TLoopTimes } from '@/Engine/Loop';

import type { TGameKey } from './TGameKey';
import type { TKeyCombo } from './TKeyCombo';

export type TKeySubscription = {
  pressed$: Observable<TGameKey | TKeyCombo>;
  pressing$: Observable<Readonly<{ key: TGameKey | TKeyCombo; delta: TLoopTimes }>>;
  released$: Observable<TGameKey | TKeyCombo>;
};
