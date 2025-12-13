import { IAbstractConfig, IAbstractWrapperFactory, IFromConfig, IWrapper } from '@Engine/Models';

export type IAbstractFromConfigWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = IAbstractWrapperFactory<T, ENT, PRMS> & IFromConfig<T, ENT, C>;
