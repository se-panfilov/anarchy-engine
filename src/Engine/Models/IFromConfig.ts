import type { IAbstractConfig } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Models';

export type IFromConfig<T extends IWrapper<ENT>, ENT, C extends IAbstractConfig> = Readonly<{
  fromConfig: (config: C) => T;
}>;
