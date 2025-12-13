import type { IDestroyable, IWrapper } from '@Engine/Models';
import type { INullable } from '@Engine/Utils';

import type { IAbstractConfig } from './IAbstractConfig';
import type { IAbstractFactory } from './IAbstractFactory';
import type { IAbstractFromConfigWrapperFactory } from './IAbstractFromConfigWrapperFactory';

export type IDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig, F extends IAbstractFactory<T, PRMS>> = INullable<F> &
  INullable<IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C, F>> &
  IDestroyable;
