import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';

export type TKinematicLoopService = TAbstractLoop<TMilliseconds> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
