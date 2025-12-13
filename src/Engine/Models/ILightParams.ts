import type { Vector2, Vector3 } from 'three';
import type { Color } from 'three/src/math/Color';

export type ILightParams = Readonly<{
  type: ILightType;
  color: Color;
  intensity?: number;
  position: Vector3;
  castShadow: boolean;
  shadow?: ILightShadowParams;
}>;

export type ILightShadowParams = Readonly<{
  mapSize: Vector2;
  camera: { far: number };
  normalBias: number;
}>;

export type ILightType = 'ambient' | 'directional';
