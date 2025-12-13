import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = Readonly<{
  tick$: Observable<void>;
  step: () => void;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
