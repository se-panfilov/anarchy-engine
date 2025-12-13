import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { ILightParams } from './ILightParams';
import type { ILightWrapper } from './ILightWrapper';

export type ICreateLightFn = ICreateFN<ILightWrapper, ILightParams>;
