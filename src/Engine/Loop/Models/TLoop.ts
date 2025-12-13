import type { BehaviorSubject, Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';

export type TLoop = Readonly<{
  tick$: Observable<TDelta>;
  start: () => void;
  stop: () => void;
  enabled$: BehaviorSubject<boolean>;
}> &
  TDestroyable;
