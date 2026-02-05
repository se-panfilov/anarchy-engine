import type { TConfigToParamsWithDependenciesFn } from '@hellpig/anarchy-engine/Abstract';
import type { TAnyCreateFn, TWithCreateFromConfigService } from '@hellpig/anarchy-engine/Mixins/Services/Models';

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
