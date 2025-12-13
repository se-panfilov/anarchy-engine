import type { TWithCreateService, TWithCreateServiceWithHooks } from '@/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractHooks, TExtractParams } from '@/Mixins/Services/Utils';

export function withCreateServiceMixin<F extends { create: (...args: any[]) => any }>(factory: F, dependencies: TExtractDeps<F>): TWithCreateService<TExtractEntity<F>, TExtractParams<F>> {
  const create = (params: TExtractParams<F>): TExtractEntity<F> => factory.create(params, dependencies);

  const createFromList = (list: ReadonlyArray<TExtractParams<F>>): ReadonlyArray<TExtractEntity<F>> => list.map(create);

  return {
    create,
    createFromList
  };
}

export function withCreateServiceWithHooksMixin<F extends { create: (...args: any[]) => any }>(
  factory: F,
  dependencies?: TExtractDeps<F>
): TWithCreateServiceWithHooks<TExtractEntity<F>, TExtractParams<F>, TExtractHooks<F>> {
  const create = (params: TExtractParams<F>, hooks?: TExtractHooks<F>): TExtractEntity<F> => factory.create(params, dependencies, hooks);

  const createFromList = (list: ReadonlyArray<TExtractParams<F>>, hooks?: TExtractHooks<F>): ReadonlyArray<TExtractEntity<F>> => list.map((params) => create(params, hooks));

  return {
    create,
    createFromList
  };
}
