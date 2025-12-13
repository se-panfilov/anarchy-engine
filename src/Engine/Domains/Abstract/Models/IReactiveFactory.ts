import type { Subject } from 'rxjs';

import type { IFactory } from '@/Engine/Domains/Abstract';
import type { IReactiveDestroyable } from '@/Engine/Domains/Mixins';

export type IReactiveFactory<T = any, P = any> = IFactory<T, P> &
  IReactiveDestroyable & {
    entityCreated$: Subject<T>;
  };
