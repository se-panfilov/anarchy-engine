import type { Observable } from 'rxjs';

import type { TFactory } from '@/Engine/Abstract';
import type { TDestroyable, TWithCreateAsync } from '@/Engine/Mixins';

export type TAsyncReactiveFactory<T = any, P = any> = Omit<TFactory<T, P>, 'create'> &
  TWithCreateAsync<T, P> &
  TDestroyable & {
    entityCreated$: Observable<T>;
  };
