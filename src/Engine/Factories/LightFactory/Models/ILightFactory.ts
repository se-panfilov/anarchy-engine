import type { Factory, LightParams } from '@Engine/Models';
import type { ILightWrapper } from '@Engine/Wrappers';
import { AmbientLight, DirectionalLight } from 'three';
import type { LightConfig } from '@Engine/Launcher/Models';

export type ILightFactory = Factory<ILightWrapper, AmbientLight | DirectionalLight, LightParams, LightConfig>;
