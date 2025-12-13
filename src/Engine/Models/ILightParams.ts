import type { Color } from 'three/src/math/Color';
import type { IVector2, IVector3 } from '@Engine/Models';

export type ILightParams = Readonly<{
  type: ILightType;
  color: Color;
  intensity?: number;
  position: IVector3;
  castShadow: boolean;
  shadow?: ILightShadowParams;
}>;

export type ILightShadowParams = Readonly<{
  mapSize: IVector2;
  camera: { far: number };
  normalBias: number;
}>;

export type ILightType = 'ambient' | 'directional';
