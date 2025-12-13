import type { TFactory } from '@Engine/Abstract';
import type { TDestroyable } from '@Engine/Mixins';
import type { Observable } from 'rxjs';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined> = TFactory<T, P, D> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
