import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TFactory } from './TFactory';

export type TReactiveFactory<T, P, D = Record<string, any> | undefined, S extends Record<string, any> | undefined = undefined> = TFactory<T, P, D, S> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;
