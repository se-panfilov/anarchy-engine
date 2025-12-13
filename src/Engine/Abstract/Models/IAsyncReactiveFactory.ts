import type { Observable } from 'rxjs';

import type { IFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

export type IAsyncReactiveFactory<T = any, P = any> = Omit<IFactory<T, P>, 'create'> &
  Readonly<{
    create: (params: P) => Promise<T>;
  }> &
  IDestroyable & {
    entityCreated$: Observable<T>;
  };
