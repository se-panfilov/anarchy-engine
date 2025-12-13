import type { ICreateFN } from '@Engine/Factories';
import type { ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
