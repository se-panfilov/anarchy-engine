import type { TWithCreateService } from '@/Engine/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractParams } from '@/Engine/Mixins/Services/Utils';

export function withCreateServiceMixin<F extends { create: (...args: any[]) => any }>(factory: F, dependencies: TExtractDeps<F>): TWithCreateService<TExtractEntity<F>, TExtractParams<F>> {
  const create = (params: TExtractParams<F>): TExtractEntity<F> => factory.create(params, dependencies);

  const createFromList = (list: ReadonlyArray<TExtractParams<F>>): ReadonlyArray<TExtractEntity<F>> => list.map((params) => create(params));

  return {
    create,
    createFromList
  };
}
