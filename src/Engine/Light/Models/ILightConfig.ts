import type { LightTag } from '@/Engine/Light/Constants';
import type { IWithCoordsXY, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { ILightProps } from './ILightProps';
import type { ILightShadowParams } from './ILightShadowParams';

export type ILightConfig = Omit<ILightProps, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: LightShadowConfig;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags<LightTag>;

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
