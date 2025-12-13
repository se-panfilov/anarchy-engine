import type { IAbstractFactory, IDestroyableFactory, IWrapper } from '@/Engine';

export type IFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractFactory<T, ENT, PRMS> | IDestroyableFactory<T, ENT, PRMS>;
