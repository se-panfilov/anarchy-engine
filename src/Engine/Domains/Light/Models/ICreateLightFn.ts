import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ILightParams, ILightWrapper } from '@Engine/Domains/Light';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
