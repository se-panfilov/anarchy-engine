import type { IFromConfig, IFromConfigFn } from './Models';
import type { IFactory } from '@/Engine/Domains/Abstract';
import { isNotDefined } from '@Engine/Utils';

export function withConfigFactoryMixin<T, C>(factory: IFactory<T>, fromConfig: IFromConfigFn<T, C>): IFromConfig<T, C> {
  return {
    fromConfig: (config: C, extra?: Record<string, any>): T => {
      if (isNotDefined(fromConfig)) throw new Error(`Factory "${factory.id}" cannot create from config: fromConfig function is not provided`);
      return factory.create(fromConfig(config, extra));
    }
  };
}
