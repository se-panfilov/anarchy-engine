import type { Subject } from 'rxjs';

import type { IDestroyable } from './IDestroyable';

export type IReactiveDestroyable = IDestroyable &
  Readonly<{
    destroyed$: Subject<void>;
  }>;
