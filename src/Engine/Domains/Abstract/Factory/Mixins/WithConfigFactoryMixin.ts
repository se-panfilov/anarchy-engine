import { isNotDefined } from '@Engine/Utils';

import type { IFactory } from '../../Models';
import type { IFromConfig, IFromConfigFn } from './Models';

// TODO (S.Panfilov) CWP  withConfigFactoryMixin should be completely removed
export function withConfigFactoryMixin<T, C extends Record<string, any>, F extends IFactory>(factory: F, fromConfig: IFromConfigFn<T, C>): F & IFromConfig<T, C> {
  return {
    ...factory,
    // TODO (S.Panfilov) should return type be just T or F & IFromConfig<T, C>?
    fromConfig: (config: C, extra?: Record<string, any>): T => {
      if (isNotDefined(fromConfig)) throw new Error(`Factory "${factory.id}" cannot create from config: fromConfig function is not provided`);
      return factory.create(fromConfig(config, extra));
    }
  };
}
