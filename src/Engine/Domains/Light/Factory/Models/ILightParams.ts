import { LightTag } from '@Engine/Constants';
import type { IVector2, IVector3 } from '@Engine/Wrappers';
import type { Color } from 'three/src/math/Color';

export type ILightParams = Readonly<{
  type: ILightType;
  color: Color;
  intensity?: number;
  position: IVector3;
  castShadow: boolean;
  shadow?: ILightShadowParams;
  tags: ReadonlyArray<LightTag>;
}>;

export type ILightShadowParams = Readonly<{
  mapSize: IVector2;
  camera: { far: number };
  normalBias: number;
}>;

export type ILightType = 'ambient' | 'directional';
