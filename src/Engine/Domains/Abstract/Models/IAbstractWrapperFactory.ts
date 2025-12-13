import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Models';

export type IAbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractFactory<T, PRMS>;
