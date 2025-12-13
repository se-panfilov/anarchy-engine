import type { IAbstractWrapperFactory, IDestroyableFactory, IWrapper } from '@Engine/Models';

export type IFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractWrapperFactory<T, ENT, PRMS> | IDestroyableFactory<T, ENT, PRMS>;
