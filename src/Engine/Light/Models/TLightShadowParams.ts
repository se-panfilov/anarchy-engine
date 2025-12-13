import type { Vector2 } from 'three';

export type TLightShadowParams = Readonly<{
  mapSize: Vector2;
  camera: { far?: number; near?: number };
  normalBias: number;
}>;
