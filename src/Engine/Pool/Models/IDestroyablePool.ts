import type { IDestroyable } from '@Engine/Models';
import type { IAbstractPool } from '@Engine/Pool';

export type IDestroyablePool<T> = IAbstractPool<T> & IDestroyable;
