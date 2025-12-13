import type { BehaviorSubject } from 'rxjs';

import type { TAbstractLoopService } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = TAbstractLoopService<void> &
  Readonly<{
    step: () => void;
    autoUpdate$: BehaviorSubject<boolean>;
  }> &
  TDestroyable;
