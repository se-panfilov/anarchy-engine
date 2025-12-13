import type { IAbstractPool } from '@Engine/Domains/Abstract';
import type { IDestroyable } from '@Engine/Mixins';

export type IDestroyablePool<T> = IAbstractPool<T> & IDestroyable;
