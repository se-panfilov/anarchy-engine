import type { IAbstractConfig, IAbstractFactory, IWrapper } from '@Engine/Domains/Abstract';
import type { IDestroyableFactory } from '@Engine/Domains/Mixins';

export type IGenericDestroyableFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>, C extends IAbstractConfig = void> = F & IDestroyableFactory<T, E, P, F>;
