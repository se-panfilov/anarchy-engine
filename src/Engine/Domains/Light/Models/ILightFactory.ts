import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';

import type { IAmbientLight, IDirectionalLight, ILightConfig, ILightParams, ILightWrapper } from '../Models';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig, IAbstractFactory<ILightWrapper, ILightParams>>;
