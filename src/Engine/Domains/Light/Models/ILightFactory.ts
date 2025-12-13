import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { IAmbientLight, IDirectionalLight, ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig, IAbstractFactory<ILightWrapper, ILightParams>>;
