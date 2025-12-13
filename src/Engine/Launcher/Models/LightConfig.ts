import type { LightParams, LightType } from '@Engine/Models';
import type { Vector2dConfig } from './Vector2dConfig';
import type { Vector3dConfig } from './Vector3dConfig';

export interface LightConfig extends Omit<LightParams, 'color'> {
  readonly type: LightType;
  readonly color: string;
  readonly intensity: number;
  readonly castShadow: true;
  readonly shadow: {
    readonly mapSize: Vector2dConfig;
    readonly camera: { readonly far: number };
    readonly normalBias: number;
  };
  readonly position: Vector3dConfig;
}
