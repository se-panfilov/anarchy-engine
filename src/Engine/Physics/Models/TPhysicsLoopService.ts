import type { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = Readonly<{
  tick$: Subject<void>;
  step: () => void;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
