import type { IAbstractConfig, IAbstractWrapperFactory, IFromConfig, IWrapper } from '@/Engine';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = IAbstractWrapperFactory<T, ENT, PRMS> & IFromConfig<T, ENT, C>;
