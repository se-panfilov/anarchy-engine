import type { TAbstractHooks, TConfigToParamsWithDependenciesFn } from '@/Engine/Abstract';
import type { TCreateFromServiceFn, TWithCreateFromConfigService } from '@/Engine/Mixins/Services/Models';

export function withCreateFromConfigServiceMixin<T, C, P, D, H extends TAbstractHooks = undefined>(
  create: TCreateFromServiceFn<T, P, H>,
  configToParams: TConfigToParamsWithDependenciesFn<C, P, D>,
  dependencies?: D
): TWithCreateFromConfigService<C, T, H> {
  return {
    createFromConfig(list: ReadonlyArray<C>, hooks?: H): ReadonlyArray<T> {
      return list.map((config: C): T => create(configToParams(config, dependencies), hooks));
    }
  };
}
