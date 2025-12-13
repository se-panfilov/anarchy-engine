import type { TConfigToParamsWithDependenciesFn } from '@Engine/Abstract';
import type { TAnyCreateFn, TWithCreateFromConfigService } from '@Engine/Mixins/Services/Models';

export function withCreateFromConfigServiceMixin<T, C, P, D, O extends Record<string, any> | undefined = undefined>(
  create: TAnyCreateFn<T, P, O>,
  configToParams: TConfigToParamsWithDependenciesFn<C, P, D>,
  dependencies: D
): TWithCreateFromConfigService<C, T, O> {
  return {
    createFromConfig(list: ReadonlyArray<C>, options?: O): ReadonlyArray<T> {
      return list.map((config: C): T => create(configToParams(config, dependencies), options as O));
    }
  };
}
