import type { IDestroyable, IWrapper } from '@Engine/Models';
import type { INullable } from '@Engine/Utils';

import type { IAbstractFactory } from './IAbstractFactory';
import type { IAbstractWrapperFactory } from './IAbstractWrapperFactory';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, F extends IAbstractFactory<T, PRMS>> = F & INullable<IAbstractWrapperFactory<T, ENT, PRMS>> & IDestroyable;
