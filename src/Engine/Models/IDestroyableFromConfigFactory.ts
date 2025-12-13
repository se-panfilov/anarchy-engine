import type { IAbstractConfig, IDestroyable, IAbstractFromConfigFactory, IWrapper, Nullable } from '@/Engine';

export type IDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = Nullable<IAbstractFromConfigFactory<T, ENT, PRMS, C>> & IDestroyable;
