import type { Observable } from 'rxjs';

import type { TDelta } from '@/Engine/Loop';

import type { TGameKey } from './TGameKey';
import type { TKeyCombo } from './TKeyCombo';

export type TKeySubscription = {
  pressed$: Observable<TGameKey | TKeyCombo>;
  pressing$: Observable<Readonly<{ key: TGameKey | TKeyCombo; delta: TDelta }>>;
  released$: Observable<TGameKey | TKeyCombo>;
};
