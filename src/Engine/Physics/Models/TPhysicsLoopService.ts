import type { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = Readonly<{
  tick$: Subject<void>;
  step: () => void;
  autoUpdate$: BehaviorSubject<boolean>;
}> &
  TDestroyable;
