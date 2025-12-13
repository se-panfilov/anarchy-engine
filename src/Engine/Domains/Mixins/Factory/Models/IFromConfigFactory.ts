import type { IAbstractConfig, IAbstractFactory, IWrapper } from '@Engine/Domains/Abstract';

import type { IAbstractFromConfigWrapperFactory } from './IAbstractFromConfigWrapperFactory';

export type IFromConfigFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>, C extends IAbstractConfig = void> = IAbstractFromConfigWrapperFactory<T, E, P, C, F>;
