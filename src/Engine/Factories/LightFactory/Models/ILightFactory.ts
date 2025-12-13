import type { IFactory, ILightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';
import { AmbientLight, DirectionalLight } from 'three';
import type { LightConfig } from '@Engine/Launcher/Models';

export type ILightFactory = IFactory<ILightWrapper, AmbientLight | DirectionalLight, ILightParams, LightConfig>;
