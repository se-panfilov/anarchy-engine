import type { IAbstractConfig, IAbstractFromConfigFactory, IDestroyableFromConfigFactory, IWrapper } from '@/Engine';

export type IFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> = IAbstractFromConfigFactory<T, ENT, PRMS, C> | IDestroyableFromConfigFactory<T, ENT, PRMS, C>
