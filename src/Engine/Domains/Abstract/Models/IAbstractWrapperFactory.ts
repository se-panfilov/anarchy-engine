import type { IWrapper } from '../Models';
import type { IAbstractFactory } from './IAbstractFactory';

export type IAbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS> = IAbstractFactory<T, PRMS>;
