import { IFromConfigFactory } from '@Engine/Models/IFromConfigFactory';

import type { IAbstractConfig, IFactory, IWrapper } from '@/Engine';

export type IGenericFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> = IFactory<T, ENT, PRMS> | IFromConfigFactory<T, ENT, PRMS, C>;
