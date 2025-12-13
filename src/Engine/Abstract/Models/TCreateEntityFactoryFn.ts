import type { TAbstractHooks } from '@/Engine/Abstract';

export type TCreateEntityFactoryFn<T, P> = (params: P) => T;
export type TCreateEntityFactoryWithHooksFn<T, P, H extends TAbstractHooks> = (params: P, hooks?: H) => T;
export type TCreateEntityFactoryWithDependenciesFn<T, P, D> = (params: P, dependencies: D) => T;
export type TCreateEntityFactoryWithDependenciesAndHooksFn<T, P, D, H extends TAbstractHooks> = (params: P, dependencies: D, hooks?: H) => T;
