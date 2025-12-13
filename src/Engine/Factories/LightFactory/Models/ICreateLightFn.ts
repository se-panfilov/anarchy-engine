import type { ICreateFN } from '@Engine/Factories';
import type { ILightWrapper } from '@Engine/Wrappers';
import type { ILightParams } from '@Engine/Models';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
