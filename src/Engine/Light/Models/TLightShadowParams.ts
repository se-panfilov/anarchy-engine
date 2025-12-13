import type { Vector2 } from 'three';

import type { TAnyCameraParams } from '@/Engine/Camera';

export type TLightShadowParams = Readonly<{
  mapSize: Vector2;
  camera: TAnyCameraParams;
  normalBias: number;
}>;
