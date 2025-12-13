import type { Observable } from 'rxjs';

import type { IDestroyable } from './IDestroyable';

export type IReactiveDestroyable = IDestroyable &
  Readonly<{
    destroyed$: Observable<void>;
  }>;
