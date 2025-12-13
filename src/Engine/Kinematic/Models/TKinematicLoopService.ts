import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TMilliseconds } from '@/Engine/Math';
import type { TDestroyable } from '@/Engine/Mixins';

export type TKinematicLoopService = TAbstractLoopService<TMilliseconds> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
