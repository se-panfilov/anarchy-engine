import type { Color } from 'three/src/math/Color';

import type { IWithCoordsXY, IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IAmbientLightProps } from './IAmbientLightProps';
import type { IDirectionalLightProps } from './IDirectionalLightProps';
import type { IHemisphereLightProps } from './IHemisphereLightProps';
import type { ILightShadowParams } from './ILightShadowParams';
import type { IPointLightProps } from './IPointLightProps';
import type { IRectAreaLightProps } from './IRectAreaLightProps';
import type { ISpotLightProps } from './ISpotLightProps';

export type IAbstractLightConfig<T extends Readonly<{ color: Color; shadow?: ILightShadowParams }>> = Omit<T, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: LightShadowConfig;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags;

export type IAmbientLightConfig = IAbstractLightConfig<IAmbientLightProps>;
export type IHemisphereLightConfig = IAbstractLightConfig<IHemisphereLightProps>;
export type IDirectionalLightConfig = IAbstractLightConfig<IDirectionalLightProps>;
export type IPointLightConfig = IAbstractLightConfig<IPointLightProps>;
export type IRectAreaLightConfig = IAbstractLightConfig<IRectAreaLightProps>;
export type ISpotLightConfig = IAbstractLightConfig<ISpotLightProps>;

export type IAnyLightConfig = IAmbientLightConfig | IHemisphereLightConfig | IDirectionalLightConfig | IPointLightConfig | IRectAreaLightConfig | ISpotLightConfig;

export type LightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: IWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
