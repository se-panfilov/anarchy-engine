import { isNotDefined } from '@Engine/Utils';

import type { IFactory } from '../../Models';
import type { IFromConfig } from './Models';

export function withConfigFactoryMixin<T, C, F extends IFactory>(factory: F, fromConfig: (config: C) => T): F & IFromConfig<T, C> {
  return {
    ...factory,
    fromConfig: (config: C): T => {
      if (isNotDefined(fromConfig)) throw new Error(`Factory "${factory.id}" cannot create from config: fromConfig function is not provided`);
      return factory.create(fromConfig(config));
    }
  };
}
