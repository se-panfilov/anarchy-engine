import type { Observable } from 'rxjs';

import type { TFactory, TFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TReactiveFactoryWithDependencies<T, P, D> = TFactoryWithDependencies<T, P, D> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;

export type TReactiveFactory<T, P> = TFactory<T, P> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
