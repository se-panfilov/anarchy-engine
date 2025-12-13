import type { IWrapper } from '@Engine/Domains/Abstract';
import type { IFromConfig } from '@Engine/Mixins';

import type { IAbstractConfig } from './IAbstractConfig';
import type { IAbstractFactory } from './IAbstractFactory';
import type { IAbstractWrapperFactory } from './IAbstractWrapperFactory';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig, F extends IAbstractFactory<T, PRMS>> = F &
  IAbstractWrapperFactory<T, ENT, PRMS> &
  IFromConfig<T, ENT, C>;
