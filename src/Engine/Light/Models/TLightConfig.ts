import type { Vector2Like } from 'three';
import type { Color } from 'three/src/math/Color';

import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams, TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TAmbientLightParams } from './TAmbientLightParams';
import type { TDirectionalLightParams } from './TDirectionalLightParams';
import type { TDirectionalLightShadowParams } from './TDirectionalLightShadowParams';
import type { THemisphereLightParams } from './THemisphereLightParams';
import type { TLightShadowParams } from './TLightShadowParams';
import type { TPointLightParams } from './TPointLightParams';
import type { TRectAreaLightParams } from './TRectAreaLightParams';
import type { TSpotLightParams } from './TSpotLightParams';

export type TAbstractLightConfig<T extends Readonly<{ color: Color; shadow?: TLightShadowParams }>> = Omit<T, keyof TObject3DParams | 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: TLightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;

export type TDirectionalLightConfig = Omit<TDirectionalLightParams, keyof TObject3DParams | 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: TDirectionalLightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;

export type TAmbientLightConfig = TAbstractLightConfig<TAmbientLightParams>;
export type THemisphereLightConfig = Omit<TAbstractLightConfig<THemisphereLightParams>, 'groundColor'> & Readonly<{ groundColor: string }>;
export type TPointLightConfig = TAbstractLightConfig<TPointLightParams>;
export type TRectAreaLightConfig = TAbstractLightConfig<TRectAreaLightParams>;
export type TSpotLightConfig = TAbstractLightConfig<TSpotLightParams>;

export type TAnyLightConfig = TAmbientLightConfig | THemisphereLightConfig | TDirectionalLightConfig | TPointLightConfig | TRectAreaLightConfig | TSpotLightConfig;

export type TLightShadowConfig = Omit<TLightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: Vector2Like;
    camera: { far: number };
    normalBias: number;
  }>;

export type TDirectionalLightShadowConfig = Omit<TDirectionalLightShadowParams, 'mapSize'> &
  Readonly<{
    mapSize: Vector2Like;
    camera: { far: number; left?: number; right?: number; top?: number; bottom?: number };
    normalBias: number;
  }>;
