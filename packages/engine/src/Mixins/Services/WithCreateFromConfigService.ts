import type { TConfigToParamsWithDependenciesFn } from '@/Abstract';
import type { TCreateFromServiceFn, TWithCreateFromConfigService } from '@/Mixins/Services/Models';

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
