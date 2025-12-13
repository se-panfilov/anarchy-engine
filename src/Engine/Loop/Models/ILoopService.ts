import type { Observable } from 'rxjs';

import type { IDestroyable } from '@/Engine/Mixins';

import type { ILoopTimes } from './ILoopTimes';

export type ILoopService = Readonly<{
  start: () => void;
  stop: () => void;
  tick$: Observable<ILoopTimes>;
  getIsLooping: () => boolean;
}> &
  IDestroyable;
