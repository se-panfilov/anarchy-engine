import type { TConfigToParamsWithDependenciesFn } from '@Engine/Abstract';
import type { TCreateFromServiceFn, TWithCreateFromConfigService } from '@Engine/Mixins/Services/Models';

export function withCreateFromConfigServiceMixin<T, C, P, D>(
  create: TCreateFromServiceFn<T, P>,
  configToParams: TConfigToParamsWithDependenciesFn<C, P, D>,
  dependencies: D
): TWithCreateFromConfigService<C, T> {
  return {
    createFromConfig(list: ReadonlyArray<C>): ReadonlyArray<T> {
      return list.map((config: C): T => create(configToParams(config, dependencies)));
    }
  };
}
