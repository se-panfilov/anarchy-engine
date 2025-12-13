import type { IWrapper } from '@Engine/Domains/Abstract';
import type { IDestroyable } from '@Engine/Mixins';
import type { INullable } from '@Engine/Utils';

import type { IAbstractFactory } from './IAbstractFactory';
import type { IAbstractWrapperFactory } from './IAbstractWrapperFactory';

export type IDestroyableFactory<T extends IWrapper<E>, E, P, F extends IAbstractFactory<T, P>> = F & INullable<IAbstractWrapperFactory<T, E, P>> & IDestroyable;
