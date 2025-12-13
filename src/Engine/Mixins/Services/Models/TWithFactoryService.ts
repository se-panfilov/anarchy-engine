import type { TAbstractHooks, TReactiveFactoryWithDependenciesAndHooks } from '@/Engine/Abstract';

export type TWithFactoryService<T, P, D, F extends TReactiveFactoryWithDependenciesAndHooks<T, P, D, H>, H extends TAbstractHooks> = Readonly<{
  getFactory: () => F;
}>;
