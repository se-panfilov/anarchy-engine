import type { Subject } from 'rxjs';
import type { IFactory } from '@/Engine/Domains/Abstract';
import type { IDestroyable } from '@/Engine/Domains/Mixins';

export type IReactiveFactory<T = any, P = any> = IFactory<T, P> &
  IDestroyable & {
    entityCreated$: Subject<T>;
    destroyed$: Subject<void>;
  };
