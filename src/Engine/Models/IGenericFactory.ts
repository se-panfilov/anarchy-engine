import type { IAbstractConfig } from '@Engine/Domains/Abstract';
import type { IWrapper } from '@Engine/Domains/Abstract/Models/IWrapper';
import type { IFactory } from '@Engine/Models/IFactory';
import type { IFromConfigFactory } from '@Engine/Models/IFromConfigFactory';

export type IGenericFactory<T extends IWrapper<ENT>, ENT, PRMS, C extends IAbstractConfig = void> = IFactory<T, ENT, PRMS> | IFromConfigFactory<T, ENT, PRMS, C>;
