import type { ActorParams } from '@Engine/Models';
import type { Vector3dConfig } from './Vector3dConfig';

export interface ActorConfig extends Omit<ActorParams, 'materialParams' | 'position'> {
  readonly type: ActorType;
  readonly width: number;
  readonly height: number;
  readonly materialParams: ActorMaterialConfig;
  readonly position: Vector3dConfig;
  readonly castShadow: boolean;
}

export interface ActorMaterialConfig {
  readonly color: string;
}

export type ActorType = 'sphere' | 'plane';
