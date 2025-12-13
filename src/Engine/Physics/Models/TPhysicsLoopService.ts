import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

// TODO 10.0.0. LOOPS: do we need this?
export type TPhysicsLoopService = TAbstractLoop<void> &
  Readonly<{
    step: () => void;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
