import type { IAbstractConfig } from '@Engine/Models/IAbstractConfig';
import type { IFactory } from '@Engine/Models/IFactory';
import { IFromConfigFactory } from '@Engine/Models/IFromConfigFactory';
import type { IWrapper } from '@Engine/Models/IWrapper';

export type IGenericFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> = IFactory<T, ENT, PRMS> | IFromConfigFactory<T, ENT, PRMS, C>;
