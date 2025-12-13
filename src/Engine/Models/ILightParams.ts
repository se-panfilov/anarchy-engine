import type { Vector2, Vector3 } from 'three';
import type { Color } from 'three/src/math/Color';

export interface ILightParams {
  readonly type: ILightType;
  readonly color: Color;
  readonly intensity?: number;
  readonly position: Vector3;
  readonly castShadow: boolean;
  readonly shadow?: ILightShadowParams;
}

export interface ILightShadowParams {
  readonly mapSize: Vector2;
  readonly camera: { readonly far: number };
  readonly normalBias: number;
}

export type ILightType = 'ambient' | 'directional';
