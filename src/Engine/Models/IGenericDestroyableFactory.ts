import type { IAbstractConfig, IDestroyableFactory, IDestroyableFromConfigFactory, IWrapper } from '@Engine/Models';

export type IGenericDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> = IDestroyableFactory<T, ENT, PRMS> | IDestroyableFromConfigFactory<T, ENT, PRMS, C>;
