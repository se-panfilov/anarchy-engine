import type { Observable } from 'rxjs';

import type { TFactory } from '@/Abstract';
import type { TDestroyable } from '@/Mixins';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined> = TFactory<T, P, D> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
