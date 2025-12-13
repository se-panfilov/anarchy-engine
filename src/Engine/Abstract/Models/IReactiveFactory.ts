import type { Observable } from 'rxjs';

import type { IFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

export type IReactiveFactory<T = any, P = any> = IFactory<T, P> &
  IDestroyable & {
    entityCreated$: Observable<T>;
  };
