import type { IAmbientLight, IDirectionalLight, IFactory, ILightConfig, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';

export type ILightFactory = IFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
