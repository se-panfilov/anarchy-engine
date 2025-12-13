import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoop } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = TAbstractLoop<void> &
  Readonly<{
    step: () => void;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
