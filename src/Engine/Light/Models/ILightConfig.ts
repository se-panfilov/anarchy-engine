import type { Color } from 'three/src/math/Color';

import type { TWithCoordsXY, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

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
    shadow?: ILightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;

export type IAmbientLightConfig = IAbstractLightConfig<IAmbientLightProps>;
export type IHemisphereLightConfig = Omit<IAbstractLightConfig<IHemisphereLightProps>, 'groundColor'> & Readonly<{ groundColor: string }>;
export type IDirectionalLightConfig = IAbstractLightConfig<IDirectionalLightProps>;
export type IPointLightConfig = IAbstractLightConfig<IPointLightProps>;
export type IRectAreaLightConfig = IAbstractLightConfig<IRectAreaLightProps>;
export type ISpotLightConfig = IAbstractLightConfig<ISpotLightProps>;

export type IAnyLightConfig = IAmbientLightConfig | IHemisphereLightConfig | IDirectionalLightConfig | IPointLightConfig | IRectAreaLightConfig | ISpotLightConfig;

export type ILightShadowConfig = Omit<ILightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: TWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;
