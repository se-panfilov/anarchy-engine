import type { IAbstractConfig, IAbstractFactory, IAbstractFromConfigWrapperFactory, IDestroyableFromConfigFactory } from '@Engine/Models';
import type { IWrapper } from '@Engine/Models/IWrapper';

export type IFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, F extends IAbstractFactory<T, PRMS>, C extends IAbstractConfig = void> =
  | IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C, F>
  | IDestroyableFromConfigFactory<T, ENT, PRMS, C, F>;
