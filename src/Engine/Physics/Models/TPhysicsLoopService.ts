import type { Observable } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsLoopService = Readonly<{
  start: () => void;
  stop: () => void;
  tick$: Observable<number>;
  isLooping: () => boolean;
}> &
  TDestroyable;
