import type { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';

export type TKinematicLoopService = Readonly<{
  tick$: Subject<number>;
  isAutoUpdate: () => boolean;
  shouldAutoUpdate: (value: boolean) => void;
}> &
  TDestroyable;
