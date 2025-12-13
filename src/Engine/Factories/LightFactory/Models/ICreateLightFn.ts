import type { ICreateFN } from '@Engine/Factories';
import type { LightWrapper } from '@Engine/Wrappers';
import type { ILightParams } from '@Engine/Models';

export type ICreateLightFn = ICreateFN<ReturnType<typeof LightWrapper>, ILightParams>;
