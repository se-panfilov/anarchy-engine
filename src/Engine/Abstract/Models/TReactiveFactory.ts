import type { Observable } from 'rxjs';

import type { TAbstractHooks, TCreateEntityFactoryWithDependenciesAndHooksFn, TCreateEntityFactoryWithHooksFn, TFactory, TFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TReactiveFactoryWithDependencies<T, P, D> = TFactoryWithDependencies<T, P, D> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;

export type TReactiveFactoryWithDependenciesAndHooks<T, P, D, H extends TAbstractHooks> = Omit<TReactiveFactoryWithDependencies<T, P, D>, 'create'> &
  Readonly<{
    create: TCreateEntityFactoryWithDependenciesAndHooksFn<T, P, D, H>;
  }>;

export type TReactiveFactoryWithHooks<T, P, H extends TAbstractHooks> = Omit<TFactory<T, P>, 'create'> &
  Readonly<{
    create: TCreateEntityFactoryWithHooksFn<T, P, H>;
  }>;

export type TReactiveFactory<T, P> = TFactory<T, P> &
  TDestroyable &
  Readonly<{
    entityCreated$: Observable<T>;
  }>;

export type TReactiveFactoryAndHooks<T, P, H extends TAbstractHooks> = Omit<TReactiveFactory<T, P>, 'create'> &
  Readonly<{
    create: TCreateEntityFactoryWithHooksFn<T, P, H>;
  }>;
