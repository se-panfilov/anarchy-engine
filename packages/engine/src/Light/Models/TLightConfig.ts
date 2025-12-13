import type { Vector2Like } from 'three';
import type { Color } from 'three/src/math/Color';

import type { TWithTags } from '@/Mixins';
import type { TObject3DParams, TObject3DPropConfig } from '@/ThreeLib';

import type { TAmbientLightParams } from './TAmbientLightParams';
import type { TDirectionalLightParams } from './TDirectionalLightParams';
import type { THemisphereLightParams } from './THemisphereLightParams';
import type { TLightShadowParams } from './TLightShadowParams';
import type { TPointLightParams } from './TPointLightParams';
import type { TRectAreaLightParams } from './TRectAreaLightParams';
import type { TShadowCameraConfig } from './TShadowCameraConfig';
import type { TSpotLightParams } from './TSpotLightParams';

export type TAbstractLightConfig<T extends Readonly<{ color: Color }>> = Omit<T, keyof TObject3DParams | 'color' | 'shadow'> &
  Readonly<{
    color: string;
    shadow?: TLightShadowConfig;
  }> &
  TObject3DPropConfig &
  TWithTags;

export type TDirectionalLightConfig = Omit<TDirectionalLightParams, keyof TObject3DParams | 'color'> &
  Readonly<{
    color: string;
  }> &
  TObject3DPropConfig;

export type TAmbientLightConfig = TAbstractLightConfig<TAmbientLightParams>;
export type THemisphereLightConfig = Omit<TAbstractLightConfig<THemisphereLightParams>, 'groundColor'> & Readonly<{ groundColor: string }>;
export type TPointLightConfig = TAbstractLightConfig<TPointLightParams>;
export type TRectAreaLightConfig = TAbstractLightConfig<TRectAreaLightParams>;
export type TSpotLightConfig = TAbstractLightConfig<TSpotLightParams>;

export type TAnyLightConfig = TAmbientLightConfig | THemisphereLightConfig | TDirectionalLightConfig | TPointLightConfig | TRectAreaLightConfig | TSpotLightConfig;

export type TLightShadowConfig = Omit<TLightShadowParams, 'mapSize' | 'camera'> &
  Readonly<{
    mapSize: Vector2Like;
    camera: TShadowCameraConfig;
  }>;
