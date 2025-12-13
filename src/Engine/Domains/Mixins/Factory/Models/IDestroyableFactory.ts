import type { IAbstractFactory, IAbstractWrapperFactory, IWrapper } from '@Engine/Domains/Abstract';
import type { IDestroyable } from '@Engine/Domains/Mixins';
import type { INullable } from '@Engine/Utils';

export type IDestroyableFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>> = F & INullable<IAbstractWrapperFactory<T, E, P>> & IDestroyable;
