import type { IWithCoordsXY, IWithCoordsXYZ } from '@/Engine/Mixins';

import type { ILightParams } from './ILightParams';
import type { ILightShadowParams } from './ILightShadowParams';
import type { ILightType } from './ILightType';

export type ILightConfig = Omit<ILightParams, 'color' | 'position' | 'shadow'> &
  Readonly<{
    type: ILightType;
    color: string;
    intensity: number;
    castShadow: boolean;
    shadow?: LightShadowConfig;
    position: IWithCoordsXYZ;
  }>;

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
