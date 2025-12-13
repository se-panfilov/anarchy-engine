import type { CreateFN } from '@Engine/Factories';
import type { LightWrapper } from '@Engine/Wrappers';
import type { LightParams } from '@Engine/Models';

export type ICreateLightFn = CreateFN<ReturnType<typeof LightWrapper>, LightParams>;
