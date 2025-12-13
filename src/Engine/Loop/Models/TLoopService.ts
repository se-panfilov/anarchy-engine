// import type { BehaviorSubject } from 'rxjs';

import type { TAbstractReadonlyLoopServiceWith } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';

export type TLoopService = TAbstractReadonlyLoopServiceWith<TDelta> &
  Readonly<{
    start: () => void;
    stop: () => void;
    setBeforeEveryTick: (fn: (times: TDelta) => void) => void;
    isLooping: () => boolean;
    // setBeforeEveryTick: (fn: (times: TDelta) => void) => void;
    // enabled$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
