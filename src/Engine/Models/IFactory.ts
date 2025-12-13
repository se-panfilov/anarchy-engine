import type { IAbstractFactory, IAbstractWrapperFactory, IDestroyableFactory } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Models';

export type IFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractWrapperFactory<T, ENT, PRMS> | IDestroyableFactory<T, ENT, PRMS, IAbstractFactory<T, PRMS>>;
