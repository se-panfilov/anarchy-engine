import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyable, IFactory, IWrapper } from '@Engine/Models';

export type IDestroyableFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig> = IFactory<T, ENT, PRMS, C> & IDestroyable;
