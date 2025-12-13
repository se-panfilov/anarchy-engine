import type { IAbstractConfig, IAbstractFromConfigWrapperFactory, IDestroyable, IWrapper } from '@Engine/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFromConfigFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = Nullable<IAbstractFromConfigWrapperFactory<T, ENT, PRMS, C>> & IDestroyable;
