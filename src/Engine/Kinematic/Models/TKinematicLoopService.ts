import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';

// TODO 10.0.0. LOOPS: do we need this?
export type TKinematicLoopService = TAbstractLoop<TMilliseconds> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
