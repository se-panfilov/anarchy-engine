import type { TAbstractReadonlyLoopServiceWith } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TLoopTimes } from './TLoopTimes';

export type TLoopService = TAbstractReadonlyLoopServiceWith<TLoopTimes> &
  Readonly<{
    start: () => void;
    stop: () => void;
    setBeforeEveryTick: (fn: (times: TLoopTimes) => void) => void;
    isLooping: () => boolean;
  }> &
  TDestroyable;
