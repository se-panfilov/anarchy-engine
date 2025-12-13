import type { IAbstractWrapperFactory, IDestroyable, IWrapper } from '@Engine/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS> = Nullable<IAbstractWrapperFactory<T, ENT, PRMS>> & IDestroyable;
