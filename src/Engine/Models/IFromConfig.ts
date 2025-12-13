import type { IAbstractConfig, IWrapper } from '@/Engine';

export type IFromConfig<T extends IWrapper<ENT>, ENT, C extends IAbstractConfig> =  Readonly<{
  fromConfig: (config: C) => T;
}>;
