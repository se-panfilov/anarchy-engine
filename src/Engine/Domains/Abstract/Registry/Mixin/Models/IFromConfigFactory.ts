import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, IDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Domains/Abstract/Models/IWrapper';

export type IFromConfigFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>, C extends IAbstractConfig = void> =
  | IAbstractFromConfigWrapperFactory<T, E, P, C, F>
  | IDestroyableFromConfigFactory<T, E, P, C, F>;
