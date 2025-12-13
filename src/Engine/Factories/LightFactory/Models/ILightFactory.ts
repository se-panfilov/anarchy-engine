import type { ILightConfig } from '@Engine/Launcher/Models';
import type { IAmbientLight, IDirectionalLight, IFactory, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';

export type ILightFactory = IFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
