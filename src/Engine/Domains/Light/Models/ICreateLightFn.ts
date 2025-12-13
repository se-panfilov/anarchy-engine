import type { ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';
import type { ICreateFN } from '@Engine/Factories';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
