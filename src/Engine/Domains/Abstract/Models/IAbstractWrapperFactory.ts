import type { IWrapper } from '../Models';
import type { IAbstractFactory } from './IAbstractFactory';

export type IAbstractWrapperFactory<T extends IWrapper<E>, E, P> = IAbstractFactory<T, P>;
