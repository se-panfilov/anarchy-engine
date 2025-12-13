import type { IAbstractConfig, IAbstractFactory, IAbstractWrapperFactory } from '@Engine/Domains/Abstract';

import type { IFromConfig, IWrapper } from '@/Engine/Models';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig, F extends IAbstractFactory<T, PRMS>> = F &
  IAbstractWrapperFactory<T, ENT, PRMS> &
  IFromConfig<T, ENT, C>;
