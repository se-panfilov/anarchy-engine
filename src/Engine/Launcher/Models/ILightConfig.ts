import type { ILightParams, LightShadowParams, LightType } from '@Engine/Models';
import type { IVector2dConfig } from './IVector2dConfig';
import type { IVector3dConfig } from './IVector3dConfig';

export interface ILightConfig extends Omit<ILightParams, 'color' | 'position' | 'shadow'> {
  readonly type: LightType;
  readonly color: string;
  readonly intensity: number;
  readonly castShadow: boolean;
  readonly shadow?: LightShadowConfig;
  readonly position: IVector3dConfig;
}

export interface LightShadowConfig extends Omit<LightShadowParams, 'mapSize'> {
  readonly mapSize: IVector2dConfig;
  readonly camera: { readonly far: number };
  readonly normalBias: number;
}
