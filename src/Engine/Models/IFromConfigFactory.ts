import type { IAbstractConfig, IAbstractFromConfigWrapperFactory, IDestroyableFromConfigFactory, IWrapper } from '@/Engine';

export type IFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> =
  | IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C>
  | IDestroyableFromConfigFactory<T, ENT, PRMS, C>;
