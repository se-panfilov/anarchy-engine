import type { LightParams, LightShadowParams, LightType } from '@Engine/Models';
import type { Vector2dConfig } from './Vector2dConfig';
import type { Vector3dConfig } from './Vector3dConfig';

export interface LightConfig extends Omit<LightParams, 'color' | 'position' | 'shadow'> {
  readonly type: LightType;
  readonly color: string;
  readonly intensity: number;
  readonly castShadow: boolean;
  readonly shadow?: LightShadowConfig;
  readonly position: Vector3dConfig;
}

export interface LightShadowConfig extends Omit<LightShadowParams, 'mapSize'> {
  readonly mapSize: Vector2dConfig;
  readonly camera: { readonly far: number };
  readonly normalBias: number;
}
