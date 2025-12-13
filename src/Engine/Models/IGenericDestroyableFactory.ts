import type { IAbstractConfig, IAbstractFactory, IDestroyableFactory, IDestroyableFromConfigFactory } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Models';

export type IGenericDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, F extends IAbstractFactory<T, PRMS>, C extends IAbstractConfig = void> = F &
  (IDestroyableFactory<T, ENT, PRMS, F> | IDestroyableFromConfigFactory<T, ENT, PRMS, C, F>);
