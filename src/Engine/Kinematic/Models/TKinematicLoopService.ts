import type { BehaviorSubject, Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TKinematicLoopService = Readonly<{
  tick$: Subject<number>;
  autoUpdate$: BehaviorSubject<boolean>;
}> &
  TDestroyable;
