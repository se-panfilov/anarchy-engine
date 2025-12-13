import type { IAbstractConfig, IAbstractFactory, IAbstractWrapperFactory, IWrapper } from '@Engine/Domains/Abstract';
import type { IFromConfig } from '@Engine/Domains/Mixins';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<E>, E, P, C extends IAbstractConfig, F extends IAbstractFactory<T, P>> = F & IAbstractWrapperFactory<T, E, P> & IFromConfig<T, E, C>;
