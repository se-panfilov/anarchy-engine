import type { IAbstractFromConfigWrapperFactory, IAmbientLight, IDirectionalLight, ILightConfig, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';

export type ILightFactory = IAbstractFromConfigWrapperFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
