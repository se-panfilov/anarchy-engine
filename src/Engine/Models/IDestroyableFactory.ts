import type { IAbstractFactory, IAbstractWrapperFactory } from '@Engine/Domains/Abstract';
import type { IDestroyable, IWrapper } from '@Engine/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, F extends IAbstractFactory<T, PRMS>> = F & Nullable<IAbstractWrapperFactory<T, ENT, PRMS>> & IDestroyable;
