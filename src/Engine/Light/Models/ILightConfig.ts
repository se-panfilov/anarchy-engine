import type { LightTag } from '@/Engine/Light/Constants';
import type { IWithCoordsXY, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IAmbientLightProps } from './IAmbientLightProps';
import type { ILightShadowParams } from './ILightShadowParams';

export type ILightConfig = Omit<IAmbientLightProps, 'color' | 'shadow'> &
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
