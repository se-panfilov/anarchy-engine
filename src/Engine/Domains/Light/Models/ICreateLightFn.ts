import type { ICreateFN } from '@Engine/Domains/Abstract';
import type { ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
