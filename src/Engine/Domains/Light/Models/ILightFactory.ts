import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';

import type { ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IFactory<ILightWrapper, ILightParams> & IFromConfig<ILightConfig, ILightParams>;
