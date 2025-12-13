import type { Vector2, Vector3Like } from 'three';

export type TLightShadowParams = Readonly<{
  mapSize: Vector2;
  camera: {
    far: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    near?: number;
    type?: string;
    up?: Vector3Like;
    zoom?: number;
    layers?: number;
  };
  normalBias: number;
}>;
