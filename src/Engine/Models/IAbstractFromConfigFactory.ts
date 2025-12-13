import type { IAbstractConfig, IAbstractFactory, IFromConfig, IWrapper } from '@/Engine';

export type IAbstractFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = IAbstractFactory<T, ENT, PRMS> & IFromConfig<T, ENT, C>

