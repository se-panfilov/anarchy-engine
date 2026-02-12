import type { TWithCreateService } from '@Anarchy/Engine/Mixins/Services/Models';
import type { TExtractDeps, TExtractEntity, TExtractParams } from '@Anarchy/Engine/Mixins/Services/Utils';

export function withCreateServiceMixin<
  F extends {
    create: (...args: any[]) => any;
  },
  O extends Record<string, any> | undefined = undefined
>(factory: F, dependencies: TExtractDeps<F>): TWithCreateService<TExtractEntity<F>, TExtractParams<F>, O> {
  const create = (params: TExtractParams<F>): TExtractEntity<F> => factory.create(params, dependencies);

  const createFromList = (list: ReadonlyArray<TExtractParams<F>>): ReadonlyArray<TExtractEntity<F>> => list.map(create);

  return {
    create,
    createFromList
  };
}
