import type { TFactory } from '@Engine/Abstract';
import type { TDestroyable } from '@Engine/Mixins';
import type { Observable } from 'rxjs';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined, S extends Record<string, any> | undefined = undefined> = TFactory<T, P, D, S> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
