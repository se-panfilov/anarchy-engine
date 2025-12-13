import type { IAbstractConfig, IAbstractFromConfigWrapperFactory, IDestroyableFromConfigFactory } from '@Engine/Models';
import type { IWrapper } from '@Engine/Models/IWrapper';

export type IFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> =
  | IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C>
  | IDestroyableFromConfigFactory<T, ENT, PRMS, C>;
