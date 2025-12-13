import type { IWrapper } from '@Engine/Domains/Abstract';
import type { IFromConfig } from '@Engine/Mixins';

import type { IAbstractConfig } from './IAbstractConfig';
import type { IAbstractFactory } from './IAbstractFactory';
import type { IAbstractWrapperFactory } from './IAbstractWrapperFactory';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<E>, E, P, C extends IAbstractConfig, F extends IAbstractFactory<T, P>> = F & IAbstractWrapperFactory<T, E, P> & IFromConfig<T, E, C>;
