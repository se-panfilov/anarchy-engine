import type { LightTag } from '@/Engine/Domains/Light/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXY, IWithReadonlyTags } from '@/Engine/Mixins';

import type { ILightProps } from './ILightProps';
import type { ILightShadowParams } from './ILightShadowParams';

export type ILightConfig = Omit<ILightProps, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: LightShadowConfig;
  }> & IObject3DPropConfig & IWithReadonlyTags<LightTag>

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
