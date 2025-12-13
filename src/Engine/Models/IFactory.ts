import type { IAbstractWrapperFactory, IDestroyableFactory, IWrapper } from '@/Engine';

export type IFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractWrapperFactory<T, ENT, PRMS> | IDestroyableFactory<T, ENT, PRMS>;
