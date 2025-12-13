import type { IFromConfig } from './Models';

export function withConfigMixin<C, P>(configToParamsFn: (config: C) => P): IFromConfig<C, P> {
  return {
    getParams: (config: C): P => configToParamsFn(config)
  };
}
