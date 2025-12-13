import type { TAbstractHooks, TReactiveFactoryWithDependenciesAndHooks } from '@/Engine/Abstract';
import type { TWithCreateService } from '@/Engine/Mixins/Services/Models';

export function withCreateServiceMixin<T, P, D, F extends TReactiveFactoryWithDependenciesAndHooks<T, P, D, H>, H extends TAbstractHooks = undefined>(
  factory: F,
  dependencies: D
): TWithCreateService<T, P, H> {
  const create = (params: P, hooks?: H): T => factory.create(params, dependencies, hooks);
  const createFromList = (list: ReadonlyArray<P>, hooks?: H): ReadonlyArray<T> => list.map((params: P): T => create(params, hooks));

  return {
    create,
    createFromList
  };
}
