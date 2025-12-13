import type { IDestroyable } from '@Engine/Mixins';
import type { IAbstractPool } from '@Engine/Pool';

export type IDestroyablePool<T> = IAbstractPool<T> & IDestroyable;
