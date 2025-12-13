import type { Vector2 } from 'three';

import type { TShadowCameraParams } from './TShadowCameraParams';

export type TLightShadowParams = Readonly<{
  mapSize: Vector2;
  camera: TShadowCameraParams;
  normalBias: number;
}>;
