import type { Observable } from 'rxjs';

import type { TFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TReactiveFactory<T = any, P = any> = TFactory<T, P> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
