import type { IAmbientLight, IDirectionalLight, ILightConfig, ILightParams, ILightWrapper } from '@Engine/Domains/Light';

import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@/Engine/Domains/Abstract';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig, IAbstractFactory<ILightWrapper, ILightParams>>;
