import type { Observable } from 'rxjs';

import type { TFactory, TFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable, TWithCreateAsync } from '@/Engine/Mixins';

export type TAsyncReactiveFactory<T, P, D> = (Omit<TFactory<T, P>, 'create'> | Omit<TFactoryWithDependencies<T, P, D>, 'create'>) &
  TWithCreateAsync<T, P, D> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
