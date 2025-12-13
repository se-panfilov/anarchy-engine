import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, IDestroyable, IWrapper } from '@Engine/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig, F extends IAbstractFactory<T, PRMS>> = F &
  Nullable<IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C, F>> &
  IDestroyable;
