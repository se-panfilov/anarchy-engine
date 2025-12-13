import type { Vector2dConfig } from './Vector2dConfig';

export interface Vector3dConfig extends Vector2dConfig {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
