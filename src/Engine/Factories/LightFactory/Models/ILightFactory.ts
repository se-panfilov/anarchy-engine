import type { IAbstractFromConfigFactory, IAmbientLight, IDirectionalLight, ILightConfig, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';

export type ILightFactory = IAbstractFromConfigFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
