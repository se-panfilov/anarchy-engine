import type { IAbstractFactory, IWrapper } from '@Engine/Models';

export type IAbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractFactory<T, PRMS>;
