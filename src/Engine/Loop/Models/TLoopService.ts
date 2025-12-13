import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TLoopTimes } from './TLoopTimes';

export type TLoopService = TAbstractLoopService<TLoopTimes> &
  Readonly<{
    start: () => void;
    stop: () => void;
    setBeforeEveryTick: (fn: (times: TLoopTimes) => void) => void;
    isLooping: () => boolean;
  }> &
  TDestroyable;
