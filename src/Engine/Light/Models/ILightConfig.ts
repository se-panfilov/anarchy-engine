import type { IWithCoordsXY, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IAbstractLightProps } from './IAbstractLightProps';
import type { ILightShadowParams } from './ILightShadowParams';

export type ILightConfig = Omit<IAbstractLightProps, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: LightShadowConfig;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags;

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
