import type { ILightParams, ILightShadowParams, ILightType } from '@Engine/Domains/Light';

import type { IVector2dConfig, IVector3dConfig } from '@/Engine/Models';

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
