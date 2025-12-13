import type { IAmbientLight, IDirectionalLight, ILightConfig, ILightParams, ILightWrapper } from '@Engine/Domains/Light/Models';

import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@/Engine/Models';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig, IAbstractFactory<ILightWrapper, ILightParams>>;
