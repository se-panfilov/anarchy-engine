import type { IAbstractConfig, IAbstractFactory, IDestroyableFactory, IDestroyableFromConfigFactory, IWrapper } from '@Engine/Domains/Abstract';

export type IGenericDestroyableFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>, C extends IAbstractConfig = void> = F &
  (IDestroyableFactory<T, E, P, F> | IDestroyableFromConfigFactory<T, E, P, C, F>);
