import type { Vector2, Vector3 } from 'three';
import type { Color } from 'three/src/math/Color';

export interface LightParams {
  readonly type: LightType;
  readonly color: Color;
  readonly intensity?: number;
  readonly position: Vector3;
  readonly castShadow: true;
  readonly shadow: LightShadowParams;
}

export interface LightShadowParams {
  readonly mapSize: Vector2;
  readonly camera: { readonly far: number };
  readonly normalBias: number;
}

export type LightType = 'ambient' | 'directional';
