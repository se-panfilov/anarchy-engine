import type { ICreateFN } from '@Engine/Factories';
import type { ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
