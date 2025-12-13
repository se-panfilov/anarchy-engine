import type { IDestroyable } from '../Registry/Mixin';
import type { IAbstractPool } from './IAbstractPool';

export type IDestroyablePool<T> = IAbstractPool<T> & IDestroyable;
