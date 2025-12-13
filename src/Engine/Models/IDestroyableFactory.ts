import type { IAbstractFactory, IDestroyable, IWrapper } from '@Engine/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS> = Nullable<IAbstractFactory<T, ENT, PRMS>> & IDestroyable;
