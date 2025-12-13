import type { IAmbientLight, IDirectionalLight, IFactory, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';
import type { ILightConfig } from '@Engine/Launcher/Models';

export type ILightFactory = IFactory<ILightWrapper, IAmbientLight | IDirectionalLight, ILightParams, ILightConfig>;
