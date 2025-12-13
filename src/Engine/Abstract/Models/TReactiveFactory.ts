import type { Observable } from 'rxjs';

import type { TAbstractHooks, TFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined, H extends TAbstractHooks = undefined> = TFactory<T, P, D, H> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
