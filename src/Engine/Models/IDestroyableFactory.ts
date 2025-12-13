import type { IDestroyable, IFactory, IWrapper } from '@Engine/Models';
import type { IAbstractConfig } from '@Engine/SceneLauncher/Models';
import type { Nullable } from '@Engine/Utils';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = Nullable<IFactory<T, ENT, PRMS, C>> & IDestroyable;
