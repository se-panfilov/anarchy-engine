import type { IVector2dConfig } from './IVector2dConfig';

export interface IVector3dConfig extends IVector2dConfig {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
