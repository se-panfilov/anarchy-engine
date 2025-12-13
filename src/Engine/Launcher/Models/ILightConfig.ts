import type { ILightParams, ILightShadowParams, ILightType } from '@Engine/Models';
import type { IVector2dConfig } from './IVector2dConfig';
import type { IVector3dConfig } from './IVector3dConfig';

export type ILightConfig = Omit<ILightParams, 'color' | 'position' | 'shadow'> &
  Readonly<{
    type: ILightType;
    color: string;
    intensity: number;
    castShadow: boolean;
    shadow?: LightShadowConfig;
    position: IVector3dConfig;
  }>;

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IVector2dConfig;
    camera: { far: number };
    normalBias: number;
  }>;
