import type { IAbstractConfig, IWrapper } from '@Engine/Domains/Abstract';

export type IFromConfig<T extends IWrapper<E>, E, C extends IAbstractConfig> = Readonly<{
  fromConfig: (config: C) => T;
}>;
