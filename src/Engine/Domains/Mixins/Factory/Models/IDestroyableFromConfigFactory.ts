import type { IAbstractConfig, IAbstractFactory, IWrapper } from '@Engine/Domains/Abstract';
import type { IDestroyable } from '@Engine/Domains/Mixins';
import type { INullable } from '@Engine/Utils';

import type { IAbstractFromConfigWrapperFactory } from './IAbstractFromConfigWrapperFactory';

export type IDestroyableFromConfigFactory<T extends IWrapper<E>, E, P, C extends IAbstractConfig, F extends IAbstractFactory<T, P>> = INullable<F> &
  INullable<IAbstractFromConfigWrapperFactory<T, E, P, C, F>> &
  IDestroyable;
