import type { TAbstractHooks, TReactiveFactoryWithDependenciesAndHooks } from '@/Engine/Abstract';
import type { TWithFactoryService } from '@/Engine/Mixins/Services/Models';

export function withFactoryService<T, P, D, F extends TReactiveFactoryWithDependenciesAndHooks<T, P, D, H>, H extends TAbstractHooks = undefined>(factory: F): TWithFactoryService<T, P, D, F, H> {
  return {
    getFactory: (): F => factory
  };
}
