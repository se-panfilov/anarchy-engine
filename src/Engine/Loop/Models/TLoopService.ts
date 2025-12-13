import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

import type { ILoopTimes } from './ILoopTimes';

export type TLoopService = Readonly<{
  start: () => void;
  stop: () => void;
  tick$: Observable<ILoopTimes>;
  getIsLooping: () => boolean;
}> &
  TDestroyable;
