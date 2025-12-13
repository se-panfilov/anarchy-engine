import type { BehaviorSubject } from 'rxjs';

import type { TAbstractReadonlyLoopWith } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TDelta } from './TDelta';

export type TLoop = TAbstractReadonlyLoopWith<TDelta> &
  Readonly<{
    start: () => void;
    stop: () => void;
    enabled$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
