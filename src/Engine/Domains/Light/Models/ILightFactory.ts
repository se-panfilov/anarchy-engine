import type { IAmbientLight, IDirectionalLight, ILightConfig, ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';

import type { IAbstractFromConfigWrapperFactory } from '@/Engine/Models';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
