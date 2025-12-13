import type { TFactory } from '@Engine/Abstract';
import type { TDestroyable } from '@Engine/Mixins';
import type { Observable } from 'rxjs';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined, O extends Record<string, any> | undefined = undefined> = TFactory<T, P, D, O> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
