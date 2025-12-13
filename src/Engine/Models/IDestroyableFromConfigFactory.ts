import type { IAbstractConfig, IAbstractFromConfigWrapperFactory, IDestroyable, IWrapper, Nullable } from '@/Engine';

export type IDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = Nullable<IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C>> & IDestroyable;
