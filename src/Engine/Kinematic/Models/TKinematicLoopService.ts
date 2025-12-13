import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TKinematicLoopService = TAbstractLoopService<number> &
  Readonly<{
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
