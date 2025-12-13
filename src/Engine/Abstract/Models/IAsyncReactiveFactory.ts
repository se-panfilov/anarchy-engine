import type { Observable } from 'rxjs';

import type { IFactory } from '@/Engine/Abstract';
import type { IDestroyable, IWithCreateAsync } from '@/Engine/Mixins';

export type IAsyncReactiveFactory<T = any, P = any> = Omit<IFactory<T, P>, 'create'> &
  IWithCreateAsync<T, P> &
  IDestroyable & {
    entityCreated$: Observable<T>;
  };
