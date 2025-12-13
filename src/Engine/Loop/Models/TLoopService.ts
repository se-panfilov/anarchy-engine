import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TLoopTimes } from './TLoopTimes';

export type TLoopService = Readonly<{
  start: () => void;
  stop: () => void;
  setBeforeTick: (fn: (times: TLoopTimes) => void) => void;
  tick$: Observable<TLoopTimes>;
  getIsLooping: () => boolean;
}> &
  TDestroyable;
