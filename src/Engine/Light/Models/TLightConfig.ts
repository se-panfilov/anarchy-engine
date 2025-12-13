import type { Color } from 'three/src/math/Color';

import type { TWithCoordsXY, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TAmbientLightProps } from './TAmbientLightProps';
import type { TDirectionalLightProps } from './TDirectionalLightProps';
import type { TDirectionalLightShadowParams } from './TDirectionalLightShadowParams';
import type { THemisphereLightProps } from './THemisphereLightProps';
import type { TLightShadowParams } from './TLightShadowParams';
import type { TPointLightProps } from './TPointLightProps';
import type { TRectAreaLightProps } from './TRectAreaLightProps';
import type { TSpotLightProps } from './TSpotLightProps';

export type TAbstractLightConfig<T extends Readonly<{ color: Color; shadow?: TLightShadowParams }>> = Omit<T, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: TLightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;

export type TDirectionalLightConfig = Omit<TDirectionalLightProps, 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: TDirectionalLightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;

export type TAmbientLightConfig = TAbstractLightConfig<TAmbientLightProps>;
export type THemisphereLightConfig = Omit<TAbstractLightConfig<THemisphereLightProps>, 'groundColor'> & Readonly<{ groundColor: string }>;
export type TPointLightConfig = TAbstractLightConfig<TPointLightProps>;
export type TRectAreaLightConfig = TAbstractLightConfig<TRectAreaLightProps>;
export type TSpotLightConfig = TAbstractLightConfig<TSpotLightProps>;

export type TAnyLightConfig = TAmbientLightConfig | THemisphereLightConfig | TDirectionalLightConfig | TPointLightConfig | TRectAreaLightConfig | TSpotLightConfig;

export type TLightShadowConfig = Omit<TLightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: TWithCoordsXY;
    camera: { far: number };
    normalBias: number;
  }>;

export type TDirectionalLightShadowConfig = Omit<TDirectionalLightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: TWithCoordsXY;
    camera: { far: number; left?: number; right?: number; top?: number; bottom?: number };
    normalBias: number;
  }>;
